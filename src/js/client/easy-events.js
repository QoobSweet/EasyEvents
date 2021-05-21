var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import firebase from 'firebase';
import ServerApi from './api/serverApi';
import { io } from "socket.io-client";
//elements
import './routes/router';
let socket;
let EasyEvents = class EasyEvents extends LitElement {
    constructor() {
        super(...arguments);
        this.loadedFirebase = null;
        this.serverApi = null;
        this.isLoggedIn = false;
        this.userId = null;
        this.user = null;
        this.isDebug = false;
        this.startServerApi = () => {
            socket = io();
            const _serverApi = ServerApi(socket);
            if (!this.loadedFirebase) {
                _serverApi.getConfig(config => {
                    //Initialize firebase on App Load by calling initFirebase()
                    if (!firebase.apps.length) {
                        this.loadedFirebase = firebase.initializeApp(config);
                    }
                    else {
                        this.loadedFirebase = firebase.app();
                    }
                });
            }
            this.serverApi = _serverApi;
        };
        this.restartServerApi = () => {
            if (this.serverApi) {
                this.serverApi.socket.close();
                this.serverApi = null;
            }
            this.startServerApi();
        };
        this.testSessionAuth = () => {
            if (!this.serverApi) {
                this.restartServerApi();
            }
            else {
                //grab api key
                this.serverApi.getApiKey((apiKey) => {
                    const user = JSON.parse(window.sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`));
                    if (!user) {
                        this.isLoggedIn = false;
                    }
                    else {
                        this.user = user;
                        this.userId = user.uid;
                        this.serverApi.setUserId(user.uid);
                        this.isLoggedIn = true;
                    }
                });
            }
        };
        this.firstUpdated = () => {
            this.testSessionAuth();
        };
        this.test = false;
    }
    render() {
        return html `
      <page-router
        @login-change="${this.testSessionAuth}"
        ?isloggedin = "${this.isLoggedIn || this.isDebug}"
        .user = "${this.user}"
        .serverApi = "${this.serverApi}"
      ></page-router>
    `;
    }
};
__decorate([
    property()
], EasyEvents.prototype, "loadedFirebase", void 0);
__decorate([
    property()
], EasyEvents.prototype, "serverApi", void 0);
__decorate([
    property({ type: Boolean })
], EasyEvents.prototype, "isLoggedIn", void 0);
__decorate([
    property()
], EasyEvents.prototype, "userId", void 0);
__decorate([
    state()
], EasyEvents.prototype, "user", void 0);
EasyEvents = __decorate([
    customElement('easy-events')
], EasyEvents);
export { EasyEvents };
