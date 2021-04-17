import { LitElement, html, customElement, property } from 'lit-element';
import firebase from 'firebase';
import ServerApi from './helpers/serverApi';
import { io } from "socket.io-client";
import { User } from './definitions/definitions';
//elements
import './components/state-controller/state-controller';




console.log(io);
let socket;

@customElement('easy-events')
export class EasyEvents extends LitElement {
  @property() loadedFirebase = null;
  @property() serverApi;
  @property() isLoggedIn = false;
  @property() userId = null;
  

  getUser = (): User | null => {
    //if (this.userId) {
      return { id: "testUser", userType: 'business' }
    //}
  }

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
    if(!this.serverApi){ 
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

  test:Boolean = false;

  render() {
    console.log(this.getUser());
    return html`
      <state-controller
        @login-change="${(e)=>{console.log(e)}}"
        ?isloggedin = "${this.isLoggedIn}"
        .user = "${this.getUser()}"
        .serverApi = "${this.serverApi}"
      ></state-controller>
    `;
  }
}