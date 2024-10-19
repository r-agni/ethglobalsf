import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';

export const GetStarted = () => {
  return (
    <div>
      <NavBar />
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Get Started
        </h1>
        <div className="flex justify-around mb-8">
          <Link
            to="/wallet-connect"
            className="connect-button bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Connect Wallet
          </Link>
          <Link
            to="/setup-wallet"
            className="setup-button bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
          >
            Set Up Wallet
          </Link>
        </div>
        <div className="mt-8 flex justify-end items-center text-gray-600 hover:text-gray-800">
          <Link to="/learn-more" className="text-blue-500 hover:underline">
            Learn more
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
