import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTasks, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Navbar = ({setSearch,search}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
 
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Left: Logo / Brand */}
      <Link
        to="/"
        className="flex items-center space-x-2 text-2xl font-semibold tracking-wide text-yellow-400"
      >
        <FaTasks size={24} />
        <span>TaskTrackr</span>
      </Link>

     
      {location.pathname === "/dashboard" && token && (
        <div className="flex items-center bg-gray-800 px-3 py-1 rounded-lg w-[40%]">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </div>
      )}


      <div className="flex items-center space-x-3">
        {!token ? (
          <>
            <Link
              to="/login"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-1.5 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border border-yellow-400 hover:bg-yellow-500 hover:text-black px-4 py-1.5 rounded-lg transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-1.5 rounded-lg transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
