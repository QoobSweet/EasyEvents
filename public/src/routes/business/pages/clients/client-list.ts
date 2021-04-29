import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
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
  @property() clients = null;
  static styles = style;

  render() {
    console.log(this.clients);
    return html`
      <table class="tg">
        <thead>
          <tr>
            <th class="tg-0lax">Name</th>
            <th class="tg-0lax">Phone</th>
            <th class="tg-0lax">Email</th>
            <th class="tg-0lax">Inquiry Count</th>
          </tr>
          ${this.clients.map(client => { return html`
            <tr>
              <th class="tg-0lax">${client.name}</th>
              <th class="tg-0lax">${client.phone}</th>
              <th class="tg-0lax">${client.email}</th>
              <th class="tg-0lax">${client.inquiries ? client.inquiries.length : "0"}</th>
            </tr>
          `})}
        </thead>
      </table>
    `;
  }
}