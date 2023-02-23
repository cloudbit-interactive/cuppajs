import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import TestComponent from "./TestComponent.js";

export default class App extends CuppaComponent {

	mounted(){

	}

	render(){
		return html`
      <div>
        <test-comp></test-component>
      </div>
		`
	}
}

customElements.define('app-comp', App);
