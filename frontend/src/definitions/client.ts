import { ServerApi } from "../api/serverApi";
import { dbDoc } from "./dbDoc";

export default class Client extends dbDoc {
    identifierLabel = "Clients";
    collectionKey = 'clients';
    id = '';
    name = 'New Client';
    email = '';
    phone = '';
    inquiries: string[] = [];

    accessibleFields = (): Object => {
        return {
            //items will appear in the oder they are here
            name: this.accessField(this.name, 'text'),
            phone: this.accessField(this.phone, 'tel'),
            email: this.accessField(this.email, 'email')
        }
    }

    linkInquiry = (id: string) => {
        console.log("linking inquiry: " + id);
        this.inquiries.push(id);
        this.updateField('inquiries', this.inquiries);
    }
    removeInquiry = (id: string) => {
        this.inquiries.splice(this.inquiries.indexOf(id, 1));
        this.updateField('inquiries', this.inquiries);
    }

    updateField = (key: string, value) => {
        console.log("updating Field " + key);
        if (this.serverApi && this.id !== '') {
            this.serverApi.setFieldValue(this.collectionKey, this.id, key, value);
        }
    }
}
