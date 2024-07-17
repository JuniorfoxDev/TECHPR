/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const ProjectList = ({ onStatusChange }) => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const projectsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get('/all-project/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProjects(data.projects);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchProjects]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/all-project/status/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProjects(projects.map((project) => (project._id === id ? { ...project, status } : project)));
      // onStatusChange(id, status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    const [key, direction] = e.target.value.split(':');
    setSortConfig({ key, direction });
  };

  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-full">Error: {error}</div>;

  const filteredProjects = projects
    .filter((project) =>
      Object.values(project).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      aValue = aValue !== undefined && aValue !== null ? aValue.toString() : '';
      bValue = bValue !== undefined && bValue !== null ? bValue.toString() : '';

      if (sortConfig.direction === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  const indexofLastProject = currentPage * projectsPerPage;
  const indexofFirstProject = indexofLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexofFirstProject, indexofLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="flex flex-col md:flex-row ">
      <Navbar />
      <div className="bg-[#f1f1f1] w-full px-2 md:px-4">
        <div className="bg-cover h-36 flex items-center justify-center bg-[url('https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Header-bg.svg?alt=media&token=c629c749-9e9d-4a59-86bc-b4d1c3f8bd72')] ">
          <h2 className="text-xl text-white font-bold">Project Listing</h2>
        </div>
        <main className="container mx-auto p-4 md:relative -top-10">
          <div className="bg-white p-6 md:p-8 rounded-md shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <input
                type="text"
                className="w-full md:w-1/3 px-4 py-2 border-b-2 mb-4 text-sm outline-none"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <label className="mr-2">Sort By:</label>
                <select onChange={handleSort} className="block w-full md:w-36 text-center text-sm text-gray-700 border-none outline-none">
                  <option value="priority:asc">Priority</option>
                  <option value="divison:asc">Division</option>
                  <option value="category:asc">Category</option>
                  <option value="department:asc">Department</option>
                  <option value="reason:asc">Reason</option>
                  <option value="location:asc">Location</option>
                </select>
              </div>
            </div>
            <div className="hidden md:block table w-full">
              <table className="table-auto border-collapse w-full">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Project Name</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Reason</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Type</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Division</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Category</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Priority</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Dept.</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Location</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal text-left">Status</th>
                    <th className="px-4 py-2 text-gray-600 text-sm font-normal"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((project) => (
                    <tr key={project._id}>
                      <td className="px-4 py-2 text-gray-500">
                        {project.name}
                     
                      </td>
                      <td className="px-4 py-2 text-gray-500">{project.reason}</td>
                      <td className="px-4 py-2 text-gray-500">{project.type}</td>
                      <td className="px-4 py-2 text-gray-500">{project.divison}</td>
                      <td className="px-4 py-2 text-gray-500">{project.category}</td>
                      <td className="px-4 py-2 text-gray-500">{project.priority}</td>
                      <td className="px-4 py-2 text-gray-500">{project.department}</td>
                      <td className="px-4 py-2 text-gray-500">{project.location}</td>
                      <td className="px-4 py-2 text-gray-500">{project.status}</td>
                      <td className="px-4 py-2 text-gray-500">
                        <div className="flex space-x-2">
                          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => updateStatus(project._id, 'Running')}>Start</button>
                          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => updateStatus(project._id, 'Close')}>Close</button>
                          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => updateStatus(project._id, 'Cancelled')}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="block md:hidden">
              <div className="grid ">
                {currentProjects.map((project) => (
                  <div key={project._id} className="bg-gray-100 p-4 mb-3 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{project.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-white ${project.status === 'Running' ? 'bg-green-500' : project.status === 'Close' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                        {project.status}
                      </span>
                    </div>
                    <p><strong>Reason:</strong> {project.reason}</p>
                    <p><strong>Type:</strong> {project.type}</p>
                    <p><strong>Category:</strong> {project.category}</p>
                    <p><strong>Division:</strong> {project.divison}</p>
                    <p><strong>Dept:</strong> {project.department}</p>
                    <p><strong>Location:</strong> {project.location}</p>
                    <p><strong>Priority:</strong> {project.priority}</p>
                    <div className="flex justify-end space-x-2 mt-2">
                      <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded" onClick={() => updateStatus(project._id, 'Running')}>Start</button>
                      <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded" onClick={() => updateStatus(project._id, 'Close')}>Close</button>
                      <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded" onClick={() => updateStatus(project._id, 'Cancelled')}>Cancel</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        <div className="flex items-center justify-center mt-4">
          <div className="flex justify-center gap-4">
            <button className="p-2" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <MdOutlineKeyboardArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} className={`rounded-full p-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                {i + 1}
              </button>
            ))}
            <button className="p-2" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <MdOutlineKeyboardArrowRight />
            </button>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectList;
