import React, { useState } from "react";
import NavBar from "./Navbar";

// Interface for the profile and health data
interface UserProfile {
    name: string;
    email: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
}

interface HealthData {
    heart_rate: number;
    steps: number;
    source: string;
    activity: string;
    sleep: string;
    respiratory_rate: number;
    bmi: number;
    health_conditions: string;
}

// Reusable component for displaying profile and health data
interface DataSectionProps {
    profile: UserProfile;
    health: HealthData;
    earningText: string;
    buttonText: string;
}

const DataSection: React.FC<DataSectionProps> = ({ profile, health, earningText, buttonText }) => (
    <div className="flex justify-center space-x-8 mt-8 px-8">
        {/* Profile section */}
        <div className="bg-gray-100 w-1/3 h-auto rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <div>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Weight:</strong> {profile.weight} kg</p>
                <p><strong>Height:</strong> {profile.height} cm</p>
            </div>

            {/* Additional boxes at the bottom */}
            <div className="mt-6 space-y-4">
                {/* Earnings box */}
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold">{earningText}</p>
                </div>

                {/* Publish data button */}
                <div className="flex justify-center">
                    <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>

        {/* Health Data section */}
        <div className="bg-gray-100 w-1/3 h-auto rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Health Data</h2>
            <div>
                <p><strong>Heart Rate:</strong> {health.heart_rate} bpm</p>
                <p><strong>Steps:</strong> {health.steps} steps</p>
                <p><strong>Source:</strong> {health.source}</p>
                <p><strong>Activity Level:</strong> {health.activity}</p>
                <p><strong>Sleep:</strong> {health.sleep}</p>
                <p><strong>Respiratory Rate:</strong> {health.respiratory_rate} breaths/min</p>
                <p><strong>BMI:</strong> {health.bmi}</p>
                <p><strong>Health Condition(s):</strong> {health.health_conditions}</p>
            </div>
        </div>
    </div>
);

const Getstarted: React.FC = () => {
    const [anonimized, setAnonimized] = useState(true);

    // Dummy data for user profile and health data
    const userProfile: UserProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        gender: "Male",
        weight: 75,
        height: 180,
    };

    const healthData: HealthData = {
        heart_rate: 72,
        steps: 10000,
        source: "Apple ID",
        activity: "Low",
        sleep: "7 hours",
        respiratory_rate: 18,
        bmi: 23.1,
        health_conditions: "Sleep Apnea",
    };

    const handleButtonClick = (isAnonimized: boolean) => {
        setAnonimized(isAnonimized);
    };

    return (
        <div className="relative w-full min-h-screen bg-white">
            {/* Navigation Bar */}
            <NavBar />

            {/* Buttons container */}
            <div className="flex justify-center items-center py-8">
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

            {/* Conditionally render based on the selected button */}
            {anonimized ? (
                <DataSection
                    profile={userProfile}
                    health={healthData}
                    earningText="You can earn 65-95 Lit ~$145-$255"
                    buttonText="Publish Data"
                />
            ) : (
                <DataSection
                    profile={userProfile}
                    health={healthData}
                    earningText="$45 cashback"
                    buttonText="Link Health ID"
                />
            )}
        </div>
    );
};

export default Getstarted;
