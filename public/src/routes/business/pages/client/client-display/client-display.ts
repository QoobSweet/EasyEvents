import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import '@material/mwc-button';
import { Client } from '../client-index';
import { FormItem } from '../../../../../components/form-wrapper/form-wrapper';
import '../../../../../components/form-wrapper/form-wrapper';

@customElement('client-display')
export class ClientDisplay  extends LitElement {
  @property({ type: Object }) client: Client = null;
  @property({ type: String }) selectedClient = null;
  static styles = css`
    :host {
      width: 100%;
    }
    #client-information {
      width: 100%;
    }
  `;

  items = (): FormItem[] => {
    const tmp = [
      { label: 'Name', value: this.client.name.toString() },
      { label: 'Phone', value: this.client.phone.toString() },
      { label: 'Email', value: this.client.email.toString() } 
    ]
    console.log(tmp);
    return tmp;
  }

  render() {
    console.log(this.client);
    return html`
      <div id="client-information">
        <form-wrapper .items="${this.items()}"></form-wrapper>
        <mwc-button raised label="testing"></mwc-button>
      </div>
      <div id="client-correspondence">
      </div>
    `;
  }
}