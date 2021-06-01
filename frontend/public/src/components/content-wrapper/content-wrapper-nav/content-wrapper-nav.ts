import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { style } from './content-wrapper-nav-css';

@customElement('content-wrapper-nav')
export class ContentWrapperNav extends LitElement {
  @property({ type: String }) label;
  @property({ type: Array }) items;
  static styles = style;

  selectItem = (item) => {
    let event = new CustomEvent('page-selected', {
      detail: {
        data: {page: item.target},
        message: 'Page Item Selected'
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
   }
  
  render() {
    return html`
      <slot name="header-bar"></slot>
      <mwc-list activatable id="navigation-body">
        <li divider role="separator"></li>
        ${this.items.map(item => html`
        <mwc-list-item @click="${() => { this.selectItem(item) }}">${item.label}</mwc-list-item>
        <li divider role="separator"></li>
        `)}
      </mwc-list>
    `;
  }
}