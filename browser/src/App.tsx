import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './App.css';
import { ExecuteResponse, ExecuteError } from './types';

function App() {
  const [magicNumber, setMagicNumber] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await axios.post<ExecuteResponse>('http://localhost:5000/execute', { magicNumber });

      setResponse(res.data.response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ExecuteError>;
        setError(axiosError.response?.data.error || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="card">
        <hr />
        <h3>Execute Lit Action</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Magic Number:
            <input
              type="number"
              value={magicNumber}
              onChange={(e) => setMagicNumber(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Executing...' : 'Submit'}
          </button>
        </form>
        {response && (
          <div className="response">
            <h4>Response:</h4>
            <p>{response}</p>
          </div>
        )}
        {error && (
          <div className="error">
            <h4>Error:</h4>
            <p>{error}</p>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
}

export default App;
