"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashingUtils = void 0;
class HashingUtils {
    /**
     * Creates a hash code for a person based on their details
     * @param person The person to create a hash for
     * @returns A unique hash string
     */
    static createHash(person) {
        // Combine all information into a single string
        const combinedInfo = `${person.lastName}|${person.firstName}|${person.middleName}|${person.dateOfBirth}`;
        // Apply hash algorithm
        let hash = 0;
        for (let i = 0; i < combinedInfo.length; i++) {
            hash = (hash * this.PRIME + combinedInfo.charCodeAt(i)) >>> 0;
        }
        return hash.toString(16).padStart(8, '0');
    }
    /**
     * Encrypt an ancestor's information for secure validation
     * @param hashCode The hash code to encrypt
     * @param checkDigit A check digit for added security
     * @returns Encrypted hash
     */
    static encryptData(data, checkDigit) {
        // Convert hash to number for bitwise operations
        const numericData = parseInt(data, 16);
        // Apply bitwise operations with salt and check digit
        const encrypted = (numericData ^ this.BITWISE_SALT) ^ (checkDigit << 4);
        return encrypted.toString(16);
    }
    /**
     * Decrypt an ancestor's information with security question answer
     * @param encryptedHash The encrypted hash code
     * @param checkDigit The check digit used for encryption
     * @returns Original hash if decryption is successful
     */
    static decryptData(encryptedData, checkDigit) {
        // Convert encrypted hash to number
        const numericEncrypted = parseInt(encryptedData, 16);
        // Reverse the bitwise operations
        const decrypted = (numericEncrypted ^ (checkDigit << 4)) ^ this.BITWISE_SALT;
        return decrypted.toString(16).padStart(8, '0');
    }
}
exports.HashingUtils = HashingUtils;
HashingUtils.PRIME = 31;
HashingUtils.BITWISE_SALT = 0x5a3f;
