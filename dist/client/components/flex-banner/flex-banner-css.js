"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("lit-element");
exports.style = lit_element_1.css `
  :host {
    display: block;
    height: 300px;
    max-height: 30vw;
    width: 100%;
    background-color: rgb(201 201 201);
    border-bottom: #dedede ridge 5px;
  }
  #background-image {
    background-image: url("./public/images/placeholder-banner.jpg");
    background-size: cover;
    height: 100%;
    width: 100%;
  }
`;
