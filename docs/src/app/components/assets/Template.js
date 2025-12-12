import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";

export class Template extends CuppaComponent {
	static attributes = ['attr1', 'attr2'];

	render(){
		return html`
      <div>
        Template
      </div>
		`
	}
}

customElements.define('template-comp', Template);
