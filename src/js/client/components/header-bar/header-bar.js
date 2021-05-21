var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import { style } from './header-bar-css';
//elements
let HeaderBar = class HeaderBar extends LitElement {
    constructor() {
        super(...arguments);
        this.showMenuToggle = true;
        this.showAccent = false;
    }
    render() {
        return html `
    ${this.showAccent ? html `<div id="header-accent"></div>` : html ``}
    <div id="menu-toggle"></div>
    <h1>${this.label}</h1>
    <slot name="content-right"></slot>
    `;
    }
};
HeaderBar.styles = style;
__decorate([
    property({ type: String })
], HeaderBar.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], HeaderBar.prototype, "showMenuToggle", void 0);
__decorate([
    property({ type: Boolean })
], HeaderBar.prototype, "showAccent", void 0);
HeaderBar = __decorate([
    customElement('header-bar')
], HeaderBar);
export { HeaderBar };
