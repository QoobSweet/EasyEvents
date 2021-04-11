var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './navigation-pane-wrapper-css';
let NavigationPaneWrapper = class NavigationPaneWrapper extends LitElement {
    constructor() {
        super(...arguments);
        this.isExpanded = false;
        //methods
        this.toggleButton = () => { this.isExpanded = !this.isExpanded; };
        this.getNavigationPane = () => {
            if (this.isExpanded) {
                return html `<navigation-pane></navigation-pane>`;
            }
            else {
                return html ``;
            }
            ;
        };
    }
    render() {
        return html `
      <button id="show-nav-button" @click="${this.toggleButton}">
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 95.95" style="enable-background:new 0 0 122.88 95.95" xml:space="preserve">
          <g>
            <path class="st0" d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"></path>
          </g>
        </svg>
      </button>
      ${this.getNavigationPane()}
    `;
    }
};
NavigationPaneWrapper.styles = style;
__decorate([
    property({ type: Boolean })
], NavigationPaneWrapper.prototype, "isExpanded", void 0);
NavigationPaneWrapper = __decorate([
    customElement('navigation-pane-wrapper')
], NavigationPaneWrapper);
export { NavigationPaneWrapper };
//# sourceMappingURL=navigation-pane-wrapper.js.map