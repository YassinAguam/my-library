"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenealogyValidator = void 0;
const HashingUtils_1 = require("../core/HashingUtils");
const IdGenerator_1 = require("../utils/IdGenerator");
class GenealogyValidator {
    /**
     * Encrypt ancestor information for secure validation
     * @param ancestor The ancestor to encrypt
     * @param checkDigits Array of check digits for encryption
     * @returns Encrypted ancestor data
     */
    encryptAncestor(ancestor, checkDigits) {
        return {
            encryptedLastName: HashingUtils_1.HashingUtils.encryptData(ancestor.lastName, checkDigits[0]),
            encryptedFirstName: HashingUtils_1.HashingUtils.encryptData(ancestor.firstName, checkDigits[1]),
            encryptedMiddleName: HashingUtils_1.HashingUtils.encryptData(ancestor.middleName, checkDigits[2]),
            encryptedDOB: HashingUtils_1.HashingUtils.encryptData(ancestor.dateOfBirth, checkDigits[3]),
            checkDigits
        };
    }
    /**
     * Validate genealogy by answering security questions
     * @param encryptedAncestor Encrypted ancestor data
     * @param securityAnswers Answers to security questions
     * @returns Decrypted ancestor information if validation is successful
     */
    validateGenealogy(encryptedAncestor, securityAnswers) {
        // Check if security answers are correct (simplified implementation)
        if (!this.validateSecurityAnswers(securityAnswers)) {
            return null;
        }
        try {
            // Decrypt each piece of information
            const lastName = HashingUtils_1.HashingUtils.decryptData(encryptedAncestor.encryptedLastName, encryptedAncestor.checkDigits[0]);
            const firstName = HashingUtils_1.HashingUtils.decryptData(encryptedAncestor.encryptedFirstName, encryptedAncestor.checkDigits[1]);
            const middleName = HashingUtils_1.HashingUtils.decryptData(encryptedAncestor.encryptedMiddleName, encryptedAncestor.checkDigits[2]);
            const dateOfBirth = HashingUtils_1.HashingUtils.decryptData(encryptedAncestor.encryptedDOB, encryptedAncestor.checkDigits[3]);
            // Create a hash code from the decrypted information
            const person = {
                lastName,
                firstName,
                middleName,
                dateOfBirth
            };
            const hashCode = HashingUtils_1.HashingUtils.createHash(person);
            const id = IdGenerator_1.IdGenerator.generateUniqueId(); // Temporary ID for the decrypted person
            return Object.assign(Object.assign({}, person), { id,
                hashCode });
        }
        catch (error) {
            console.error("Decryption failed:", error);
            return null;
        }
    }
    /**
     * Validate security answers (simplified implementation)
     * @param answers Array of security answers
     * @returns Whether the answers are valid
     */
    validateSecurityAnswers(answers) {
        // In a real implementation, this would check against stored questions and answers
        // For demonstration, we'll just check that answers are provided
        return answers.every(answer => answer && answer.trim() !== '');
    }
}
exports.GenealogyValidator = GenealogyValidator;
