import { CuppaComponent, html, render as renderHTML } from "../../../libs/cuppa.component.js";
import { cuppa, log } from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import "./cuppa.select.js";
//import {LitComponent} from "./lit/LitComponent.js";

export default class App extends CuppaComponent {
    static observables = ['value']
    value = '#FF0000'

    mounted() {

    }

    render() {
        return html`
            <div class="flex d-column g-10" style="padding: 40px 0;">
	            <cuppa-select></cuppa-select>
            </div>
		`
    }
}

customElements.define('app-comp', App);
