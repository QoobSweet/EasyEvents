import { LitElement, html, customElement, property, css } from 'lit-element';


export class NavigationItem {
  name: String;
  label: String;

  constructor(name: String, label?: String,) {
    this.name = name;
    this.label = label ? label : name; //default to name
  }
}