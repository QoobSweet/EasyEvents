import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import '@material/mwc-textfield';
import { type } from 'os';
import Client from '../../definitions/client';
import { FormItem } from '../../definitions/definitions';
import Inquiry from '../../definitions/inquiry';

@customElement('form-wrapper')
export class FormWrapper extends LitElement {
  @property({ type: String }) title: string = null;
  @property({ type: Object }) formObject = null;
  @property({ type: Number }) size = 20;
  static styles = css`
    :host {
      margin: auto;
    }
    :host .form {
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    h1, h2, h3, h4 {
      margin: 15px;
    }
    mwc-textfield {
      margin: 5px;
    }
  `;

  getForm = ():FormItem[] => {
    const items: FormItem[] = [];
    const item = ([key, value]) => { return { collectionKey: this.formObject.collectionKey, dbKey: this.formObject.id, label: key, value: value }; }
    for (const entry of Object.entries(this.formObject)) {
      console.log(typeof entry[0]);
      if (entry[0] && entry[1] !== null &&
        entry[0] !== 'id' &&
        entry[0] !== 'inquiries' &&
        entry[0] !== 'collectionKey') {
        items.push(item(entry));
      }
    }
    return items;
  }

  render() {
    return html`
      <div>
        ${this.title ? html`<h2>${this.title}</h2>`: html``}
        <div class="form">
          ${this.formObject ? this.getForm().map(item => { return html`
            <mwc-textfield size="${this.size}" label="${item.label.toString()}" value="${item.value}"></mwc-textfield>
          `}) : html``}
        </div>
      </div>
    `;
  }
}