// test_decrypt.ts - Using Lit Protocol for decryption

import { LitNodeClientNodeJs as LitNodeClient } from '@lit-protocol/lit-node-client-nodejs';
import fs from 'fs';

// Initialize LitNodeClient
const litNodeClient = new LitNodeClient({ litNetwork: 'cayenne' });

// Mock session signature and access control conditions
const sessionSigs = {
  ethereum: {
    sig: 'MOCK_SIGNATURE',
    derivedVia: 'mock.sign',
    signedMessage: {
      version: '1',
      message: 'Mocked session signature for testing decryption.',
      capabilities: ['decrypt'],
      expiration: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    },
    address: '0xMOCK_WALLET_ADDRESS',
  },
};

// Mock access control conditions
const accessControlConditions = [
  {
    contractAddress: '',
    standardContractType: '',
    chain: 'ethereum',
    method: '',
    parameters: [':userAddress'],
    returnValueTest: {
      comparator: '=',
      value: '0xMOCK_WALLET_ADDRESS',
    },
  },
];

(async () => {
  try {
    console.log('Connecting to Lit Network...');
    await litNodeClient.connect();
    console.log('Connected to Lit Network');

    // Encrypted metrics from the provided example
    const encryptedMetrics = {
      heart_rate: "c3Z4QmhDb2ZMNjVqckZVSEpwaExHVlJ4R0RsOFE2cC9POTBEbmc0dWY4eCtObmU0YzRGZ00zVmlFN1M1K0dMenE0ek1wNHBIOHRvZDRWTGNyREplS2JEUFk4V3RVYmZZWS9aa0NLaVlVbzRnRXJPTG4zbko1d3RqR1A1QmxWYkU0N1JMcno4a05iVEtSaG9jS3JhSWJQRUM=",
      respiratory_rate: "czlmMEZ4V2JvTjM4NHl0SnZ0TVZJWGxCNzRzaDN1T0t4SGVsVVkzbXllSWdjQmVPcTNLTkxSM2JSQUVBUGRIUHpYamZXZTRGRjRqRC81UVVCRVBaSUN1ZTc3alJQeUNUSzU3b052UzdhU3dnTGRaTjcvNGRiNTJGN0gvVFYwQzd4YkJBV2NSb2dXTTdiNmcyenVtVnJOMEM=",
      vo2_max: "aFNVZ3dLTUFEUUlKMmMxcFNkdStRdGlzZWJyNGEwWmlvS095Tjc0Q1puU0hGZWJETDF0SFU5eHpWQjdsdFRXN1RaVFVxcVpkQzRqYURTM05hV0c2UDcrdllhU09VOGJadlZNOUZkY2M3QzhnUHpUa2I0dTR5RTF5UENiTGczdnhrNkFGZjZQT2xYem01Rmdidi8wQ1c4Y0M=",
      resting_heart_rate: "am50MTFNTXFpdEl3MStBZ09UblNFQjFmMEFxMTNUUTUxZ2dnUk9GVlpBTnpTOTRtbUdML0ZPMzlISHV4cDl2SU9PR2lwNXFSelFWbnllblBudlZoN0xVSzNIaS9Cd0FFNnNJNUdBRDYwYUlnQXBwbnN0Z3ZIb2U1QmRiZDRRakFlblpXV1VGaEhxZnJVdyt4MDBqTWZTZ0M=",
      active_energy_burned: "a2oyclRUN042Uk12NXQ4Q1dLSmFXTGQ1eEdEcjdKd1BDWFhzcGV0aEhNMDZzN29sVzIza2NvZEVhdGloSGdrYlBFZzBya1pWaGV4QnRBaUJmL1BWTVNaRnZBRmpKb2ZxMzhGbGxJSVcweE1nTC9hbmtYK3FLRjlkeTIzRnVFbWJBUFVaUG9zYmpNUmR5OWF4c2hCbzIrSUM="
    };

    // Use Lit Protocol to decrypt data using executeJs
    for (const [metric, ciphertext] of Object.entries(encryptedMetrics)) {
      let decryptedContent;
      try {
        const jsParams = {
          toDecrypt: ciphertext,
          accessControlConditions,
          chain: 'ethereum',
          authSig: sessionSigs.ethereum,
        };

        decryptedContent = await litNodeClient.executeJs({
          code: `
            const result = LitActions.decryptString({ toDecrypt, accessControlConditions, chain, authSig });
            LitActions.returnValue = result;
          `,
          jsParams,
          sessionSigs,
        });

        console.log(`Decrypted ${metric}:`, decryptedContent);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error during decryption of ${metric}:`, error.message);
        } else {
          console.error(`Error during decryption of ${metric}:`, error);
        }
        throw error;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Decryption Test Failed:', error.message);
    } else {
      console.error('Decryption Test Failed:', error);
    }
  }
})();

// Example of simplified JSON validation function
const validateJsonString = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Invalid JSON format detected:', error.message);
    } else {
      console.error('Invalid JSON format detected:', error);
    }
    throw error;
  }
};

// Removed reading session key from file to simplify testing
// Example usage of validateJsonString to ensure safe parsing
let sessionKey;
try {
  sessionKey = '{"mockKey": "mockValue"}'; // Mocked session key for testing
  sessionKey = validateJsonString(sessionKey);
  console.log('Session key loaded successfully (mocked):', sessionKey);
} catch (error) {
  if (error instanceof Error) {
    console.error('Error parsing session key:', error.message);
  } else {
    console.error('Error parsing session key:', error);
  }
}
