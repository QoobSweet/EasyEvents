import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './content-wrapper-nav-css';

@customElement('content-wrapper-nav')
export class ContentWrapperNav extends LitElement {
  @property({ type: String }) label;
  @property({ type: Array }) items;
  static styles = style;

  render() {
    return html`
      <slot name="title-bar"></slot>
      <div id="navigation-body">
        ${this.items.map(item => html`
          <div id="navigation-item-${item.label.toLowerCase()}" class="navigation-body-item">
            <h2>${item.label}</h2>
          </div>
        `)}
      </div>
    `;
  }
}