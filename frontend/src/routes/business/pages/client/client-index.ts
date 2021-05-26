import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { style } from './client-index-css';
import '@material/mwc-drawer';
import '@material/mwc-button';
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
import { ServerApi } from '../../../../api/serverApi';
import Client from '../../../../definitions/client';
import Inquiry from '../../../../definitions/inquiry';
import e from 'cors';

export interface InquiryState {
  label: String;
  color: String;
}

@customElement('clients-index')
export class ClientsIndex extends LitElement {
  @property({ type: Object }) serverApi: ServerApi = null;
  @property({ type: Array }) clients = null;
  @property({ type: Array }) inquiries = null;
  @state() targetClient: string = null;
  client: Client = null;
  @state() targetInquiry: string = null;
  inquiry: Inquiry = null;
  @state() slowMode: Boolean = false;
  static styles = style;

  selectClient = (id: string) => {
    this.targetClient = id;
  }
  selectInquiry = (id: string) => {
    this.targetInquiry = id;
  }

  createNewClient = () => {
    console.log("testing");
    new Client().init(this.serverApi, (id) => {
      this.targetClient = id
    });
  }
  createNewInquiry = () => {
    const entry = new Inquiry();
    entry.init(this.serverApi, (id) => {
      this.client.linkInquiry(id);
      this.targetInquiry = id;
    });
  }

  /**
   * @property id target client id
   * @returns target | first existing | newly created Client if none exist
   */
  getClient = (): Client => {
    if (this.clients) {
        //create the instance
      const entry = new Client();
      console.log(entry);
      //retrieve raw client data of target id or first entry
      console.log("merging");
      const rawEntry = this.targetClient ? this.clients.filter(client => client.id === this.targetClient)[0] : this.clients[0];
      console.log(rawEntry);
      if (rawEntry) { entry.mergeModel(rawEntry); }
      entry.init(this.serverApi);
      
      this.targetClient = entry.id;
      this.client = entry;
      return this.client;
    } else {
      throw new Error('Clients have not been loaded yet.');
    }
  }

  getInquiry = (): Inquiry => {
    if (this.client && this.inquiries) {
        //create new instance
        const entry = new Inquiry();
        //retrieve raw inquiry data of target id or first entry
        const rawEntry = this.targetInquiry ? this.inquiries.filter(inquiry => inquiry.id === this.targetInquiry)[0] : this.inquiries[0];
      if (rawEntry) { entry.mergeModel(rawEntry); }
      entry.init(this.serverApi);
      
      this.targetInquiry = entry.id;
      this.inquiry = entry;
      return this.inquiry;
    } else {
      throw new Error('Inquiries have not been loaded yet.');
    }

  }

  removeInquiry = () => {
    this.client.removeInquiry(this.inquiry.id);
    this.inquiry.remove();
  }

  updateDB = (event) => {
    const data = event.detail.data;

    const collectionKey = data.collectionKey;
    const docKey = data.docKey;
    const fieldValue = data.value;
    const fieldKey = data.fieldKey;

    console.log([collectionKey, docKey, fieldKey, fieldValue])
    //push change to database
    this.serverApi.setFieldValue(collectionKey, docKey, fieldKey, fieldValue);
  }

  updated = () => {
      if (this.clients) {
        if (!this.client || this.client.id !== this.targetClient) {
          this.getClient();
        }
      }
      if (this.clients && this.inquiries) {
        if (!this.inquiry || this.inquiry.id !== this.targetInquiry) {
          this.getInquiry();
        }
      }
  }
  
  render() {
    if (this.clients && this.inquiries && this.client && this.inquiry) {
      return html`
        <mwc-drawer slot="content">
          <mwc-list activatable>
            <!-- Map all Clients as list items -->
            ${this.clients.map(client => {
              if (client.id === this.client.id) {
                return html`
                  <!-- Client list item -->
                  <mwc-list-item graphic="avatar" twoline selected activated>
                    <span>${client.name}</span>
                    <span slot="secondary">${client.email}</span>
                    <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
                  </mwc-list-item>
                  
                  <!-- Map Client Inquiries list items -->
                  <mwc-list class="nested">
                    ${this.inquiries && this.inquiries.length > 0 ? client.inquiries.map(inquiryId => {
                      //grab target inquiry
                      const inquiry = this.inquiries.filter(rawEntry => rawEntry.id === inquiryId)[0];
                      if (inquiry.id === this.inquiry.id) {
                        return html`
                          <mwc-list-item class="inquiry-list-item" graphic="icon" selected activated>
                            ${inquiry.businessName}
                            <mwc-icon slot="graphic" class="inverted">subdirectory_arrow_right</mwc-icon>
                          </mwc-list-item>
                        `;
                      } else {
                        return html`
                          <mwc-list-item class="inquiry-list-item" graphic="icon" @click="${() => { this.selectInquiry(inquiry.id); }}">
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
            })}
          </mwc-list>
          <div slot="appContent" style="display:flex; height: 100%;">
            <mwc-icon-button id="add-client-button" title="Add Client" icon="note_add" @click="${this.createNewClient}"></mwc-icon-button>
                <content-item id="client-info">
                  <h1 class="title-bar indented">${this.client.name}</h1>

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
                          <mwc-button unelevated label="Delete Client" icon="delete_forever" @click="${this.client.remove}"></mwc-button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="rounded">

                  <!-- Inquiry Info -->
                  <div id="inquiry-info">
                    <!-- show form if inquiry selected -->
                    <form-wrapper
                      @value-changed="${this.updateDB}" 
                      .size="${20}" 
                      .title="${'Inquiry Info'}"
                      .formObject="${this.inquiry.accessibleFields()}"
                      .collectionKey="${this.inquiry.collectionKey}"
                      .docKey="${this.inquiry.id}"
                    >
                    </form-wrapper>
                    <div class="button-collection">
                      <div class="button-wrapper">
                        <mwc-button unelevated label="New Inquiry" icon="note_add" @click="${this.createNewInquiry}"></mwc-button>
                      </div>
                      <!-- provide delete button if inquiry is selected -->
                      <div class="button-wrapper">
                        <mwc-button unelevated label="Delete Inquiry" icon="delete_forever" @click="${this.inquiry.remove}"></mwc-button>
                      </div>
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
              <content-item id="calendar">
<!--                 <events-calendar
                  .inquiries= "${this.inquiries}"
                >
                </events-calendar> -->
              </content-item>
          </div>
        </mwc-drawer>
      `;
    } else {
      return html`Loading...`;
    }
  }
}