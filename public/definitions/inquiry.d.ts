import { DbDoc } from "./dbDoc";
import { AccessData, Message } from "./definitions";
interface StatusEnum {
    id: string;
    order: Number;
    label: string;
    color: string;
    textColor: string;
    borderColor: string;
}
export default class Inquiry extends DbDoc {
    static StatusEnums: StatusEnum[];
    static getStatusIds: () => string[];
    static getTodaysDate: () => string;
    identifierLabel: string;
    collectionKey: string;
    parentClientId: string;
    lockedFields: string[];
    businessName: AccessData;
    location: AccessData;
    status: AccessData;
    dateReceived: AccessData;
    lastContact: AccessData;
    proposalDate: AccessData;
    source: AccessData;
    coorespondence: Message[];
}
export {};
//# sourceMappingURL=inquiry.d.ts.map