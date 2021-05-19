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
  @property({ type: String }) collectionKey = null;
  @property({ type: String }) docKey = null;
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
      items.push(item(entry));
    }
    return items;
  }

  updateValue = (item, value) => {
    console.log(value);
    let e = new CustomEvent('value-changed', {
      detail: {
        data: {
          collectionKey: this.collectionKey,
          docKey: this.docKey,
          fieldKey: item.label,
          value: value
        },
        message: 'value changed'
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(e);
  }

  render() {
    return html`
      <div>
        ${this.title ? html`<h2>${this.title}</h2>`: html``}
        <div class="form">
          ${this.formObject ? this.getForm().map(item => { return html`
            <mwc-textfield
              @change="${e => {
                const path = e.composedPath();
                const input = path[0];
                const value = input.value;
                this.updateValue(item, value);
                // do stuff with the value.
              }}"
              size="${this.size}"
              label="${item.label.toString()}"
              value="${item.value}">
            </mwc-textfield>
          `}) : html``}
        </div>
      </div>
    `;
  }
}