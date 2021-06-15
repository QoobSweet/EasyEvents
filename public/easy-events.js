var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import ServerApi from './api/serverApi';
import './routes/router';
let EasyEvents = class EasyEvents extends LitElement {
    isLoggedIn = false;
    user = null;
    serverApi = ServerApi();
    isDebug = false;
    testSessionAuth = () => {
        //grab api key
        const sessionUser = window.sessionStorage.getItem(`firebase:authUser:${this.serverApi.getApiKey()}:[DEFAULT]`);
        let user;
        if (sessionUser) {
            user = JSON.parse(sessionUser);
        }
        if (!user) {
            this.isLoggedIn = false;
        }
        else {
            //pull user Map Document from file. match data in case different or google profile has changed
            this.user = user;
            this.isLoggedIn = true;
        }
    };
    firstUpdated = () => {
        this.testSessionAuth();
    };
    test = false;
    render() {
        return html `
      <page-router
        @login-change="${this.testSessionAuth}"
        ?isloggedin = "${this.isLoggedIn || this.isDebug}"
        .user = "${this.user}"
      ></page-router>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], EasyEvents.prototype, "isLoggedIn", void 0);
__decorate([
    state()
], EasyEvents.prototype, "user", void 0);
EasyEvents = __decorate([
    customElement('easy-events')
], EasyEvents);
export { EasyEvents };
//# sourceMappingURL=easy-events.js.map