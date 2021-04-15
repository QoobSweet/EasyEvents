import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './navigation-pane-wrapper-css';
import { NavigationItem } from '../../definitions/navigation-item/navigation-item';
//elements
import './navigation-pane/navigation-pane';


@customElement('navigation-pane-wrapper')
export class NavigationPaneWrapper extends LitElement {
  @property({ type: Boolean }) isExpanded = true;
  @property({ type: Array }) items = [
    new NavigationItem("Dashboard"),
    new NavigationItem("Daily ToDo", "Daily To-Do's"),
    new NavigationItem("Connected Clients"),
    new NavigationItem("Calendar"),
    new NavigationItem("Statistics"),
    new NavigationItem("Business Info"),
    new NavigationItem("Settings")
  ]
  static styles = style;


  render() {
    return [
      html`
      ${this.isExpanded
        ? html`
          <navigation-pane
            items = ${JSON.stringify(this.items)}>
          </navigation-pane>`
        : html``
      }
      <button id="show-nav-button" @click=${() => { this.isExpanded = !this.isExpanded }}>
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 122.88 95.95" style="enable-background:new 0 0 122.88 95.95" xml:space="preserve">
          <g>
            <path class="st0" d="M8.94,0h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,17.88,0,13.86,0,8.94l0,0 C0,4.02,4.02,0,8.94,0L8.94,0z M8.94,78.07h105c4.92,0,8.94,4.02,8.94,8.94l0,0c0,4.92-4.02,8.94-8.94,8.94h-105 C4.02,95.95,0,91.93,0,87.01l0,0C0,82.09,4.02,78.07,8.94,78.07L8.94,78.07z M8.94,39.03h105c4.92,0,8.94,4.02,8.94,8.94l0,0 c0,4.92-4.02,8.94-8.94,8.94h-105C4.02,56.91,0,52.89,0,47.97l0,0C0,43.06,4.02,39.03,8.94,39.03L8.94,39.03z"></path>
          </g>
        </svg>
      </button>
    `]
  }
}