import { compressKey, decompressKey } from "./definitions";
export class DbDoc {
    constructor() {
        this.identifierLabel = '';
        this.collectionKey = '';
        this.id = '';
        this.lockedFields = [];
        this.init = (user, serverApi, callback) => {
            console.log("Creating new " + this.identifierLabel);
            console.log(this);
            if (this.id === '') {
                console.log("pushing doc to database");
                serverApi.createDoc(user, this.collectionKey, this, (newId) => {
                    callback ? callback(newId) : null;
                });
            }
            else {
                callback ? callback(this.id) : null;
            }
        };
        this.toggleFieldLock = (key) => {
            if (this.lockedFields) {
                const i = this.lockedFields.indexOf(key);
                if (i !== -1) {
                    this.lockedFields.splice(i, 1);
                }
                else {
                    this.lockedFields.push(key);
                }
            }
            else {
                this.lockedFields = [key];
            }
        };
        this.accessField = (label, value, type, positionIndex, selectionOptions) => {
            return {
                label: label,
                value: value,
                type: type,
                positionIndex: positionIndex,
                options: selectionOptions ? selectionOptions : null
            };
        };
        this.accessibleFields = () => {
            const buildObj = [];
            for (const [key, value] of Object.entries(this)) {
                if (value.positionIndex) {
                    const accessData = value;
                    //is AccessField
                    buildObj.push(this.accessField(decompressKey(key), accessData.value, accessData.type, accessData.positionIndex, accessData.options));
                }
            }
            console.log(buildObj);
            return buildObj;
        };
        this.updateField = (serverApi, key, value) => {
            console.log("updating Field " + key + " for " + this.collectionKey);
            if (this.id !== '') {
                serverApi.setFieldValue(this.collectionKey, this.id, compressKey(key), value);
            }
        };
        this.remove = (user, serverApi) => {
            if (this.id !== '') {
                if (window.confirm("Are You Sure You Would Like to Remove " + this.identifierLabel + "? \n This cannot be undone!")) {
                    serverApi.removeDoc(user, this.collectionKey, this.id);
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                throw new Error("Cannot remove " + this.identifierLabel + " as it has not been initialized yet.");
            }
        };
    }
    mergeModel(dataObj) {
        if (dataObj) {
            for (const [key, value] of Object.entries(dataObj)) {
                if (key !== 'serverApi') {
                    this[key] = value;
                }
            }
        }
    }
}
//# sourceMappingURL=dbDoc.js.map