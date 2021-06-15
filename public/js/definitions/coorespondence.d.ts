import { Message } from "./definitions";
import { DbDoc } from "./dbDoc";
export default class Coorespondence extends DbDoc {
    identifierLabel: string;
    collectionKey: string;
    parentInquiryId: string;
    messages: Message[];
}
//# sourceMappingURL=coorespondence.d.ts.map