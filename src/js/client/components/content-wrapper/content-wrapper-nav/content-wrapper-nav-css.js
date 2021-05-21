import { css } from 'lit';
export const style = css `
  :host {
    display: flex;
    flex: auto;
    width: 22%;
    min-width: 10em;
    max-width: 13em;
    background-color: white;
    color: #ffffff;
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
    background-color: #1a237e;
  }
  .navigation-body-item:hover {
    background-color: #000051;
  }
  .active {
    background-color: #534bae;
  }
  .navigation-body-item h2 {
    margin: auto auto auto 15px;
  }
`;
