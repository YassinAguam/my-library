import { Person } from '../models/Person';
export interface EncryptedAncestor {
    encryptedLastName: string;
    encryptedFirstName: string;
    encryptedMiddleName: string;
    encryptedDOB: string;
    checkDigits: number[];
}
export declare class GenealogyValidator {
    /**
     * Encrypt ancestor information for secure validation
     * @param ancestor The ancestor to encrypt
     * @param checkDigits Array of check digits for encryption
     * @returns Encrypted ancestor data
     */
    encryptAncestor(ancestor: Person, checkDigits: number[]): EncryptedAncestor;
    /**
     * Validate genealogy by answering security questions
     * @param encryptedAncestor Encrypted ancestor data
     * @param securityAnswers Answers to security questions
     * @returns Decrypted ancestor information if validation is successful
     */
    validateGenealogy(encryptedAncestor: EncryptedAncestor, securityAnswers: string[]): Person | null;
    /**
     * Validate security answers (simplified implementation)
     * @param answers Array of security answers
     * @returns Whether the answers are valid
     */
    private validateSecurityAnswers;
}
