import { css } from 'lit-element';

export const style = css`
  :host {
    display: flex;
    margin: auto;
    flex-direction: column;
    min-width: 300px;
    max-width: 600px;
    min-height: 400px;
    text-align: center;
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
  }
  ::slotted(*) {
    margin:auto;
  }
  ::slotted(title-bar) {
    margin: unset;
    left: 0; right: 0;
  }
`;