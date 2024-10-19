const code = `
(async () => {
  // Decrypt health metrics inside the TEE using Lit Protocol's decryptAndCombine
  const decryptedHeartRate = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: encryptedHeartRate,
    chain: 'ethereum',
  });

  const decryptedRespiratoryRate = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: encryptedRespiratoryRate,
    chain: 'ethereum',
  });

  const decryptedBMI = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: encryptedBMI,
    chain: 'ethereum',
  });

  const decryptedVO2Max = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: encryptedVO2Max,
    chain: 'ethereum',
  });

  const decryptedRestingHeartRate = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: encryptedRestingHeartRate,
    chain: 'ethereum',
  });

  const decryptedActiveEnergyBurned = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: encryptedActiveEnergyBurned,
    chain: 'ethereum',
  });

  // Create a CKKS encryption context for HE
  const context = ts.context(ts.SCHEME_TYPE.CKKS, poly_modulus_degree=8192, coeff_mod_bit_sizes=[40, 21, 21, 21]);
  context.generate_galois_keys();

  // Re-encrypt the decrypted values using CKKS for homomorphic encryption
  const heEncryptedHeartRate = ts.ckks_vector(context, [decryptedHeartRate]);
  const heEncryptedRespiratoryRate = ts.ckks_vector(context, [decryptedRespiratoryRate]);
  const heEncryptedBMI = ts.ckks_vector(context, [decryptedBMI]);
  const heEncryptedVO2Max = ts.ckks_vector(context, [decryptedVO2Max]);
  const heEncryptedRestingHeartRate = ts.ckks_vector(context, [decryptedRestingHeartRate]);
  const heEncryptedActiveEnergyBurned = ts.ckks_vector(context, [decryptedActiveEnergyBurned]);

  // Perform the health score computation using CKKS-encrypted values
  const heartRateWeight = 0.2;
  const respiratoryRateWeight = 0.1;
  const bmiWeight = 0.25;
  const vo2MaxWeight = 0.2;
  const restingHeartRateWeight = 0.1;
  const activeEnergyBurnedWeight = 0.15;

  // Compute the weighted sum for the health score
  const heEncryptedHealthScore = (
    heEncryptedHeartRate * heartRateWeight +
    heEncryptedRespiratoryRate * respiratoryRateWeight +
    heEncryptedBMI * bmiWeight +
    heEncryptedVO2Max * vo2MaxWeight +
    heEncryptedRestingHeartRate * restingHeartRateWeight +
    heEncryptedActiveEnergyBurned * activeEnergyBurnedWeight
  );

  // Encrypt the computed health score and return it securely
  const encryptedHealthScore = await Lit.Actions.encryptString({
    accessControlConditions,
    chain: 'ethereum',
    dataToEncrypt: String(heEncryptedHealthScore),
  });

  // Return the encrypted health score
  Lit.Actions.setResponse({ response: encryptedHealthScore });
})();
`;

// Execute the Lit Action by passing encrypted health data
const litActionResponse = await client.executeJs({
  code,
  sessionSigs: {},  // Your session signature
  jsParams: {
    encryptedHeartRate,
    encryptedRespiratoryRate,
    encryptedBMI,
    encryptedVO2Max,
    encryptedRestingHeartRate,
    encryptedActiveEnergyBurned,
  },
});

console.log('Encrypted health score:', litActionResponse.response);
