import { CuppaComponent, html} from "../../../libs/cuppa.component.js";

export default class TestComponent extends CuppaComponent {
	name = this.observable('name', "Tufik");

	onclick(e){
		console.log(e);
	}

	render(){
		return html`
      <div>
        <input value=${this.name} @input=${(e)=>this.name = e.target.value} />
        <div>${this.name}</div>
      </div>
		`
	}
}

customElements.define('test-comp', TestComponent);
