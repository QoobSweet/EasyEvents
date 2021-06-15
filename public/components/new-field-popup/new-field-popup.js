var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import ServerApi from '../../api/serverApi';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import '@material/mwc-select';
import { style } from './new-field-popup-css';
let NewFieldPopup = class NewFieldPopup extends LitElement {
    user = null;
    docObject = null;
    fieldValue = null;
    serverApi = ServerApi();
    static styles = style;
    closePopup = () => {
        const event = new CustomEvent('closepopup', {
            detail: {
                message: 'Closing Popup'
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    };
    fieldTypes = [
        ['text', "Text"],
        ['number', "Number"],
        ['email', "Email"],
        ['datetime-local', "Date & Time"],
        ['time', "Time"]
    ];
    submitField = () => {
        if (this.user && this.docObject && this.fieldValue) {
            //valid, get position index
            this.fieldValue.positionIndex = Object.entries(this.docObject).length;
            this.docObject.updateField(this.serverApi, this.fieldValue.label, this.fieldValue);
            this.closePopup();
        }
    };
    render() {
        if (this.fieldValue && this.fieldValue?.type !== 'select' && this.fieldValue?.type !== 'coorespondence') {
            return html `
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
                if (this.fieldValue) {
                    this.fieldValue.type = e.path[9].value.toString();
                    this.requestUpdate();
                }
            }}"
              >
                ${this.fieldTypes.map(fieldType => {
                return html `
                  <mwc-list-item value="${fieldType[0]}">${fieldType[1]}</mwc-list-item>
                `;
            })}
              </mwc-select>
            </div>
            <div id="popup-fields">
              <mwc-textfield
                label="Field Label"
                value=""
                type="text"
                @change="${(e) => {
                if (this.fieldValue) {
                    this.fieldValue.label = e.path[0].value;
                }
            }}"
                >
              </mwc-textfield>
              <mwc-textfield
                label="Field Value"
                value=""
                type="${this.fieldValue.type}"
                @change="${(e) => {
                if (this.fieldValue) {
                    this.fieldValue.value = e.path[0].value;
                }
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
        </div>
      `;
        }
        else {
            return html ``;
        }
    }
};
__decorate([
    property({ type: Object })
], NewFieldPopup.prototype, "user", void 0);
__decorate([
    property({ attribute: false })
], NewFieldPopup.prototype, "docObject", void 0);
__decorate([
    state()
], NewFieldPopup.prototype, "fieldValue", void 0);
NewFieldPopup = __decorate([
    customElement('new-field-popup')
], NewFieldPopup);
export { NewFieldPopup };
//# sourceMappingURL=new-field-popup.js.map