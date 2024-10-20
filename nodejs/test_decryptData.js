// test_decryptData.js - Modified for debugging JSON parsing errors

const { LitNodeClientNodeJs } = require('@lit-protocol/lit-node-client-nodejs');
const fs = require('fs');

const authSig = {
    sig: 'VALID_SIGNATURE_STRING',
    derivedVia: 'web3.eth.personal.sign',
    signedMessage: JSON.stringify({
      version: '1',
      timestamp: new Date().toISOString(),
      message: 'Please sign this message to authenticate with the Lit Protocol for encryption/decryption.',
      capabilities: ['decrypt'], // Adding capabilities
      expiration: new Date(Date.now() + 3600000).toISOString(), // Adding expiration time, valid for 1 hour
    }),
    address: '0xYOUR_WALLET_ADDRESS',
  };

const litNodeClient = new LitNodeClientNodeJs({
  litNetwork: 'cayenne', // Specify the Lit network to connect to
  debug: true, // Enable debugging for more verbose output
});

(async () => {
  try {
    await litNodeClient.connect();
    console.log('Connected to Lit Network');

    // Generate session signatures
    let sessionSigs;
    try {
      sessionSigs = {
        ethereum: {
          sig: 'VALID_SIGNATURE_STRING', // This should be a mocked signature for testing
          derivedVia: 'web3.eth.personal.sign',
          signedMessage: JSON.stringify({
            version: '1',
            timestamp: new Date().toISOString(),
            message: 'Session signature for accessing Lit Protocol node.',
            capabilities: ['decrypt'],
            expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          }),
          address: '0xYOUR_WALLET_ADDRESS',
        },
      };
      console.log('Session signatures generated successfully:', sessionSigs);
    } catch (error) {
      console.error('Failed to generate session signatures:', error.message);
      throw error;
    }

    // Ensure required variables are defined
    const accessControlConditions = {}; // Replace with appropriate conditions
    const ciphertext = 'YOUR_CIPHERTEXT';
    const dataToEncryptHash = 'YOUR_DATA_HASH';

    if (!ciphertext || !dataToEncryptHash) {
      throw new Error('Missing required data for decryption.');
    }

    console.log('Attempting to decrypt with the following parameters:');
    console.log('Access Control Conditions:', accessControlConditions);
    console.log('Ciphertext:', ciphertext);
    console.log('Data Hash:', dataToEncryptHash);

    // Use the session signatures to decrypt data
    const code = `(async () => {
      const resp = await Lit.Actions.decryptAndCombine({
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        sessionSig: sessionSigs.ethereum.sig, // Use session signature
        chain: 'ethereum',
      });

      Lit.Actions.setResponse({ response: resp });
    })();`;

    try {
      const res = await litNodeClient.executeJs({
        code,
        sessionSigs, // Provide the session signatures here to use instead of authSig
        jsParams: {
          accessControlConditions,
          ciphertext,
          dataToEncryptHash,
        },
      });
      console.log('Decrypted content from Lit Action:', res);
    } catch (error) {
      console.error('Error during decryption:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Decryption Test Failed:', error);
  }
})();  

// Add additional checks to ensure session key storage and retrieval are handled properly
const validateJsonString = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Invalid JSON format detected:', error.message);
    throw error;
  }
};

// Example usage of validateJsonString to ensure safe parsing
let sessionKey;
try {
  sessionKey = fs.readFileSync('path/to/sessionKey.json', 'utf-8');
  sessionKey = validateJsonString(sessionKey);
  console.log('Session key loaded successfully:', sessionKey);
} catch (error) {
  console.error('Error reading or parsing session key:', error.message);
}
