/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { useNavigate, NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white fixed bottom-0 w-full md:static  md:w-16 flex  items-center md:justify-between shadow-lg ">
  <div className="container flex justify-center md:flex-col items-center gap-10 p-4">
        <NavLink to="/dashboard" className="md:mb-4">
          {({ isActive }) => (
            <img src={isActive ? "https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Dashboard-active.svg?alt=media&token=303944a9-df06-4045-8349-7069e9ccb976" : "https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Dashboard.svg?alt=media&token=c651a9bb-b2c6-4cf2-a57d-ae658c9028aa"} />
          )}
        </NavLink>
        <NavLink to="/all-project" className="md:mb-4">
          {({ isActive }) => (
            <img src={isActive ? "https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Project-list-active.svg?alt=media&token=9475b201-93da-46f5-8921-298e256733b0" : "https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Project-list.svg?alt=media&token=ef15f099-2845-43a6-b1d4-46839cdf4060"} />
          )}
        </NavLink>
        <NavLink to="/create-project" className="md:mb-4">
          {({ isActive }) => (
            <img src={isActive ? "https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/create-project-active.svg?alt=media&token=e602ccd5-10a8-4323-9816-a54f8abb3189" : "https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/create-project.svg?alt=media&token=2d6382d2-968a-40f3-af2b-5c87fa874482"} />
          )}
        </NavLink>
        <button onClick={handleLogout} className="md:mt-auto">
          <img src="https://firebasestorage.googleapis.com/v0/b/multi-mart-ac288.appspot.com/o/Logout.svg?alt=media&token=486988f7-0fdb-4297-bf0e-6f505d6a9017" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
