import { css } from 'lit-element';

export const style =
  css`
  :host {
    background-color: rgb(201, 201, 201);
    max-width: 100%;
    border-right: #dedede ridge 5px;
  }
  button {
    float: right;
    margin: 10px;
    width: 50px;
    height: 40px;
  }
  .expanded {
    width: 300px;
  }
  `;