import React, { useState } from 'react';
import NavBar from './Navbar';

const GetStarted: React.FC = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
    });
    const [dataLinked, setDataLinked] = useState(false); // New state to track data linking

    const linkHealthData = () => {
        console.log('Linking health data...');
        // Simulate a delay of 30 seconds to link health data
        setTimeout(() => {
            setDataLinked(true);
            console.log('Health data linked successfully!');
        }, 30000); // 30000 ms = 30 seconds
    };

    const connectWallet = () => {
        // Placeholder function for connecting Circle wallet
        // Replace with actual Circle wallet connection logic
        setWalletConnected(true);
        console.log('Wallet connected');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle profile submission logic here
        console.log('Profile submitted', profile);
    };

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-cyan-200 to-white">
            <NavBar />
            <div className="flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold text-center mb-6 text-sky-800">Get Started</h1>
                {!dataLinked ? ( // Show the health data linking button if not linked
                    <button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300 transform hover:scale-105 mb-4"
                        onClick={linkHealthData}>
                        Link Health Data
                    </button>
                ) : !walletConnected ? ( // Show the wallet connection button if data is linked
                    <button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300 transform hover:scale-105 mb-4"
                        onClick={connectWallet}>
                        Connect Circle Wallet
                    </button>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300 transform hover:scale-105">
                            Submit Profile
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

// Add this line to make the file a module
export {};

export default GetStarted;
