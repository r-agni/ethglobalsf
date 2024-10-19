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
            <div className="absolute inset-x-0 flex justify-center items-center py-8 z-10">
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
        </div>
    );
};

export default Getstarted;
