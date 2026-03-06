import { CuppaComponent, html, render as renderHTML } from "../../../libs/cuppa.component.js";
import { cuppa, log } from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import { CuppaContextMenu } from "./cuppa.context.menu.js";
//import {LitComponent} from "./lit/LitComponent.js";

export default class App extends CuppaComponent {
    static observables = ['value']
    value = '#FF0000'

    mounted() {

    }

    render() {
        return html`
            <div class="flex d-column g-10">
                <div class="flex d-row j-start a-center g-5 p-x-10 p-y-20 o-hidden bg-warning-light" style="position: relative; height: 30px;">
                    <button class="btnMenu1">Menu1</button>
                    <cuppa-context-menu target=".btnMenu1">
	                    <button>dd</button>
                        <button>dd2</button>
                    </cuppa-context-menu>
                </div>
            </div>
		`
    }
}

customElements.define('app-comp', App);
