import { AccessData, compressKey, decompressKey } from "./definitions";
import { ServerApi } from "../api/serverApi";
import { buildClassNameNormalizer } from "@fullcalendar/common";
import { floatingLabel } from "@material/mwc-floating-label";


export interface i_dbDoc {
  /**Label Used in internal console logs */
  identifierLabel: string;
  /** collection key for mapping root database */
  collectionKey: string;
  /**db doc key. If not set, <docTemplate>.init needs to be called unless empty template is needed */
  id: string;

  /** checks object id, if invalid creates new entry in database and applies return id for identification
  * @returns id of new entry
  */
  init: (serverApi: ServerApi, callback?: Function) => void;
  /**
   * returns rawObject in form of dbDocTemplate
   * maps all values even if not referenced by declared doc
   * @param dataObj should only ever be a raw data Object matching the type of doc you are creating.
   * @example if Inquiry Object is Passed into Client mergeModel the id's and keys would conflict and not work with ongoing functions.
   */
  mergeModel: (dataObj?: Object) => void;
  /** Returns Developer designated Fields for display in Object format */
  accessibleFields: {};
  /** Updates specific field of document in db if initiated */
  updateField: (serverApi: ServerApi, key: string, value: any) => void;
  /** 
   * Good practice to implement confirmation prompt
   * removes doc from database. model logic must take place in template before this is called.
   */
  remove: (serverApi: ServerApi) => boolean;
}

export class dbDoc implements i_dbDoc {
  identifierLabel = "Inquiries";
  collectionKey = '';
  id = '';
  
  init = (serverApi: ServerApi, callback?: Function): void => {
    console.log("Creating new " + this.identifierLabel);
    console.log(this);
    if (this.id === '') {
      console.log("pushing doc to database");
      serverApi.createDoc(this.collectionKey, this, (newId) => {
        callback ? callback(newId) : null;
      })
    } else {
      callback ? callback(this.id) : null;
    }
  }

  accessField = (label: string, value: string | {}, type: AccessData["type"], positionIndex: Number, selectionOptions?: string[]): AccessData => {
    return {
      label: label,
      value: value,
      type: type,
      positionIndex: positionIndex,
      options: selectionOptions
    };
  }

  mergeModel(dataObj?: Object) {
      if (dataObj) {
        for (const [key, value] of Object.entries(dataObj)) {
          if (key !== 'serverApi') {
            this[key] = value;
          }
        }
      }
  }

  accessibleFields = (): AccessData[] => {
    const buildObj: AccessData[] = [];
    for (const [key, value] of Object.entries(this)) {
        if (value.positionIndex) {
            //is AccessField
          buildObj.push(this.accessField(decompressKey(key), value.value, value.type, value.positionIndex, value.options ? value.options : null));
        }
    }
    console.log(buildObj);
    return buildObj;
}

  updateField = (serverApi, key, value): void => {
    console.log("updating Field " + key + " for " + this.collectionKey);
    if (this.id !== '') {
        serverApi.setFieldValue(this.collectionKey, this.id, compressKey(key), value);
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