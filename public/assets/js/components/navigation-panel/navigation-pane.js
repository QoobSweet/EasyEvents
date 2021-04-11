var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, customElement } from 'lit-element';
import { style } from './navigation-pane-css';
import { NavigationItem } from '../../definitions/navigation-item/navigation-item';
let NavigationPane = class NavigationPane extends LitElement {
    constructor() {
        super(...arguments);
        this.items = [
            new NavigationItem('test-item 1', 'testing overide'),
            new NavigationItem('test-item 2'),
            new NavigationItem('test-item 3')
        ];
    }
    render() {
        return [html `
      <div class="navigation-pane -header">

      </div>
      <div class="navigation-pane -content">
        ${this.items.map((item) => {
                return html `
            <div class="navigation-item ${item.name.toString()}">
              <center>${item.label.toString()}</center>
            </div>
          `;
            })}
      </div>
      `
        ];
    }
};
NavigationPane.styles = style;
NavigationPane = __decorate([
    customElement('navigation-pane')
], NavigationPane);
export { NavigationPane };
//# sourceMappingURL=navigation-pane.js.map