import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import firebase from 'firebase';
import { User } from '../../definitions/definitions';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
//elements

@customElement('auth-index')
export class AuthIndex extends LitElement {
  @property() serverApi;
  static styles = css`
    content-item {
      width: 50%;
      height: 50%;
      margin: auto;
    }
  `;

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
      <header-bar slot="header-bar" label="Easy Events" .showAccent="${true}"></header-bar>
      <content-item slot="content">
        <header-bar slot="header-bar" label="Login With Google" .showAccent="${false}"></header-bar>
        <form slot="content">
          <label class="AuthPane -label">
              Please Login to continue.
          </label>
          <br />
          <button @click="${this.handleGoogleLogin}" class="Btn" type="button" >Login With Google</button>
        </form>
      </content-item>
    </page-display>
    `;
  }
  
}