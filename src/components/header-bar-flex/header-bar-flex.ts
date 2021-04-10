import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './header-bar-flex-css';

@customElement('header-bar-flex')
export class HeaderBarFlex extends LitElement {
  static styles = style;

  render() {
    return html`
    <slot></slot>
    `;
  }
}