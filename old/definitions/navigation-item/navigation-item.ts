import { LitElement, html, customElement, property, css } from 'lit-element';


export class NavigationItem {
  name: String;
  label: String;
  icon: String;

  constructor(name: string, label?: string, thumbnailIconPath?: string) {
    this.name = name;
    this.icon = thumbnailIconPath ? thumbnailIconPath : "";
    this.label = label ? label : name; //default to name
  }
}