import { PersonInput } from '../models/Person';
export declare class HashingUtils {
    private static readonly PRIME;
    private static readonly BITWISE_SALT;
    /**
     * Creates a hash code for a person based on their details
     * @param person The person to create a hash for
     * @returns A unique hash string
     */
    static createHash(person: PersonInput): string;
    /**
     * Encrypt an ancestor's information for secure validation
     * @param hashCode The hash code to encrypt
     * @param checkDigit A check digit for added security
     * @returns Encrypted hash
     */
    static encryptData(data: string, checkDigit: number): string;
    /**
     * Decrypt an ancestor's information with security question answer
     * @param encryptedHash The encrypted hash code
     * @param checkDigit The check digit used for encryption
     * @returns Original hash if decryption is successful
     */
    static decryptData(encryptedData: string, checkDigit: number): string;
}
