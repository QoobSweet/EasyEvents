import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { type } from 'os';
import '../../components/input-field/input-field';
import Client from '../../definitions/client';
import { FormItem } from '../../definitions/definitions';
import Inquiry from '../../definitions/inquiry';

@customElement('form-wrapper')
export class FormWrapper extends LitElement {
  @property({ type: String }) title: string = null;
  @property({ type: Object }) formObject = null;
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
            <input-field .item="${item}"></input-field>`;
          }) : html``}
        </div>
      </div>
    `;
  }
}