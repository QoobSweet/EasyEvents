import { css } from 'lit';

export const style = css`
  :host {
    
  }
  content-item {
    width: 30%;
    height: 30%;
    margin: auto;
  }
  .block-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
  }
  .block-wrap > div {
    text-align: center;
  }

  .btn-google {
    display: inline-block;
    border-radius: 1px;
    text-decoration: none;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
    transition: background-color .218s, border-color .218s ,box-shadow .218s;
  }
  .google-content {
    display:flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .google-content .logo {
    height: 100%;
    width: 50px;
    padding: 15px;
  }
  .google-content svg {
  }
  .google-content .label {
    width: 100%;
    height: 100%;
    line-height: 1;
    letter-spacing: .21px;
    text-align: center;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    padding: 15px;
    background: #4285f4;
    margin: 0;
    color: white;
    cursor: unset;
  }
  .btn-google {
    background: #FFF;
    cursor: pointer;
  }
	.btn-google:hover {
		box-shadow: 0 0 3px 3px rgba(66,133,244,.3)
  }
  .btn-google:active {
		background-color: #eee;
  }
	.btn-google.google-content p {
		color: #757575;
  }
  

`;