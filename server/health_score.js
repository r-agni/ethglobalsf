const code = `
(async () => {
  // Decrypt health metrics inside the TEE using Lit Protocol's decryptAndCombine
  const decryptedHeartRates = await Lit.Actions.decryptAndCombine({
    accessControlConditions,
    ciphertext: encryptedHeartRate,
    chain: 'ethereum',
  });

  const decryptedRespiratoryRates = await Lit.Actions.decryptAndCombine({
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

  const decryptedRestingHeartRates = await Lit.Actions.decryptAndCombine({
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

  // Convert the decrypted lists of values into HE-encrypted CKKS vectors
  const heEncryptedHeartRates = ts.ckks_vector(context, decryptedHeartRates);
  const heEncryptedRespiratoryRates = ts.ckks_vector(context, decryptedRespiratoryRates);
  const heEncryptedBMI = ts.ckks_vector(context, [decryptedBMI]);
  const heEncryptedVO2Max = ts.ckks_vector(context, [decryptedVO2Max]);
  const heEncryptedRestingHeartRates = ts.ckks_vector(context, decryptedRestingHeartRates);
  const heEncryptedActiveEnergyBurned = ts.ckks_vector(context, [decryptedActiveEnergyBurned]);

  // Perform the health score computation using CKKS-encrypted values

  // Define the weights for each metric
  const heartRateWeight = 0.2;
  const respiratoryRateWeight = 0.1;
  const bmiWeight = 0.25;
  const vo2MaxWeight = 0.2;
  const restingHeartRateWeight = 0.1;
  const activeEnergyBurnedWeight = 0.15;

  // Calculate the norm or average for the time-series metrics like heart rate and respiratory rate
  const heartRateAverage = heEncryptedHeartRates.reduce((a, b) => a + b) / heEncryptedHeartRates.length;
  const respiratoryRateAverage = heEncryptedRespiratoryRates.reduce((a, b) => a + b) / heEncryptedRespiratoryRates.length;
  const restingHeartRateAverage = heEncryptedRestingHeartRates.reduce((a, b) => a + b) / heEncryptedRestingHeartRates.length;

  // Compute the weighted sum for the final encrypted health score using CKKS vectors
  const heEncryptedHealthScore = (
    heartRateAverage * heartRateWeight +
    respiratoryRateAverage * respiratoryRateWeight +
    heEncryptedBMI * bmiWeight +
    heEncryptedVO2Max * vo2MaxWeight +
    restingHeartRateAverage * restingHeartRateWeight +
    heEncryptedActiveEnergyBurned * activeEnergyBurnedWeight
  );

  // Encrypt the computed health score and return it securely using Lit Protocol
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
