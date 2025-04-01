import { SalsilaManager } from '../src/core/SalsilaManager';
import { GenealogyValidator } from '../src/validation/GenealogyValidator';
import { KinshipVerifier } from '../src/validation/KinshipVerifier';
import { TreeNode } from '../src/models/TreeNode';
import { PersonInput } from '../src/models/Person';
import { HashingUtils } from '../src/core/HashingUtils';

const salsilaManager = new SalsilaManager();
const genealogyValidator = new GenealogyValidator();
const kinshipVerifier = new KinshipVerifier(salsilaManager);

// Sample persons
const personA: PersonInput = {
  lastName: "Aguam",
  firstName: "Yassin",
  middleName: "Adapun",
  dateOfBirth: "2000-01-01"
};

const personB: PersonInput = {
  lastName: "H.amen",
  firstName: "Jalal",
  middleName: "Aguam",
  dateOfBirth: "1995-02-02"
};

const personC: PersonInput = {
  lastName: "Aguam",
  firstName: "Sittie",
  middleName: "Lisa",
  dateOfBirth: "2006-03-03"
};

describe('Genealogy System Tests', () => {
  let root: TreeNode | null = null;
  let rootB: TreeNode | null = null;

  beforeEach(() => {
    // Reset trees before each test
    root = null;
    rootB = null;
  });

  test('Adding persons to the tree', () => {
    // Test adding person A as root
    root = salsilaManager.addPersonToTree(root, null, personA);
    expect(root).not.toBeNull();

    // Test adding person B as a child of person A
    root = salsilaManager.addPersonToTree(root, root!.person.id, personB);
    expect(root!.left).not.toBeNull();

    // Test adding person C as a child of person A
    root = salsilaManager.addPersonToTree(root, root!.person.id, personC);
    expect(root!.right).not.toBeNull();
  });

  test('Adding a third child throws an error', () => {
    // Setup tree with two children first
    root = salsilaManager.addPersonToTree(null, null, personA);
    root = salsilaManager.addPersonToTree(root, root!.person.id, personB);
    root = salsilaManager.addPersonToTree(root, root!.person.id, personC);

    // Now try to add a third child, which should throw
    const personD: PersonInput = {
      lastName: "Brown",
      firstName: "Charlie",
      middleName: "C",
      dateOfBirth: "1995-04-04"
    };

    expect(() => {
      salsilaManager.addPersonToTree(root, root!.person.id, personD);
    }).toThrow("Parent already has two children");
  });

  test('Hashing and encryption functionality', () => {
    // Test creating hash for person A
    const hashCodeA = HashingUtils.createHash(personA);
    expect(hashCodeA.length).toBe(8);

    // Test encrypting person A's last name
    const checkDigits = [1, 2, 3, 4];
    const encryptedAncestor = genealogyValidator.encryptAncestor(
      { ...personA, id: "1", hashCode: hashCodeA },
      checkDigits
    );
    expect(encryptedAncestor.encryptedLastName).not.toBe(personA.lastName);

    // Test decryption correctly restores the original name
    const answers = ["answer1", "answer2", "answer3", "answer4"];
    const decryptedPerson = genealogyValidator.validateGenealogy(encryptedAncestor, answers);
    expect(decryptedPerson).not.toBeNull();
    expect(decryptedPerson?.lastName).toBe(personA.lastName);
  });

  test('Kinship verification functionality', () => {
    // Create separate trees for person A and B
    root = salsilaManager.addPersonToTree(null, null, personA);
    rootB = salsilaManager.addPersonToTree(null, null, personB);
    
    // Add person C as child of B
    rootB = salsilaManager.addPersonToTree(rootB, rootB!.person.id, personC);

    // Verify no kinship between person A and person B initially
    const kinshipResult = kinshipVerifier.verifyKinship(root, rootB);
    expect(kinshipResult.isKinship).toBe(false);

    // Add common ancestor to both trees
    const commonAncestor: PersonInput = {
      lastName: "Aguam",
      firstName: "Grandpa George",
      middleName: "H.amen",
      dateOfBirth: "1960-05-05"
    };
    
    // Add the common ancestor to both trees
    let nodeA = salsilaManager.addPersonToTree(null, null, commonAncestor);
    nodeA = salsilaManager.addPersonToTree(nodeA, nodeA!.person.id, personA);
    root = nodeA;
    
    let nodeB = salsilaManager.addPersonToTree(null, null, commonAncestor);
    nodeB = salsilaManager.addPersonToTree(nodeB, nodeB!.person.id, personB);
    rootB = nodeB;

    // Verify kinship after adding common ancestor
    const kinshipResultAfter = kinshipVerifier.verifyKinship(root, rootB);
    expect(kinshipResultAfter.isKinship).toBe(true);
  });
});