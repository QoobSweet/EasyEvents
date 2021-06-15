import { LitElement } from 'lit';
import { UserI } from '../../../../definitions/definitions';
export interface InquiryState {
    label: String;
    color: String;
}
export declare class AccountIndex extends LitElement {
    user: UserI | null;
    serverApi: import("../../../../api/serverApi").ServerApi;
    static styles: import("lit").CSSResultGroup;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=account-index.d.ts.map