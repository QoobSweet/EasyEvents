import { LitElement, html, customElement, property, css } from 'lit-element';
import { style } from './navigation-pane-css';
import { NavigationItem } from '../../definitions/navigation-item/navigation-item';

@customElement('navigation-pane')
export class NavigationPane extends LitElement {
  static styles = style;

  items: NavigationItem[] = [
    new NavigationItem('test-item 1', 'testing overide'),
    new NavigationItem('test-item 2'),
    new NavigationItem('test-item 3')
  ]

  render() {
    return [html`
      <div class="navigation-pane -header">

      </div>
      <div class="navigation-pane -content">
        ${this.items.map((item) => {
          return html`
            <div class="navigation-item ${item.name.toString()}">
              <center>${item.label.toString()}</center>
            </div>
          `;
        })}
      </div>
      `
    ]
  }
}