"use client";

import React, { useState } from 'react';

export default function HealthDataPage() {
  const [file, setFile] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const [improvementTips, setImprovementTips] = useState('');
  const [insuranceRebate, setInsuranceRebate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Add state for user's address
  const [userAddress, setUserAddress] = useState('');

  // Function to handle calling the Lit encryption function
  const handleLitFunction = async () => {
    if (!userAddress) {
      setError('Please enter your address.');
      return;
    }

    // Simple validation for Ethereum address
    if (!/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
      setError('Please enter a valid Ethereum address.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      // Call your backend API route that executes the Lit function
      const response = await fetch('/api/postLit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: userAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const resultData = await response.json();

      // Handle the response as needed
      setSuccess('Lit function executed successfully.');
      console.log('Lit function response:', resultData);

    } catch (error) {
      setError(error.message);
    }
  };  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setError('');
    setSuccess('');
    setConfirmation(''); // Reset confirmation message on new upload
    setLoading(true); // Show loading indicator

    // Simulate processing delay
    setTimeout(async () => {
      try {
        const text = await file.text(); // Read the file as text
        const data = JSON.parse(text); // Parse the JSON string to an object

        // Assuming the JSON structure has the required fields
        const { heartRate, steps, calories, activeTime, sleepTime, bloodOxygen, bloodPressure } = data;

        // Store the parsed data in state
        setHealthData({
          heartRate,
          steps,
          calories,
          activeTime,
          sleepTime,
          bloodOxygen,
          bloodPressure,
        });

        // Simulate health score and insurance rebate calculations
        const newHealthScore = Math.floor(Math.random() * 100);
        const newImprovementTips = 'Exercise regularly and maintain a balanced diet.';
        const newInsuranceRebate = Math.floor(Math.random() * 1000);

        setHealthScore(newHealthScore);
        setImprovementTips(newImprovementTips);
        setInsuranceRebate(newInsuranceRebate);

        setSuccess('Medical data processed successfully.'); // Success message for processing
      } catch (err) {
        setError('Error parsing file. Please ensure it is a valid JSON file.');
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }, 2000); // 2 seconds delay
  };

  const handleSubmit = () => {
    if (healthData) {
      setLoading(true); // Show loading indicator

      // Simulating submission confirmation with a delay
      setTimeout(() => {
        setConfirmation('Data has been successfully submitted.');
        setSuccess(''); // Reset success message after submission
        setLoading(false); // Hide loading indicator
      }, 2000); // 2 seconds delay
    } else {
      setError('No health data to submit.');
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-tl from-red-600/95 via-red-400/40 via-65% to-transparent p-8">
      <div className="max-w-2xl mx-auto">
        {/* Existing code for uploading medical data */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Upload Medical Data</h2>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="mb-4 border p-2 rounded" 
          />
          <button 
            onClick={handleUpload} 
            className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded mb-4"
          >
            Process Data
          </button>
          <button 
            onClick={handleSubmit} 
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
          >
            Submit Data
          </button>
        </div>

        {loading && (
          <div className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-4 mb-8 flex items-center justify-center">
            <div className="loader mr-2"></div>
            <span>Processing...</span>
          </div>
        )}

        {/* New section to input address and call the Lit function */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Receive Payment</h2>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="Your Ethereum Address"
            className="mb-4 border p-2 rounded w-full"
          />
          <button
            onClick={handleLitFunction}
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
          >
            Pay
          </button>
        </div>

        {loading && (
          <div className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-4 mb-8 flex items-center justify-center">
            <div className="loader mr-2"></div>
            <span>Processing...</span>
          </div>
        )}

        {/* Existing code to display results */}
        {healthScore !== null && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Health Score</h2>
            <p className="text-4xl font-bold">3/10</p>
          </div>
        )}

        {improvementTips && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Improvement Tips</h2>
            <p>To improve your health, aim to increase your daily physical activity to at least 30 minutes and gradually work towards 10,000 steps per day. Additionally, prioritize getting 7-9 hours of quality sleep each night and maintain a balanced diet to help regulate your blood pressure and energy levels.</p>
          </div>
        )}

        {insuranceRebate !== null && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex justify-between">
            <div className="flex-1 pr-2">
              <h2 className="text-xl font-bold mb-2">Insurance Rebate (USDC)</h2>
              <p className="text-2xl font-bold">$3</p>
            </div>
            <div className="flex-1 pl-2 border-l border-gray-300">
              <h2 className="text-xl font-bold mb-2">Salus Rewards Pool</h2>
              <p className="text-2xl font-bold">$50</p>
            </div>
          </div>
        )}

        {/* Display health data if available */}
        {healthData && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Health Data</h2>
            <ul className="list-disc list-inside">
              <li><strong>Heart Rate:</strong> {healthData.heartRate} bpm</li>
              <li><strong>Steps:</strong> {healthData.steps} steps</li>
              <li><strong>Calories:</strong> {healthData.calories} kcal</li>
              <li><strong>Active Time:</strong> {healthData.activeTime} minutes</li>
              <li><strong>Sleep Time:</strong> {healthData.sleepTime} hours</li>
              <li><strong>Blood Oxygen:</strong> {healthData.bloodOxygen}%</li>
              <li><strong>Blood Pressure:</strong> {healthData.bloodPressure} mmHg</li>
            </ul>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 mb-8">
            <h3 className="font-bold">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 rounded-lg p-4 mb-8">
            <h3 className="font-bold">Success</h3>
            <p>{success}</p>
          </div>
        )}

        {confirmation && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 rounded-lg p-4 mb-8">
            <h3 className="font-bold">Confirmation</h3>
            <p>{confirmation}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #3498db; /* Blue color */
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
