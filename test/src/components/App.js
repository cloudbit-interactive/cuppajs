import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import {CuppaSelect, CuppaSelectType} from "./cuppa.select.js";
//import {LitComponent} from "./lit/LitComponent.js";



export default class App extends CuppaComponent {

	render(){
		return html`
      <div>
				<test-comp></test-comp>
      </div>
		`
	}
}

customElements.define('app-comp', App);
