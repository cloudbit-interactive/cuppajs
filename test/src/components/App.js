import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import CuppaSelect, {CuppaSelectType} from "./cuppa.select.js";
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
	{value: 12, label: 'Option12' },
	{value: 13, label: 'Option13'},
	{value: 14, label: 'Option14' },
	{value: 15, label: 'Option15' },
	{value: 16, label: 'Option16' },
	{value: 17, label: 'Option17' },
	{value: 18, label: 'Option18' },
	{value: 19, label: 'Option19' },
	{value: 20, label: 'Option20' },
	{value: 21, label: 'Option21' },
	{value: 22, label: 'Option22' },
	{value: 23, label: 'Option23' },
	{value: 24, label: 'Option24' },
	{value: 25, label: 'Option25' },
	{value: 26, label: 'Option26' },
	{value: 27, label: 'Option27' },
	{value: 28, label: 'Option28' },
	{value: 29, label: 'Option29' },
]

export default class App extends CuppaComponent {
	static observables = ['value']
	value = '#FF0000'

	render(){
		return html`
            <div style="overflow: hidden; padding:20px; position: relative; padding-top: 600px">
                <label>Select Color</label>
                <cuppa-select
                        style="width: 200px;"
                        .options=${values}
                ></cuppa-select>
            </div>
            <div style="overflow: hidden; padding:20px; position: relative;  padding-top: 600px">
                <label>Select Color</label>
                <cuppa-select
                        .options=${values}
                ></cuppa-select>
            </div>
            <div style="overflow: hidden; padding:20px; position: relative; display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end ">
                <label>Select Color</label>
                <cuppa-select
                        style="width: 200px;"
                        dropdown-style="width:400px"
                        .options=${values}
                        type=${'MULTIPLE'}
                ></cuppa-select>
            </div>
		`
	}
}

customElements.define('app-comp', App);
