export class IdGenerator {
    /**
     * Generate a unique ID for a new person
     * @returns Unique ID string
     */
    public static generateUniqueId(): string {
      return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
  }