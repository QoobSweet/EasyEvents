import { LitElement, html, customElement, property, css } from 'lit-element';
import { style } from './page-display-css';
import '../flex-banner/flex-banner';
import '../content-container/content-container';

@customElement('page-display')
export class PageDisplay extends LitElement {
  static styles = style;

  _hidePanel = (e: HTMLButtonElement) => {
  }

  render() {
    return html`
      <flex-banner
        name = "header-banner"
      ></flex-banner>
      <content-container></content-container>
    `;
  }
}