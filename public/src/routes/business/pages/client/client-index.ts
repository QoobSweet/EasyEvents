import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { style } from './client-index-css';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import '../../../../components/header-bar/header-bar';
import '../../../../components/form-wrapper/form-wrapper';
import '../../../../components/content-item/content-item';
import '../../../../components/events-calendar/events-calendar';
import './client-list/client-list';
import './client-display/client-display';

export interface InquiryState {
  label: String;
  color: String;
}

@customElement('clients-index')
export class ClientsIndex extends LitElement {
  @property({ type: Object }) serverApi = null;
  @property({ type: Array }) clients = null;
  @state() selectedClient = this.clients ? this.clients[0].id : null;
  @state() selectedInquiry = this.clients
    ? this.clients[0].inquiries
      ? this.clients[0].inquiries[0].id
      : null
    : null;

  static styles = style;

  createClient = (e) => {
    let newClient = 
    this.serverApi.createDoc('clients', )
    console.log('testing');
  }

  handleClientSelectionEvent = (e) => {
    this.selectedClient = e.detail.data;
  }
  handleInquirySelectionEvent = (e) => {
    this.selectedInquiry = e.detail.data;
  }

  render() { return html`
    <mwc-drawer slot="content">
      <mwc-list activatable>
        ${this.clients.map(client => {
          if (this.selectedClient === client.id) {return html`
            <li divider role="separator"></li>
            <mwc-list-item graphic="avatar" twoline @click="${() => { this.selectedClient = client.id; window.scrollTo(0, 0); }}" selected activated>
              <span>${client.name}</span>
              <span slot="secondary">${client.email}</span>
              <mwc-icon slot="graphic" class="inverted">account_circle</mwc-icon>
            </mwc-list-item>
            `
          } else {return html`
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
        <mwc-icon-button class="add-inquiry" icon="note_add"></mwc-icon-button>
          ${this.selectedClient 
          ? html`
            <content-item>
              <form-wrapper>

              </form-wrapper>
              <mwc-drawer hasHeader>

              </mwc-drawer>
            </content-item>
            <content-item>
              <events-calendar>
              </events-calendar>
            </content-item>
          `
          : html`
            <content-item>
              <events-calendar>
              </events-calendar>
            </content-item>
          `}
        </content-item>
      </div>
    </mwc-drawer>
  `}
}