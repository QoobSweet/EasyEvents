import { css } from 'lit';

export const style = css`
  :host {
    height: 100%;
    width: 100%;

    --fc-border-color: 
  }
  #calendar, #timeline {
    margin: 15px;
  }
  .fc-event .fc-event-main {
    position: relative;
    z-index: 2;
    min-height: 10px;
  }

  .fc-daygrid-day-events {
    margin: 2px;
  }

  .fc-event-title-container {
    padding: 2px;

  }
  .fc-event-title {
    font-size: .7em;
    font-weight: bold;
  }
  
  .fc .fc-scrollgrid table {
    border-top-style: hidden;
    border-left-style: unset;
    border-right-style: hidden;
}
`;