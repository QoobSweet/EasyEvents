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
    }
    .custom-field {
      margin-bottom: 5px;
      max-width: 250px;
    }
    input {
      float: right;
      width: 50%;
      max-width: 200px;
    }
  `;

  updateValue = (item, value) => {
    console.log(value);
    let e = new CustomEvent('value-changed', {
      detail: {
        data: { item: item, value: value },
        message: 'value changed'
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(e);
  }
  
  render() {
    return html`
      <div class="custom-field">
        <label><b>${(this.item.label[0].toUpperCase() + this.item.label.substring(1))}:</b></label>
        <input
          type="text"
          id="test"
          value="${this.item.value.toString()}" 
          @change="${(e) => { this.updateValue(this.item, e.target.value); }}"
        >
      </div>
    `;
  }
}