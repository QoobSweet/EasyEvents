import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@material/mwc-textfield';
import { type } from 'os';
import Client from '../../definitions/client';
import { decompressKey, FormItem } from '../../definitions/definitions';
import Inquiry from '../../definitions/inquiry';
import {ServerApi} from '../../api/serverApi';
import { dbDoc } from '../../definitions/dbDoc';
import { style } from './form-wrapper-css';

@customElement('form-wrapper')
export class FormWrapper extends LitElement {
  @property({ attribute: false }) serverApi: ServerApi = null;
  @property({ attribute: false }) docObject: dbDoc  = null;
  @property({ type: String }) title: string = null;
  @property({ type: Number }) size = 20;
  @property({ type: Boolean }) showDelete = false;

  static styles = style;

  getForm = (): FormItem[] => {
    console.log(this.docObject);
    const formItems: FormItem[] = [];

    for (const [key, data] of Object.entries(this.docObject ? this.docObject.accessibleFields() : [])) {
      console.log([key, data]);
      formItems.push({
        label: data.label,
        data: data
      });
    }

    console.log(formItems);
    return formItems;
  }

  deleteForm = () => {
    if (this.serverApi && this.docObject) {
      this.docObject.remove(this.serverApi);
    }
  }

  render() {
    return html`
      <div>
        <div class="form-header">
          ${this.title ? html`<h2>${this.title}</h2>` : html``}
          ${this.showDelete && this.serverApi && this.docObject ? html`
            <div class="button-collection-wrapper">
              <div class="button-collection">
                <div class="button-wrapper">
                  <mwc-icon-button class="delete-icon" icon="delete_forever" @click="${this.deleteForm}"></mwc-icon-button>
                </div>
              </div>
            </div>
          `: html`` }
        </div>
        <div class="form">
          ${this.docObject ? this.getForm().map(formItem => {
            if (formItem.data.type && formItem.data.type !== 'select') {
              return html`
                <mwc-textfield
                  @change="${e => {
                    const path = e.composedPath();
                    const input = path[0];
                    formItem.data.value = input.value;
                    this.docObject.updateField(this.serverApi, formItem.label, formItem.data);
                    // do stuff with the value.
                  }}"
                  size="${this.size}"
                  label="${formItem.data.label}"
                  value="${formItem.data.value}"
                  type="${formItem.data.type}"
                  icon="${formItem.data.type === 'date' ? "event" : ""}"
                  >
                </mwc-textfield>
            `;
            } else {
              //is a selection field broken atm
              console.log(formItem);
              if (!formItem.data.options) { throw new Error("cannot use selection field without also setting options parameter on accessfield.");}
              return html`
                <mwc-select label="${formItem.data.label}"
                  @selected="${(e) => {
                    formItem.data.value = formItem.data.options[e.detail.index];
                    this.docObject.updateField(this.serverApi, formItem.label, formItem.data);
                  }}"
                >
                  ${formItem.data.options.map(option => {
                      return html`<mwc-list-item value="${option}">${decompressKey(option)}</mwc-list-item>`;
                  })}
                </mwc-select>
              `
            }
          }) : html``}
        </div>
      </div>
    `;
  }
}