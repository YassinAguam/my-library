export interface Person {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    dateOfBirth: string;
    hashCode: string;
}
export type PersonInput = Omit<Person, 'hashCode' | 'id'>;
