require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);
const User = require("./models/user.model");
const Project = require('./models/project.model')
const express = require("express");
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.get("/", (req, res) => {
    res.json({ data: "Server running" })
});

app.get("/get-user", authenticateToken, async(req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
        return res.sendStatus(401);
    }
    return res.json({
        user: isUser,
        message: "",
    });
});

app.post("/signup", async(req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email: email });
    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists"
        });
    };

    const user = new User({
        name,
        email,
        password,
    });
    await user.save();
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });
    return res.json({
        error: false,
        user,
        accessToken,
        message: "User created successfully",
    });
});

app.post("/login", async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
        return res.status(400).json({ message: "User not found" })
    }
    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "3600m",
        });
        return res.json({
            error: false,
            message: "Success",
            email,
            accessToken,
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid email or password",
        });
    }
});

app.post("/create-project", authenticateToken, async(req, res) => {
    const { name, reason, type, divison, category, priority, department, location, startDate, endDate, status, userId } = req.body;
    const { user } = req.user;
    if (!name || !reason || !type || !divison || !category || !priority || !department || !location || !startDate || !endDate) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const project = new Project({
            name,
            reason,
            type,
            divison,
            category,
            priority,
            department,
            startDate,
            endDate,
            location,
            status,
            userId: user._id,
        })
        await project.save();
        return res.json({
            error: false,
            project,
            message: "Project added successfully"
        })
    } catch {
        return res.status(500).json({
            error: true,
            message: "Internal server error",
        });
    }
});

app.get("/all-project", authenticateToken, async(req, res) => {
    const { user } = req.user;
    const { page = 1, search = '' } = req.query;
    const searchRegex = new RegExp(search, 'i');
    try {
        const projects = await Project.find({ name: searchRegex })
        const count = await Project.countDocuments({ name: searchRegex })
        return res.json({
            error: false,
            projects,
            currentPage: page,
            message: "Projects retrieved successfully",
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
});

app.put("/all-project/status/:id", authenticateToken, async(req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: true, message: "Project not found" });
        }
        project.status = status;
        await project.save()
        return res.json({ error: false, message: "Status updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error" })
    }
});

app.get('/all-project/count', authenticateToken, async(req, res) => {
    try {
        const count = await Project.countDocuments();
        const closedCount = await Project.countDocuments({ status: "Close" });
        const runningCount = await Project.countDocuments({ status: "Running" });
        const upcomingRunningCount = await Project.countDocuments({ status: "Running", endDate: { $lt: new Date() } });
        const cancelledCount = await Project.countDocuments({ status: "Cancelled" });
        res.json({ count, closedCount, runningCount, upcomingRunningCount, cancelledCount })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
})

app.get('/all-project/chart-data', authenticateToken, async(req, res) => {
    try {
        const data = await Project.aggregate([{
                $group: {
                    _id: "$department",
                    total: { $sum: 1 },
                    closed: { $sum: { $cond: [{ $eq: ["$status", "Close"] }, 1, 0] } },
                }
            },
            {
                $project: {
                    _id: 0,
                    department: "$_id",
                    total: 1,
                    closed: 1,
                }
            }
        ]);
        res.json(data);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
})

app.listen('https://techpr.vercel.app', () => {
    console.log("Server is running on port 8000");
});

module.exports = app;
