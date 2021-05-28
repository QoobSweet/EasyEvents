import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@material/mwc-textfield';
import { type } from 'os';
import Client from '../../definitions/client';
import { FormItem } from '../../definitions/definitions';
import Inquiry from '../../definitions/inquiry';
import {ServerApi} from '../../api/serverApi';
import { dbDoc } from '../../definitions/dbDoc';

@customElement('form-wrapper')
export class FormWrapper extends LitElement {
  @property({ type: Object }) serverApi: ServerApi = null;
  @property({ type: Object }) docObject: dbDoc  = null;
  @property({ type: String }) title: string = null;
  @property({ type: Number }) size = 20;
  @property({ type: Boolean }) showDelete = false;

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
      margin: auto 15px;
    }
    mwc-textfield {
      margin: 5px;
      flex-grow: 1;
    }
    span {
      width: 100%;
    }
    .form-header {
      display: flex;
    }
    .delete-icon {
      color: red;
    }
    .button-collection-wrapper {
      margin: auto;
      flex-grow: 1;
    }

    .button-collection {
      margin: auto;
      float: right;
    }

    .button-wrapper {
      float: right;
      margin: 5px;
    }
  `;

  getForm = ():FormItem[] => {
    const formItems: FormItem[] = [];

    for (const [key, data] of Object.entries( this.docObject ? this.docObject.accessibleFields() : [])) {
      formItems.push({
        label: data.label,
        data: data
      });
    }
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
              return html`<span></span>`
            }
          }) : html``}
        </div>
      </div>
    `;
  }
}