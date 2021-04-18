import { LitElement, html, customElement, property, css } from 'lit-element';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
//elements

@customElement('business-controller')
export class BusinessController extends LitElement {

  render() {
    return html`
      <page-display>
        <title-bar slot="title-bar" label="Business"></title-bar>
        <content-wrapper slot="content"
          ?showNavigation = "${true}"
        >
        </content-wrapper>
      </page-display>
    `;
  }
  
}