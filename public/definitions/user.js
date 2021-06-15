import { DbDoc } from "./dbDoc";
export default class User extends DbDoc {
    identifierLabel = "User";
    collectionKey = 'users';
    name = this.accessField('Name', 'New User', 'text', 1);
    email = this.accessField('Email', '', 'email', 2);
    phone = this.accessField('Phone', '', 'tel', 3);
    clients = [];
    inquiries = [];
}
//# sourceMappingURL=user.js.map