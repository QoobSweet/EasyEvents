import { LitElement, html, customElement, property, css } from 'lit-element';
import '../../components/page-display/page-display';
import '../../components/content-wrapper/content-wrapper';
//elements

@customElement('business-controller')
export class BusinessController extends LitElement {
  @property({ type: Object }) serverApi;
  @property({ type: Array }) clients = [];
  @property({ type: Array }) inquiries = [];


  pages = [
    {label: "Clients", target: "pages/clients", children: []}
  ];

  subscribeToServer = () => {
    this.serverApi.subscribeToServer();
    this.serverApi.socket.on("dbInquiries", (data, callback) => {
      console.log('recieving inquiries')
      console.log(data)
      if(data.inquiries !== this.inquiries) {
          console.log(data.inquiries)
        this.inquiries = data.inquiries;
      } 

      if (data.inquiries) {
        callback({ status: 'recieved' });
      } else {
        callback({ status: 'failed' });
      }
  });

  this.serverApi.socket.on("dbClients", (data, callback) => {
      console.log('recieving clients')
      console.log(data)
      if(data.clients !== this.clients) {
        this.clients = data.clients;
      }

      if(data.clients) {
        callback({ status: 'recieved' });
      } else {
        callback({ status: 'failed' });
      }
  });
  }

  firstUpdated = () => { this.subscribeToServer(); }

  render() {
    return html`
      <page-display>
        <title-bar slot="title-bar" label="Business"></title-bar>
        <content-wrapper slot="content"
          ?showNavigation = "${true}"
          .contentItems = "${this.pages}"
        >
        </content-wrapper>
      </page-display>
    `;
  }
  
}