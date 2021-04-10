import { LitElement, html, customElement, property, css } from 'lit-element';
import { style } from './page-display-css';
import '../header-bar-flex/header-bar-flex';
import '../content-container/content-container';

@customElement('page-display')
export class PageDisplay extends LitElement {
  static styles = style;

  _hidePanel = (e: HTMLButtonElement) => {
  }

  render() {
    return html`
      <header-bar-flex></header-bar-flex>
      <content-container></content-container>
    `;
  }
}