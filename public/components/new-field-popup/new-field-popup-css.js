import { css } from 'lit';
export const style = css `
    h1, h2, h3, h4 {
      margin-left: 15px;
    }

    .button-collection-wrapper {
      margin: auto;
      flex-grow: 1;
      display: flex;
      width: 100%;
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

    #new-field-popup {
      position: fixed;
      display: flex;
      z-index: 20;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    #pop-up-window {
      display: flex;
      flex-direction: column;
      margin: auto;
      background-color: rgb(225, 226, 225);
      padding: 5px;
      border: black 1px solid;
    }

    #popup-fields {
      margin: 10px;
    }

    #popup-fields > mwc-textfield, #popup-fields > mwc-select {
      margin-right: 10px;
    }
`;
//# sourceMappingURL=new-field-popup-css.js.map