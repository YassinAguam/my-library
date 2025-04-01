import { Person, PersonInput } from '../models/Person';
import { TreeNode } from '../models/TreeNode';
import { HashingUtils } from './HashingUtils';
import { IdGenerator } from '../utils/IdGenerator';

export class SalsilaManager {
  /**
   * Adds a person to the binary tree as a child of the specified parent
   * @param root The root node of the tree
   * @param parentId The ID of the parent where this person should be added
   * @param person The person to add
   * @returns Updated root node
   */
  public addPersonToTree(root: TreeNode | null, parentId: string | null, person: PersonInput): TreeNode {
    // If no root exists, create a new tree with this person as root
    if (!root && !parentId) {
      const id = IdGenerator.generateUniqueId();
      const hashCode = HashingUtils.createHash(person);
      return new TreeNode({ ...person, id, hashCode });
    }

    // If no root but parent ID is specified, cannot add
    if (!root && parentId) {
      throw new Error("Cannot add to non-existent tree with parent ID");
    }

    // Add person to existing tree
    return this.addPersonToExistingTree(root!, parentId, person);
  }

  /**
   * Helper method to add a person to an existing tree
   */
  private addPersonToExistingTree(node: TreeNode, parentId: string | null, person: PersonInput): TreeNode {
    // If this is the parent node where we want to add the child
    if (node.person.id === parentId) {
      const id = IdGenerator.generateUniqueId();
      const hashCode = HashingUtils.createHash(person);
      const newPerson: Person = { ...person, id, hashCode };
      
      // Add as left child if available
      if (!node.left) {
        node.left = new TreeNode(newPerson);
      } 
      // Add as right child if available
      else if (!node.right) {
        node.right = new TreeNode(newPerson);
      } 
      // Both spots are taken
      else {
        throw new Error("Parent already has two children");
      }
      
      return node;
    }

    // Continue searching for the parent node
    if (node.left) {
      this.addPersonToExistingTree(node.left, parentId, person);
    }
    if (node.right) {
      this.addPersonToExistingTree(node.right, parentId, person);
    }

    return node;
  }

  /**
   * Find a person in the tree by their hash code
   * @param root Root of the tree to search
   * @param hashCode Hash code to search for
   * @returns Person object if found, null otherwise
   */
  public findPersonByHash(root: TreeNode | null, hashCode: string): Person | null {
    if (!root) {
      return null;
    }
    
    // Check current node
    if (root.person.hashCode === hashCode) {
      return root.person;
    }
    
    // Check left and right subtrees
    const leftResult = this.findPersonByHash(root.left, hashCode);
    if (leftResult) {
      return leftResult;
    }
    
    return this.findPersonByHash(root.right, hashCode);
  }
}