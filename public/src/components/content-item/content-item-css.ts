 import { css } from 'lit';

export const style = css`
  :host {
    display: flex;
    margin: 15px;
    flex-direction: column;
    width: fit-content;
    min-width: 45%;
    min-height: 250px;
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
    background-color: #E1E2E1;
  }
  ::slotted(*) {
    margin:auto;
  }
  ::slotted(header-bar) {
    margin: unset;
    left: 0; right: 0;
    background-color: #d97e28;
  }
`;