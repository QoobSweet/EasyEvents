var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './flex-banner-css';
let FlexBanner = class FlexBanner extends LitElement {
    constructor() {
        super(...arguments);
        this.name = "";
    }
    render() {
        return html `
    <img
      id="background-image"
      class="${this.name !== "" ? '-' + this.name : {}}"
      src="./public/images/placeholder-banner.jpg"
    ></img>
    <slot></slot>
    `;
    }
};
FlexBanner.styles = style;
__decorate([
    property({ type: String })
], FlexBanner.prototype, "name", void 0);
FlexBanner = __decorate([
    customElement('flex-banner')
], FlexBanner);
export { FlexBanner };
//# sourceMappingURL=flex-banner.js.map