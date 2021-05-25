import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import firebase from 'firebase';
import './auth/auth-index';
import './business/business-index';
import './client/client-index';

//elements

@customElement('page-router')
export class PageRouter extends LitElement {
  @property({ type: Boolean }) isLoggedIn;
  @property({ type: Object }) user: firebase.User;
  @property({ type: Object }) serverApi;
  
  render() {
    if (this.isLoggedIn === true ) {
      return html`
        <business-index
          .serverApi = "${this.serverApi}"
          .user="${this.user}"
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