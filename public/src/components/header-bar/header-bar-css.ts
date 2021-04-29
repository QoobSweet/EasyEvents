import { css } from 'lit';

export const style = css`
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100px;
    max-height: 6vh;
    background-color: #1a237e;
    text-align: center;
    color: #ffffff;
  }
  h1 {
    font-size: clamp(.4rem, -0.675rem + 8.333333vw, 2rem);
    padding: 5px;
    margin: auto;
  }
  #header-accent {
    height: .5em;
    background-color: #000051;
    width: 100%;
  }
`;