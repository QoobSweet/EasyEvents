import { css } from 'lit';
export const style = css `
  :host {
    display: flex;
    flex: auto;
    flex-direction: row;
  }
  #content-display-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #d7d7d7;
    padding: 20px;
    margin: 0 auto 0 auto;
  }
  #content-display-render {
    width: 100%;
  }
`;
