// decrypt_compute.js - A separate module for decryption, re-encryption, and computation

globalThis.crypto ??= require("crypto").webcrypto;
const { LitNodeClient } = require('@lit-protocol/lit-node-client');
const { LitNetwork } = require('@lit-protocol/constants');
const fs = require('fs');
const { spawnSync } = require('child_process');

// Function to initialize LitNodeClient
const initializeLitClient = async () => {
  try {
    const litNodeClient = new LitNodeClient({
      litNetwork: LitNetwork.DatilDev,
      debug: true,
    });
    await litNodeClient.connect();
    console.log('Connected to Lit Network');
    return litNodeClient;
  } catch (error) {
    console.error('Failed to connect to Lit Network:', error);
    throw error;
  }
};

// Function to decrypt Lit-encrypted data
const decryptData = async (litNodeClient, accessControlConditions, ciphertext) => {
  try {
    const decryptedString = await litNodeClient.decryptAndCombine({
      accessControlConditions,
      ciphertext,
      authSig: null, // Placeholder for authSig, needs to be handled
      chain: 'ethereum',
    });
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    throw error;
  }
};

// Function to re-encrypt data using CKKS with TenSEAL
const reEncryptDataWithCKKS = (data) => {
  try {
    // Call a Python script that performs CKKS encryption using TenSEAL
    const pythonProcess = spawnSync('python3', ['reencrypt_ckks.py'], {
      input: JSON.stringify(data),
    });
    if (pythonProcess.error) {
      throw pythonProcess.error;
    }
    const output = pythonProcess.stdout.toString();
    return JSON.parse(output);
  } catch (error) {
    console.error('Failed to re-encrypt data with CKKS:', error);
    throw error;
  }
};

// Function to compute health score on CKKS-encrypted data
const computeHealthScore = (encryptedData, context) => {
  try {
    // Placeholder for computation logic
    console.log('Health score computation with encrypted data in progress...');

    // Example of homomorphic operations (e.g., summing encrypted vectors)
    const healthMetrics = [
      encryptedData.heart_rate,
      encryptedData.respiratory_rate,
      encryptedData.vo2_max,
      encryptedData.resting_heart_rate,
      encryptedData.active_energy_burned,
      encryptedData.bmi,
    ];

    // Simulate homomorphic addition of metrics (actual implementation would use TenSEAL in Python)
    const pythonProcess = spawnSync('python3', ['compute_health_score.py'], {
      input: JSON.stringify({ encrypted_data: healthMetrics, context }),
    });
    if (pythonProcess.error) {
      throw pythonProcess.error;
    }
    const healthScore = pythonProcess.stdout.toString();

    return healthScore;
  } catch (error) {
    console.error('Failed to compute health score:', error);
    throw error;
  }
};

// Main function to handle decryption, re-encryption, and computation
const processHealthData = async (ciphertext, accessControlConditions) => {
  try {
    // Step 1: Initialize Lit Client
    const litNodeClient = await initializeLitClient();

    // Step 2: Decrypt data using Lit Protocol (within SEV-SNP)
    const decryptedData = await decryptData(litNodeClient, accessControlConditions, ciphertext);

    // Step 3: Re-encrypt data with CKKS using TenSEAL
    const { encrypted_data: reEncryptedData, context } = reEncryptDataWithCKKS(decryptedData);

    // Step 4: Compute health score using re-encrypted data
    const healthScore = computeHealthScore(reEncryptedData, context);

    console.log('Health score:', healthScore);
  } catch (error) {
    console.error('Error in processing health data:', error);
  }
};

module.exports = { processHealthData };
