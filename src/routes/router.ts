import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UserI } from '../definitions/definitions';
import './auth/auth-index';
import './business/business-index';
import './client/client-index';

//elements

@customElement('page-router')
export class PageRouter extends LitElement {
  @property({ type: Boolean }) isLoggedIn = false;
  @property({ type: Object }) user: UserI | null = null;
  
  render() {
    return html`
      ${this.isLoggedIn && this.user
        ? (this.user) //default to business. eventually this is where businesses will be seperated from users and routed into their respective environments
          ? html`<business-index .user="${this.user}"></business-index>`
          : html`<client-index></client-index>`
        : html`<auth-index></auth-index>`
      }
    `;
  }
}