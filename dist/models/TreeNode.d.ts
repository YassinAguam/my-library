import { Person } from './Person';
export declare class TreeNode {
    person: Person;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(person: Person);
}
