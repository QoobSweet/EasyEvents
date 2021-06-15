import { LitElement } from 'lit';
import { UserI } from './definitions/definitions';
import './routes/router';
export declare class EasyEvents extends LitElement {
    isLoggedIn: boolean;
    user: UserI | null;
    serverApi: import("./api/serverApi").ServerApi;
    isDebug: boolean;
    testSessionAuth: () => void;
    firstUpdated: () => void;
    test: Boolean;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'easy-events': EasyEvents;
    }
}
//# sourceMappingURL=easy-events.d.ts.map