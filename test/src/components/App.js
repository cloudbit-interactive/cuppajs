import { CuppaComponent, html, render as renderHTML } from "../../../libs/cuppa.component.js";
import { cuppa, log } from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import "./cuppa.select.js";
//import {LitComponent} from "./lit/LitComponent.js";

export default class App extends CuppaComponent {
    static observables = ['selected'];
	selected = [1,2,3]

    mounted() {

    }

    render() {
		const options = [];
		for(let i=1; i<=100; i++){
			options.push({value: i, label: `Option ${i}`});
		}
        return html`
            <div class="flex d-column g-10" style="padding: 20px 0;">
	            <cuppa-select
	            	.options=${options}
		            style="width: 300px;"
                
                ></cuppa-select>
            </div>
		`
    }
}

customElements.define('app-comp', App);
