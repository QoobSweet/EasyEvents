import { AccessData } from "./definitions";
import { ServerApi } from "../api/serverApi";


export interface i_dbDoc {
  /**Label Used in internal console logs */
  identifierLabel: string;
  /** collection key for mapping root database */
  collectionKey: string;
  /**db doc key. If not set, <docTemplate>.init needs to be called unless empty template is needed */
  id: string;

  /**
   * returns rawObject in form of dbDocTemplate
   * maps all values even if not referenced by declared doc
   * @param dataObj should only ever be a raw data Object matching the type of doc you are creating.
   * @example if Inquiry Object is Passed into Client mergeModel the id's and keys would conflict and not work with ongoing functions.
   */
  mergeModel: (dataObj?: Object) => void;

  /** Returns Developer designated Fields for display in Object format */
  accessibleFields: () => {};

  /** checks object id, if invalid creates new entry in database and applies return id for identification
   * @returns id of new entry
   */
  init: (serverApi: ServerApi, callback?: (string) => void) => void;

  /** 
   * Good practice to implement confirmation prompt
   * removes doc from database. model logic must take place in template before this is called.
   */
  remove: (serverApi: ServerApi) => boolean;
}

export class dbDoc implements i_dbDoc {
  identifierLabel = "Inquiries";
  collectionKey = '';
  id = ''

  accessField = (value: string, type: AccessData["type"]): AccessData => {
    if(type !== "select"){
      return { value: value, type: type };
    } else {
      //fuck
    }
  }

  mergeModel(dataObj?: Object) {
      if (dataObj) {
          for (const [key, value] of Object.entries(dataObj)) {
              this[key] = value;
          }
      }
  }

  accessibleFields = (): Object => {
    return {};
  }

  init = (serverApi: ServerApi, callback?: (string) => void): void => {
    console.log("Creating new " + this.identifierLabel);
      if (this.id === '') {
          serverApi.createDoc(this.collectionKey, this, (newId) => {
            this.id = newId;
            callback(newId);
          })
      } else {
          throw new Error("Already initialized and has ID.");
      }
  }

  remove = (serverApi: ServerApi) => {
      if (this.id !== '') {
          if (window.confirm("Are You Sure You Would Like to Remove " + this.identifierLabel + "? \n This cannot be undone!")) {
            serverApi.removeDoc(this.collectionKey, this.id);
            return true;
          }
      } else {
        throw new Error("Cannot remove " + this.identifierLabel + " as it has not been initialized yet.");
      }
  }
}