import { ServerApi } from "../api/serverApi";
import Coorespondence from "./coorespondence";
import { DbDoc } from "./dbDoc";

export interface DbDocI {
  [key: string]: AccessData | number | string | string[] | Function | Message[];
  
  /**Label Used in internal console logs */
  identifierLabel: string;
  /** collection key for mapping root database */
  collectionKey: string;
  /**db doc key. If not set, <docTemplate>.init needs to be called unless empty template is needed */
  id: string;

  /** checks object id, if invalid creates new entry in database and applies return id for identification
  * @returns id of new entry
  */
  init: (user: UserI, serverApi: ServerApi, callback?: Function) => void;
  /**
   * returns rawObject in form of dbDocTemplate
   * maps all values even if not referenced by declared doc
   * @param dataObj should only ever be a raw data Object matching the type of doc you are creating.
   * @example if Inquiry Object is Passed into Client mergeModel the id's and keys would conflict and not work with ongoing functions.
   */
  mergeModel: (dataObj?: DbDoc) => void;
  /** Returns Developer designated Fields for display in Object format */
  accessibleFields: () => AccessData[];
  lockedFields: string[];
  /** Updates specific field of document in db if initiated */
  updateField: (serverApi: ServerApi, key: string, value: unknown) => void;
  /** 
   * Good practice to implement confirmation prompt
   * removes doc from database. model logic must take place in template before this is called.
   */
  remove: (user: UserI, serverApi: ServerApi) => boolean;
}

export interface UserI extends DbDocI {
  name: AccessData;
  email: AccessData;
  phone: AccessData;
}

export interface ClientI extends DbDocI {
  name: AccessData;
  email: AccessData;
  phone: AccessData;
}


export interface AccessData {
  label: string;
  value: string | {} | Coorespondence;
  type: "number" | "color" | "text" |
  "search" | "tel" | "url" | "email" |
  "password" | "date" | "month" |
  "week" | "time" | "datetime-local" | "select" | "coorespondence";
  options?: string[] | null;
  positionIndex: Number;
}

export interface FormItem {
  label: string;
  data: AccessData;
}

export interface Message {
  date: string;
  username: string;
  message: string;
}

export const compressKey = (key: string) => {
  const _key: string = key.replace(' ', '').trim();
  return _key.charAt(0).toLowerCase() + _key.slice(1);
}

export const decompressKey = (key: string) => {
  const _key: string = key.replace(/([A-Z])/g, ' $1').trim();
  return (_key.charAt(0).toUpperCase() + _key.slice(1));
}