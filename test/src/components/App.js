import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import {CuppaSelect, CuppaSelectType} from "./cuppa.select.js";
import "./cuppa.select.js";
//import {LitComponent} from "./lit/LitComponent.js";


const values = [
	{value:1, label:'Option1'},
	{value:2, label:'Option2'},
    {value:3, label:'Option3'},
	{value: 4, label: 'Option4' },
	{value: 5, label: 'Option5' },
	{value: 6, label: 'Option6' },
	{value: 7, label: 'Option7' },
	{value: 8, label: 'Option8' },
	{value: 9, label: 'Option9' },
	{value: 10, label: 'Option10' },
	{value: 11, label: 'Option11 Long text Super long with tooo many characters' },
]

export default class App extends CuppaComponent {
	static observables = ['value']
	value = '#FF0000'

	render(){
		return html`
      <div style="overflow: hidden; padding:20px; position: relative; ">
			<label>Select Color</label>
			<cuppa-select
				style="width: 200px;"
				.options=${values}
                dropdown-style="width: 200px; max-height: 400px"
			></cuppa-select>
      </div>
      <div style="overflow: hidden; padding:20px; position: relative; ">
          <label>Select Color</label>
          <cuppa-select
                  style="width: 200px;"
                  .options=${values}
                  dropdown-style="width: 200px; max-height: 400px"
          ></cuppa-select>
      </div>
		`
	}
}

customElements.define('app-comp', App);
