// src/Home.js
import React from 'react';
import NavBar from './Navbar';
const Home = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-500 to-cyan-200">
      {/* Navigation Bar */}
      <NavBar />

      {/* <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-cyan-50"></div> */}
      
      {/* Top Half */}
      <div className="relative z-10 p-8 bg-white rounded-b-lg shadow-lg flex flex-col items-center justify-center h-1/2">
        <h1 className="text-4xl font-bold text-center mb-4 text-sky-900">Share Health Data Securely, Earn Rewards Anonymously
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Revolutionizing the way health data is shared and rewarded.
        </p>
      </div>
  
        {/* Bottom Half */}
      <div className="relative z-10 p-4 rounded-t-lg bg-gradient-to-b from-cyan-500 to-cyan-200 h-1/2 flex flex-wrap justify-center gap-4">
        {[...Array(6)].map((_, index) => (
      <div key={index} className="w-[40%] min-h-[150px] bg-white rounded-lg p-4 text-center border border-cyan-500">
        <span className="font-bold text-cyan-500">Box {index + 1}</span>
        <p className="mt-2 text-sm text-gray-800">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}</p>
      </div>
      ))}
    </div>
    </div>
  );
};

export default Home;
