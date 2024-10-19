import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface EncryptResponse {
  ciphertext: string;
  dataToEncryptHash: string;
}

interface ExecuteError {
  error: string;
}

export default function LitProtocolDemo() {
  const [numberToEncrypt, setNumberToEncrypt] = useState('');
  const [encryptedData, setEncryptedData] = useState<EncryptResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEncrypt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setEncryptedData(null);

    try {
      const res = await axios.post<EncryptResponse>('http://localhost:5000/encrypt', { number: numberToEncrypt });
      setEncryptedData(res.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ExecuteError>;
        setError(axiosError.response?.data.error || 'An error occurred during encryption');
      } else {
        setError('An unexpected error occurred during encryption');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Lit Protocol Encryption Demo</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Encrypt Number</h3>
        <form onSubmit={handleEncrypt} className="space-y-4">
          <div>
            <label htmlFor="numberToEncrypt" className="block text-sm font-medium text-gray-700">
              Enter Number to Encrypt:
            </label>
            <input
              type="number"
              id="numberToEncrypt"
              value={numberToEncrypt}
              onChange={(e) => setNumberToEncrypt(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Encrypting...' : 'Encrypt'}
          </button>
        </form>
        {encryptedData && (
          <div className="mt-4 p-3 bg-blue-100 rounded">
            <h4 className="font-semibold">Encrypted Data:</h4>
            <p className="break-all"><strong>Ciphertext:</strong> {encryptedData.ciphertext}</p>
            <p className="break-all"><strong>Data Hash:</strong> {encryptedData.dataToEncryptHash}</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 rounded">
          <h4 className="font-semibold">Error:</h4>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
