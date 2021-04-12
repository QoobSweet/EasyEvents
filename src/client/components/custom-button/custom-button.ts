import { LitElement, html, customElement, property, css } from 'lit-element';
import { style } from './custom-button-css';

@customElement('custom-button')
export class CustomButton extends LitElement {
  @property({ type: String }) id = '';
  @property({ type: String }) height = "30px";
  @property({ type: String }) width = "60px";
  //@property({ type: String }) style = "action";
  
  static styles = style;

  render() {
    return html`
    <button></button>

    </button>
  `;}
}