import { DbDoc } from "./dbDoc";
export default class User extends DbDoc {
    constructor() {
        super(...arguments);
        this.identifierLabel = "User";
        this.collectionKey = 'users';
        this.name = this.accessField('Name', 'New User', 'text', 1);
        this.email = this.accessField('Email', '', 'email', 2);
        this.phone = this.accessField('Phone', '', 'tel', 3);
        this.clients = [];
        this.inquiries = [];
    }
}
//# sourceMappingURL=user.js.map