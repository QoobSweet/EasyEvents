import { LitElement, html, customElement, css } from 'lit-element';
import { style } from './easy-events-css';


@customElement('easy-events')
export class EasyEvents extends LitElement {
  static styles = style;

  render() {
    return html`
    <navigation-pane-wrapper></navigation-pane-wrapper>
    <page-display></page-display>
    `;
  }
}
