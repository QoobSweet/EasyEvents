import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ServerApi } from '../../api/serverApi';
import { dbDoc } from '../../definitions/dbDoc';
import { AccessData } from '../../definitions/definitions';
import { style } from './new-field-popup-css';

interface fieldTypes {
  
}

@customElement('new-field-popup')
export class NewFieldPopup extends LitElement {
  @property({ attribute: false }) serverApi: ServerApi = null;
  @property({ attribute: false }) targetForm: dbDoc = null;
  @state() fieldValue = {label: null, value: null, type: null, positionIndex: 0};

  static styles = style;

  closePopup = () => {
    let event = new CustomEvent('closepopup', {
      detail: {
        message: 'Closing Popup'
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  
  fieldTypes = [
    ['text', "Text"],
    ['number', "Number"],
    ['email', "Email"],
    ['datetime-local', "Date & Time"],
    ['time', "Time"]
  ]

  submitField = (e) => {
    if (this.fieldValue.type, this.fieldValue.label && this.fieldValue.value) {
      //valid, get position index
      let i = 0;
      for (const entry of Object.entries(this.targetForm)) {
        i++;
      }
      this.fieldValue.positionIndex = i;

      this.targetForm.updateField(this.serverApi, this.fieldValue.label, this.fieldValue);
      this.closePopup();
    }
  }
  
  render() {
    return html`
    <div id="new-field-popup">
      <div id="pop-up-window">
        <div class="button-collection-wrapper">
          <h2>Insert New Field</h2>
          <div class="button-collection">
            <div class="button-wrapper">
              <mwc-icon-button class="delete-icon" icon="close" @click="${this.closePopup}"></mwc-icon-button>
            </div>
          </div>
        </div>
        <div id="popup-fields">
          <mwc-select label="Field Type"
            @selected="${(e) => {
              this.fieldValue.type = e.path[9].value.toString();
              this.requestUpdate();
            }}"
          >
            ${this.fieldTypes.map(fieldType => {
                return html`<mwc-list-item value="${fieldType[0]}">${fieldType[1]}</mwc-list-item>`;
            })}
          </mwc-select>
        </div>
        <div id="popup-fields">
          <mwc-textfield
            label="Field Label"
            value=""
            type="text"
            @change="${(e) => {
              this.fieldValue.label = e.path[0].value
            }}"
            >
          </mwc-textfield>
          <mwc-textfield
            label="Field Value"
            value=""
            type="${this.fieldValue.type}"
            @change="${(e) => {
              this.fieldValue.value = e.path[0].value
            }}"
            >
          </mwc-textfield>
        </div>
        <div id="popup-fields">
        <div class="button-collection-wrapper">\
          <div class="button-collection">
            <div class="button-wrapper">
              <mwc-button outlined
                label="Submit"
                @click="${this.submitField}"
                >
              </mwc-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}