import { DbDoc } from "./dbDoc";
export default class Client extends DbDoc {
    constructor() {
        super(...arguments);
        this.identifierLabel = "Client";
        this.collectionKey = 'clients';
        this.name = this.accessField('Name', 'New Client', 'text', 1);
        this.email = this.accessField('Email', '', 'email', 2);
        this.phone = this.accessField('Phone', '', 'tel', 3);
    }
}
//# sourceMappingURL=client.js.map