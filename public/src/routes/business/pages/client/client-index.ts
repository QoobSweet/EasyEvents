import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { style } from './client-index-css';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '../../../../components/form-wrapper/form-wrapper';
import '../../../../components/header-bar/header-bar';
import '../../../../components/content-item/content-item';
import '../../../../components/events-calendar/events-calendar';
import { DbObject, Client, Definitions, Inquiry, FormItem } from '../../../../definitions/definitions';
import { iServerApi } from '../../../../api/serverApi';

export interface InquiryState {
  label: String;
  color: String;
}

@customElement('clients-index')
export class ClientsIndex extends LitElement {
  @property({ type: Object }) serverApi: iServerApi = null;
  @property({ type: Array }) clients:Client[] = null;
  @property({ type: Array }) inquiries:Inquiry[] = null;
  @state() selectedClient = this.clients ? this.clients[0].id : null;
  @state() selectedInquiry = this.clients
    ? this.clients[0].inquiries
      ? this.clients[0].inquiries[0].id
      : null
    : null;

  static styles = style;

  selectClient = (id: String) => { this.selectedClient = id; this.selectedInquiry = null;}
  selectInquiry = (id: String) => { this.selectedInquiry = id; }

  handleClientSelectionEvent = (e) => { this.selectClient(e.detail.data); }
  handleInquirySelectionEvent = (e) => { this.selectedInquiry = e.detail.data; }

  createClient = (e) => {
    let newClient = new Definitions.Client();
    this.serverApi.createDoc('clients', newClient, this.selectClient);
  }

  // get Selected Client Object with appended collectionKey for form usage
  getCurrentClient = ():Client => {
    const client = this.clients.filter(client => client.id === this.selectedClient)[0];
    client.collectionKey = 'clients';
    return client ? client : null;
  }
   // get Selected Inquiry Object with appended collectionKey for form usage
  getCurrentInquiry = ():Inquiry => {
    const inquiry = this.inquiries.filter(inquiry => inquiry.id === this.selectedInquiry)[0];
    inquiry.collectionKey = 'inquiries'
    return inquiry ? inquiry : null;
  }

  getForm = (dbObject):FormItem[] => {
    const items: FormItem[] = [];
    const item = ([key, value]) => { return { collectionKey: dbObject.collectionKey, dbKey: dbObject.id, label: key, value: value }; }
    for (const entry of Object.entries(dbObject)) {
      if (entry[0] !== 'id' && entry[0] !== 'inquiries') {
        items.push(item(entry));
      }
    }
    return items;
  }

  updateDB = (event) => {
    const data = event.detail.data;
    const item = data.item;

    const collectionKey = item.collectionKey;
    const docKey = item.dbKey;
    const fieldValue = data.value;

    let fieldKey = item.label;

    //push change to database
    this.serverApi.setFieldValue(collectionKey, docKey, fieldKey, fieldValue);
}


  render() {
    console.log(this.clients);
    console.log(this.inquiries);
    return html`
    <mwc-drawer slot="content">
      <mwc-list activatable>
        ${this.clients.map(client => {
      if (this.selectedClient === client.id) {
        return html`
            <li divider role="separator"></li>
            <mwc-list-item graphic="avatar" twoline @click="${() => { this.selectedClient = client.id; window.scrollTo(0, 0); }}" selected activated>
              <span>${client.name}</span>
              <span slot="secondary">${client.email}</span>
              <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
            </mwc-list-item>
            `
      } else {
        return html`
            <li divider role="separator"></li>
            <mwc-list-item graphic="avatar" twoline @click="${() => { this.selectedClient = client.id; window.scrollTo(0, 0); }}">
              <span>${client.name}</span>
              <span slot="secondary">${client.email}</span>
              <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
            </mwc-list-item>
          `}
    })}
      </mwc-list>
      <div slot="appContent" style="display:flex; height: 100%;">
        <mwc-icon-button class="add-inquiry" icon="note_add" @click="${this.createClient}"></mwc-icon-button>
          ${this.selectedClient
        ? html`
            <content-item id="client-info">
              <h1>${this.getCurrentClient().name}</h1>
              <hr class="rounded">
              <div id="client-header">
                <div id="client-portrait">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"/>
                </div>
                <form-wrapper @value-changed="${this.updateDB}" .title="${'Contact Info'}" .items="${this.getForm(this.getCurrentClient())}">
                </form-wrapper>
              </div>
              <hr class="rounded">
              <div id="client-computed-data">

              </div>
              <div id="inquiry-info">
                ${this.selectedInquiry ? html`
                  <form-wrapper .title="${'Inquiry Info'}" .items="${this.getForm(this.getCurrentInquiry())}">
                  </form-wrapper>
                ` : html``}
              </div>
            </content-item>
          ` : html``}
          <content-item id="calendar">
            <events-calendar
              .inquiries= "${this.inquiries}"
            >
            </events-calendar>
          </content-item>
      </div>
    </mwc-drawer>
  `}
}