// @ts-nocheck
const _litActionCode = async () => {
  try {
    const decryptedJsonString = await Lit.Actions.decryptAndCombine({
      accessControlConditions,
      ciphertext,
      dataToEncryptHash,
      authSig: null,
      chain: 'ethereum',
    });

    const decryptedJson = JSON.parse(decryptedJsonString);
    const { privateKey, rpcUrl, recipient } = decryptedJson;

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const USDC_ABI = [
      'function transfer(address to, uint256 amount) public returns (bool)',
      'function decimals() view returns (uint8)',
    ];
    const USDC_CONTRACT_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

    const usdcContract = new ethers.Contract(USDC_CONTRACT_ADDRESS, USDC_ABI, wallet);

    const decimals = await usdcContract.decimals();
    const amountInUnits = '1';
    const amountInWei = ethers.utils.parseUnits(amountInUnits, decimals);

    const txResponse = await usdcContract.transfer(recipient, amountInWei);
    await txResponse.wait();

    Lit.Actions.setResponse({ response: 'Transaction successful', txHash: txResponse.hash });
  } catch (e) {
    Lit.Actions.setResponse({ response: e.message });
  }
};

export const litActionCode = `(${_litActionCode.toString()})();`;
