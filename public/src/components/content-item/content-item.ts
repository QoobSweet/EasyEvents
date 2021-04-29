import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators';
import { style } from './content-item-css';

interface fieldTypes {
  
}

@customElement('content-item')
export class ContentItem extends LitElement {
  static styles = style;

  render() {
    return html`
      <slot name="title-bar"></slot>
      <slot name="content"></slot>
    `;
  }
}