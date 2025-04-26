import { CuppaComponent, html} from "../../../libs/cuppa.component.js";

export default class TestComponent extends CuppaComponent {
	static attributes = ['name', 'boolean', 'last-name'];
	static observables = ['name', 'boolean'];
	name = "Foo";
	boolean = false;
	lastName = 0;

	render(){
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
