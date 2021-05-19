import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { FormItem } from '../../definitions/definitions';

@customElement('input-field')
export class InputField extends LitElement {
  @property({ type: Object }) item: FormItem = null;

  static styles = css`
    :host {
      margin-left: 15px;
      margin-top: 5px;
      width: 45%;
    }
    .custom-field {
      margin-bottom: 5px;
      max-width: 250px;
    }
    .custom-field label {
      max-width: 100px;
    }
    input {
      float: right;
      width: 50%;
      min-width: 100px;
      max-width: 200px;
    }
  `;

  updateValue = (item, value) => {
    let e = new CustomEvent('value-changed', {
      detail: {
        data: { item: item, value: value },
        message: 'value changed'
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(e);
    this.item.value = value;
  }

  decompressKey = (key) => {
    let _key = key.replace(/([A-Z])/g, ' $1').trim();
    return (_key.charAt(0).toUpperCase() + _key.slice(1));
  }

  render() {
    return html`
      <div class="custom-field">
        <label>${this.decompressKey(this.item.label)}:</label>
        <input
          type="text"
          id="test"
          value="${this.item.value}" 
          @change="${(e) => { this.updateValue(this.item, e.target.value); }}"
        >
      </div>
    `;
  }
}