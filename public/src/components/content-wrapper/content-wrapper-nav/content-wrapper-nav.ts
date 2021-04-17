import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './content-wrapper-nav-css';

@customElement('content-wrapper-nav')
export class ContentWrapperNav extends LitElement {
  @property({ type: String }) label;
  static styles = style;

  render() {
    return html`
      ${this.label}
    `;
  }
}