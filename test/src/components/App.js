import {CuppaComponent, html, ref, render as renderHTML} from "./cuppa.component.js";
import { cuppa, log } from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import "./cuppa.select.js";

export default class App extends CuppaComponent {
    static observables = ['selected'];

    mounted() {

    }

    render() {
		const options = [];
		for(let i=1; i<=100; i++){
			options.push({value: i, label: `Option ${i}`});
		}
        return html`
            <div class="flex d-column g-10" style="padding: 20px 0;">
	            <div
		         
		            ${ref(el=>{
						if(!el) return;
						el.style.background = 'red';
		            })}
                >ddd</div>
            </div>
		`
    }
}

customElements.define('app-comp', App);
