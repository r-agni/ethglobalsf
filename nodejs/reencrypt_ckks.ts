// reencrypt_ckks.ts - A TypeScript script to re-encrypt data using CKKS (HE) with TenSEAL

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

// Function to perform CKKS encryption using TenSEAL
const ckksEncrypt = (data: Record<string, number[]>): { encryptedData: Record<string, any>, context: any } => {
    try {
        // Create a TenSEAL context for CKKS
        const context = ts.context(
            ts.SCHEME_TYPE.CKKS,
            8192, // poly_modulus_degree
            [60, 40, 40, 60] // coeff_mod_bit_sizes
        );
        context.global_scale = Math.pow(2, 40);
        context.generate_galois_keys();

        // Encrypt each metric using CKKS
        const encryptedData = Object.keys(data).reduce((acc, metric) => {
            acc[metric] = ts.ckksVector(context, data[metric]);
            return acc;
        }, {} as Record<string, any>);

        return { encryptedData, context };
    } catch (e) {
        console.error(`Error during CKKS encryption: ${e}`);
        process.exit(1);
    }
};

// Function to serialize encrypted data
const serializeEncryptedData = (encryptedData: Record<string, any>, context: any): any => {
    try {
        const serializedData = Object.keys(encryptedData).reduce((acc, metric) => {
            acc[metric] = encryptedData[metric].serialize();
            return acc;
        }, {} as Record<string, any>);

        const serializedContext = context.serialize();
        return {
            encrypted_data: serializedData,
            context: serializedContext
        };
    } catch (e) {
        console.error(`Error serializing encrypted data: ${e}`);
        process.exit(1);
    }
};

// Main function to run the re-encryption process
const main = async () => {
    // Load input data
    const data = await loadInputData();

    // Perform CKKS encryption
    const { encryptedData, context } = ckksEncrypt(data);

    // Serialize encrypted data and context
    const serializedOutput = serializeEncryptedData(encryptedData, context);

    // Output the serialized encrypted data
    console.log(JSON.stringify(serializedOutput));
};

main();

export { ckksEncrypt };
