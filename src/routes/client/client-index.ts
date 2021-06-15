import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
import { style } from './client-index-css';
import ServerApi from '../../api/serverApi';
//elements

@customElement('client-index')
export class ClientIndex extends LitElement {
  serverApi = ServerApi();
  static styles = style;



  render() {
    //Page Display is the framework that renders the app. everything nested should use slots provided by page-display
    return html`<div></div>`;
  }
  
}