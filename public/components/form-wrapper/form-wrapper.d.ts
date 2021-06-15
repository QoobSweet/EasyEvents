import { LitElement } from 'lit';
import '@material/mwc-textfield';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-select';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { FormItem, UserI } from '../../definitions/definitions';
import { DbDoc } from '../../definitions/dbDoc';
export declare class FormWrapper extends LitElement {
    user: UserI | null;
    docObject: DbDoc | null;
    title: string;
    size: number;
    showDelete: boolean;
    serverApi: import("../../api/serverApi").ServerApi;
    static styles: import("lit").CSSResultGroup;
    getForm: () => FormItem[];
    deleteForm: () => void;
    toggleFieldLock: (key: string) => void;
    updateField: (formItem: FormItem, event: Event) => void;
    updateSelect: (formItem: FormItem, event: any) => void;
    checkLocked: (key: string) => Boolean;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=form-wrapper.d.ts.map