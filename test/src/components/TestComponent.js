import { CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa} from "../../../libs/cuppa.js";

export default class TestComponent extends CuppaComponent {
	static observables = ['name'];
	name = "Foo";

	static get observedAttributes() { return ['name'] }
	attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal }

	constructor() {
		super();
		//this.observables({name:this.name})
		//this.name = "Bar";
	}

	mounted(){
		//this.name = "ddd";
	}

	render(){
		console.log("Render", this.name);
		return html`
      <div>
        <input ref="input1" value=${this.name} @input=${(e)=>this.name = e.target.value} />
        <div class="animation ${this.name === 'ddd' ? 'start' : ''}">${this.name}</div>
	      <style>
		      .animation{
			      transition: 10s;
			      background: #ddd;
			      &.start{
				      background: #000;
			      }
		      }
	      </style>
      </div>
		`
	}
}

customElements.define('test-comp', TestComponent);
