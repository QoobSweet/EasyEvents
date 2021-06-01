import { css } from 'lit';

export const style = css`
    :host {
      margin: auto;
    }
    :host .form {
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    h1, h2, h3, h4 {
      margin: auto 15px;
    }

    .field-wrapper {
      margin: 5px;
      flex-grow: 1;
      display: flex;
    }

    mwc-textfield {
      width: 100%;
    }

    mwc-select {
      margin: 5px;
      flex-grow: 1;
    }

    .form {
      --mdc-icon-size: 15px;
      --mdc-icon-button-size: 20px;
    }

    .field-lock-button {
      margin-left: -22px;
      margin-top: 2px;
    }

    span {
      width: 100%;
    }
    .form-header {
      display: flex;
    }
    .delete-icon {
      color: red;
    }
    .button-collection-wrapper {
      margin: auto;
      flex-grow: 1;
    }

    .button-collection {
      margin: auto;
      float: right;
    }

    .button-wrapper {
      float: right;
      margin: 5px;
    }
`;