import {css} from 'lit-element';

export const style = css`
  :host {
    display: flex;
    flex: auto;
    width: 22%;
    min-width: 150px;
    max-width: 300px;
    border-right: black 2px ridge;
  }
  #navigation-body {
    display: flex;
    flex-direction: column;
    flex: auto;
  }
  .navigation-body-item {
    display: flex;
    flex: auto;
    max-height: 50px;
    height: 10vh;
    border-bottom: gray 1px solid;
  }
  .navigation-body-item:hover {
    background-color: #cacaca;
  }
  .active {
    background-color: #b8b8b8;
  }
  .navigation-body-item h2 {
    margin: auto;
  }
`;