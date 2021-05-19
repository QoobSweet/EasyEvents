import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

interface fieldTypes {
  
}

@customElement('content-item')
export class ContentItem extends LitElement {
  static styles = css`
    :host {
      display: flex;
      margin: 15px;
      flex-direction: column;
      min-width:40%;
      max-width: 80%;
      min-height:40%;
      overflow: hidden;
      background-color: #E1E2E1;
    }`

  render() {
    return html`
      <slot></slot>
    `;
  }
}