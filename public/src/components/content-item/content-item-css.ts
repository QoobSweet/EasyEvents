import { css } from 'lit';

export const style = css`
  :host {
    display: flex;
    margin: auto;
    flex-direction: column;
    width: 100%;
    min-height: 250px;
    text-align: center;
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