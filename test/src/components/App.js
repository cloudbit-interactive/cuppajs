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
            <div class="flex d-column g-10" style="padding: 800px 0;">
                <div class="flex d-row j-start a-center g-5 p-x-10 p-y-20 o-hidden bg-warning-light" style="position: relative; height: 30px;">
                    <button class="btnMenu1">Menu1</button>
                    <cuppa-context-menu
	                    target=".btnMenu1"
                        pos-x="${CuppaContextMenu.POSITION.LEFT_IN}"
                        pos-y="${CuppaContextMenu.POSITION.BOTTOM}"
                    >
                        <button class="btn1">button1</button>
                        <cuppa-context-sub-menu
                            target=".btn1"
                            
                        >
                            <button class="button11">button11</button>
                            <cuppa-context-sub-menu
	                            target=".button11"
                            >
                                <button>button11</button>
                                <button>Button12</button>
                                <button>Button13</button>
                                <button>Button14</button>
                            </cuppa-context-sub-menu>
	                        
                            <button class="btn12">Button12</button>
                            <cuppa-context-sub-menu
                                target=".btn12"
                            >
                                <button>button121</button>
                                <button>Button122</button>
                            </cuppa-context-sub-menu>
	                        
                        </cuppa-context-sub-menu>
	                    
	                    
                        <button @click=${e=>{ e.stopPropagation() }}  >Button2</button>
                    </cuppa-context-menu>
                </div>
            </div>
		`
    }
}

customElements.define('app-comp', App);
