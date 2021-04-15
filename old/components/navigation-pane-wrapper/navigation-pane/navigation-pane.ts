import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './navigation-pane-css';
import { NavigationItem } from '../../../definitions/navigation-item/navigation-item';

@customElement('navigation-pane')
export class NavigationPane extends LitElement {
  @property({ type: Array }) items: NavigationItem[] = [];
  static styles = style;

  capitalizeWords = ( string: string ): string => {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  render() {
    console.log(this.items);
    return html`
      <div class="navigation-pane -header">
        <slot></slot>
      </div>
      <div class="navigation-pane -content">
        ${this.items.map((item) => {
          return html`
            <div class="navigation-item ${item.name.toString()}">
              <p>${this.capitalizeWords(item.label.toString())}</p>
            </div>
          `;
        })}
      </div>
      `
  }
}