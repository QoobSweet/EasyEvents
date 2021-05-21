var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import '@material/mwc-button';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
import './pages/client/client-index';
let BusinessIndex = class BusinessIndex extends LitElement {
    constructor() {
        super(...arguments);
        this.open = true;
        this.selectedPage = "clients-display";
        this.clients = null;
        this.inquiries = null;
        this.firstUpdated = () => { this.subscribeToServer(); };
        this.subscribeToServer = () => {
            this.serverApi.subscribeToServer();
            this.serverApi.socket.on("dbInquiries", (data, callback) => {
                console.log('recieving inquiries');
                if (data.inquiries !== this.inquiries) {
                    this.inquiries = data.inquiries;
                }
                if (data.inquiries) {
                    callback({ status: 'recieved' });
                }
                else {
                    callback({ status: 'failed' });
                }
            });
            this.serverApi.socket.on("dbClients", (data, callback) => {
                console.log('recieving clients');
                console.log(data);
                if (data.clients !== this.clients) {
                    this.clients = data.clients;
                }
                console.log(this.clients);
                if (data.clients) {
                    callback({ status: 'recieved' });
                }
                else {
                    callback({ status: 'failed' });
                }
            });
        };
        this.createPage = (label, target, html) => {
            return { label: label, target: target, active: target === this.selectedPage, render: html };
        };
        this.pages = () => {
            return [
                this.createPage("Clients", "clients-display", html `
      <clients-index slot="content" .serverApi="${this.serverApi}" .clients="${this.clients}" .inquiries="${this.inquiries}"></clients-index>
    `),
                this.createPage("Calendar", "calendar-page", html `
    `),
                this.createPage("Ongoing", "out-for-sign-page", html `
    `),
                this.createPage("Bookings", "bookings-page", html `
    `),
                this.createPage("My Account", "business-home", html `
    `),
            ];
        };
        this.openDrawer = () => { this.open = !this.open; };
    }
    render() {
        return html `
      <page-display>
        <mwc-drawer id="main-content-wrapper" slot="content" type="dismissible" ?open="${this.open}">
          <mwc-list-item twoline graphic="large" noninteractive>
            <span>${this.user.displayName}</span>
            <span slot="secondary">${this.user.email}</span>
            <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
          </mwc-list-item>  
          <mwc-list activatable>
            ${this.pages().map(page => {
            if (this.selectedPage == page.target) {
                return html `
                  <li divider role="separator"></li>
                  <mwc-list-item twoline @click="${() => { this.selectedPage = page.target.toString(); this.openDrawer; }}" selected activated>${page.label}
                  </mwc-list-item>
                `;
            }
            else {
                return html `
                  <mwc-list-item twoline @click="${() => { this.selectedPage = page.target.toString(); this.openDrawer; }}">${page.label}</mwc-list-item>
                `;
            }
        })}
          </mwc-list>
          <div id="appContent" slot="appContent">
              <mwc-top-app-bar>
                <mwc-icon-button slot="navigationIcon" @click="${this.openDrawer}">
                  <svg viewBox="0 0 100 80" width="40" height="40"><rect width="100" height="20"></rect><rect y="30" width="100" height="20"></rect><rect y="60" width="100" height="20"></rect></svg>
                </mwc-icon-button>
                  <div slot="title">Easy Events for Business</div>
              </mwc-top-app-bar>
              ${this.pages().filter(page => page.target === this.selectedPage)[0].render}
          </div>
        </mwc-drawer>
      </page-display>
    `;
    }
};
BusinessIndex.styles = css `
    :host {
      --mdc-drawer-width: 200px;
    }
    #main-content-wrapper {
      position: fixed;
      bottom: 0;
      right:0;
    }
    #appContent {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  `;
__decorate([
    property({ type: Boolean })
], BusinessIndex.prototype, "open", void 0);
__decorate([
    property({ type: Object })
], BusinessIndex.prototype, "serverApi", void 0);
__decorate([
    property({ type: String })
], BusinessIndex.prototype, "selectedPage", void 0);
__decorate([
    property({ type: Object })
], BusinessIndex.prototype, "user", void 0);
__decorate([
    state()
], BusinessIndex.prototype, "clients", void 0);
__decorate([
    state()
], BusinessIndex.prototype, "inquiries", void 0);
BusinessIndex = __decorate([
    customElement('business-index')
], BusinessIndex);
export { BusinessIndex };
