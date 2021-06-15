import { LitElement } from 'lit';
import { UserI } from '../definitions/definitions';
import './auth/auth-index';
import './business/business-index';
import './client/client-index';
export declare class PageRouter extends LitElement {
    isLoggedIn: boolean;
    user: UserI | null;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=router.d.ts.map