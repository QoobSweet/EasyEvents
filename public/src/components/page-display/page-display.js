var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './page-display-css';
let PageDisplay = class PageDisplay extends LitElement {
    constructor() {
        super(...arguments);
        this.pageOutput = html ``;
    }
    render() {
        return html ``;
    }
};
PageDisplay.styles = style;
__decorate([
    property({ type: String })
], PageDisplay.prototype, "page", void 0);
__decorate([
    property({ attribute: false })
], PageDisplay.prototype, "pageOutput", void 0);
PageDisplay = __decorate([
    customElement('page-display')
], PageDisplay);
export { PageDisplay };
