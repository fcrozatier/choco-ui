/**
 * Returns the first 4 bytes (which are random) of a v4 uuid
 *
 * Can be safely extended (if needed) to return the first 6 bytes
 *
 * **Reference**: [webcrypto](https://w3c.github.io/webcrypto/#Crypto-method-randomUUID)
 */
export const nanoId = () => crypto.randomUUID().slice(0, 8);
