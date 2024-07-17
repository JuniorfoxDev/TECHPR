const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    divison: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: new Date().getTime(),
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("Project", projectSchema);