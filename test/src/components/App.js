import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import CuppaSelect, {CuppaSelectType} from "./cuppa.select.js";
import "./cuppa.alert.js";
//import {LitComponent} from "./lit/LitComponent.js";

export default class App extends CuppaComponent {
	static observables = ['value']
	value = '#FF0000'

	mounted(){
		setTimeout(()=>{
			document.body.append(cuppa.newElement('<cuppa-alert ></cuppa-alert>'))
		}, 1000)
	}

	render(){
		return html`
           
		`
	}
}

customElements.define('app-comp', App);
