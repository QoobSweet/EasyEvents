import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
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
//elements

interface PageItem {
  label: String,
  target: String,
  active: Boolean,
  render: TemplateResult
}

@customElement('business-index')
export class BusinessIndex extends LitElement {
  @property({ type: Boolean }) public open: boolean = true;
  @property({ type: Object }) serverApi;
  @property({ type: Array }) clients = {};
  @property({ type: Array }) inquiries = {};
  @property({ type: String }) selectedPage = "clients-display";
  static styles = css`
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
  firstUpdated = () => { this.subscribeToServer(); }

  subscribeToServer = () => {
    this.serverApi.subscribeToServer();
    this.serverApi.socket.on("dbInquiries", (data, callback) => {
      console.log('recieving inquiries');
      if(data.inquiries !== this.inquiries) {
        this.inquiries = data.inquiries;
        this.requestUpdate();
      } 

      if (data.inquiries) { callback({ status: 'recieved' }); }
      else { callback({ status: 'failed' }); }
    });

    this.serverApi.socket.on("dbClients", (data, callback) => {
      console.log('recieving clients');
      if (data.clients !== this.clients) {
        this.clients = data.clients;
      }

      if (data.clients) { callback({ status: 'recieved' }); }
      else { callback({ status: 'failed' }); }
    });
  }

  createPage = (label: string, target: string, html: TemplateResult): PageItem => {
    return { label: label, target: target, active: target === this.selectedPage, render: html };
  }

  pages = () => {
    return [
    this.createPage("Clients", "clients-display", html`
      <clients-index slot="content" .serverApi="${this.serverApi}" .clients="${this.clients}"></clients-index>
    `),
    this.createPage("Calendar", "calendar-page", html`
    `),
    this.createPage("Ongoing", "out-for-sign-page", html`
    `),
    this.createPage("Bookings", "bookings-page", html`
    `),
    this.createPage("My Account", "business-home", html`
    `),
  ]}

  openDrawer = () => { this.open = !this.open; }

  render() {
    return html`
      <page-display>
        <mwc-drawer id="main-content-wrapper" slot="content" type="dismissible" ?open="${this.open}">
          <mwc-list-item twoline graphic="large" noninteractive>
            <span>User Name</span>
            <span slot="secondary">user@domain.tld</span>
            <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
          </mwc-list-item>  
          <mwc-list activatable>
            ${this.pages().map(page => {
              if (this.selectedPage == page.target) {
                return html`
                  <li divider role="separator"></li>
                  <mwc-list-item twoline @click="${() => { this.selectedPage = page.target.toString(); this.openDrawer;}}" selected activated>${page.label}
                  </mwc-list-item>
                `} else {
                return html`
                  <mwc-list-item twoline @click="${() => { this.selectedPage = page.target.toString(); this.openDrawer;}}">${page.label}</mwc-list-item>
                `}
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
  
}