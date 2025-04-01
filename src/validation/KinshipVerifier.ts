import { Person } from '../models/Person';
import { TreeNode } from '../models/TreeNode';
import { SalsilaManager } from '../core/SalsilaManager';

export class KinshipVerifier {
  private salsilaManager: SalsilaManager;

  constructor(salsilaManager: SalsilaManager) {
    this.salsilaManager = salsilaManager;
  }

  /**
   * Extract an array of ancestors from a person's tree using Depth-First Search
   * @param root The root node of the person's tree
   * @returns Array of ancestor hash codes
   */
  public extractAncestors(root: TreeNode | null): string[] {
    const ancestors: string[] = [];
    
    if (!root) {
      return ancestors;
    }

    // Helper function for DFS traversal
    const dfs = (node: TreeNode | null) => {
      if (!node) return;
      
      // Add this person's hash to the ancestors
      ancestors.push(node.person.hashCode);
      
      // Continue traversal
      dfs(node.left);
      dfs(node.right);
    };

    dfs(root);
    return ancestors;
  }

  /**
   * Compare two arrays of ancestors to find matches
   * @param ancestorsX Array of ancestors from person X
   * @param ancestorsY Array of ancestors from person Y
   * @returns Matched ancestor hash codes
   */
  public findCommonAncestors(ancestorsX: string[], ancestorsY: string[]): string[] {
    const matchedAncestors: string[] = [];
    
    // Use a Set for efficient lookup
    const ancestorSet = new Set(ancestorsX);
    
    // Find matches
    for (const ancestor of ancestorsY) {
      if (ancestorSet.has(ancestor)) {
        matchedAncestors.push(ancestor);
      }
    }
    
    return matchedAncestors;
  }

  /**
   * Verify kinship between two individuals
   * @param personXTree Binary tree of person X
   * @param personYTree Binary tree of person Y
   * @returns Object containing verification result and common ancestors
   */
  public verifyKinship(personXTree: TreeNode, personYTree: TreeNode): {
    isKinship: boolean;
    commonAncestors: Person[];
  } {
    // Extract ancestors from both trees
    const ancestorsX = this.extractAncestors(personXTree);
    const ancestorsY = this.extractAncestors(personYTree);
    
    // Find common ancestors
    const commonHashCodes = this.findCommonAncestors(ancestorsX, ancestorsY);
    
    // Get the full person objects for common ancestors
    const commonAncestors: Person[] = [];
    if (commonHashCodes.length > 0) {
      // Find the actual person objects that match these hash codes
      commonHashCodes.forEach(hashCode => {
        const person = this.salsilaManager.findPersonByHash(personXTree, hashCode) || 
                      this.salsilaManager.findPersonByHash(personYTree, hashCode);
        if (person) {
          commonAncestors.push(person);
        }
      });
    }
    
    return {
      isKinship: commonAncestors.length > 0,
      commonAncestors
    };
  }
}