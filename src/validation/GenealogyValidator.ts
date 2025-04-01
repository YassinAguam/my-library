import { Person, PersonInput } from '../models/Person';
import { HashingUtils } from '../core/HashingUtils';
import { IdGenerator } from '../utils/IdGenerator';

export interface EncryptedAncestor {
  encryptedLastName: string;
  encryptedFirstName: string;
  encryptedMiddleName: string;
  encryptedDOB: string;
  checkDigits: number[];
}

export class GenealogyValidator {
  /**
   * Encrypt ancestor information for secure validation
   * @param ancestor The ancestor to encrypt
   * @param checkDigits Array of check digits for encryption
   * @returns Encrypted ancestor data
   */
  public encryptAncestor(ancestor: Person, checkDigits: number[]): EncryptedAncestor {
    return {
      encryptedLastName: HashingUtils.encryptData(ancestor.lastName, checkDigits[0]),
      encryptedFirstName: HashingUtils.encryptData(ancestor.firstName, checkDigits[1]),
      encryptedMiddleName: HashingUtils.encryptData(ancestor.middleName, checkDigits[2]),
      encryptedDOB: HashingUtils.encryptData(ancestor.dateOfBirth, checkDigits[3]),
      checkDigits
    };
  }

  /**
   * Validate genealogy by answering security questions
   * @param encryptedAncestor Encrypted ancestor data
   * @param securityAnswers Answers to security questions
   * @returns Decrypted ancestor information if validation is successful
   */
  public validateGenealogy(
    encryptedAncestor: EncryptedAncestor,
    securityAnswers: string[]
  ): Person | null {
    // Check if security answers are correct (simplified implementation)
    if (!this.validateSecurityAnswers(securityAnswers)) {
      return null;
    }
    
    try {
      // Decrypt each piece of information
      const lastName = HashingUtils.decryptData(
        encryptedAncestor.encryptedLastName, 
        encryptedAncestor.checkDigits[0]
      );
      
      const firstName = HashingUtils.decryptData(
        encryptedAncestor.encryptedFirstName, 
        encryptedAncestor.checkDigits[1]
      );
      
      const middleName = HashingUtils.decryptData(
        encryptedAncestor.encryptedMiddleName, 
        encryptedAncestor.checkDigits[2]
      );
      
      const dateOfBirth = HashingUtils.decryptData(
        encryptedAncestor.encryptedDOB, 
        encryptedAncestor.checkDigits[3]
      );
      
      // Create a hash code from the decrypted information
      const person: PersonInput = {
        lastName,
        firstName,
        middleName,
        dateOfBirth
      };
      
      const hashCode = HashingUtils.createHash(person);
      const id = IdGenerator.generateUniqueId(); // Temporary ID for the decrypted person
      
      return {
        ...person,
        id,
        hashCode
      };
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }

  /**
   * Validate security answers (simplified implementation)
   * @param answers Array of security answers
   * @returns Whether the answers are valid
   */
  private validateSecurityAnswers(answers: string[]): boolean {
    // In a real implementation, this would check against stored questions and answers
    // For demonstration, we'll just check that answers are provided
    return answers.every(answer => answer && answer.trim() !== '');
  }
}