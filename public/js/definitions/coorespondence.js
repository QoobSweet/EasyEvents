import { DbDoc } from "./dbDoc";
export default class Coorespondence extends DbDoc {
    constructor() {
        super(...arguments);
        this.identifierLabel = "Coorespondence";
        this.collectionKey = 'coorespondence';
        this.parentInquiryId = "";
        this.messages = [];
    }
}
//# sourceMappingURL=coorespondence.js.map