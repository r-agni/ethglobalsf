# reencrypt_ckks.py - A Python script to re-encrypt data using CKKS (HE) with TenSEAL

import tenseal as ts
import json
import sys

# Function to load and parse input data
def load_input_data():
    try:
        input_data = sys.stdin.read()
        return json.loads(input_data)
    except Exception as e:
        print(f"Error loading input data: {e}", file=sys.stderr)
        sys.exit(1)

# Function to perform CKKS encryption using TenSEAL
def ckks_encrypt(data):
    try:
        # Create a TenSEAL context for CKKS
        context = ts.context(
            ts.SCHEME_TYPE.CKKS,
            poly_modulus_degree=8192,
            coeff_mod_bit_sizes=[60, 40, 40, 60]
        )
        context.global_scale = 2 ** 40
        context.generate_galois_keys()

        # Encrypt each metric using CKKS
        encrypted_data = {metric: ts.ckks_vector(context, values) for metric, values in data.items()}
        return encrypted_data, context
    except Exception as e:
        print(f"Error during CKKS encryption: {e}", file=sys.stderr)
        sys.exit(1)

# Function to serialize encrypted data
def serialize_encrypted_data(encrypted_data, context):
    try:
        serialized_data = {metric: enc.serialize() for metric, enc in encrypted_data.items()}
        serialized_context = context.serialize()
        return {
            "encrypted_data": serialized_data,
            "context": serialized_context
        }
    except Exception as e:
        print(f"Error serializing encrypted data: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    # Load input data
    data = load_input_data()

    # Perform CKKS encryption
    encrypted_data, context = ckks_encrypt(data)

    # Serialize encrypted data and context
    serialized_output = serialize_encrypted_data(encrypted_data, context)

    # Output the serialized encrypted data
    print(json.dumps(serialized_output))
