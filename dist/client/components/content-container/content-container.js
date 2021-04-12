"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const content_container_css_1 = require("./content-container-css");
require("./content-container-nav/content-container-nav");
let ContentContainer = class ContentContainer extends lit_element_1.LitElement {
    render() {
        return lit_element_1.html `
      <content-container-nav></content-container-nav>
    `;
    }
};
ContentContainer.styles = content_container_css_1.style;
ContentContainer = __decorate([
    lit_element_1.customElement('content-container')
], ContentContainer);
exports.ContentContainer = ContentContainer;
