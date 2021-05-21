import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import { type } from 'os';
import './auth/auth-index';
import './business/business-index';
import './client/client-index';

//elements

@customElement('page-router')
export class PageRouter extends LitElement {
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