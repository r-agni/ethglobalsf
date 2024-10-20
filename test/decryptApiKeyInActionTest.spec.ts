import { expect, use } from "chai";
import chaiJsonSchema from "chai-json-schema";

use(chaiJsonSchema);

import { encryptJsonFile } from "../src/index.js";

describe("encryptJsonFile", () => {
  it("should encrypt JSON file successfully and print decrypted content", async () => {
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
    const NETWORK = process.env.NETWORK || 'mainnet';
    const RPC_URL = `https://${NETWORK}.infura.io/v3/${INFURA_PROJECT_ID}`;
    const RECIPIENT = '0x527D9D002f2b02504afF008e54d662cdF8424Ddf';

    const testJson = {
      privateKey: PRIVATE_KEY,
      rpcUrl: RPC_URL,
      recipient: RECIPIENT,
      "heartRate": 95,
      "steps": 2000,
      "calories": 3500,
      "activeTime": 30,
      "sleepTime": 4,
      "bloodOxygen": 90,
      "bloodPressure": 140
    };


    let result;
    try {
      result = await encryptJsonFile(testJson);
    } catch (error) {
      console.error('Error from encryptJsonFile:', error);
      throw error; // Re-throw to fail the test
    }
    console.log(result);
    const expectedSchema = {
      type: "object",
      required: ["ciphertext", "dataToEncryptHash", "litActionSignatures"],
      properties: {
        ciphertext: { type: "string" },
        dataToEncryptHash: { type: "string" },
        litActionSignatures: {
          type: "object",
          required: ["success", "signedData", "decryptedData", "claimData", "response"],
          properties: {
            success: { type: "boolean" },
            signedData: { type: "object" },
            decryptedData: { type: "object" },
            claimData: { type: "object" },
            response: { type: "string" },
            logs: { type: ["undefined", "array"] },
          }
        }
      }
    };
    

    expect(result).to.be.jsonSchema(expectedSchema);

    // Parse and print the decrypted JSON
    const response = typeof result?.litActionSignatures?.response === 'string' 
      ? result.litActionSignatures.response 
      : JSON.stringify(result?.litActionSignatures?.response);
    const decryptedJson = JSON.parse(response);
    console.log("Decrypted JSON:");
    console.log(JSON.stringify(decryptedJson, null, 2));

    // Additional check to ensure the decrypted JSON matches the original
    expect(decryptedJson).to.deep.equal(testJson);

  }).timeout(100_000);
});