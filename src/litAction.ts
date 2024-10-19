// @ts-nocheck

const _litActionCode = async () => {
  try {
    const decryptedJsonString = await Lit.Actions.decryptAndCombine({
      accessControlConditions,
      ciphertext,
      dataToEncryptHash,
      authSig: null,
      chain: "ethereum",
    });

    // Parse the decrypted JSON string back into an object
    const decryptedJson = JSON.parse(decryptedJsonString);

    // Return the entire decrypted JSON object
    Lit.Actions.setResponse({ response: JSON.stringify(decryptedJson) });
  } catch (e) {
    Lit.Actions.setResponse({ response: e.message });
  }
};

export const litActionCode = `(${_litActionCode.toString()})();`;