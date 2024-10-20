# compute_health_score.py - A Python script to perform homomorphic operations on CKKS-encrypted data

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

# Function to perform homomorphic computation on CKKS-encrypted data
def compute_health_score(encrypted_data, context_bytes):
    try:
        # Load the TenSEAL context
        context = ts.context_from(context_bytes)

        # Deserialize encrypted vectors
        encrypted_vectors = [ts.ckks_vector_from(context, enc_bytes) for enc_bytes in encrypted_data]

        # Perform homomorphic addition of the encrypted vectors as a simple example
        # (This can be replaced with a more complex health score computation logic)
        health_score = encrypted_vectors[0]
        for enc_vec in encrypted_vectors[1:]:
            health_score += enc_vec

        return health_score.decrypt()
    except Exception as e:
        print(f"Error during homomorphic computation: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    # Load input data
    input_data = load_input_data()
    encrypted_data = input_data.get("encrypted_data")
    context_bytes = input_data.get("context")

    # Perform homomorphic computation
    health_score = compute_health_score(encrypted_data, context_bytes)

    # Output the computed health score
    print(health_score)
