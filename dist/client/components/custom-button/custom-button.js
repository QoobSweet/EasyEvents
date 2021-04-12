"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
const custom_button_css_1 = require("./custom-button-css");
let CustomButton = class CustomButton extends lit_element_1.LitElement {
    constructor() {
        super(...arguments);
        this.id = '';
        this.height = "30px";
        this.width = "60px";
    }
    render() {
        return lit_element_1.html `
    <button></button>

    </button>
  `;
    }
};
//@property({ type: String }) style = "action";
CustomButton.styles = custom_button_css_1.style;
__decorate([
    lit_element_1.property({ type: String })
], CustomButton.prototype, "id", void 0);
__decorate([
    lit_element_1.property({ type: String })
], CustomButton.prototype, "height", void 0);
__decorate([
    lit_element_1.property({ type: String })
], CustomButton.prototype, "width", void 0);
CustomButton = __decorate([
    lit_element_1.customElement('custom-button')
], CustomButton);
exports.CustomButton = CustomButton;
