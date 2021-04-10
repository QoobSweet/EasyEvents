var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
import { style } from './content-container-css';
import './content-container-nav/content-container-nav';
let ContentContainer = class ContentContainer extends LitElement {
    render() {
        return html `
      <content-container-nav></content-container-nav>
    `;
    }
};
ContentContainer.styles = style;
ContentContainer = __decorate([
    customElement('content-container')
], ContentContainer);
export { ContentContainer };
//# sourceMappingURL=content-container.js.map