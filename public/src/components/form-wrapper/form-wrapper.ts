import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import '../../components/input-field/input-field';
import { FormItem } from '../../definitions/definitions';

@customElement('form-wrapper')
export class FormWrapper extends LitElement {
  @property({ type: String }) title: string = null;
  @property({ type: Array }) items: FormItem[] = null;
  static styles = css`
    :host {
      margin: auto;
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
      <div>
        ${this.title ? html`<h2>${this.title}</h2>`: html``}
        <div class="form">
          ${this.items.map(item => { return html`
            <input-field .item="${item}"></input-field>`;
          })}
        </div>
      </div>
    `;
  }
}