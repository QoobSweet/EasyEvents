import { LitElement, html, customElement, css } from 'lit-element';
import { style } from './easy-events-css';
import './components/navigation-panel/navigation-pane';
import './components/page-display/page-display';


@customElement('easy-events')
export class EasyEvents extends LitElement {
  static styles = style;

  render() {
    return html`
    <navigation-pane
      id="navigation-pane"
    >
    </navigation-pane>
    <page-display></page-display>
    `;
  }
}
