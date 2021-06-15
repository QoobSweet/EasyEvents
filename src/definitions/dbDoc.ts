import { AccessData, compressKey, decompressKey, Message, UserI } from "./definitions";
import { ServerApi } from "../api/serverApi";


export class DbDoc implements DbDoc {
  [key: string]: AccessData | number | string | string[] | Function | Message[];
  
  identifierLabel = '';
  collectionKey = '';
  id = '';
  lockedFields: string[] = [];

  init = (user: UserI, serverApi: ServerApi, callback?: Function): void => {
    console.log("Creating new " + this.identifierLabel);
    console.log(this);
    if (this.id === '') {
      console.log("pushing doc to database");
      serverApi.createDoc(user, this.collectionKey, this, (newId: string) => {
        callback ? callback(newId) : null;
      })
    } else {
      callback ? callback(this.id) : null;
    }
  }

  toggleFieldLock = (key: string) => {
    if (this.lockedFields) {
      const i = this.lockedFields.indexOf(key);
      if (i !== -1) {
        this.lockedFields.splice(i, 1);
      } else {
        this.lockedFields.push(key);
      }
    } else {
      this.lockedFields = [key];
    }
  }

  accessField = (label: string, value: string | {}, type: AccessData["type"], positionIndex: Number, selectionOptions?: string[] | null): AccessData => {
    return {
      label: label,
      value: value,
      type: type,
      positionIndex: positionIndex,
      options: selectionOptions ? selectionOptions : null
    };
  }

  mergeModel(dataObj?: DbDoc) {
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
      if ((value as AccessData).positionIndex) {
        const accessData = value as AccessData;
            //is AccessField
          buildObj.push(this.accessField(decompressKey(key), accessData.value, accessData.type, accessData.positionIndex, accessData.options));
        }
    }
    console.log(buildObj);
    return buildObj;
  }

  updateField = (serverApi: ServerApi, key: string, value: unknown): void => {
    console.log("updating Field " + key + " for " + this.collectionKey);
    if (this.id !== '') {
        serverApi.setFieldValue(this.collectionKey, this.id, compressKey(key), value);
    }
  }

  remove = (user: UserI, serverApi: ServerApi) => {
      if (this.id !== '') {
        if (window.confirm("Are You Sure You Would Like to Remove " + this.identifierLabel + "? \n This cannot be undone!")) {
          serverApi.removeDoc(user, this.collectionKey, this.id);
          return true;
        } else {
          return false;
        }
      } else {
        throw new Error("Cannot remove " + this.identifierLabel + " as it has not been initialized yet.");
      }
  }
}