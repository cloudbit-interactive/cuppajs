import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import {CuppaSelect, CuppaSelectType} from "./cuppa.select.js";
import "./cuppa.color-picker.js";
//import {LitComponent} from "./lit/LitComponent.js";



export default class App extends CuppaComponent {
	static observables = ['value']
	value = '#FF0000'

	render(){
		return html`
      <div style="display: flex; gap:20px; overflow: hidden; border: 1px solid #F00; position: relative; padding-bottom: 20px;">
			<label>Select Color</label>
			<cuppa-color-picker .value="${this.value}" .callback=${(color)=>{this.value = color}}></cuppa-color-picker>
      </div>
		`
	}
}

customElements.define('app-comp', App);
