import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './content-wrapper-css';
import '../../components/title-bar/title-bar';
import './content-wrapper-nav/content-wrapper-nav';
import '../content-item/content-item';

@customElement('content-wrapper')
export class ContentWrapper extends LitElement {
  @property({ type: String }) navLabel;
  @property({ type: Boolean }) showNavigation = false;
  static styles = style;


  render() {
    return [
      this.showNavigation ? html`
        <content-wrapper-nav></content-wrapper-nav>
        ` : html``
      ,
      html`
      <div id="content-display-wrapper">
        <slot name="title-bar"></slot>
        <div id="content-display-render">
          <slot name="content-items"></slot>
        </div>
      </div>
    `];
  }
}