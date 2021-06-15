var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
import { style } from './client-index-css';
import ServerApi from '../../api/serverApi';
//elements
let ClientIndex = class ClientIndex extends LitElement {
    serverApi = ServerApi();
    static styles = style;
    render() {
        //Page Display is the framework that renders the app. everything nested should use slots provided by page-display
        return html `<div></div>`;
    }
};
ClientIndex = __decorate([
    customElement('client-index')
], ClientIndex);
export { ClientIndex };
//# sourceMappingURL=client-index.js.map