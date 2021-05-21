var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { style } from './client-index-css';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';
import '../../../../components/form-wrapper/form-wrapper';
import '../../../../components/header-bar/header-bar';
import '../../../../components/content-item/content-item';
import '../../../../components/events-calendar/events-calendar';
import { Definitions } from '../../../../definitions/definitions';
import Client from '../../../../definitions/client';
import Inquiry from '../../../../definitions/inquiry';
let ClientsIndex = class ClientsIndex extends LitElement {
    constructor() {
        super(...arguments);
        this.serverApi = null;
        this.clients = null;
        this.inquiries = null;
        this.client = null;
        this.inquiry = null;
        //#region Grabbing Client | Inquiry (returns null if no id is provided.)
        this.getClient = (id) => {
            const rawClient = this.clients.filter(client => client.id === id)[0];
            const client = Client.convertObject(rawClient);
            client ? client.collectionKey = 'clients' : {};
            return client ? client : null;
        };
        this.getInquiry = (id) => {
            const rawInquiry = this.inquiries.filter(inquiry => inquiry.id === id)[0];
            const inquiry = Inquiry.convertObject(rawInquiry);
            inquiry ? inquiry.collectionKey = 'inquiries' : {};
            return inquiry ? inquiry : null;
        };
        //#endregion
        //#region Client | Inquiry Selection Handlers. Clears Client | Inquiry if null value or invalid id is passed.
        this.selectClient = (id) => {
            console.log("selecting " + id);
            this.client = this.getClient(id);
            //if client has inquiries, select the first or set selected inquiry to null
            if (this.client.inquiries[0]) {
                this.selectInquiry(this.client.inquiries[0]);
            }
            else {
                this.inquiry = null;
            }
            this.requestUpdate();
        };
        this.selectInquiry = (id) => {
            this.inquiry = id ? this.getInquiry(id) : null;
            this.requestUpdate();
        };
        //attached listeners
        this.handleClientSelectionEvent = (e) => { this.selectClient(e.detail.data); };
        this.handleInquirySelectionEvent = (e) => { this.selectInquiry(e.detail.data); };
        //#endregion
        this.createClient = () => {
            let newClient = new Client();
            this.serverApi.createDoc('clients', newClient, this.selectClient);
            this.requestUpdate();
        };
        this.removeClient = (e) => {
            if (this.client) {
                //open confirmation prompt
                if (window.confirm("Are You Sure You Would Like to Remove Client? \n This Will Also Remove Any Related Inquiries!")) {
                    console.log('attempting to remove Client');
                    //get related inquiries if any and remove them as well
                    if (this.client.inquiries) {
                        for (let i = 0; i < this.client.inquiries.length; i++) {
                            this.serverApi.removeDoc('inquiries', this.client.inquiries[i]);
                        }
                    }
                    //remove client entry in database
                    this.serverApi.removeDoc('clients', this.client.id);
                    //clear selection;
                    this.client = null;
                }
            }
        };
        this.createInquiry = () => {
            if (this.client) {
                let newInquiry = Definitions.Inquiry.createInquiryByClient(this.client);
                this.serverApi.createDoc('inquiries', newInquiry, (id) => {
                    //grab existing inquiry id array or create new one
                    const newInquiriesArray = (this.client && this.client.inquiries) ? this.client.inquiries : [];
                    //append new inquiry id and set focus to it
                    newInquiriesArray.push(id);
                    this.serverApi.setFieldValue('clients', this.client.id, 'inquiries', newInquiriesArray);
                    this.selectInquiry(id);
                });
            }
        };
        this.updateDB = (event) => {
            const data = event.detail.data;
            const collectionKey = data.collectionKey;
            const docKey = data.docKey;
            const fieldValue = data.value;
            const fieldKey = data.fieldKey;
            console.log([collectionKey, docKey, fieldKey, fieldValue]);
            //push change to database
            this.serverApi.setFieldValue(collectionKey, docKey, fieldKey, fieldValue);
        };
        this.updated = () => {
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
        };
    }
    render() {
        console.log(this.client);
        return html `
    <mwc-drawer slot="content">
      <mwc-list activatable>
        <!-- Map all Clients as list items -->
        ${this.client ? this.clients.map(client => {
            if (client.id === this.client.id) {
                return html `
              <!-- Client list item -->
              <mwc-list-item graphic="avatar" twoline @click="${() => { this.selectClient(client.id); }}" selected activated>
                <span>${client.name}</span>
                <span slot="secondary">${client.email}</span>
                <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
              </mwc-list-item>
              
              <!-- Map Client Inquiries list items -->
              <mwc-list class="nested">
                ${this.inquiries && this.inquiries.length > 0 ? client.inquiries.map(targetId => {
                    //grab target inquiry
                    const inquiry = Inquiry.convertObject(this.inquiries.filter(inquiry => inquiry.id === targetId)[0]);
                    if (this.inquiry && this.inquiry.id === this.inquiry.id) {
                        return html `
                      <mwc-list-item class="inquiry-list-item" graphic="icon" @click="${() => { this.selectInquiry(inquiry.id); }}" selected activated>
                        ${inquiry.businessName}
                        <mwc-icon slot="graphic" class="inverted">subdirectory_arrow_right</mwc-icon>
                      </mwc-list-item>
                    `;
                    }
                    else {
                        return html `
                      <mwc-list-item class="inquiry-list-item" graphic="icon" @click="${() => { this.selectInquiry(targetId); }}">
                        ${inquiry.businessName}
                        <mwc-icon slot="graphic" class="inverted">subdirectory_arrow_right</mwc-icon>
                      </mwc-list-item>
                    `;
                    }
                }) : this.requestUpdate()}
              </mwc-list>
              <!-- Spacer -->
              <li divider role="separator"></li>
            `;
            }
            else {
                return html `
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
        <mwc-icon-button id="add-client-button" title="Add Client" icon="note_add" @click="${this.createClient}"></mwc-icon-button>
          ${this.client ? html `
            <content-item id="client-info">
              <h1 class="title-bar indented">${this.client ? this.client.name : ''}</h1>

              <hr class="rounded">
              
              <!-- Main Client Info -->
              <div id="client-header">
                <div id="client-portrait">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"/>
                </div>
                <div class="client-editable">
                  <form-wrapper
                    @value-changed="${this.updateDB}" 
                    .title="${'Info'}" 
                    .formObject="${this.client.accessibleFields()}"
                    .collectionKey="${this.client.collectionKey}"
                    .docKey="${this.client.id}"
                  >
                  </form-wrapper>
                  <div class="button-collection">
                    <div class="button-wrapper">
                      <mwc-button unelevated label="Delete Client" icon="delete_forever" @click="${this.removeClient}"></mwc-button>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="rounded">
              <!-- Inquiry Info -->
              <div id="inquiry-info">
                <!-- show form if inquiry selected -->
                ${this.inquiry ? html `
                  <form-wrapper
                    @value-changed="${this.updateDB}" 
                    .size="${20}" 
                    .title="${'Inquiry Info'}"
                    .formObject="${this.inquiry.accessibleFields()}"
                    .collectionKey="${this.inquiry.collectionKey}"
                    .docKey="${this.inquiry.id}"
                  >
                  </form-wrapper>
                ` : html ``}
                <div class="button-collection">
                    <div class="button-wrapper">
                      <mwc-button unelevated label="New Inquiry" icon="note_add" @click="${this.createInquiry}"></mwc-button>
                    </div>
                    <!-- provide delete button if inquiry is selected -->
                    ${this.inquiry ? html `
                      <div class="button-wrapper">
                        <mwc-button unelevated label="Delete Inquiry" icon="delete_forever" @click="${this.createInquiry}"></mwc-button>
                      </div>
                    ` : html ``}
                </div>
              </div>

              <hr class="rounded">
              
              <div id="coorespondence">
                <form-wrapper 
                    .size="${20}" 
                    .title="${'Coorespondence'}"
                  >
                  </form-wrapper>
              </div>
            </content-item>
          ` : html ``}
          <content-item id="calendar">
            <events-calendar
              .inquiries= "${this.inquiries}"
            >
            </events-calendar>
          </content-item>
      </div>
    </mwc-drawer>
  `;
    }
};
ClientsIndex.styles = style;
__decorate([
    property({ type: Object })
], ClientsIndex.prototype, "serverApi", void 0);
__decorate([
    property({ type: Array })
], ClientsIndex.prototype, "clients", void 0);
__decorate([
    property({ type: Array })
], ClientsIndex.prototype, "inquiries", void 0);
__decorate([
    state()
], ClientsIndex.prototype, "client", void 0);
__decorate([
    state()
], ClientsIndex.prototype, "inquiry", void 0);
ClientsIndex = __decorate([
    customElement('clients-index')
], ClientsIndex);
export { ClientsIndex };
