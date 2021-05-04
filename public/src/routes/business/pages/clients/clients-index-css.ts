import { css } from 'lit';

export const style = css`
  :host {
    
  }
  .tg  {
    border-spacing:0;
    margin: 15px;
    margin-top: 15px;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
  }
  .tg td {
    border-color:black;
    border-style:solid;
    border-width:1px;
    font-family:Arial, sans-serif;
    font-size:.9em;
    overflow:hidden;
    padding:10px 1px;
    word-break:normal;
  }
  .tg th {
    font-family:Arial, sans-serif;
    font-size:.8em;
    font-weight:normal;
    overflow:hidden;
    padding:5px 1px;
    word-break:normal;
    min-width: 100px;
    cursor: default;
  }
  .tg .tg-0lax {
    vertical-align: top;
    text-align: left;
  }
  .tg-0lax.sort-object:hover {
    background-color: #00b248;
  }
  tr.client-item:hover {
    background-color: #00b248;
  }
  .table-headers th {
    font-weight: bolder;
    font-size: 1em;
  }
  .bottom-round .tg-0lax {
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    font-weight: bolder;
    font-size: 1.2em;
    border: #00b248 1px solid;
    text-align: center;
  }
`;