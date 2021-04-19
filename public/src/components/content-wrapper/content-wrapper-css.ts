import { css } from 'lit-element';

export const style = css`
  :host {
    display: flex;
    flex: auto;
    flex-direction: row;
  }
  ::slotted(*) {
    flex: auto;
  }
  #content-display-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  #content-display-render {
    display: flex;
    height: 100%;
    width: 100%;
  }
`;