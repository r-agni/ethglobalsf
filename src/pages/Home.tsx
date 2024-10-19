// src/Home.js
import React from 'react';
import NavBar from './Navbar';

const Home = () => {
  // Define box data with title and content
  const boxes = [
    {
      title: "Discover the benefits of sharing your health data securely.",
      content: ""
    },
    {
      title: "Earn rewards for contributing to health research.",
      content: ""
    },
    {
      title: "Your data is protected and anonymous.",
      content: ""
    },
    {
      title: "Join a community of health-conscious individuals.",
      content: ""
    },
    {
      title: "Help improve health outcomes with your data.",
      content: ""
    },
    {
      title: "Experience personalized health insights.",
      content: ""
    },
  ];

  return (
    <div className="relative w-full min-h-screen cyan-300">
      {/* Navigation Bar */}
      <NavBar />

      {/* Top Half */}
      <div className="relative z-10 p-8 bg-white rounded-b-lg shadow-lg flex flex-col items-center justify-center h-1/2">
        <h1 className="text-4xl font-bold text-center mb-4 text-sky-900">Share Health Data Securely, Earn Rewards Anonymously</h1>
        <p className="text-lg text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          Revolutionizing the way health data is shared and rewarded.
        </p>
      </div>

      {/* Unified Bottom Section with Solid Background */}
      <div className="relative z-10 p-4 bg-cyan-300 h-1/2 flex flex-wrap justify-center gap-4 items-center">
        <div className="flex flex-wrap justify-center w-full max-w-6xl">
          {boxes.map((box, index) => (
            <div key={index} className="w-full sm:w-[45%] lg:w-[30%] min-h-[150px] bg-white rounded-lg p-4 text-center border border-cyan-500 shadow-md hover:shadow-lg transition-shadow duration-300 mx-2 my-2">
              <span className="font-bold text-gray-800 text-xl">{box.title}</span>
              <p className="mt-2 text-sm text-gray-800">{box.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
