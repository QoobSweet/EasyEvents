var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './auth/auth-index';
import './business/business-index';
import './client/client-index';
//elements
let PageRouter = class PageRouter extends LitElement {
    isLoggedIn = false;
    user = null;
    render() {
        return html `
      ${this.isLoggedIn && this.user
            ? (this.user) //default to business. eventually this is where businesses will be seperated from users and routed into their respective environments
                ? html `<business-index .user="${this.user}"></business-index>`
                : html `<client-index></client-index>`
            : html `<auth-index></auth-index>`}
    `;
    }
};
__decorate([
    property({ type: Boolean })
], PageRouter.prototype, "isLoggedIn", void 0);
__decorate([
    property({ type: Object })
], PageRouter.prototype, "user", void 0);
PageRouter = __decorate([
    customElement('page-router')
], PageRouter);
export { PageRouter };
//# sourceMappingURL=router.js.map