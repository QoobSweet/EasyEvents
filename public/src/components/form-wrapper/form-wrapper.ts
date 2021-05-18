import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import '../../components/input-field/input-field';

export interface FormItem {
  label: String,
  value: String
}

@customElement('form-wrapper')
export class FormWrapper  extends LitElement {
  @property({ type: Array }) items: FormItem[] = null;
  static styles = css`
    :host {
      display: flex;
    }
    :host .form {
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      max-width: 500px;
    }
  `;

  render() {
    console.log(this.items);
    return html`
      <div class="form">
        ${this.items.map(item => {
          return html`<input-field label="${item.label.toString()}" value="${item.value.toString()}"></input-field>`;
        })}
      </div>
    `;
  }
}