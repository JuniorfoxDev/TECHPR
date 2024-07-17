import React, { useState, useEffect } from 'react';
import Navbar from '../../../src/components/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [projectCount, setProjectCount] = useState({
    count: 0,
    closedCount: 0,
    runningCount: 0,
    upcomingRunningCount: 0,
    cancelledCount: 0,
  });

  const [departmentData, setDepartmentData] = useState({
    labels: [],
    totalProjects: [],
    closedProjects: [],
  });

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const response = await axiosInstance.get('/all-project/count');
        setProjectCount(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDepartmentData = async () => {
      try {
        const response = await axiosInstance.get('/all-project/chart-data');
        const data = response.data;
        const labels = data.map(item => item.department);
        const totalProjects = data.map(item => item.total);
        const closedProjects = data.map(item => item.closed);

        setDepartmentData({
          labels,
          totalProjects,
          closedProjects,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjectCount();
    fetchDepartmentData();
  }, []);

  const chartData = {
    labels: departmentData.labels,
    datasets: [
      {
        label: 'Total Projects',
        data: departmentData.totalProjects,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderRadius: 20,
        barThickness: 20,
      },
      {
        label: 'Closed Projects',
        data: departmentData.closedProjects,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 20,
        barThickness: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Navbar />
      <div className="bg-[#f1f1f1] w-full">
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Header-bg.svg?alt=media&token=c629c749-9e9d-4a59-86bc-b4d1c3f8bd72')] bg-cover h-36 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl text-white font-bold">Dashboard</h2>
            <img src="https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Logo.svg?alt=media&token=04ae5724-7894-431f-9efa-f9aa823bdb57" alt="" className="mx-auto" />
          </div>
        </div>
        <main className="container mx-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white rounded-md shadow-md p-4 border-l-8 border-[#81ECFF]">
              <h2 className="text-xl font-bold mb-2">Total Projects</h2>
              <p className="text-3xl font-bold text-blue-500">{projectCount.count}</p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4 border-l-8 border-[#81ECFF]">
              <h2 className="text-xl font-bold mb-2">Closed</h2>
              <p className="text-3xl font-bold text-blue-500">{projectCount.closedCount}</p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4 border-l-8 border-[#81ECFF]">
              <h2 className="text-xl font-bold mb-2">Running</h2>
              <p className="text-3xl font-bold text-blue-500">{projectCount.runningCount}</p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4 border-l-8 border-[#81ECFF]">
              <h2 className="text-xl font-bold mb-2">Closure Delay</h2>
              <p className="text-3xl font-bold text-blue-500">{projectCount.upcomingRunningCount}</p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4 border-l-8 border-[#81ECFF]">
              <h2 className="text-xl font-bold mb-2">Cancelled</h2>
              <p className="text-3xl font-bold text-blue-500">{projectCount.cancelledCount}</p>
            </div>
          </div>
        </main>
        <div className="container mx-auto p-5 mb-12">
          <h2 className="text-2xl font-bold mb-2">Department wise - Total Vs Closed</h2>
          <div className="bg-white  rounded-md shadow-md p-4 md:w-[800px]">
            <div className="h-96">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
