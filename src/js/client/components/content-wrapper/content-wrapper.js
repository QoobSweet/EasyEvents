var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import { style } from './content-wrapper-css';
import '../header-bar/header-bar';
import './content-wrapper-nav/content-wrapper-nav';
import '../content-item/content-item';
let ContentWrapper = class ContentWrapper extends LitElement {
    constructor() {
        super(...arguments);
        this.showNavigation = false;
        this.contentItems = [];
    }
    render() {
        return [
            this.showNavigation && this.contentItems.length > 1 ? html `
        <content-wrapper-nav
          .items = "${this.contentItems}" >
        </content-wrapper-nav>
      ` : html `
      `, html `
      <div id="content-display-wrapper">
        <slot name="header-bar"></slot>
        <div id="content-display-render">
          <slot name="content"></slot>
        </div>
      </div>
    `
        ];
    }
};
ContentWrapper.styles = style;
__decorate([
    property({ type: String })
], ContentWrapper.prototype, "navLabel", void 0);
__decorate([
    property({ type: Boolean })
], ContentWrapper.prototype, "showNavigation", void 0);
__decorate([
    property({ type: Array })
], ContentWrapper.prototype, "contentItems", void 0);
ContentWrapper = __decorate([
    customElement('content-wrapper')
], ContentWrapper);
export { ContentWrapper };
