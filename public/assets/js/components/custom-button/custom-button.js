var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './custom-button-css';
let CustomButton = class CustomButton extends LitElement {
    constructor() {
        super(...arguments);
        this.id = '';
        this.height = "30px";
        this.width = "60px";
    }
    render() {
        return html `
    <button></button>

    </button>
  `;
    }
};
//@property({ type: String }) style = "action";
CustomButton.styles = style;
__decorate([
    property({ type: String })
], CustomButton.prototype, "id", void 0);
__decorate([
    property({ type: String })
], CustomButton.prototype, "height", void 0);
__decorate([
    property({ type: String })
], CustomButton.prototype, "width", void 0);
CustomButton = __decorate([
    customElement('custom-button')
], CustomButton);
export { CustomButton };
//# sourceMappingURL=custom-button.js.map