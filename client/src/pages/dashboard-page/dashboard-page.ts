import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './dashboard-page-css';

@customElement('dashboard-page')
export class DashboardPage extends LitElement {
  @property({ type: Boolean }) expandNavPanel = false;

  static styles = style;
  
  render() {
  return html`
      <navigation-pane-wrapper></navigation-pane-wrapper>
      <content-container></content-container>
    `;
  }
}
