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
import { Definitions, FormItem } from '../../../../definitions/definitions';
import { iServerApi } from '../../../../api/serverApi';
import Client from '../../../../definitions/client';
import Inquiry from '../../../../definitions/inquiry';

export interface InquiryState {
  label: String;
  color: String;
}

@customElement('clients-index')
export class ClientsIndex extends LitElement {
  @property({ type: Object }) serverApi: iServerApi = null;
  @property({ type: Array }) clients:Client[] = null;
  @property({ type: Array }) inquiries:Inquiry[] = null;
  @state() client: Client = null;
  @state() inquiry: Inquiry = null;
  static styles = style;


  //#region Grabbing Client | Inquiry (returns null if no id is provided.)
  getClient = (id?: String): Client => {
    const client = this.clients.filter(client => client.id === id)[0];
    client ? client.collectionKey = 'clients' : {};
    return client ? client : null;
  }
  getInquiry = (id?: String): Inquiry => {
    const inquiry = this.inquiries.filter(inquiry => inquiry.id === id)[0];
    inquiry ? inquiry.collectionKey = 'inquiries' : {};
    return inquiry ? inquiry : null;
  }
  //#endregion

  //#region Client | Inquiry Selection Handlers. Clears Client | Inquiry if null value or invalid id is passed.
  selectClient = (id?: string) => {
    this.client = this.getClient(id);
    //if client has inquiries, select the first or set selected inquiry to null
    if (this.client.inquiries.length > 0) {
      this.selectInquiry(this.client.inquiries[0]);
    } else {
      this.selectInquiry();
    }
  }
  selectInquiry = (id?: string) => {
    this.inquiry = this.getInquiry(id);
  }

  //attached listeners
  handleClientSelectionEvent = (e) => { this.selectClient(e.detail.data); }
  handleInquirySelectionEvent = (e) => { this.selectInquiry(e.detail.data); }
  //#endregion


  createClient = (e) => {
    let newClient = new Client();
    this.serverApi.createDoc('clients', newClient, this.selectClient);
  }


  updateDB = (event) => {
    const data = event.detail.data;
    const item = data.item;

    const collectionKey = item.collectionKey;
    const docKey = item.dbKey;
    const fieldValue = data.value;

    const fieldKey = item.label;

    console.log([collectionKey, docKey, fieldKey, fieldValue])
    //push change to database
    this.serverApi.setFieldValue(collectionKey, docKey, fieldKey, fieldValue);
  }

  updated = () => {
    if (this.clients && this.clients.length > 0) {
      //on initial load, client is null. This is not protocol and 
      //will break things so we need to set the default client to the first one available
      if (!this.client) {
        this.selectClient(this.clients[0].id);
      }
      if (this.client && this.client.inquiries.length > 0) {
        if (!this.inquiry) {
          this.selectInquiry(this.client.inquiries[0]);
        }
      }
    }

    //when page is updated make sure to sync client and inquiry to updated values
    if (this.inquiries && this.inquiry) {
      const testInquiry = this.inquiries.filter(inquiry => { inquiry.id === this.inquiry.id })[0];
      for (const [key, value] of Object.entries(testInquiry)) {
        if (this.inquiry[key] !== value) {
          this.inquiry = testInquiry;
          break;
        }
      }
    }
    if (this.clients && this.client) {
      const testClient = this.clients.filter(client => { client.id === this.client.id })[0];
      for (const [key, value] of Object.entries(testClient)) {
        if (this.client[key] !== value) {
          this.client = testClient;
          break;
        }
      }
    }
  }

  render() {
    return html`
    <mwc-drawer slot="content">
      <mwc-list activatable>
        <!-- Map all Clients as list items -->
        ${this.clients && this.client? this.clients.map(client => {
          console.log([client.id, this.client]);
          if (client.id === this.client.id) {
            return html`
              <!-- Client list item -->
              <mwc-list-item graphic="avatar" twoline @click="${() => { this.selectClient(client.id);}}" selected activated>
                <span>${client.name}</span>
                <span slot="secondary">${client.email}</span>
                <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
              </mwc-list-item>
              
              <!-- Map Client Inquiries list items -->
              <mwc-list>
                ${this.inquiries ? client.inquiries.map(targetId => {
                  //grab target inquiry
                  const inquiry: Inquiry = this.inquiries.filter(inquiry => inquiry.id === targetId)[0];

                  if (inquiry && this.inquiry && inquiry.id === this.inquiry.id) {
                    return html`
                      <mwc-list-item class="inquiry-list-item" graphic="icon" @click="${() => { this.selectInquiry(inquiry.id); }}" selected activated>
                        ${inquiry.eventTitle}
                        <mwc-icon slot="graphic" class="inverted">subdirectory_arrow_right</mwc-icon>
                      </mwc-list-item>
                    `;
                  } else {
                    return html`
                      <mwc-list-item class="inquiry-list-item" graphic="icon" @click="${() => { this.selectInquiry(targetId); }}">
                        ${inquiry.eventTitle}
                        <mwc-icon slot="graphic" class="inverted">subdirectory_arrow_right</mwc-icon>
                      </mwc-list-item>
                    `;
                  }
                }) : this.requestUpdate()}
                <!-- Add Inquiry Button -->
                <mwc-list-item class="inquiry-list-item add" graphic="icon" @click="${() => { console.log("add inquiry event not implemented yet"); }}" noninteractive>
                  ${"New Inquiry"}
                  <mwc-icon slot="graphic" class="inverted">note_add</mwc-icon>
                </mwc-list-item>
              </mwc-list>

              <!-- Spacer -->
              <li divider role="separator"></li>
            `;
          } else {
            return html`
              <mwc-list-item graphic="avatar" twoline @click="${() => { this.selectClient(client.id); }}">
                <span>${client.name}</span>
                <span slot="secondary">${client.email}</span>
                <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
              </mwc-list-item>
              <li divider role="separator"></li>
            `;
          }
        }) : this.requestUpdate()}
      </mwc-list>
      <div slot="appContent" style="display:flex; height: 100%;">
        <mwc-icon-button class="add-inquiry" icon="note_add" @click="${this.createClient}"></mwc-icon-button>
          ${this.client ? html`
            <content-item id="client-info">
              <h1>${this.client ? this.client.name : ''}</h1>
              <hr class="rounded">
              <div id="client-header">
                <div id="client-portrait">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"/>
                </div>
                <form-wrapper @value-changed="${this.updateDB}" .title="${'Contact Info'}" .formObject="${this.client}">
                </form-wrapper>
              </div>
              <hr class="rounded">
                ${this.inquiry ? html`
                  <div id="inquiry-info">
                    <form-wrapper @value-changed="${this.updateDB}" .title="${'Inquiry Info'}" .formObject="${this.inquiry}">
                    </form-wrapper>
                  </div>
                  <hr class="rounded">
                ` : html``}
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