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

    const decryptedJson = JSON.parse(decryptedJsonString);
    const { privateKey, rpcUrl, recipient, heartRate, steps, calories, activeTime, sleepTime, bloodOxygen, bloodPressure } = decryptedJson;

    // Sum all numeric values in the decrypted JSON
    const total = heartRate + steps + calories + activeTime + sleepTime + bloodOxygen + bloodPressure;

    // Use ethers.js v5 syntax for provider
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const USDC_ABI = [
      'function transfer(address to, uint256 amount) public returns (bool)',
      'function decimals() view returns (uint8)',
    ];
    const USDC_CONTRACT_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

    const usdcContract = new ethers.Contract(
      USDC_CONTRACT_ADDRESS,
      USDC_ABI,
      wallet
    );

    const decimals = await usdcContract.decimals();

    const amountInUnits = '1';
    const amountInWei = ethers.utils.parseUnits(amountInUnits, decimals);

    let res = await Lit.Actions.runOnce({ waitForResponse: true, name: "txnSender" }, async () => {
        const txResponse = await usdcContract.transfer(
          recipient,
          amountInWei
        );
        
        await txResponse.wait();
        return 'Transaction successful';
    });

    // Return both transaction response and the sum of the values
    Lit.Actions.setResponse({
      response: `1) Transaction successful. 2) Health Score: ${total%10} 3) Insurance Rebate: ${total * 0.01} 4) Salus Pool: ${total * 0.05}`
    });
    
  } catch (e) {
    Lit.Actions.setResponse({ response: e.message });
  }
}

export const litActionCode = `(${_litActionCode.toString()})();`;
