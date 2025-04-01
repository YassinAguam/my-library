import { PersonInput } from '../models/Person';

export class HashingUtils {
  private static readonly PRIME = 31;
  private static readonly BITWISE_SALT = 0x5a3f;

  /**
   * Creates a hash code for a person based on their details
   * @param person The person to create a hash for
   * @returns A unique hash string
   */
  public static createHash(person: PersonInput): string {
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
   * Encrypt data using bitwise operations
   * @param data The string data to encrypt
   * @param checkDigit A check digit for added security
   * @returns Encrypted string
   */
  public static encryptData(data: string, checkDigit: number): string {
    // Convert string to array of char codes
    const charCodes = Array.from(data).map(char => char.charCodeAt(0));
    
    // Apply encryption to each character
    const encryptedCodes = charCodes.map(code => {
      // Apply bitwise operations with salt and check digit
      return (code ^ this.BITWISE_SALT) ^ (checkDigit << 4);
    });
    
    // Convert back to string (hex representation of each encrypted code)
    return encryptedCodes.map(code => code.toString(16).padStart(4, '0')).join('');
  }

  /**
   * Decrypt data using bitwise operations
   * @param encryptedData The encrypted string data
   * @param checkDigit The check digit used for encryption
   * @returns Original decrypted string
   */
  public static decryptData(encryptedData: string, checkDigit: number): string {
    // Split the encrypted string into chunks of 4 characters (each represents one encrypted char)
    const chunks = [];
    for (let i = 0; i < encryptedData.length; i += 4) {
      chunks.push(encryptedData.substring(i, i + 4));
    }
    
    // Convert each chunk back to original character
    const decryptedChars = chunks.map(chunk => {
      const code = parseInt(chunk, 16); // Convert hex to number
      // Reverse the bitwise operations
      const decryptedCode = (code ^ (checkDigit << 4)) ^ this.BITWISE_SALT;
      return String.fromCharCode(decryptedCode); // Convert back to character
    });
    
    // Join characters back into original string
    return decryptedChars.join('');
  }
}