"use client";

import React, { useState } from 'react';

export default function HealthDataPage() {
  const [file, setFile] = useState(null);
  const [healthScore, setHealthScore] = useState(null);
  const [improvementTips, setImprovementTips] = useState('');
  const [insuranceRebate, setInsuranceRebate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setError('');
    setSuccess('');

    // Simulate file upload and data processing
    const newHealthScore = Math.floor(Math.random() * 100);
    const newImprovementTips = 'Exercise regularly and maintain a balanced diet.';
    const newInsuranceRebate = Math.floor(Math.random() * 1000);

    setHealthScore(newHealthScore);
    setImprovementTips(newImprovementTips);
    setInsuranceRebate(newInsuranceRebate);

    setSuccess('Medical data processed successfully.');
  };

  return (
    
    <div className="font-poppins min-h-screen bg-gradient-to-tl from-red-600/95 via-red-400/40 via-65% to-transparent p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Upload Medical Data</h2>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="mb-4 border p-2 rounded" 
          />
          <button 
            onClick={handleUpload} 
            className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded"
          >
            Process Data
          </button>
        </div>

        {healthScore !== null && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Health Score</h2>
            <p className="text-4xl font-bold">{healthScore}</p>
          </div>
        )}

        {improvementTips && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Improvement Tips</h2>
            <p>{improvementTips}</p>
          </div>
        )}

        {insuranceRebate !== null && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">Insurance Rebate (USDC)</h2>
            <p className="text-2xl font-bold">${insuranceRebate}</p>
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
      </div>
    </div>
  );
}
