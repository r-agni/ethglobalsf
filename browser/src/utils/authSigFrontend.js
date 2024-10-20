// authSigFrontend.js - A front-end script to handle wallet connection, signature generation, and sending authSig to the backend

import { ethers } from 'ethers';

// Function to connect to MetaMask and get the user's wallet address
const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed. Please install it to use this feature.');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log('Connected wallet address:', address);
    return { provider, signer, address };
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
};

// Function to generate authentication signature using MetaMask
const generateAuthSignature = async (signer) => {
  try {
    const message = 'Please sign this message to authenticate with the Lit Protocol.';
    const signedMessage = await signer.signMessage(message);

    const authSig = {
      sig: signedMessage,
      derivedVia: 'web3.eth.personal.sign',
      signedMessage: message,
      address: await signer.getAddress(),
    };

    console.log('Generated authSig:', authSig);
    return authSig;
  } catch (error) {
    console.error('Failed to generate auth signature:', error);
    throw error;
  }
};

// Function to send authSig to the backend
const sendAuthSigToBackend = async (authSig) => {
  try {
    const response = await fetch('http://localhost:3000/api/processHealthData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authSig }),
    });

    if (!response.ok) {
      throw new Error('Failed to send authSig to backend');
    }

    const result = await response.json();
    console.log('Backend response:', result);
  } catch (error) {
    console.error('Error sending authSig to backend:', error);
  }
};

// Example usage of the wallet connection, signature generation, and sending authSig
(async () => {
  try {
    // Step 1: Connect to the wallet
    const { signer } = await connectWallet();

    // Step 2: Generate the authentication signature
    const authSig = await generateAuthSignature(signer);

    // Step 3: Send authSig to the backend
    await sendAuthSigToBackend(authSig);
  } catch (error) {
    console.error('Error during wallet connection or signature generation:', error);
  }
})();
