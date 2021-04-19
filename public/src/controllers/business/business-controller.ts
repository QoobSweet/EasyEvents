import { LitElement, html, customElement, property, css, TemplateResult } from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
import './pages/client-list/client-list';
//elements

interface PageItem {
  label: String,
  target: String,
  active: Boolean,
  render: TemplateResult
}

@customElement('business-controller')
export class BusinessController extends LitElement {
  @property({ type: Object }) serverApi;
  @property({ type: Array }) clients = [];
  @property({ type: Array }) inquiries = [];
  @property({ type: String }) selectedPage = "client-list";


  createPage = (label: string, target: string): PageItem => {
    const markup = '<' + target + ' slot="content"></' + target + '>';
    return {
      label: label,
      target: target,
      active: (this.selectedPage === target),
      render: html`${unsafeHTML(markup)}`
    };
  }
  @property({ type: Array }) pages = [
    this.createPage("Clients", "client-list"),
    this.createPage("Calendar", "calendar-page"),
    this.createPage("Out For Sign", "out-for-sign-page"),
    this.createPage("Bookings", "bookings-page"),
  ];

  getActivePageRender = () => {
    this.pages.forEach(page => {
      page.target === this.selectedPage
        ? page.active = true : page.active = false;
    });
    return this.pages.filter(page => page.target === this.selectedPage)[0].render;
  }

  subscribeToServer = () => {
    this.serverApi.subscribeToServer();
    this.serverApi.socket.on("dbInquiries", (data, callback) => {
      console.log('recieving inquiries')
      console.log(data)
      if(data.inquiries !== this.inquiries) {
          console.log(data.inquiries)
        this.inquiries = data.inquiries;
      } 

      if (data.inquiries) {
        callback({ status: 'recieved' });
      } else {
        callback({ status: 'failed' });
      }
  });

  this.serverApi.socket.on("dbClients", (data, callback) => {
      console.log('recieving clients')
      console.log(data)
      if(data.clients !== this.clients) {
        this.clients = data.clients;
      }

      if(data.clients) {
        callback({ status: 'recieved' });
      } else {
        callback({ status: 'failed' });
      }
  });
  }

  firstUpdated = () => { this.subscribeToServer(); }
z
  render() {
    return html`
      <page-display>
        <title-bar slot="title-bar" label="Business"></title-bar>
        <content-wrapper slot="content"
          ?showNavigation = "${true}"
          .contentItems = "${this.pages}" 
          @page-selected = "${(e) => { this.selectedPage = e.detail.data.page; console.log(this.selectedPage); this.requestUpdate(); }}"
        >
          <client-list slot="content"></client-list>
        </content-wrapper>
      </page-display>
    `;
  }
  
}