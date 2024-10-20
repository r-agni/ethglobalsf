// walletIntegration.js - Wallet Integration for MetaMask using ethers.js

const { ethers } = require('ethers');

// Function to connect to MetaMask wallet and retrieve wallet address
async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed. Please install MetaMask to proceed.');
  }

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    console.log('Connected wallet address:', walletAddress);
    return { provider, signer, walletAddress };
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
}

// Function to prompt user for a signature and generate an authSig for Lit Protocol
async function generateAuthSignature(message) {
  try {
    const { signer, walletAddress } = await connectWallet();
    const signature = await signer.signMessage(message);
    const authSig = {
      sig: signature,
      derivedVia: 'web3.eth.personal.sign',
      signedMessage: message,
      address: walletAddress,
    };
    console.log('Generated authSig:', authSig);
    return authSig;
  } catch (error) {
    console.error('Failed to generate authentication signature:', error);
    throw error;
  }
}

module.exports = {
  connectWallet,
  generateAuthSignature,
};
