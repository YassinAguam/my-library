import { Person } from '../models/Person';
import { TreeNode } from '../models/TreeNode';
import { SalsilaManager } from '../core/SalsilaManager';
export declare class KinshipVerifier {
    private salsilaManager;
    constructor(salsilaManager: SalsilaManager);
    /**
     * Extract an array of ancestors from a person's tree using Depth-First Search
     * @param root The root node of the person's tree
     * @returns Array of ancestor hash codes
     */
    extractAncestors(root: TreeNode | null): string[];
    /**
     * Compare two arrays of ancestors to find matches
     * @param ancestorsX Array of ancestors from person X
     * @param ancestorsY Array of ancestors from person Y
     * @returns Matched ancestor hash codes
     */
    findCommonAncestors(ancestorsX: string[], ancestorsY: string[]): string[];
    /**
     * Verify kinship between two individuals
     * @param personXTree Binary tree of person X
     * @param personYTree Binary tree of person Y
     * @returns Object containing verification result and common ancestors
     */
    verifyKinship(personXTree: TreeNode, personYTree: TreeNode): {
        isKinship: boolean;
        commonAncestors: Person[];
    };
}
