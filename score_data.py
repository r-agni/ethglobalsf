import tenseal as ts

health_data = 'export.csv'

# Extract health info from database TODO
heart_rate = 0
respiratory_rate = 0
wrist_temp = 0
sleep_duration = 0

# Lit Encryption Output (placeholder)
encrypted_heart_rate = "LitProtocol_encrypted_heart_rate"
encrypted_respiratory_rate = "LitProtocol_encrypted_respiratory_rate"
encrypted_bmi = "LitProtocol_encrypted_bmi"
encrypted_vo2_max = "LitProtocol_encrypted_vo2_max"
encrypted_sleep_duration = "LitProtocol_encrypted_sleep_duration"
encrypted_resting_heart_rate = "LitProtocol_encrypted_resting_heart_rate"
encrypted_active_energy_burned = "LitProtocol_encrypted_active_energy_burned"

def decrypt_and_re_encrypt_in_tee(lit_encrypted_data, context):
    """
    Simulate decryption of Lit-encrypted data in the TEE environment, and then re-encrypt it
    using the CKKS Homomorphic Encryption scheme for secure computation.
    """
    # Simulate Lit Protocol TEE decryption using decryptAndCombine (this will be done inside the Lit TEE)
    decrypted_data = decryptAndCombine(lit_encrypted_data)  # Inside the TEE

    # Re-encrypt the plaintext data into CKKS format for HE computations
    he_encrypted_data = ts.ckks_vector(context, [decrypted_data])  # Re-encrypt using CKKS for HE
    return he_encrypted_data

""" Create a health score based on the normalized values of heart rate, respiratory rate, 
wrist temperature, and sleep duration. The score is a weighted sum of these encrypted metrics. """
def score_data(he_encrypted_heart_rate, he_encrypted_respiratory_rate, he_encrypted_bmi, 
               he_encrypted_vo2_max, he_encrypted_sleep_duration, he_encrypted_resting_heart_rate, he_encrypted_active_energy_burned):
    """ Homomorphic Encryption: TenSEAL (CKKS encryption scheme) [high overhead] """
    
    # Define the weights for each metric
    heart_rate_weight = 0.2  # Heart rate is important but less than BMI and VO2 max
    respiratory_rate_weight = 0.1  # Respiratory rate is less critical but still important
    bmi_weight = 0.25  # BMI is a major health risk predictor
    vo2_max_weight = 0.2  # VO2 max is critical for fitness and longevity
    sleep_duration_weight = 0.1  # Sleep duration affects recovery and health
    resting_heart_rate_weight = 0.1  # Resting heart rate is a strong predictor of cardiovascular health
    active_energy_burned_weight = 0.05  # Active energy burned reflects physical activity level

    # Compute weighted sum on encrypted data
    encrypted_health_score = (
        he_encrypted_heart_rate * heart_rate_weight +
        he_encrypted_respiratory_rate * respiratory_rate_weight +
        he_encrypted_bmi * bmi_weight +
        he_encrypted_vo2_max * vo2_max_weight +
        he_encrypted_sleep_duration * sleep_duration_weight +
        he_encrypted_resting_heart_rate * resting_heart_rate_weight +
        he_encrypted_active_energy_burned * active_energy_burned_weight
    )

    return encrypted_health_score

# Create encryption context
context = ts.context(ts.SCHEME_TYPE.CKKS, poly_modulus_degree=8192, coeff_mod_bit_sizes=[40, 21, 21, 21])
context.generate_galois_keys()

# Simulate decryption inside the TEE and re-encryption to CKKS for homomorphic computation
he_encrypted_heart_rate = decrypt_and_re_encrypt_in_tee(encrypted_heart_rate, context)
he_encrypted_respiratory_rate = decrypt_and_re_encrypt_in_tee(encrypted_respiratory_rate, context)
he_encrypted_bmi = decrypt_and_re_encrypt_in_tee(encrypted_bmi, context)
he_encrypted_vo2_max = decrypt_and_re_encrypt_in_tee(encrypted_vo2_max, context)
he_encrypted_sleep_duration = decrypt_and_re_encrypt_in_tee(encrypted_sleep_duration, context)
he_encrypted_resting_heart_rate = decrypt_and_re_encrypt_in_tee(encrypted_resting_heart_rate, context)
he_encrypted_active_energy_burned = decrypt_and_re_encrypt_in_tee(encrypted_active_energy_burned, context)

encrypted_health_score = score_data(he_encrypted_heart_rate, he_encrypted_respiratory_rate, he_encrypted_bmi, 
    he_encrypted_vo2_max, he_encrypted_sleep_duration, he_encrypted_resting_heart_rate, he_encrypted_active_energy_burned)
print(encrypted_health_score) 
# Insurance provider then decrypts the health score using Lit Protocol and rebase
