import { css } from 'lit';
export const style = css `
  :host {
    height: 100%;
    width: 100%;
  }
  #calendar, #timeline {
    margin: 15px;
  }
  .fc-event .fc-event-main {
    position: relative;
    z-index: 2;
    min-height: 10px;
  }
`;
