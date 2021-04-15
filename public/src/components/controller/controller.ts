import { LitElement, html, customElement, property } from 'lit-element';


//elements

@customElement('controller')
export class EasyEvents extends LitElement {
  @property({ type: Boolean }) isLoggedIn = false;
  @property({ attribute: false }) userId = null;

  
  render() {
    return html`
    `;
  }
}