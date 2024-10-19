import React, { useState } from "react";
import NavBar from "./Navbar";

const Getstarted: React.FC = () => {
    const [anonimized, setAnonimized] = useState(true);

    const handleButtonClick = (isAnonimized: boolean) => {
        setAnonimized(isAnonimized);
    };

    return (
        <div className="relative w-full min-h-screen bg-white">
            {/* Navigation Bar */}
            <NavBar />

            {/* Buttons container */}
            <div className="flex justify-center items-center py-8 z-10">
                <div className="flex space-x-4">
                    {/* Anonimizer button */}
                    <button
                        className={`${
                            anonimized ? 'bg-blue-300 text-blue-900' : 'bg-blue-600 text-white'
                        } font-bold py-2 px-4 rounded`}
                        onClick={() => handleButtonClick(true)}
                    >
                        Anonimizer
                    </button>

                    {/* Discounter button */}
                    <button
                        className={`${
                            !anonimized ? 'bg-blue-300 text-blue-900' : 'bg-blue-600 text-white'
                        } font-bold py-2 px-4 rounded`}
                        onClick={() => handleButtonClick(false)}
                    >
                        Discounter
                    </button>
                </div>
            </div>

            {/* Profile and Health Data rectangles */}
            <div className="flex justify-center space-x-8 mt-8 px-8">
                {/* Profile section */}
                <div className="bg-gray-100 w-1/3 h-96 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">User Profile</h2>
                    <p>Details about the user, such as name, email, etc.</p>
                    {/* Add more user profile details here */}
                </div>

                {/* Health Data section */}
                <div className="bg-gray-100 w-1/3 h-96 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Health Data</h2>
                    <p>Details about the user's health data, such as activity, heart rate, etc.</p>
                    {/* Add health data details here */}
                </div>
            </div>
        </div>
    );
};

export default Getstarted;
