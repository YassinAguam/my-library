import { Person, PersonInput } from '../models/Person';
import { TreeNode } from '../models/TreeNode';
export declare class SalsilaManager {
    /**
     * Adds a person to the binary tree as a child of the specified parent
     * @param root The root node of the tree
     * @param parentId The ID of the parent where this person should be added
     * @param person The person to add
     * @returns Updated root node
     */
    addPersonToTree(root: TreeNode | null, parentId: string | null, person: PersonInput): TreeNode;
    /**
     * Helper method to add a person to an existing tree
     */
    private addPersonToExistingTree;
    /**
     * Find a person in the tree by their hash code
     * @param root Root of the tree to search
     * @param hashCode Hash code to search for
     * @returns Person object if found, null otherwise
     */
    findPersonByHash(root: TreeNode | null, hashCode: string): Person | null;
}
