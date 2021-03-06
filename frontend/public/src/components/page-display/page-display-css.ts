import { css } from 'lit';

export const style = css`
  :host {
    position: absolute;
    left:0; right:0;
    top:0; bottom:0;
    display: flex;
    flex-direction: column;
    background-color: #303030;
  }
  ::slotted(*) {
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
  }
`;