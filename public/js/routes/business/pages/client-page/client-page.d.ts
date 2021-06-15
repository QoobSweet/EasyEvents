import { LitElement } from 'lit';
import '@material/mwc-drawer';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '../../../../components/form-wrapper/form-wrapper';
import '../../../../components/new-field-popup/new-field-popup';
import '../../../../components/header-bar/header-bar';
import '../../../../components/content-item/content-item';
import '../../../../components/events-calendar/events-calendar';
import Client from '../../../../definitions/client';
import Inquiry from '../../../../definitions/inquiry';
import { UserI } from '../../../../definitions/definitions';
export interface InquiryState {
    label: String;
    color: String;
}
export declare class ClientsPage extends LitElement {
    user: UserI | null;
    clients: Client[] | null;
    inquiries: Inquiry[] | null;
    targetClient: string | null;
    targetInquiry: string | null;
    client: Client | null;
    inquiry: Inquiry | null;
    slowMode: Boolean;
    showClientNewFieldPopup: Boolean;
    showInquiryNewFieldPopup: Boolean;
    newMessageDate: string;
    newMessage: string;
    serverApi: import("../../../../api/serverApi").ServerApi;
    static styles: import("lit").CSSResultGroup;
    selectClient: (id: string) => void;
    selectInquiry: (id: string) => void;
    createNewClient: () => void;
    createNewInquiry: () => void;
    /**
     * @property id target client id
     * @returns target | first existing | newly created Client if none exist
     */
    getClient: () => Client;
    getInquiry: () => Inquiry;
    updateDB: (event: {
        detail: {
            data: {
                collectionKey: string;
                docKey: string;
                value: unknown;
                fieldKey: string;
            };
        };
    }) => void;
    updated: () => void;
    triggerFormRefresh: () => void;
    addMessage: () => void;
    removeClient: () => void;
    render(): import("lit").TemplateResult<1>;
}
//# sourceMappingURL=client-page.d.ts.map