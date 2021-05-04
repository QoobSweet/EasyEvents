import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { style } from './clients-display-css';
import '../../../../../components/header-bar/header-bar';
import '../../../../../components/content-item/content-item';

interface Client {
  id: String;
  name: String;
  email: String;
  phone: String | undefined;
  inquiryIds: String[];
}

@customElement('clients-display')
export class ClientsDisplay  extends LitElement {
  @property({ type: Array }) clients = null;
  @property({ type: String }) selectedClient = null;
  static styles = style;


  render() {
    return html`
      <client-list .clients="${this.clients}"></client-list>
    `;
  }
}