import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './content-wrapper-css';
import './content-wrapper-nav/content-wrapper-nav';
import '../content-item/content-item';

@customElement('content-wrapper')
export class ContentWrapper extends LitElement {
  @property({ type: String }) label;
  @property({ type: Boolean }) showNavigation = false;
  static styles = style;

  navPane = () => {
    if (this.showNavigation) {
      return html`<content-wrapper-nav
        label="${this.label}"
      ></content-wrapper-nav>`;
    }
  }
  render() {
    return html`
      ${this.navPane()}
      <div id="content-display-wrapper">
        <slot name="title-bar"></slot>
        <div id="content-display-render">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}