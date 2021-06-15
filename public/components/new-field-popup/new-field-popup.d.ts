import { LitElement } from 'lit';
import { AccessData, UserI } from '../../definitions/definitions';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import { DbDoc } from '../../definitions/dbDoc';
export declare class NewFieldPopup extends LitElement {
    user: UserI | null;
    docObject: DbDoc | null;
    fieldValue: AccessData | null;
    serverApi: import("../../api/serverApi").ServerApi;
    static styles: import("lit").CSSResultGroup;
    closePopup: () => void;
    fieldTypes: string[][];
    submitField: () => void;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=new-field-popup.d.ts.map