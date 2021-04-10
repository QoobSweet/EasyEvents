var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
import { style } from './page-display-css';
import '../header-bar-flex/header-bar-flex';
import '../content-container/content-container';
let PageDisplay = class PageDisplay extends LitElement {
    constructor() {
        super(...arguments);
        this._hidePanel = (e) => {
        };
    }
    render() {
        return html `
      <header-bar-flex></header-bar-flex>
      <content-container></content-container>
    `;
    }
};
PageDisplay.styles = style;
PageDisplay = __decorate([
    customElement('page-display')
], PageDisplay);
export { PageDisplay };
//# sourceMappingURL=page-display.js.map