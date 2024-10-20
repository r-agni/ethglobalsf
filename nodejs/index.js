globalThis.crypto ??= require("crypto").webcrypto;
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { LitNodeClient } = require('@lit-protocol/lit-node-client');
const { LitNetwork } = require('@lit-protocol/constants');
const fs = require('fs');
const csvParser = require('csv-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5555;

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

// Function to extract and process data from CSV
const extractAndProcessData = async (filePath) => {
  return new Promise((resolve, reject) => {
    const metrics = {
      heart_rate: [],
      respiratory_rate: [],
      vo2_max: [],
      resting_heart_rate: [],
      active_energy_burned: [],
    };

    let bmi, body_mass, height;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        switch (row['Metric']) {
          case 'HKQuantityTypeIdentifierHeartRate':
            metrics.heart_rate.push(row['Value']);
            break;
          case 'HKQuantityTypeIdentifierRespiratoryRate':
            metrics.respiratory_rate.push(row['Value']);
            break;
          case 'HKQuantityTypeIdentifierVO2Max':
            metrics.vo2_max.push(row['Value']);
            break;
          case 'HKQuantityTypeIdentifierRestingHeartRate':
            metrics.resting_heart_rate.push(row['Value']);
            break;
          case 'HKQuantityTypeIdentifierActiveEnergyBurned':
            metrics.active_energy_burned.push(row['Value']);
            break;
          case 'HKQuantityTypeIdentifierBodyMass':
            body_mass = row['Value'];
            break;
          case 'HKQuantityTypeIdentifierHeight':
            height = row['Value'];
            break;
        }
      })
      .on('end', () => {
        // Calculate BMI once all data is loaded
        if (body_mass && height) {
          bmi = body_mass / ((height / 100) ** 2); // Assuming height is in cm
        }
        resolve({ metrics, bmi, body_mass, height });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// API Endpoint to Encrypt Health Data
app.post('/encrypt-health-data', async (req, res) => {
  const { csvFilePath } = req.body;

  if (!csvFilePath) {
    return res.status(400).json({ error: 'CSV file path is required' });
  }

  try {
    // Initialize Lit Client
    const litNodeClient = await initializeLitClient();

    // Extract and process the CSV data
    const { metrics, bmi, body_mass, height } = await extractAndProcessData(csvFilePath);

    // Create access control conditions
    const accessControlConditions = createAccessControlConditions();

    // Encrypt each metric in the dictionary
    const encryptedMetrics = {};

    const encryptMetric = async (values, metricName) => {
      const dataToEncrypt = new TextEncoder().encode(JSON.stringify(values));
      const { ciphertext } = await litNodeClient.encrypt({
        accessControlConditions,
        chain: 'ethereum',
        dataToEncrypt,
      });
      return Buffer.from(ciphertext).toString('base64');
    };

    // Encrypt all metrics including BMI, body mass, and height
    if (bmi) encryptedMetrics['bmi'] = await encryptMetric([bmi], 'bmi');
    if (body_mass) encryptedMetrics['body_mass'] = await encryptMetric([body_mass], 'body_mass');
    if (height) encryptedMetrics['height'] = await encryptMetric([height], 'height');

    for (const [metric, values] of Object.entries(metrics)) {
      encryptedMetrics[metric] = await encryptMetric(values, metric);
    }

    console.log('Health data encrypted successfully');

    res.json({ encryptedMetrics });
  } catch (error) {
    console.error('Failed to encrypt health data:', error);
    res.status(500).json({ error: 'Encryption failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});