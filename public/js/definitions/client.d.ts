import { DbDoc } from "./dbDoc";
import { AccessData, ClientI } from "./definitions";
export default class Client extends DbDoc implements ClientI {
    identifierLabel: string;
    collectionKey: string;
    name: AccessData;
    email: AccessData;
    phone: AccessData;
}
//# sourceMappingURL=client.d.ts.map