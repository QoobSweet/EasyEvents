import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@material/mwc-textfield';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-select';
import '@material/mwc-list';
import { compressKey, decompressKey, FormItem } from '../../definitions/definitions';
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

  toggleFieldLock = (key) => {
    console.log("toggling: " + key);
    if (this.docObject.lockedFields) {
      let lockedFields = this.docObject.lockedFields;
      const i = lockedFields.indexOf(key);
      console.log(i);
      console.log(this.docObject.lockedFields);

      if (i !== -1) {
        lockedFields.splice(i, 1);
      } else {
        lockedFields.push(key);
      }
      this.docObject.updateField(this.serverApi, 'lockedFields', lockedFields);
    } else {
      const lockedFields = [key];
      this.docObject.updateField(this.serverApi, 'lockedFields', lockedFields);
    }
    this.requestUpdate();
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
              if (formItem.data.type && formItem.data.type !== 'select' && formItem.data.type !== 'coorespondence') {
                const key = compressKey(formItem.label);

                //check for locked fields as they should be rendered, yet disabled
                if (!this.docObject.lockedFields || this.docObject.lockedFields.indexOf(key.toString()) === -1) {
                  return html`
                    <div class="field-wrapper">
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
                        <mwc-icon class="lock-field-button">lock</mwc-icon>
                      </mwc-textfield>
                      <mwc-icon-button class="field-lock-button" icon="lock" @click="${() => this.toggleFieldLock(key)}"></mwc-icon-button>
                    </div>
                  `;
                } else {
                  return html`
                    <div class="field-wrapper">
                      <mwc-textfield
                        size="${this.size}"
                        label="${formItem.data.label}"
                        value="${formItem.data.value}"
                        type="${formItem.data.type}"
                        icon="${formItem.data.type === 'date' ? "event" : ""}"
                        disabled
                        >
                        <mwc-icon class="lock-field-button">lock_open</mwc-icon>
                      </mwc-textfield>
                      <mwc-icon-button class="field-lock-button" icon="lock_open" @click="${() => this.toggleFieldLock(key)}"></mwc-icon-button>
                    </div>  
                  `;
                }
              } else {
                //is a selection
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
                      if (formItem.data.value === option) {
                        return html`<mwc-list-item value="${option}" selected>${decompressKey(option)}</mwc-list-item>`;
                      } else {
                        return html`<mwc-list-item value="${option}">${decompressKey(option)}</mwc-list-item>`;
                      }
                    })}
                  </mwc-select>
                `
              }
            }) : html``}
          </div>
        </div>
      </div>
    `;
  }
}