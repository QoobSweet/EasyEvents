import { Message } from "./definitions";
import { DbDoc } from "./dbDoc";

export default class Coorespondence extends DbDoc {
  identifierLabel = "Coorespondence";
  collectionKey = 'coorespondence';
  parentInquiryId = "";
  messages: Message[] = [];
}