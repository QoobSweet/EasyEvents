import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';

@customElement('input-field')
export class InputField extends LitElement {
  @property() label: string = "";
  @property() value: string = "";
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


  render() {
    return html`
      <div class="custom-field">
        <label><b>${(this.label[0].toUpperCase() + this.label.substring(1))}:</b></label>
        <input type="text" id="test" value="${this.value}" >
      </div>
    `;
  }
}