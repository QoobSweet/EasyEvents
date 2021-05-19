import { css } from 'lit';

export const style = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: center;
  }
  h1, h2, h3, h4 {
    margin: 15px 30px;
  }
  hr.rounded {
    border-top: 8px solid #bbb;
    border-radius: 5px;
    width: 95%
  }

  mwc-drawer {
    width:100%;
  }

  .client-index-wrapper {
    display: flex;
    width:100%;
  }

  mwc-icon-button {
    color: white;
    --mdc-icon-size: 30px;
  }

  .add-inquiry {
    position: fixed;
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
    display: flex;
  }

  #inquiry-info > .inquiry-left-half {
    width: 50%;
  }
  #inquiry-info > form-wrapper {
    width: 100%;
  }

  .inquiry-list-item {
    height: 30px;
  }

  .inquiry-list-item.add{
    background-color: #8eff8e; 
  }

  #coorespondence {
    display: flex;
    margin: 15px;
  }

  #coorespondence > form-wrapper {
    width: 100%;
  }

  mwc-list > .mdc-deprecated-list {
    padding-top: 0;
  }
`;