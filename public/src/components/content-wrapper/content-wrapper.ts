import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import { style } from './content-wrapper-css';
import '../../components/title-bar/title-bar';
import './content-wrapper-nav/content-wrapper-nav';
import '../content-item/content-item';

@customElement('content-wrapper')
export class ContentWrapper extends LitElement {
  @property({ type: String }) navLabel;
  @property({ type: Boolean }) showNavigation = false;
  @property({ type: Array }) contentItems = [];
  static styles = style;


  render() {
    console.log(this.contentItems);
    return [
      this.showNavigation ? html`
        <content-wrapper-nav
          .items = "${this.contentItems}" >
        </content-wrapper-nav>
      ` : html`
      ` , html`
      <div id="content-display-wrapper">
        <slot name="title-bar"></slot>
        <div id="content-display-render">
          <slot name="content"></slot>
        </div>
      </div>
    `];
  }
}