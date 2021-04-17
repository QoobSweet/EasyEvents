import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './content-item-css';

@customElement('content-item')
export class ContentItem extends LitElement {
  static styles = style;

  render() {
    return html`
      <slot name="content"></slot>
    `;
  }
}