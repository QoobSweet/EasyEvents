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

    mwc-textfield {
      margin: 5px;
      flex-grow: 1;
    }

    mwc-select {
      margin: 5px;
      flex-grow: 1;
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