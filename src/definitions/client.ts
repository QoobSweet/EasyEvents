import { DbDoc } from "./dbDoc";
import { AccessData, ClientI } from "./definitions";

export default class Client extends DbDoc implements ClientI {
    identifierLabel = "Client";
    collectionKey = 'clients';
    name: AccessData = this.accessField('Name', 'New Client', 'text', 1);
    email: AccessData = this.accessField('Email', '', 'email', 2);
    phone: AccessData = this.accessField('Phone', '', 'tel', 3);
}
