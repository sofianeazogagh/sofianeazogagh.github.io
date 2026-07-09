<!-- ---
title: "Why Homomorphic Encryption Matters"
date: "2026-07-07"
excerpt: "A gentle introduction to computing on encrypted data, and why I think it will reshape how we handle sensitive information in machine learning."
tags: ["Homomorphic Encryption", "Privacy"]
---

*This is a sample post — edit or delete `content/blog/hello-world.md` to replace it.*

Homomorphic encryption lets you compute directly on encrypted data. A server can evaluate a function on your data without ever seeing it in the clear — the result comes back encrypted, and only you can decrypt it.

## Why this is remarkable

Traditional encryption protects data *at rest* and *in transit*, but computation has always required decryption first. Fully homomorphic encryption (FHE) removes that last exposure point:

- **Private inference** — query a machine learning model without revealing your input.
- **Private training** — collaborate on model training without pooling raw data.
- **Oblivious algorithms** — even the *control flow* of a program can be hidden.

## A tiny example

```rust
let encrypted_a = client_key.encrypt(3u8);
let encrypted_b = client_key.encrypt(4u8);

// The server computes on ciphertexts — it never sees 3 or 4
let encrypted_sum = server_key.add(&encrypted_a, &encrypted_b);

let sum: u8 = client_key.decrypt(&encrypted_sum); // 7
```

The cost is performance — FHE operations are orders of magnitude slower than their plaintext counterparts — which is exactly what makes designing efficient oblivious algorithms such an interesting research problem.

## Further reading

Check out [FHE.org](https://fhe.org) for a great community and learning resources, or my publications for applications to decision trees, sorting, and k-NN. -->
