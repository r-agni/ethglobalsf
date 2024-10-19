const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { LitNodeClient } = require('@lit-protocol/lit-node-client');
const { LitNetwork } = require('@lit-protocol/constants');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

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

const createAccessControlConditions = () => {
  return [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: 'eth_getBalance',
      parameters: [':userAddress', 'latest'],
      returnValueTest: {
        comparator: '>=',
        value: '1000000000000', // 0.000001 ETH
      },
    },
  ];
};

// API Endpoint to Encrypt Number
app.post('/encrypt', async (req, res) => {
  const { number } = req.body;

  if (number === undefined) {
    return res.status(400).json({ error: 'number is required' });
  }

  try {
    // Initialize Lit Client
    const litNodeClient = await initializeLitClient();

    // Create access control conditions
    const accessControlConditions = createAccessControlConditions();

    // Convert number to string and then to Uint8Array
    const dataToEncrypt = new TextEncoder().encode(number.toString());

    // Encrypt the number
    const { ciphertext, dataToEncryptHash } = await litNodeClient.encrypt({
      accessControlConditions,
      chain: 'ethereum',
      dataToEncrypt,
    });

    console.log('Number encrypted successfully');

    res.json({
      ciphertext: Buffer.from(ciphertext).toString('base64'),
      dataToEncryptHash: Buffer.from(dataToEncryptHash).toString('hex'),
    });
  } catch (error) {
    console.error('Failed to encrypt number:', error);
    res.status(500).json({ error: 'Failed to encrypt number' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
