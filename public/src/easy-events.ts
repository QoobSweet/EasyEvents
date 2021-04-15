import { LitElement, html, customElement, property } from 'lit-element';
import firebase from 'firebase';
import { style } from './easy-events-css';
import ServerApi from './helpers/serverApi';
import { io } from "socket.io-client";
//elements
import './components/page-display/page-display';

console.log(io);
let socket;


@customElement('easy-events')
export class EasyEvents extends LitElement {
  @property() loadedFirebase = null;
  @property() serverApi;
  @property() isLoggedIn = false;
  @property() userId = null;
    
  static styles = style;

  startServerApi = () => {
    socket = io();
    const _serverApi = ServerApi(socket);

    if (!this.loadedFirebase) {
      console.log("attempting to load firebase");
      _serverApi.getConfig(config => {
        //Initialize firebase on App Load by calling initFirebase()
        console.log(config);
        
        if(!firebase.apps.length){
          this.loadedFirebase = firebase.initializeApp(config);
        } else {
          this.loadedFirebase = firebase.app();
        }

        console.log(this.loadedFirebase);
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

  firstUpdated() {
    this.restartServerApi();
    if(!this.serverApi || !this.serverApi.getApiKey(()=>{})){ 
      console.log('restarting server API')
      this.restartServerApi();
    } else {
      //grab api key
      this.serverApi.getApiKey((apiKey) => {
        const user: any = window.sessionStorage.getItem(
          `firebase:authUser:${apiKey}:[DEFAULT]`
        );

        if(!user) {
          this.isLoggedIn = false;
        } else if (this.isLoggedIn) {
          console.log('user logged in');
          console.log(user);
          this.userId = user.uid;
          this.serverApi.setUserId(user.uid);
          this.isLoggedIn = true;
        }
      });
    }
  }

  render() {
    return html`
    `;
  }
}