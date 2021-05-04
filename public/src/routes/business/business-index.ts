import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
import './pages/clients/clients-index';
//elements

interface PageItem {
  label: String,
  target: String,
  active: Boolean,
  render: TemplateResult
}

@customElement('business-index')
export class BusinessIndex extends LitElement {
  @property({ type: Object }) serverApi;
  @property({ type: Array }) clients = {};
  @property({ type: Array }) inquiries = {};
  @property({ type: String }) selectedPage = "business-home";
  
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
        this.requestUpdate();
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
      this.createPage("My Account", "business-home", html`
    `),
    this.createPage("Clients", "clients-display", html`
      <clients-index slot="content" .serverApi="${this.serverApi}" .clients="${this.clients}"></clients-index>
    `),
    this.createPage("Calendar", "calendar-page", html`
    `),
    this.createPage("Out For Sign", "out-for-sign-page", html`
    `),
    this.createPage("Bookings", "bookings-page", html`
    `)
  ]}

  render() {
    return html`
      <page-display>
        <header-bar slot="header-bar"
          label="Business"
          .showAccent="${true}"
        ></header-bar>
        <content-wrapper slot="content"
          ?showNavigation = "${true}"
          .contentItems = "${this.pages()}" 
          @page-selected = "${(e) => { this.selectedPage = e.detail.data.page; console.log(this.selectedPage); this.requestUpdate(); }}"
        >
          ${this.pages().filter(page => page.target === this.selectedPage)[0].render}
        </content-wrapper>
      </page-display>
    `;
  }
  
}