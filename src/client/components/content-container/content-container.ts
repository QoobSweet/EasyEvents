import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './content-container-css';
import './content-container-nav/content-container-nav';

@customElement('content-container')
export class ContentContainer extends LitElement {
  static styles = style;

  render() {
    return html`
      <content-container-nav></content-container-nav>
    `;
  }
}