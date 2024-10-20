// compute_health_score.ts - A TypeScript script to perform homomorphic operations on CKKS-encrypted data using Lit Protocol compatible libraries

import * as ts from 'tenseal';
import * as readline from 'readline';

// Function to load and parse input data
const loadInputData = async (): Promise<any> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let inputData = '';
    for await (const line of rl) {
        inputData += line;
    }
    rl.close();

    try {
        return JSON.parse(inputData);
    } catch (e) {
        console.error(`Error loading input data: ${e}`);
        process.exit(1);
    }
};

// Function to perform homomorphic computation on CKKS-encrypted data
const computeHealthScore = (encryptedData: Array<any>, contextBytes: Uint8Array): number => {
    try {
        // Load the TenSEAL context
        const context = ts.Context.deserialize(contextBytes);

        // Deserialize encrypted vectors
        const encryptedVectors = encryptedData.map(encBytes => ts.ckksVectorFrom(context, encBytes));

        // Perform homomorphic addition of the encrypted vectors as a simple example
        // (This can be replaced with a more complex health score computation logic)
        let healthScore = encryptedVectors[0];
        for (let i = 1; i < encryptedVectors.length; i++) {
            healthScore = healthScore.add(encryptedVectors[i]);
        }

        return healthScore.decrypt();
    } catch (e) {
        console.error(`Error during homomorphic computation: ${e}`);
        process.exit(1);
    }
};

// Main function to run the computation
const main = async () => {
    // Load input data
    const inputData = await loadInputData();
    const encryptedData = inputData.encrypted_data;
    const contextBytes = inputData.context;

    // Perform homomorphic computation
    const healthScore = computeHealthScore(encryptedData, contextBytes);

    // Output the computed health score
    console.log(healthScore);
};

main();

export { computeHealthScore };
