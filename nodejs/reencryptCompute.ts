// reencryptCompute.ts - A TypeScript script to re-encrypt data using CKKS and perform homomorphic computation

import * as tfjs from '@tensorflow/tfjs';
import { CKKSContext, CKKSEncoder, CKKSPlaintext, CKKSVector } from 'ckks-lib';

// Function to re-encrypt data using CKKS
export const reEncryptDataWithCKKS = async (data: Record<string, number[]>) => {
  try {
    // Create CKKS context for homomorphic encryption
    const context = new CKKSContext({
      polyModulusDegree: 8192,
      coeffModulusBitSizes: [60, 40, 40, 60],
    });
    const encoder = new CKKSEncoder(context);

    // Encrypt each metric using CKKS
    const encryptedData: Record<string, CKKSVector> = {};
    for (const [key, values] of Object.entries(data)) {
      const plaintext: CKKSPlaintext = encoder.encode(values);
      const ciphertext = context.encrypt(plaintext);
      encryptedData[key] = ciphertext;
    }

    return { encryptedData, context };
  } catch (error) {
    console.error('Failed to re-encrypt data with CKKS:', error);
    throw error;
  }
};

// Function to compute health score on CKKS-encrypted data
export const computeHealthScore = async (
  encryptedData: Record<string, CKKSVector>,
  context: CKKSContext
) => {
  try {
    console.log('Health score computation with encrypted data in progress...');

    // Perform homomorphic addition of the encrypted vectors as a simple example
    const metrics = Object.values(encryptedData);
    let healthScore = metrics[0];
    for (let i = 1; i < metrics.length; i++) {
      healthScore = healthScore.add(metrics[i]);
    }

    // Decrypt the health score for final output
    const plaintextScore = context.decrypt(healthScore);
    const decodedScore = context.decode(plaintextScore);

    return decodedScore;
  } catch (error) {
    console.error('Failed to compute health score:', error);
    throw error;
  }
};

// Example usage of the CKKS re-encryption and computation
(async () => {
  try {
    const sampleData = {
      heart_rate: [72, 75, 70],
      respiratory_rate: [16, 15, 17],
      vo2_max: [40, 42, 38],
      resting_heart_rate: [60, 62, 58],
      active_energy_burned: [500, 520, 510],
      bmi: [22, 23, 21],
    };

    // Step 1: Re-encrypt data using CKKS
    const { encryptedData, context } = await reEncryptDataWithCKKS(sampleData);

    // Step 2: Compute health score
    const healthScore = await computeHealthScore(encryptedData, context);

    console.log('Health score:', healthScore);
  } catch (error) {
    console.error('Error during CKKS re-encryption or health score computation:', error);
  }
})();
