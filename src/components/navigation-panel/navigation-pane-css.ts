import { css } from 'lit-element';

export const style =
  css`
  :host {
    flex: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  svg {
    height: 20px;
    width: 20px;
  }
  .navigation-pane {
    background-color: rgb(201, 201, 201);
    max-width: 100%;
    border-right: #dedede ridge 5px;
  }
  .navigation-pane.-header {
    height: 300px;
    max-height: 30vw;
    border-bottom: #dedede ridge 5px;
    background-image: url("./public/images/logo-placeholder-1.png");
    background-size: contain;
  }
  .navigation-pane.-content {
    flex: auto;
  }
  .navigation-item {
    height: 50px;
    margin: 8px 5px 8px 5px;
    border-top: 2px solid rgb(222, 222, 222);
    border-bottom: 2px solid rgb(222, 222, 222);
  }
  .navigation-item:hover {
    background: #aeaeae;
  }
  `;