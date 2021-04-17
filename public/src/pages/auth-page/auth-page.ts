import { LitElement, html, customElement, property } from 'lit-element';
import firebase from 'firebase';
import { User } from '../../definitions/definitions';
import '../../components/page-display/page-display';
import '../../components/title-bar/title-bar';
import '../../components/content-wrapper/content-wrapper';
//elements

@customElement('auth-page')
export class AuthPage extends LitElement {
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
        label = "Test Label"
        ?showNavigation = "${false}"
      >
        <title-bar
          label="Testing"  
          slot="title-bar"
        ></title-bar>
        <content-item slot="content">
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