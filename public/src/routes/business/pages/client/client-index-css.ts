import { css } from 'lit';

export const style = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: center;
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
    min-width: 550px;
  }
`;