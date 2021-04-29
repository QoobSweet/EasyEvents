import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import firebase from 'firebase';
import { User } from '../../definitions/definitions';
import './auth-index-css';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
//elements

@customElement('auth-index')
export class AuthIndex extends LitElement {
  @property() serverApi;

  loggedIn = (state:Boolean) => {
    let event = new CustomEvent('login-change', {
      detail: {
        data: state,
        message: 'Something important happened'
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }


  handleGoogleLogin = (): void => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase.auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        this.serverApi.setUserId(result.user.uid)
        this.loggedIn(true);
      })
      .catch(e => console.log(e))
    })
  }

  render() {
    //Page Display is the framework that renders the app. everything nested should use slots provided by page-display
    return html`
    <page-display>
      <content-wrapper slot="content"
        ?showNavigation = "${false}"
      >
        <content-item slot="content">
          <title-bar label="Easy Events" slot="title-bar" > </title-bar>
          <form slot="content">
            <label class="AuthPane -label">
                Please Login to continue.
            </label>
            <br />
            <button @click="${this.handleGoogleLogin}" class="Btn" type="button" >Login With Google</button>
          </form>
        </content-item> 
      </content-wrapper>
    </page-display>
    `;
  }
  
}