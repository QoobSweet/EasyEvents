import { LitElement, html, customElement, property, css} from 'lit-element';
import { type } from 'os';
import '../../pages/auth-page/auth-page';

//elements

@customElement('state-controller')
export class StateController extends LitElement {
  @property({ type: Boolean }) isLoggedIn;
  @property({ type: Object }) user;
  @property({ type: Object }) serverApi;
  
  render() {
    console.log(["Status: ", this.isLoggedIn]);
    console.log(this.user)

    if (this.isLoggedIn === true ) {
      return html`
        logged in
      `;
    } else {
      return html`
        <auth-page
          .serverApi = "${this.serverApi}"
        ></auth-page>
      `;
    }
  }
}