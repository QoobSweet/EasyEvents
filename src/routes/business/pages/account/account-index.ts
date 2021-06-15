import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from './account-index-css';
import ServerApi from '../../../../api/serverApi';
import { UserI } from '../../../../definitions/definitions';

export interface InquiryState {
  label: String;
  color: String;
}

@customElement('account-index')
export class AccountIndex extends LitElement {
  @property({ type: Object }) user: UserI | null = null;
  serverApi = ServerApi();
  
  static styles = style;


  render() {
    return html``;
  }
}