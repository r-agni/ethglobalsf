import React from "react";
import NavBar from "./Navbar";
const Getstarted = () => {
    return (
        // left box heading: Users
        // right box heading: Companies
        <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-500 to-cyan-200">
            {/* Navigation Bar */}
            <NavBar />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-cyan-50"></div>
            {/* Top Half */}
            <div className="relative z-10 p-8 bg-white rounded-b-lg shadow-lg flex flex-col items-center justify-center h-1/2">
                <h1 className="text-4xl font-bold text-center mb-4 text-sky-900">Get Started</h1>
                <p className="text-lg text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                    Choose the type of account you want to create.
                </p>
            </div>
            {/* Bottom Half */}
            <div className="relative z-10 mt-8 p-4 rounded-t-lg bg-gradient-to-b from-sky-200 to-cyan-300 h-1/2 flex flex-wrap justify-center gap-4">
                <div className="w-[40%] min-h-[150px] bg-blue-100 rounded-lg p-4 text-center">
                    <span className="font-bold text-blue-800">Users</span>
                    <p className="mt-2 text-sm text-gray-700">
                        Create a personal account to start sharing your health data and earn rewards.
                    </p>
                </div>
                <div className="w-[40%] min-h-[150px] bg-blue-100 rounded-lg p-4 text-center">
                    <span className="font-bold text-blue-800">Companies</span>
                    <p className="mt-2 text-sm text-gray-700">
                        Create a company account to start collecting health data from users and reward them.
                    </p>
                </div>
            </div>
        </div>
        
    );
    };
    
export default Getstarted;
