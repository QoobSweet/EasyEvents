import { DbDoc } from "./dbDoc";
import { AccessData, UserI } from "./definitions";

export default class User extends DbDoc implements UserI{
  identifierLabel = "User";
  collectionKey = 'users';
  name: AccessData = this.accessField('Name', 'New User', 'text', 1);
  email: AccessData = this.accessField('Email', '', 'email', 2);
  phone: AccessData = this.accessField('Phone', '', 'tel', 3);
  
  clients: string[] = [];
  inquiries: string[] = [];
}
