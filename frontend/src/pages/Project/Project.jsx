import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';

const Project = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [divison, setDivison] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);

  const handleProject = async () => {
    try {
      const response = await axiosInstance.post("/create-project", {
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
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-row">
      <Navbar />
      <div className="bg-gray-100 w-full">
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Header-bg.svg?alt=media&token=c629c749-9e9d-4a59-86bc-b4d1c3f8bd72')] bg-cover h-28">
          <div className=" px-8 py-4 md:relative md:top-14 md:left-11 md:px-0 md:py-0">
            <h2 className="text-2xl text-white font-bold">Create Project</h2>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <img src="https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Logo.svg?alt=media&token=04ae5724-7894-431f-9efa-f9aa823bdb57" alt="" />
          </div>
        </div>
        <main className="container mx-auto p-4 md:relative md:-top-2">
          <div className="bg-white p-6 rounded-md shadow-md ">
            <form onSubmit={handleProject}>
              <div className="mb-4">
                <textarea
                  type="text"
                  id="projectTheme"
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter the Project Theme"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-2 py-4 rounded focus:outline-none focus:shadow-outline">
                  Save Project
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Reason</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="For Business">For Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="divison" className="block text-gray-700 font-bold mb-2">
                    Division
                  </label>
                  <select
                    value={divison}
                    onChange={(e) => setDivison(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Divison</option>
                    <option value="Filters">Filters</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Quality A">Quality A</option>
                    <option value="Quality B">Quality B</option>
                    <option value="Quality C">Quality C</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Department" className="block text-gray-700 font-bold mb-2">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Statergy">Statergy</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="StartDate" className="block text-gray-700 mb-2 font-bold">
                    Start Date as Per Project Plan
                  </label>
                  <div className="">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="EndDate" className="block text-gray-700 mb-2 font-bold">
                    End Date as Per Project Plan
                  </label>
                  <div className="">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="Location" className="block text-gray-700 font-bold mb-2">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Nagpur">Nagpur</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status: </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Status</option>
                    <option value="Registered">Registered</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Project;