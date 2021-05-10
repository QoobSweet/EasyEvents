import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import { type } from 'os';
import '../../routes/auth/auth-index';
import '../../routes/business/business-index';
import '../../routes/client/client-index';

//elements

@customElement('page-controller')
export class StateController extends LitElement {
  @property({ type: Boolean }) isLoggedIn;
  @property({ type: Object }) user;
  @property({ type: Object }) serverApi;
  
  render() {
    if (this.isLoggedIn === true ) {
      return html`
        <business-index
          .serverApi = "${this.serverApi}"
        >
        </business-index>
      `;
    } else {
      return html`
        <auth-index
          .serverApi = "${this.serverApi}"
        ></auth-index>
      `;
    }
  }
}