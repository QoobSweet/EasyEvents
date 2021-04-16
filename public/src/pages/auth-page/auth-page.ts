import { LitElement, html, customElement, property } from 'lit-element';
import { style } from './auth-page-css';
//elements

@customElement('auth-page')
export class AuthPage extends LitElement {

  
  render() {
    return html`
      <div className="AuthPane-titlebar">
          <label className="AuthPane-titlebar-label">Login:</label>
      </div>
      <form /* onSubmit={e => handleForm(e)} */>
          
          <hr />
          <label className="AuthPane -label">
              <br />Please Authenticate with Google to Continue. 
              <br />
              <br /><b>UPDATE:</b>
              <br />  - Users now all have seperate instances with basic persistance of clients and inquiries for now.
              <br />  - UI has been modernized
              <br />  - All database functions take place in backend server                        

          </label>
          <button onClick={ () => handleGoogleLogin()} className="Btn" type="button" >

          </button>
      </form>
    `;
  }
  
}