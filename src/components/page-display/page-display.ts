import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './page-display-css';



@customElement('page-display')
export class PageDisplay extends LitElement {
  @property({ attribute: false }) pageOutput = html``;
  static styles = style;

  render() {
    return html`
      <slot name="header-bar"></slot>
      <slot name="content"></slot>
    `;
  }
}