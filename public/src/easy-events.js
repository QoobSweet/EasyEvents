var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import firebase from 'firebase';
import { style } from './easy-events-css';
import ServerApi from './helpers/serverApi';
import { io } from "socket.io-client";
//elements
import './components/page-display/page-display';
console.log(io);
let socket;
let EasyEvents = class EasyEvents extends LitElement {
    constructor() {
        super(...arguments);
        this.loadedFirebase = null;
        this.isLoggedIn = false;
        this.userId = null;
        this.startServerApi = () => {
            socket = io();
            const _serverApi = ServerApi(socket);
            if (!this.loadedFirebase) {
                console.log("attempting to load firebase");
                _serverApi.getConfig(config => {
                    //Initialize firebase on App Load by calling initFirebase()
                    console.log(config);
                    if (!firebase.apps.length) {
                        this.loadedFirebase = firebase.initializeApp(config);
                    }
                    else {
                        this.loadedFirebase = firebase.app();
                    }
                    console.log(this.loadedFirebase);
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
    }
    firstUpdated() {
        this.restartServerApi();
        if (!this.serverApi || !this.serverApi.getApiKey(() => { })) {
            console.log('restarting server API');
            this.restartServerApi();
        }
        else {
            //grab api key
            this.serverApi.getApiKey((apiKey) => {
                const user = window.sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);
                if (!user) {
                    this.isLoggedIn = false;
                }
                else if (this.isLoggedIn) {
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
        return html `
    `;
    }
};
EasyEvents.styles = style;
__decorate([
    property()
], EasyEvents.prototype, "loadedFirebase", void 0);
__decorate([
    property()
], EasyEvents.prototype, "serverApi", void 0);
__decorate([
    property()
], EasyEvents.prototype, "isLoggedIn", void 0);
__decorate([
    property()
], EasyEvents.prototype, "userId", void 0);
EasyEvents = __decorate([
    customElement('easy-events')
], EasyEvents);
export { EasyEvents };
