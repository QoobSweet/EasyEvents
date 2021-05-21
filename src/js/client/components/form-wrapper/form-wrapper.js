var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import '@material/mwc-textfield';
let FormWrapper = class FormWrapper extends LitElement {
    constructor() {
        super(...arguments);
        this.title = null;
        this.formObject = null;
        this.collectionKey = null;
        this.docKey = null;
        this.size = 20;
        this.getForm = () => {
            const items = [];
            const item = ([key, data]) => {
                return {
                    collectionKey: this.formObject.collectionKey,
                    dbKey: this.formObject.id,
                    label: key,
                    data: data
                };
            };
            for (const entry of Object.entries(this.formObject)) {
                items.push(item(entry));
            }
            return items;
        };
        this.updateValue = (item, value) => {
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
        };
        this.decompressKey = (key) => {
            let _key = key.replace(/([A-Z])/g, ' $1').trim();
            return (_key.charAt(0).toUpperCase() + _key.slice(1));
        };
    }
    render() {
        return html `
      <div>
        ${this.title ? html `<h2>${this.title}</h2>` : html ``}
        <div class="form">
          ${this.formObject ? this.getForm().map(item => {
            if (item.data.type) {
                return html `
                <mwc-textfield
                  @change="${e => {
                    console.log(e);
                    const path = e.composedPath();
                    console.log(path);
                    const input = path[0];
                    console.log(input.validity);
                    const value = input.value;
                    this.updateValue(item, value);
                    // do stuff with the value.
                }}"
                  size="${this.size}"
                  label="${this.decompressKey(item.label)}"
                  value="${item.data.value}"
                  type="${item.data.type}"
                  icon="${item.data.type === 'date' ? "event" : ""}"
                  >
                </mwc-textfield>
            `;
            }
            else {
                return html `<span></span>`;
            }
        }) : html ``}
        </div>
      </div>
    `;
    }
};
FormWrapper.styles = css `
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
  `;
__decorate([
    property({ type: String })
], FormWrapper.prototype, "title", void 0);
__decorate([
    property({ type: Object })
], FormWrapper.prototype, "formObject", void 0);
__decorate([
    property({ type: String })
], FormWrapper.prototype, "collectionKey", void 0);
__decorate([
    property({ type: String })
], FormWrapper.prototype, "docKey", void 0);
__decorate([
    property({ type: Number })
], FormWrapper.prototype, "size", void 0);
FormWrapper = __decorate([
    customElement('form-wrapper')
], FormWrapper);
export { FormWrapper };
