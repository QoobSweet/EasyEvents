import { css } from 'lit-element';

export const style = css`
  :host {
    display: flex;
    width: 100%;
    height: 100px;
    max-height: 6vh;
    background-color: rgb(191, 191, 191);
    text-align: center;
    border-bottom: black 2px ridge;
  }
  h1 {
    font-size: clamp(.4rem, -0.675rem + 8.333333vw, 2rem);
    padding: 5px;
    margin: auto;
  }
`;