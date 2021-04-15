import { css } from 'lit-element';

export const style =
  css`
  :host {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }
  svg {
    height: 20px;
    width: 20px;
  }
  .navigation-pane {
    background-color: rgb(201, 201, 201);
    max-width: 100%;
  }
  .navigation-pane.-header {
    height: 300px;
    max-height: 30vw;
    background-image: url("./public/images/logo-placeholder-1.png");
    background-size: contain;
  }
  .navigation-pane.-content {
    flex: auto;
    background-color: rgb(218 218 218);;
  }
  .navigation-item {
    display: grid;
    height: 50px;
    margin: 8px 0px;
    font-size: 1.5em;
    background-color: rgb(201, 201, 201);
    text-align: center;
  }
  .navigation-item p{
    margin: auto;
  }
  .navigation-item.active, .navigation-item:hover {
    background: #aeaeae;
  }
  `;