import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import ServerApi from './api/serverApi';
import { UserI } from './definitions/definitions';
import './routes/router';

@customElement('easy-events')
export class EasyEvents extends LitElement {
  @property({ type: Boolean }) isLoggedIn = false;
  @state() user: UserI | null = null;
  serverApi = ServerApi();
  isDebug = false;

  testSessionAuth = () => {
    //grab api key
    const sessionUser = window.sessionStorage.getItem(`firebase:authUser:${this.serverApi.getApiKey()}:[DEFAULT]`);
    let user;
    if (sessionUser) { user = JSON.parse(sessionUser); }

    if (!user) { this.isLoggedIn = false; }
    else {
      //pull user Map Document from file. match data in case different or google profile has changed
      this.user = user;
      this.isLoggedIn = true;
    }
  }

  firstUpdated = () => {
    this.testSessionAuth();
  }


  test: Boolean = false;

  render() {
    return html`
      <page-router
        @login-change="${this.testSessionAuth}"
        ?isloggedin = "${this.isLoggedIn || this.isDebug}"
        .user = "${this.user}"
      ></page-router>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'easy-events': EasyEvents;
  }
}