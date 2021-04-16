import { LitElement, html, customElement, property } from 'lit-element';
import { type } from 'os';
import '../../pages/auth-page/auth-page';

//elements

@customElement('state-controller')
export class StateController extends LitElement {
  @property({ type: Boolean }) isLoggedIn;
  @property({ type: Object }) user;

  
  render() {
    console.log(["Status: ", this.isLoggedIn]);
    console.log(this.user)

    if (this.isLoggedIn === true ) {
      return html`
        logged in
      `;
    } else {
      return html`
        <auth-page></auth-page>
      `;
    }
  }
}