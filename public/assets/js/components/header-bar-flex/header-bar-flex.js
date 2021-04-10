var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
import { style } from './header-bar-flex-css';
let HeaderBarFlex = class HeaderBarFlex extends LitElement {
    render() {
        return html `
    <slot></slot>
    `;
    }
};
HeaderBarFlex.styles = style;
HeaderBarFlex = __decorate([
    customElement('header-bar-flex')
], HeaderBarFlex);
export { HeaderBarFlex };
//# sourceMappingURL=header-bar-flex.js.map