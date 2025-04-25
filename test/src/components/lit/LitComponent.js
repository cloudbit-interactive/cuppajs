import {LitElement, html, css} from "./lit-core.min.js";

export class LitComponent extends LitElement {
  createRenderRoot() { return this; } // Disable shadow DOM
  static properties = {
    name: {type: String},
    age:{type: Number},
    boolean: {type: String},
    object:{attributes:false},
    myVar: {type: String},
  };

  constructor() {
    super();
    this.boolean = true;
    this.object = {a:1, b:2};
  }

  onClick(){
    this.name = this.name !== "Bar" ? "Bar" : "Foo";
  }

  render() {
    console.log(this.name, this.age, this.boolean, this.object);
    return html`
      <p>Hello, <span>${this.name}</span>, Age:${this.age}</p>
      <button @click=${this.onClick}>Click me</button>
      <button @click=${()=>{ this.age = Math.random()*99; }}>Click me</button>
      <button @click=${()=>{ this.object.a = 100; this.requestUpdate(); }}>Click me</button>
      <style>
        p{
          color:#F00;
          & span{
            color:#F0F;
          }
        }
      </style>
    `;
  }
}
customElements.define('lit-component', LitComponent);
