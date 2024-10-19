const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { LitNodeClient } = require('@lit-protocol/lit-node-client');
const { LitNetwork, LIT_RPC } = require('@lit-protocol/constants');
const { 
  LitAbility, 
  LitActionResource, 
  createSiweMessage, 
  generateAuthSig 
} = require('@lit-protocol/auth-helpers');
const ethers = require('ethers');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const initializeWallet = () => {
  try {
    const privateKey = process.env.ETHEREUM_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('ETHEREUM_PRIVATE_KEY is not set in environment variables');
    }

    const provider = new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE);
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`Wallet initialized with address: ${wallet.address}`);
    return wallet;
  } catch (error) {
    console.error('Failed to initialize wallet:', error);
    throw error;
  }
};

const initializeLitClient = async () => {
  try {
    const litNodeClient = new LitNodeClient({
      litNetwork: LitNetwork.DatilDev, // Use DatilDev for development
      debug: true, // Enable debug for more detailed logs
    });

    await litNodeClient.connect();
    console.log('Connected to Lit Network');
    return litNodeClient;
  } catch (error) {
    console.error('Failed to connect to Lit Network:', error);
    throw error;
  }
};

const defineLitAction = () => {
  const _litActionCode = async () => {
    if (magicNumber >= 42) {
      LitActions.setResponse({ response: "The number is greater than or equal to 42!" });
    } else {
      LitActions.setResponse({ response: "The number is less than 42!" });
    }
  };

  const litActionCode = `(${_litActionCode.toString()})();`;
  return litActionCode;
};

// API Endpoint to Execute Lit Action
app.post('/execute', async (req, res) => {
  const { magicNumber } = req.body;

  if (magicNumber === undefined) {
    return res.status(400).json({ error: 'magicNumber is required' });
  }

  try {
    // Initialize Lit Client and Wallet
    const litNodeClient = await initializeLitClient();
    const ethersWallet = initializeWallet();

    // Generate Session Signatures
    const sessionSignatures = await litNodeClient.getSessionSigs({
      chain: 'ethereum',
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes from now
      resourceAbilityRequests: [
        {
          resource: new LitActionResource('*'), // Request access to all resources
          ability: LitAbility.LitActionExecution, // Ability to execute Lit Actions
        },
      ],
      authNeededCallback: async ({ uri, expiration, resourceAbilityRequests }) => {
        const siweMessage = await createSiweMessage({
          uri,
          expiration,
          resources: resourceAbilityRequests,
          walletAddress: await ethersWallet.getAddress(),
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });

        const authSig = await generateAuthSig({
          signer: ethersWallet,
          toSign: siweMessage,
        });

        return authSig;
      },
    });

    // Define Lit Action Code
    const litActionCode = defineLitAction();

    // Execute Lit Action
    const response = await litNodeClient.executeJs({
      sessionSigs: sessionSignatures,
      code: litActionCode,
      jsParams: {
        magicNumber: parseInt(magicNumber, 10), // Ensure it's a number
      },
    });

    console.log('Lit Action executed successfully:', response);

    res.json({ response: response.response });
  } catch (error) {
    console.error('Failed to execute Lit Action:', error);
    res.status(500).json({ error: 'Failed to execute Lit Action' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
