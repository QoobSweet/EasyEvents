import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import { style } from './client-list-css';
import '../../../../components/header-bar/header-bar';
import '../../../../components/content-item/content-item';

interface Client {
  id: String;
  name: String;
  email: String;
  phone: String | undefined;
  inquiryIds: String[];
}

@customElement('client-list')
export class ClientList  extends LitElement {
  @property({ type: Array }) clients = null;
  static styles = style;

  sortOrderType: String = "name";
  sortOrder: 'asc' | 'dec' = "asc"

  sortArray = (e) => {
    const path:String = e.path[0].id;
    switch (path) {
      case "name":
        this.clients.sort((a,b) => (a.name > b.name) ? 1 : -1)
        break;
      case "phone":
        this.clients.sort((a,b) => (a.phone > b.phone) ? 1 : -1)
        break;
      case "email":
        this.clients.sort((a,b) => (a.email > b.email) ? 1 : -1)
        break;
      case "inquiry-count":
        this.clients.sort((a, b) =>
          ((a.inquiries ? a.inquiries.length : "0") >
            (b.inquiries ? b.inquiries.length : "0"))
          ? 1 : -1)
        break;
      case "inquiry-date":
        break;
      case "last-coorespondence":
        break;
    }
    this.requestUpdate();
  }


  render() {
    console.log(this.clients);
    return html`
      <content-item>
        <header-bar slot="header-bar" label="Clients"></header-bar>
        <table slot="content" class="tg">
          <thead>
            <tr>
              <th id="name" class="tg-0lax sort-object" @click="${this.sortArray}">Name</th>
              <th id="phone" class="tg-0lax sort-object" @click="${this.sortArray}">Phone</th>
              <th id="email" class="tg-0lax sort-object" @click="${this.sortArray}">Email</th>
              <th id="inquiry-count" class="tg-0lax sort-object" @click="${this.sortArray}">Inquiry Count</th>
              <th id="inquiry-date" class="tg-0lax sort-object" @click="${this.sortArray}">Inquiry Date</th>
              <th id="last-coorespondence" class="tg-0lax sort-object" @click="${this.sortArray}">Last Corespondence</th>
            </tr>
            ${this.clients.map(client => { return html`
            <tr class="client-item" data-clientId="${client.id}">
              <th class="tg-0lax">${client.name}</th>
              <th class="tg-0lax">${client.phone}</th>
              <th class="tg-0lax">${client.email}</th>
              <th class="tg-0lax">${client.inquiries ? client.inquiries.length : "0"}</th>
              <th class="tg-0lax">00/00/0000</th>
              <th class="tg-0lax">00/00/0000</th>
            </tr>
            `})}
          </thead>
        </table>
      </content-item>
    `;
  }
}