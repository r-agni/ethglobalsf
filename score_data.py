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
encrypted_wrist_temp = "LitProtocol_encrypted_wrist_temp"
encrypted_sleep_duration = "LitProtocol_encrypted_sleep_duration"

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
def score_data(lit_heart_rate, lit_respiratory_rate, lit_wrist_temp, lit_sleep_duration):
    """ Homomorphic Encryption: TenSEAL (CKKS encryption scheme) [high overhead] """
    
    # Define the weights for each metric
    heart_rate_weight = 0.3
    respiratory_rate_weight = 0.3
    wrist_temp_weight = 0.2
    sleep_duration_weight = 0.2

    # Compute weighted sum on encrypted data
    encrypted_health_score = (
        encrypted_heart_rate * heart_rate_weight +
        encrypted_respiratory_rate * respiratory_rate_weight +
        encrypted_wrist_temp * wrist_temp_weight +
        encrypted_sleep_duration * sleep_duration_weight
    )

    return encrypted_health_score

# Create encryption context
context = ts.context(ts.SCHEME_TYPE.CKKS, poly_modulus_degree=8192, coeff_mod_bit_sizes=[40, 21, 21, 21])
context.generate_galois_keys()

# Simulate decryption inside the TEE and re-encryption to CKKS for homomorphic computation
he_encrypted_heart_rate = decrypt_and_re_encrypt_in_tee(encrypted_heart_rate, context)
he_encrypted_respiratory_rate = decrypt_and_re_encrypt_in_tee(encrypted_respiratory_rate, context)
he_encrypted_wrist_temp = decrypt_and_re_encrypt_in_tee(encrypted_wrist_temp, context)
he_encrypted_sleep_duration = decrypt_and_re_encrypt_in_tee(encrypted_sleep_duration, context)

encrypted_health_score = score_data(he_encrypted_heart_rate, he_encrypted_respiratory_rate, he_encrypted_wrist_temp, he_encrypted_sleep_duration)
print(encrypted_health_score) 
# Insurance provider then decrypts the health score using Lit Protocol and rebase
