import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import { style } from './content-item-css';

interface fieldTypes {
  
}

@customElement('content-item')
export class ContentItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      margin: 20px auto 20px auto;
      flex-direction: column;
      min-width:40%;
      width: 80%;
      min-height:40%;
      overflow: hidden;
      background-color: #E1E2E1;
    }
    ::slotted(*) {
      height: 50%;
    }`

  render() {
    return html`
      <slot></slot>
    `;
  }
}