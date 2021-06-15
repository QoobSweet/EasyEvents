import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
import './pages/client-page/client-page';
import './pages/account/account-index';
import { UserI } from '../../definitions/definitions';
interface PageItem {
    label: String;
    target: String;
    active: Boolean;
    render: TemplateResult;
}
export declare class BusinessIndex extends LitElement {
    open: boolean;
    user: UserI | null;
    selectedPage: string;
    clients: null;
    inquiries: null;
    serverApi: import("../../api/serverApi").ServerApi;
    static styles: import("lit").CSSResultGroup;
    firstUpdated: () => void;
    subscribeToFirebase: () => void;
    createPage: (label: string, target: string, html: TemplateResult) => PageItem;
    pages: () => PageItem[];
    openDrawer: () => void;
    render(): TemplateResult<1>;
}
export {};
//# sourceMappingURL=business-index.d.ts.map