import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

    // Simulate file upload and data processing
    setError('');
    setSuccess('');

    // Generate random health data for demonstration
    const newHealthScore = Math.floor(Math.random() * 100);
    const newImprovementTips = 'Exercise regularly and maintain a balanced diet.';
    const newInsuranceRebate = Math.floor(Math.random() * 1000);

    setHealthScore(newHealthScore);
    setImprovementTips(newImprovementTips);
    setInsuranceRebate(newInsuranceRebate);

    setSuccess('Medical data processed successfully.');
  };

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-tl from-purple-600/95 via-purple-400/40 via-65% to-transparent p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Medical Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="file" onChange={handleFileChange} className="mb-4" />
            <Button onClick={handleUpload}>Process Data</Button>
          </CardContent>
        </Card>

        {healthScore !== null && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{healthScore}</p>
            </CardContent>
          </Card>
        )}

        {improvementTips && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Improvement Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{improvementTips}</p>
            </CardContent>
          </Card>
        )}

        {insuranceRebate !== null && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Insurance Rebate (USDC)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${insuranceRebate}</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}