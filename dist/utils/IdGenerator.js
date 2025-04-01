"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
class IdGenerator {
    /**
     * Generate a unique ID for a new person
     * @returns Unique ID string
     */
    static generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}
exports.IdGenerator = IdGenerator;
