import { Role } from './role';

export class User {
  // tslint:disable-next-line:variable-name
  _id: string;
  name: string;
  matricule: string;
  password: string;
  username: string;
  enabled: string;
  role: Role;
}
