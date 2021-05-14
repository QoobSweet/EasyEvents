import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import '@material/mwc-button';
import '@material/mwc-drawer';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { Client, Inquiry } from '../../../../../definitions/definitions';
import { FormItem } from '../../../../../components/form-wrapper/form-wrapper';
import '../../../../../components/form-wrapper/form-wrapper';

@customElement('client-display')
export class ClientDisplay extends LitElement {
  @property({ type: Array }) clients = {};
  @property({ type: Object }) client: Client = null;
  @property({ type: String }) selectedClient = null;
  @property({ type: String }) selectedInquiry = null;

  static styles = css`
    :host {
      width: 100%;
      flex-grow: 1;
    }
    #client-information {
      display: flex;
      width: 100%;
      height: 100%;
    }
    #client-information mwc-drawer {

    }
  `;

  items = (): FormItem[] => {
    const tmp = [
      { label: 'Name', value: this.client.name },
      { label: 'Phone', value: this.client.phone },
      { label: 'Email', value: this.client.email } 
    ]
    console.log(tmp);
    return tmp;
  }

  render() {
    console.log(this.client);
    return html`
      <div id="client-information">
        <mwc-drawer hasHeader>
          <span slot="title">${this.client.name}</span>
          <form-wrapper .items="${[
            { label: 'Name', value: this.client.name.toString() },
            { label: 'Phone', value: this.client.phone.toString() },
            { label: 'Email', value: this.client.email.toString() } 
          ]}"></form-wrapper>
        </mwc-drawer>
      </div>
      <div id="client-correspondence">
      </div>
    `;
  }
}