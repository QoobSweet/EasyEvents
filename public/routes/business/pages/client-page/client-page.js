var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { style } from './client-page-css';
import '@material/mwc-drawer';
import '@material/mwc-button';
import '@material/mwc-select';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '../../../../components/form-wrapper/form-wrapper';
import '../../../../components/new-field-popup/new-field-popup';
import '../../../../components/header-bar/header-bar';
import '../../../../components/content-item/content-item';
import '../../../../components/events-calendar/events-calendar';
import ServerApi from '../../../../api/serverApi';
import Client from '../../../../definitions/client';
import Inquiry from '../../../../definitions/inquiry';
let ClientsPage = class ClientsPage extends LitElement {
    user = null;
    clients = null;
    inquiries = null;
    targetClient = null;
    targetInquiry = null;
    client = null;
    inquiry = null;
    slowMode = false;
    showClientNewFieldPopup = false;
    showInquiryNewFieldPopup = false;
    newMessageDate = new Date().toISOString().split("T")[0].trim();
    newMessage = "";
    serverApi = ServerApi();
    static styles = style;
    selectClient = (id) => {
        this.targetClient = id;
        this.requestUpdate();
    };
    selectInquiry = (id) => {
        this.targetInquiry = id;
        this.requestUpdate();
    };
    createNewClient = () => {
        console.log("testing");
        if (this.user) {
            new Client().init(this.user, this.serverApi, (id) => console.log(id));
        }
    };
    createNewInquiry = () => {
        if (this.user && this.client) {
            const entry = new Inquiry();
            entry.parentClientId = this.client.id;
            entry.init(this.user, this.serverApi, (id) => console.log(id));
        }
    };
    /**
     * @property id target client id
     * @returns target | first existing | newly created Client if none exist
     */
    getClient = () => {
        if (this.user && this.clients) {
            //create new instance & retrieve raw inquiry data of target id or first entry if any
            const entry = new Client();
            const rawEntry = this.targetClient
                ? this.clients.filter((client) => client.id === this.targetClient)[0]
                : this.clients[0];
            entry.mergeModel(rawEntry);
            entry.init(this.user, this.serverApi);
            this.targetClient = entry.id;
            this.client = entry;
            return entry;
        }
        else {
            throw new Error('Clients have not been loaded yet.');
        }
    };
    getInquiry = () => {
        if (this.user && this.client && this.inquiries) {
            //create new instance & retrieve raw inquiry data of target id or first entry if any
            const entry = new Inquiry();
            const rawEntry = this.targetInquiry
                ? this.inquiries.filter((inquiry) => inquiry.id === this.targetInquiry)[0]
                : this.inquiries[0];
            entry.mergeModel(rawEntry);
            entry.init(this.user, this.serverApi);
            this.targetInquiry = entry.id;
            this.inquiry = entry;
            return entry;
        }
        else {
            throw new Error('Inquiries have not been loaded yet.');
        }
    };
    updateDB = (event) => {
        if (this.user) {
            const data = event.detail.data;
            const collectionKey = data.collectionKey;
            const docKey = data.docKey;
            const fieldValue = data.value;
            const fieldKey = data.fieldKey;
            //push change to database
            this.serverApi.setFieldValue(collectionKey, docKey, fieldKey, fieldValue);
        }
    };
    updated = () => {
        if (this.clients) {
            if (!this.client || this.client.id !== this.targetClient) {
                this.getClient();
            }
            else {
                //make sure to update values
                const rawClient = this.clients.filter((client) => client.id === this.targetClient)[0];
                for (const [key] of Object.entries(rawClient)) {
                    if (rawClient[key] !== this.client[key]) {
                        this.client.mergeModel(rawClient);
                        break;
                    }
                }
            }
        }
        else {
            if (this.client && this.clients && this.inquiries) {
                if (!this.inquiry || this.inquiry.id !== this.targetInquiry) {
                    this.getInquiry();
                }
                else {
                    //make sure to update values\
                    const rawInquiry = this.inquiries.filter((inquiry) => inquiry.id === this.targetInquiry)[0];
                    for (const [key] of Object.entries(rawInquiry)) {
                        if (rawInquiry[key] !== this.inquiry[key]) {
                            this.inquiry.mergeModel(rawInquiry);
                            break;
                        }
                    }
                }
            }
        }
    };
    triggerFormRefresh = () => {
        this.client = null;
        this.inquiry = null;
    };
    addMessage = () => {
        if (this.inquiry) {
            console.log("attempting to add message");
            const oldMessages = this.inquiry.coorespondence ? this.inquiry.coorespondence : [];
            if (this.newMessage !== "" && this.newMessageDate !== "" && this.user) {
                oldMessages.push({
                    date: this.newMessageDate,
                    username: this.user.name.value,
                    message: this.newMessage
                });
                this.inquiry.updateField(this.serverApi, "coorespondence", oldMessages);
                this.newMessage = "";
                this.newMessageDate = new Date().toISOString().split("T")[0].trim();
            }
        }
    };
    removeClient = () => {
        if (this.user && this.client) {
            this.client.remove(this.user, this.serverApi);
        }
    };
    render() {
        if (this.user && this.clients && this.inquiries) {
            return html `
        <mwc-drawer slot="content">
          <mwc-list>
            
            <!-- Client Creation Button -->
            <mwc-list-item class="list-button add" graphic="icon" @click="${this.createNewClient}" selected activated>
              <span>New Client</span>
              <mwc-icon slot="graphic" class="inverted">add</mwc-icon>
            </mwc-list-item>

            <!-- Map all Clients as list items -->
            ${this.clients.map(client => {
                return html `
              ${this.client && this.client.id === client.id ? html `
                <mwc-list-item class="client-list-item" graphic="avatar" twoline @click="${() => { this.selectClient(client.id); }}" selected activated>
                  <span>${client.name.value}</span>
                  <span slot="secondary">${client.email.value}</span>
                  <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
                </mwc-list-item>
              ` : html `
                <mwc-list-item class="client-list-item" graphic="avatar" twoline @click="${() => { this.selectClient(client.id); }}">
                  <span>${client.name.value}</span>
                  <span slot="secondary">${client.email.value}</span>
                  <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
                </mwc-list-item>
              `}
                
                <!-- if Active Client, Map related inquiries as list items -->
                ${this.client && this.client.id === client.id ? html `
                  <mwc-list class="nested">
                    <mwc-list-item class="inquiry-list-item list-button add" graphic="icon" @click="${this.createNewInquiry}" selected activated>
                      <span>New Inquiry</span>
                      <mwc-icon slot="graphic" class="inverted">add</mwc-icon>
                    </mwc-list-item>

                    <!-- Map all Inquiries related to Client as list items -->
                    ${this.client && this.inquiries
                    ? this.inquiries.filter(inquiry => inquiry.parentClientId === this.targetClient).map(inquiry => {
                        return this.inquiry && this.inquiry.id === inquiry.id
                            ? html `
                              <mwc-list-item class="inquiry-list-item" graphic="icon" @click="${() => { this.selectInquiry(inquiry.id); }}" selected activated>
                                ${inquiry.businessName.value}
                                <mwc-icon slot="graphic" class="inverted">subdirectory_arrow_right</mwc-icon>
                              </mwc-list-item>`
                            : html `
                              <mwc-list-item class="inquiry-list-item" graphic="icon" @click="${() => { this.selectInquiry(inquiry.id); }}">
                                ${inquiry.businessName.value}
                                <mwc-icon slot="graphic" class="inverted">subdirectory_arrow_right</mwc-icon>
                              </mwc-list-item>`;
                    })
                    : html ``}
                  </mwc-list>
                ` : null}
            `;
            })}
          </mwc-list>
          ${this.client !== null ? html `
            ${this.showClientNewFieldPopup ? html `
              <new-field-popup
                .serverApi="${this.serverApi}"
                .targetForm="${this.client}"
                @closepopup="${() => { this.showClientNewFieldPopup = false; this.triggerFormRefresh(); }}"
              ></new-field-popup>
            ` : null}
            <div slot="appContent" style="display:flex; height: 100%;">
              <content-item id="client-info">
                <div class="title-bar">
                  <h1>${this.client.name.value}</h1>
                  <div class="button-collection-wrapper">
                    <div class="button-collection">
                      <div class="button-wrapper">
                        <mwc-icon-button class="delete-icon" icon="delete_forever" @click="${this.removeClient}"></mwc-icon-button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="rounded">

                <!-- Main Client Info -->
                <div id="client-header">
                  <div id="client-portrait">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"/>
                  </div>
                  <div class="client-editable">
                    <form-wrapper
                      @value-changed="${this.updateDB}"
                      .serverApi="${this.serverApi}"
                      .docObject="${this.client}"
                      .size="${20}"
                    >
                    </form-wrapper>
                    <div class="button-collection-wrapper">
                      <div class="button-collection">
                        <div class="button-wrapper">
                          <mwc-button class="form-button" label="Add Field" @click="${() => { this.showClientNewFieldPopup = true; }}"></mwc-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                ${this.inquiry ? html `
                  ${this.showInquiryNewFieldPopup ? html `
                    <new-field-popup
                      .serverApi="${this.serverApi}"
                      .docObject="${this.inquiry}"
                      @closepopup="${() => { this.showInquiryNewFieldPopup = false; this.triggerFormRefresh(); }}"
                    ></new-field-popup>
                  ` : html ``}

                  <!-- Inquiry Info -->
                  <div id="inquiry-info">
                    ${this.inquiry.id === this.targetInquiry && this.inquiry.parentClientId === this.client.id ? html `
                      <!-- show form if inquiry selected -->
                      <form-wrapper
                        @value-changed="${this.updateDB}"
                        .serverApi="${this.serverApi}"
                        .docObject="${this.inquiry}"
                        .showDelete="${true}"
                        .size="${20}" 
                        .title="${'Inquiry Info'}"
                      >
                      </form-wrapper>
                      <div class="button-collection-wrapper">
                        <div class="button-collection">
                          <div class="button-wrapper">
                            <mwc-button class="form-button" label="Add Field" @click="${() => { this.showInquiryNewFieldPopup = true; }}"></mwc-button>
                          </div>
                        </div>
                      </div>`
                : html ``}
                  </div>
                  <div id="coorespondence">
                    <h2>Coorespondence</h2>
                    <div id="coorespondence-wrapper">
                      <div id="coorespondence-messages">
                        ${this.inquiry.coorespondence ? this.inquiry.coorespondence.map((message) => {
                return html `
                            <p class="coorespondence-message" title="${message.username}">${message.date.replaceAll("-", "/") + " - "}<b>${message.message}</b></p>
                          `;
            }) : null}
                      </div>
                      <div id="coorespondence-new-message-field">
                        <mwc-textfield id="new-message-date" type="date"
                          value="${this.newMessageDate}"
                          @change="${(event) => this.newMessageDate = event.path[0].value}"></mwc-textfield>
                        <mwc-textfield id="new-message-content" type="text" id="coorespondence-input" placeholder="New Message..." value="${this.newMessage}" outlined
                          @change="${(event) => this.newMessage = event.path[0].value}"></mwc-textfield>
                        <mwc-icon-button id="message-submit" icon="login" @click="${this.addMessage}"></mwc-icon-button>
                      </div>
                    </div>
                </div>
                ` : html ``}
              </content-item>
              <content-item id="calendar">
              </content-item>
            </div>
          ` : null}
        </mwc-drawer>
      `;
        }
        else {
            return html `Loading...`;
        }
    }
};
__decorate([
    property({ type: Object })
], ClientsPage.prototype, "user", void 0);
__decorate([
    property({ type: Array })
], ClientsPage.prototype, "clients", void 0);
__decorate([
    property({ type: Array })
], ClientsPage.prototype, "inquiries", void 0);
__decorate([
    state()
], ClientsPage.prototype, "targetClient", void 0);
__decorate([
    state()
], ClientsPage.prototype, "targetInquiry", void 0);
__decorate([
    state()
], ClientsPage.prototype, "client", void 0);
__decorate([
    state()
], ClientsPage.prototype, "inquiry", void 0);
__decorate([
    state()
], ClientsPage.prototype, "slowMode", void 0);
__decorate([
    state()
], ClientsPage.prototype, "showClientNewFieldPopup", void 0);
__decorate([
    state()
], ClientsPage.prototype, "showInquiryNewFieldPopup", void 0);
__decorate([
    state()
], ClientsPage.prototype, "newMessageDate", void 0);
__decorate([
    state()
], ClientsPage.prototype, "newMessage", void 0);
ClientsPage = __decorate([
    customElement('clients-page')
], ClientsPage);
export { ClientsPage };
//# sourceMappingURL=client-page.js.map