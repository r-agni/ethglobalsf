import { expect, use } from "chai";
import chaiJsonSchema from "chai-json-schema";

use(chaiJsonSchema);

import { encryptJsonFile } from "../src/index.js";

describe("encryptJsonFile", () => {
  it("should encrypt JSON file successfully and print decrypted content", async () => {
    const testJson = {
      key1: "value1",
      key2: "value2",
      nestedObject: {
        nestedKey: "nestedValue"
      }
    };

    const result = await encryptJsonFile(testJson);

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
    const decryptedJson = JSON.parse(result.litActionSignatures.response);
    console.log("Decrypted JSON:");
    console.log(JSON.stringify(decryptedJson, null, 2));

    // Additional check to ensure the decrypted JSON matches the original
    expect(decryptedJson).to.deep.equal(testJson);

  }).timeout(100_000);
});