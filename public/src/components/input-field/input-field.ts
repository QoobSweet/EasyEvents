import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';

@customElement('input-field')
export class InputField extends LitElement {
  @property() label: string = "";
  @property() value: string = "";
  static styles = css`
    :host {
    }
    .custom-field {
      margin-bottom: 5px;
      min-width: 250px;
      max-width: 400px;
    }
    input {
      float: right;
      width: 50%;
      min-width: 100px;
      max-width: 200px;
    }
  `;


  render() {
    return html`
      <div class="custom-field">
        <label>${this.label}</label>
        <input type="text" id="test" value="${this.value}" >
      </div>
    `;
  }
}