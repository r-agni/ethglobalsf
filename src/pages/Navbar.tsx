// src/components/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

//   const handleGetStartedClick = () => {
//     console.log('Navigating to Get Started');
//     navigate('/getstarted');
//   };

  return (
    <nav className="bg-white shadow-md p-4 rounded-b-lg">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold text-sky-900">Salus</h1>
        <div className="flex space-x-4">
          <button 
            className="text-gray-600 hover:text-gray-800 transition duration-300"
            onClick={() => {
                console.log("Button clicked");
                // navigate('/getstarted');
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;