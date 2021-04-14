import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './page-display-css';
import '../content-container/content-container';

//pages (elements)
import '../../pages/dashboard-page/dashboard-page'


@customElement('page-display')
export class PageDisplay extends LitElement {
  @property({ type: String }) page;         //page must be set by parent element.   
  @property({ attribute: false })
  pageOutput = html`<dashboard-page></dashboard-page>`;

  getPage = () => {
    switch (this.page) {
      case 'dashboard':
        this.pageOutput = html`<dashboard-page></dashboard-page>`;
    }
  }


  static styles = style;

  render() {
    return this.pageOutput;
  }
}