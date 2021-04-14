import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './easy-events-css';

//elements
import './components/navigation-pane-wrapper/navigation-pane-wrapper';
import './components/page-display/page-display';

@customElement('easy-events')
export class EasyEvents extends LitElement {
  @property({ type: String }) pageToLoad = "dashboard";

  static styles = style;

  render() {
    return html`
      <page-display
        page-name = "dashboard";
      ></page-display>
    `;
  }
}
