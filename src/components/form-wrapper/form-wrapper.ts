import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/mwc-textfield';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-select';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { compressKey, decompressKey, FormItem, UserI } from '../../definitions/definitions';
import ServerApi from '../../api/serverApi';
import { DbDoc } from '../../definitions/dbDoc';
import { style } from './form-wrapper-css';

@customElement('form-wrapper')
export class FormWrapper extends LitElement {
  @property({ type: Object }) user: UserI | null = null;
  @property({ type: Object }) docObject: DbDoc | null = null;
  @property({ type: String }) title = '';
  @property({ type: Number }) size = 20;
  @property({ type: Boolean }) showDelete = false;
  serverApi = ServerApi();

  static styles = style;

  getForm = (): FormItem[] => {
    console.log(this.docObject);
    const formItems: FormItem[] = [];

    if (this.docObject) {
      const fields = this.docObject.accessibleFields();
      fields.forEach(field => {
        formItems.push({
          label: field.label,
          data: field
        });
      })
    }

    console.log(formItems);
    return formItems;
  }

  deleteForm = () => {
    if (this.user && this.serverApi && this.docObject) {
      this.docObject.remove(this.user, this.serverApi);
    }
  }

  toggleFieldLock = (key: string) => {
    console.log("toggling: " + key);
    if (this.user && this.docObject) {
      if (this.docObject.lockedFields) {
        const lockedFields = this.docObject.lockedFields;
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
    }
    this.requestUpdate();
  }

  updateField = (formItem: FormItem, event: Event) => {
    if (this.user && this.docObject) {
      const path = event.composedPath();
      formItem.data.value = (path[0] as HTMLInputElement).value;
      this.docObject.updateField(this.serverApi, formItem.label, formItem.data);
    }
    // do stuff with the value.
  }
  updateSelect = (formItem: FormItem, event: any) => {
    if (this.user && this.docObject) {
      if (event.detail.index && formItem.data.options) {
        formItem.data.value = formItem.data.options[event.detail.index];
        this.docObject.updateField(this.serverApi, formItem.label, formItem.data);
      }
    }
  }

  checkLocked = (key: string): Boolean => {
    if (this.user && this.docObject) {
      if (!this.docObject.lockedFields || this.docObject.lockedFields.indexOf(key.toString()) === -1) {
        return true;
      }
    }
    return false;
  }

  render() {
    if (this.user && this.docObject) {
      return html`
        <div>
          <div class="form-header">
            ${this.title ? html`<h2>${this.title}</h2>` : html``}
            ${this.showDelete && this.serverApi && this.docObject
              ? html`
                <div class="button-collection-wrapper">
                  <div class="button-collection">
                    <div class="button-wrapper">
                      <mwc-icon-button class="delete-icon" icon="delete_forever" @click="${this.deleteForm}"></mwc-icon-button>
                    </div>
                  </div>
                </div>
              `: html``}
          </div>
          <div class="form">
            ${this.getForm().map(formItem => {
              if (formItem.data.type && formItem.data.type !== 'select' && formItem.data.type !== 'coorespondence') {
                const key = compressKey(formItem.label);

                //check for locked fields as they should be rendered, yet disabled
                return this.checkLocked(key) ? html`
                  <div class="field-wrapper">
                    <mwc-textfield
                      @change="${(event: Event) => { this.updateField(formItem, event); }}"
                      size="${this.size}"
                      label="${formItem.data.label}"
                      value="${formItem.data.value}"
                      type="${formItem.data.type}"
                      icon="${formItem.data.type === 'date' ? "event" : ""}"
                      >
                      <mwc-icon class="lock-field-button">lock</mwc-icon>
                    </mwc-textfield>
                    <mwc-icon-button class="field-lock-button" icon="lock" @click="${() => this.toggleFieldLock(key)}"></mwc-icon-button>
                  </div>`
                : html`
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
                  </div>`;
              } else {
                //is a selection **Selection fields cannot be locked as of now.
                console.log(formItem);
                if (!formItem.data.options) { throw new Error("cannot use selection field without also setting options parameter on accessfield."); }
                return html`
                  <mwc-select label="${formItem.data.label}" @selected="${(event: any) => { this.updateSelect(formItem, event); }}">
                    ${formItem.data.options.map(option => { return formItem.data.value === option
                      ? html`<mwc-list-item value="${option}" selected>${decompressKey(option)}</mwc-list-item>`
                      : html`<mwc-list-item value="${option}">${decompressKey(option)}</mwc-list-item>`;
                    })}
                  </mwc-select>
                `;
              }
            })}
          </div>
        </div>
      `;
    } else {
      return html`Loading...`;
    }
  }
}