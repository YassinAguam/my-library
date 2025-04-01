import { Person } from './Person';

export class TreeNode {
  person: Person;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(person: Person) {
    this.person = person;
    this.left = null;
    this.right = null;
  }
}