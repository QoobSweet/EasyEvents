import { css } from 'lit';
export const style = css `
  :host {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: center;

    --mdc-list-vertical-padding: 0;
    --mdc-icon-button-size: 60px;
    --mdc-drawer-width: 250px;
    --mdc-theme-primary: #9e47ff;
    --mdc-theme-secondary: #6200ee;
    --mdc-text-field-disabled-fill-color: white;
    --mdc-text-field-disabled-ink-color: black;
  }
  h1, h2, h3, h4 {
    margin: auto, 15px;
    padding-left: 15px;
  }

  .title-bar {
    margin: auto 15px;
    display: flex;
  }

  .indented {
    padding-left: 50px;
  }
  hr.rounded {
    border-top: 8px solid #bbb;
    border-radius: 5px;
    width: 95%
  }
  .bottom-space {
    margin-bottom: 5px;
  }

  mwc-icon-button {
    color: white;
  }
  
  .delete-icon {
    color: red;
  }

  
  mwc-drawer {
    width:100%;
  }
  mwc-list.nested {
    margin-left: 10px;
  }

  .client-index-wrapper {
    display: flex;
    width:100%;
  }
  .client-editable {
    display: flex;
    flex-direction: column;
  }

  .button-collection-wrapper {
    margin: auto;
    flex-grow: 1;
    display: flex;
  }

  .button-collection {
    margin: auto;
    float: right;
    flex-grow: 1;
  }

  .button-wrapper {
    float: right;
    margin: 5px;
  }

  content-item > mwc-drawer {
    flex-grow: 1;
  }
  .mdc-drawer {
    flex-grow: 1;
    height: unset;
  }

  #calendar {
    min-width: 675px;
  }

  #client-info {
    flex-grow: 1;
    min-width: 675px;
    max-width: 675px;
  }

  #client-header {
    display: flex;
    margin: 15px;
  }

  #client-portrait {
    display: flex;
    min-height: 200px;
    min-width: 200px;
    max-width: 300px;
    flex-grow: 1;
  }

  #client-portrait img {
    margin: auto;
    height: 70%;
    min-height: 100px;
    min-width: 100px;
    max-height: 200px;
    max-width: 200px;

  }

  #inquiry-info {
    margin: 15px;
  }
  #inquiry-info > .inquiry-left-half {
    width: 50%;
  }
  #inquiry-info > form-wrapper {
    width: 100%;
  }

  .inquiry-list-item {
    height: 30px;
    border-left: 3px solid rgba(0, 0, 0, 0.12);
    border-bottom: 3px solid rgba(0, 0, 0, 0.12);
    margin-right: 3px;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }

  .list-button.add{
    --mdc-ripple-color: #4b4b4b; 
  }
  .client-list-item {
    border-bottom: 1px solid;
  }

  #coorespondence {
    display: flex;
    flex-direction: column;
    margin: 15px;
    flex-grow: 1;
  }

  #coorespondence > #coorespondence-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: rgb(217 217 217);
    max-height: 250px;
  }
  
  #coorespondence-wrapper > #coorespondence-messages {
    flex-grow: 1;
    overflow-y: scroll;
  }

  #coorespondence-messages > .coorespondence-message {
    margin: 5px;
  }

  #coorespondence-wrapper > #coorespondence-new-message-field {
    display: flex;
    background: whitesmoke;
  }

  #message-submit {
    color: black;
  }
  
  #new-message-date {
    max-width: 125px;
  }
  
  #new-message-content {
    flex-grow: 1;
  }

  mwc-list > .mdc-deprecated-list {
    padding-top: 0;
  }
`;
//# sourceMappingURL=client-page-css.js.map