import { DbDoc } from "./dbDoc";
export default class Client extends DbDoc {
    identifierLabel = "Client";
    collectionKey = 'clients';
    name = this.accessField('Name', 'New Client', 'text', 1);
    email = this.accessField('Email', '', 'email', 2);
    phone = this.accessField('Phone', '', 'tel', 3);
}
//# sourceMappingURL=client.js.map