/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Enter valid Email");
      return;
    }
    if (!password) {
      setError("Enter Valid Password");
      return;
    }
    setError("");
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-60vh bg-cover bg-center" style={{ backgroundImage: "url('https://svgshare.com/i/17ym.svg')" }}>
      <div className="flex flex-col gap-4 relative top-20 items-center justify-center w-full max-w-md px-4 sm:px-6 lg:px-8">
        <div className="logo flex flex-col items-center justify-center">
          <img src="https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Logo.svg?alt=media&token=e3b5d346-0332-4c8f-97b5-c08b8a5e5d59" alt="Logo" className="h-20 w-20" />
          <h2 className="text-center text-xl mt-2 text-gray-900">Online Project Management</h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-bold text-center mb-4">Login to get Started</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500 text-xs pb-3">{error}</p>}
            <div className="flex items-center justify-between mb-4">
              <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700">Forgot Password?</a>
            </div>
            <div className="flex items-center justify-center pt-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
