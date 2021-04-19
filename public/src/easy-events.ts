import { LitElement, html, customElement, property } from 'lit-element';
import firebase from 'firebase';
import ServerApi from './deps/serverApi';
import { io } from "socket.io-client";
import { User } from './definitions/definitions';
//elements
import './components/state-controller/state-controller';

let socket;

@customElement('easy-events')
export class EasyEvents extends LitElement {
  @property() loadedFirebase = null;
  @property() serverApi = null;
  @property() isLoggedIn = false;
  @property() userId = null;
  isDebug = false;
  

  getUser = (): User | null => {
    //if (this.userId) {
      return { id: "testUser", userType: 'business' }
    //}
  }

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
        const user: any = window.sessionStorage.getItem(
          `firebase:authUser:${apiKey}:[DEFAULT]`
        );


        if(!user) {
          this.isLoggedIn = false;
        } else {
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
    console.log(this.getUser());
    return html`
      <state-controller
        @login-change="${this.testSessionAuth}"
        ?isloggedin = "${this.isLoggedIn || this.isDebug}"
        .user = "${this.getUser()}"
        .serverApi = "${this.serverApi}"
      ></state-controller>
    `;
  }
}