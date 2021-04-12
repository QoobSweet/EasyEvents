import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './flex-banner-css';

@customElement('flex-banner')
export class FlexBanner extends LitElement {
  @property({ type: String }) name = "";
  static styles = style;

  render() {
    return html`
    <img
      id="background-image"
      class="${this.name !== "" ? '-' + this.name : {} }"
      src="./frontend/public/images/placeholder-banner.jpg"
    ></img>
    <slot></slot>
    `;
  }
}