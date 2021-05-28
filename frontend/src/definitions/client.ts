import { ServerApi } from "../api/serverApi";
import { AccessData } from "./definitions";
import { dbDoc } from "./dbDoc";

export default class Client extends dbDoc {
    identifierLabel = "Client";
    collectionKey = 'clients';
    id = '';
    name: AccessData = this.accessField('Name', 'New Client', 'text', 1);
    email: AccessData = this.accessField('Email', '', 'email', 2);
    phone: AccessData = this.accessField('Phone', '', 'tel', 3);
}
