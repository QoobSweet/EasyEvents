import { DbDoc } from "./dbDoc";
import { AccessData, UserI } from "./definitions";
export default class User extends DbDoc implements UserI {
    identifierLabel: string;
    collectionKey: string;
    name: AccessData;
    email: AccessData;
    phone: AccessData;
    clients: string[];
    inquiries: string[];
}
//# sourceMappingURL=user.d.ts.map