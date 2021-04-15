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
  @property({ attribute: false }) loadedFirebase;
  @property({ attribute: false }) serverApi;
  static styles = style;

  startServerApi = () => {
    socket = io();
    const _serverApi = ServerApi(socket);

    console.log(_serverApi);

    if(!this.loadedFirebase){
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

  firstUpdated() {
    this.restartServerApi();
  }

  render() {
    return html`
    `;
  }
}