import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
const Fetch = () => {
    const [projects, setProjects] = useState([
        {
          name: 'Line Filter',
          reason: 'Business',
          type: 'Internal',
          division: 'Compressor',
          category: 'Quality A',
          priority: 'High',
          dept: 'Startegy',
          location: 'Pune',
          status: 'Running',
          date: 'Jun-21, 2020 to Jan-01, 2021',
        },
        {
          name: 'Sticker Management',
          reason: 'Dealership',
          type: 'External',
          division: 'Filters',
          category: 'Quality B',
          priority: 'Low',
          dept: 'Finance',
          location: 'Delhi',
          status: 'Running',
          date: 'Jan-01, 2021 to Jun-31, 2021',
        },
        {
          name: 'Pumps Connector',
          reason: 'Transport',
          type: 'Internal',
          division: 'Compressor',
          category: 'Quality C',
          priority: 'Medium',
          dept: 'Quality',
          location: 'Mumbai',
          status: 'Registered',
          date: 'Feb-01, 2021 to July-31, 2021',
        },
        {
          name: 'Wall Reflector',
          reason: 'Business',
          type: 'Vendor',
          division: 'Pumps',
          category: 'Quality A',
          priority: 'High',
          dept: 'Maintenance',
          location: 'Pune',
          status: 'Cancelled',
          date: 'Mar-05, 2021 to Dec-31, 2021',
        },
        {
          name: 'Tank Filter',
          reason: 'Business',
          type: 'External',
          division: 'Glass',
          category: 'Quality A',
          priority: 'High',
          dept: 'Stores',
          location: 'Mumbai',
          status: 'Registered',
          date: 'Jan-01, 2021 to Nov-20, 2021',
        },
        {
          name: 'Water Heater',
          reason: 'Dealership',
          type: 'Vendor',
          division: 'Compressor',
          category: 'Quality D',
          priority: 'Low',
          dept: 'Finance',
          location: 'Pune',
          status: 'Cancelled',
          date: 'July-01, 2021 to Nov-20, 2022',
        },
        {
          name: 'Large Mixer',
          reason: 'Transport',
          type: 'External',
          division: 'Water Heater',
          category: 'Quality A',
          priority: 'Low',
          dept: 'Stores',
          location: 'Delhi',
          status: 'Closed',
          date: 'Feb-01, 2021 to Oct-20, 2021',
        },
      ]);
      const totalPages = 20;
  const [loading,setLoading] = useState(true);
  const [pages,setPages] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage+1,totalPages);
      const result = projects;
      setProjects(projects)
      console.log("proj",result)
      setLoading(false)
    }
    fetchData();
  }, [currentPage])
  return (
    loading,
    projects,
    totalPages,
    currentPage,
    setCurrentPage
  )
}

export default Fetch
