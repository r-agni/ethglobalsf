// decrypt_compute.js - A separate module for decryption, re-encryption, and computation
globalThis.crypto ??= require("crypto").webcrypto;
const { LitNodeClient } = require('@lit-protocol/lit-node-client');
const { LitNetwork } = require('@lit-protocol/constants');
const fs = require('fs');
const { reEncryptDataWithCKKS, computeHealthScore } = require('./utils/reencryptCompute');

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
const decryptData = async (litNodeClient, accessControlConditions, ciphertext, authSig) => {
  try {
    const decryptedString = await litNodeClient.decryptAndCombine({
      accessControlConditions,
      ciphertext,
      authSig, // Use the provided authSig
      chain: 'ethereum',
    });
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Failed to decrypt data:', error);
    throw error;
  }
};

// Main function to handle decryption, re-encryption, and computation
const processHealthData = async (ciphertext, accessControlConditions, authSig) => {
  try {
    // Step 1: Initialize Lit Client
    const litNodeClient = await initializeLitClient();

    // Step 2: Decrypt data using Lit Protocol (within SEV-SNP)
    const decryptedData = await decryptData(litNodeClient, accessControlConditions, ciphertext, authSig);

    // Step 3: Re-encrypt data with CKKS using TypeScript implementation
    const { encryptedData: reEncryptedData, context } = await reEncryptDataWithCKKS(decryptedData);

    // Step 4: Compute health score using re-encrypted data
    const healthScore = await computeHealthScore(reEncryptedData, context);

    console.log('Health score:', healthScore);
  } catch (error) {
    console.error('Error in processing health data:', error);
  }
};

// Execute the main function for testing
(async () => {
  const ciphertext = 'sampleCiphertextDataHere'; // Replace with actual data
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: 'eth_getBalance',
      parameters: [':userAddress'],
      returnValueTest: {
        comparator: '>=',
        value: '0',
      },
    },
  ];

  const authSig = {
    sig: 'sampleSignature', // Replace with actual authSig
    derivedVia: 'web3.eth.personal.sign',
    signedMessage: 'Please sign this message to authenticate with the Lit Protocol.',
    address: 'userAddressHere', // Replace with the actual user address
  };

  await processHealthData(ciphertext, accessControlConditions, authSig);
})();

module.exports = { processHealthData };
