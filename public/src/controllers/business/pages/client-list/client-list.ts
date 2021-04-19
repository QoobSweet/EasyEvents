import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './client-list-css';

interface Client {
  id: String;
  name: String;
  email: String;
  phone: String | undefined;
  inquiryIds: String[];
}

@customElement('client-list')
export class ClientList  extends LitElement {
  @property({ type: String }) clients;
  static styles = style;

  render() {
    return html`
      testing
    `;
  }
}