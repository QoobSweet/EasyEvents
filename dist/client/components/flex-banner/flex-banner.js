"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const flex_banner_css_1 = require("./flex-banner-css");
let FlexBanner = class FlexBanner extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.name = "";
    }
    render() {
        return lit_element_1.html `
    <img
      id="background-image"
      class="${this.name !== "" ? '-' + this.name : {}}"
      src="./frontend/public/images/placeholder-banner.jpg"
    ></img>
    <slot></slot>
    `;
    }
};
FlexBanner.styles = flex_banner_css_1.style;
__decorate([
    lit_element_1.property({ type: String })
], FlexBanner.prototype, "name", void 0);
FlexBanner = __decorate([
    lit_element_1.customElement('flex-banner')
], FlexBanner);
exports.FlexBanner = FlexBanner;
