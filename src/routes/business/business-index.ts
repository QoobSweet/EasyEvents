import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { doc } from 'rxfire/firestore';
import '@material/mwc-button';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '../../components/page-display/page-display';
import './pages/client-page/client-page';
import './pages/account/account-index';
import ServerApi from '../../api/serverApi';
import { UserI } from '../../definitions/definitions';
//elements

interface PageItem {
  label: String;
  target: String;
  active: Boolean;
  render: TemplateResult;
}

@customElement('business-index')
export class BusinessIndex extends LitElement {
  @property({ type: Boolean }) open = true;
  @property({ type: Object }) user: UserI | null = null;
  @property({ type: String }) selectedPage = "clients-display";
  @state() clients = null;
  @state() inquiries = null;
  serverApi = ServerApi();

  static styles = css`
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
  firstUpdated = () => { this.subscribeToFirebase(); }

  subscribeToFirebase = () => {
    if (this.user && this.user.uid) {
      const userDocRef = this.serverApi.firestore.doc('users/' + this.user.uid);
      doc(userDocRef).subscribe(snapshot => {
        console.log(snapshot.id);
        console.log(snapshot.data());
      });


      /*     this.serverApi.socket.on("dbInquiries", (data, callback) => {
            console.log('recieving inquiries');
            if(data.inquiries !== this.inquiries) {
              this.inquiries = data.inquiries;
            } 
      
            if (data.inquiries) { callback({ status: 'recieved' }); }
            else { callback({ status: 'failed' }); }
          });
      
          this.serverApi.socket.on("dbClients", (data, callback) => {
            console.log('recieving clients');
            console.log(data);
            if (data.clients !== this.clients) {
              this.clients = data.clients;
            }
            console.log(this.clients);
      
            if (data.clients) { callback({ status: 'recieved' }); }
            else { callback({ status: 'failed' }); }
          }); */
    }
  }

  

  createPage = (label: string, target: string, html: TemplateResult): PageItem => {
    return { label: label, target: target, active: target === this.selectedPage, render: html };
  }

  pages = () => {
    return [
    this.createPage("Clients", "clients-display", html`
      <clients-page slot="content" .user="${this.user}" .clients="${this.clients}" .inquiries="${this.inquiries}"></clients-page>
    `),
    this.createPage("Ongoing", "out-for-sign-page", html`
    `),
    this.createPage("Bookings", "bookings-page", html`
    `),
    this.createPage("My Account", "business-home", html`
      <account-index .user="${this.user}"></account-index>
    `),
  ]}

  openDrawer = () => { this.open = !this.open; }
  
  render() {
    if (this.user) {
      return html`
        <page-display>
          <mwc-drawer id="main-content-wrapper" slot="content" type="dismissible" ?open="${this.open}">
            <mwc-list-item twoline graphic="large" noninteractive>
              <span>${this.user.displayName}</span>
              <span slot="secondary">${this.user.email}</span>
              <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
            </mwc-list-item>  
            <mwc-list activatable>
              ${this.pages().map(page => {
                if (this.selectedPage == page.target) { return html`
                  <!-- <li divider role="separator"></li> -->
                  <mwc-list-item twoline @click="${() => { this.selectedPage = page.target.toString(); this.openDrawer; }}" selected activated>${page.label}
                  </mwc-list-item>
                `} else { return html`
                  <mwc-list-item twoline @click="${() => { this.selectedPage = page.target.toString(); this.openDrawer; }}">${page.label}</mwc-list-item>
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
                ${
          //this.pages().filter(page => page.target === this.selectedPage)[0].render
          html``}
            </div>
          </mwc-drawer>
        </page-display>
      `;
    } else {
      return html``;
    }
  }
  
}