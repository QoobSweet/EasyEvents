import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import firebase from 'firebase';
import { style } from './header-bar-css';
//elements

@customElement('header-bar')
export class HeaderBar extends LitElement {
  @property({ type: String }) label;
  @property({ type: Boolean }) showMenuToggle = true;
  @property({ type: Boolean }) showAccent = false;
  static styles = style;


  render() {
    return html`
    ${this.showAccent ? html`<div id="header-accent"></div>`: html``}
    <div id="menu-toggle"></div>
    <h1>${this.label}</h1>
    <slot name="content-right"></slot>
    `;
  }
}