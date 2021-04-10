import { LitElement, html, customElement, property, css } from 'lit-element';
import { style } from './navigation-pane-css';

@customElement('navigation-pane')
export class NavigationPane extends LitElement {
  static styles = style;
  @property({ type: Number }) expandedWidth = 300;
  @property({ type: Number }) minimizedWidth = 300;
  @property({ type: Boolean }) isExpanded = false;

  //rendering helpers
  getButton = () => { return this.isExpanded ? this.buttonMinimize : this.buttonExpand; }
  getSubClass = () => { return this.isExpanded ? 'expanded' : 'minimized'; }
  
  //methods
  toggleButton = () => {
    this.isExpanded = !this.isExpanded;
    NavigationPane.styles = this.isExpanded ?
      style : style;
  }


  buttonExpand = html`
    <button id="show-nav-button" @click="${this.toggleButton}">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
      </svg>
    </button>
  `;
  buttonMinimize = html`
    <button id="show-nav-button" @click="${this.toggleButton}">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"></path>
        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"></path>
      </svg>
    </button>
  `;

  updated(changedProperties: any) {
    changedProperties.forEach((oldValue: any, propName: any) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
  }
  render() {
    return [
      this.getButton(),
      html`
        <div id="navigation-pane-content" class="${this.getSubClass()}">
        </div>
      `
    ]
  }
}