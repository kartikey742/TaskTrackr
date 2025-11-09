import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-gray-800 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-white">
        Welcome to <span className="text-blue-600 font-bold">TaskTrackr</span>
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md">
        Stay organized and focused — create, manage, and track your daily tasks effortlessly.
      </p>

      <Link
        to="/login"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Get Started 
      </Link>
    </div>
  );
};

export default Home;
