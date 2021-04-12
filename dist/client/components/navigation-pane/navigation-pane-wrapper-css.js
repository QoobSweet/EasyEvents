"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
exports.style = lit_element_1.css `
  :host {
    position: absolute;
    display: flex;
    width: 300px;
    height: 100%;
    max-width: 30%;
  }
  #show-nav-button {
    position: absolute;
    margin: 10px;
    padding: 6px;
    width: 40px;
    height: 40px;
  }
  `;
