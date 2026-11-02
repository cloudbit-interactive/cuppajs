import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";

export class Template extends CuppaComponent {
	static{
		this.tag = "template-comp";
		this.global = true;
		this.attributes = ['attr1', 'attr2'];
		this.observables = ['observable1', 'observable2'];
	}

	render(){
		return html`
      <div>
        Template
      </div>
		`
	}
}
