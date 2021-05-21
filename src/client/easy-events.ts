import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import firebase from 'firebase';
import ServerApi from './api/serverApi';
import { io } from "socket.io-client";
import { User } from './definitions/definitions';
//elements
import './routes/router';
import { FirebaseNamespace } from '@firebase/app-types';

let socket;

@customElement('easy-events')
export class EasyEvents extends LitElement {
  @property() loadedFirebase = null;
  @property() serverApi = null;
  @property({ type: Boolean }) isLoggedIn = false;
  @property() userId = null;
  @state() user: firebase.User = null;
  isDebug = false;
  

  startServerApi = () => {
    socket = io();
    const _serverApi = ServerApi(socket);

    if (!this.loadedFirebase) {
      _serverApi.getConfig(config => {
        //Initialize firebase on App Load by calling initFirebase()
        
        if(!firebase.apps.length){
          this.loadedFirebase = firebase.initializeApp(config);
        } else {
          this.loadedFirebase = firebase.app();
        }
      });
    }

    this.serverApi = _serverApi;
  }

  restartServerApi = () => {
    if(this.serverApi){
      this.serverApi.socket.close();
      this.serverApi = null;
    }
    this.startServerApi();
  }

  testSessionAuth = () => {
    if(!this.serverApi){
      this.restartServerApi();
    } else {
      //grab api key
      this.serverApi.getApiKey((apiKey) => {
        const user: any = JSON.parse(window.sessionStorage.getItem(
          `firebase:authUser:${apiKey}:[DEFAULT]`
        ));

        if(!user) {
          this.isLoggedIn = false;
        } else {
          this.user = user;
          this.userId = user.uid;
          this.serverApi.setUserId(user.uid);
          this.isLoggedIn = true;
        }
      });
    }
  }

  firstUpdated = () => {
    this.testSessionAuth();
  }


  test:Boolean = false;

  render() {
    return html`
      <page-router
        @login-change="${this.testSessionAuth}"
        ?isloggedin = "${this.isLoggedIn || this.isDebug}"
        .user = "${this.user}"
        .serverApi = "${this.serverApi}"
      ></page-router>
    `;
  }
}