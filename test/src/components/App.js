import {CuppaComponent, html, render as renderHTML} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./cuppaComponent/TestComponent.js";
import {CuppaMenu} from "./cuppa.menu.js";
//import {LitComponent} from "./lit/LitComponent.js";

export default class App extends CuppaComponent {
	static observables = ['value']
	value = '#FF0000'
	
	mounted() {
	
	}
	
	render() {
		return html`
            <div class="flex d-column g-10">
                <table class="o-hidden" style="border:1px solid #F00">
                    <tbody>
                    <tr>
                        <td class="o-hidden">
                            <div class="flex d-row j-start a-center g-5 p-x-10 p-y-20 o-hidden bg-warning-light">
                                <button class="btnMenu1">Menu1</button>
                                <button class="btnMenu2">Menu2</button>
                                <button class="btnmenu3">Menu3</button>
                                <cuppa-menu class="ani-fade-up" target=".btnMenu1" pos-x=${CuppaMenu.POSITION.LEFT_IN}
                                            pos-y=${CuppaMenu.POSITION.BOTTOM}>
                                    <button class="btn11">Button11</button>
                                    <button>Button12</button>
                                    <button>Button13</button>
                                    <cuppa-menu target=".btn11" main-menu="false" pos-x=${CuppaMenu.POSITION.RIGHT}
                                                pos-y=${CuppaMenu.POSITION.TOP_IN}>
                                        <button>Button111</button>
                                        <button>Button112</button>
                                        <button>Button113</button>
                                    </cuppa-menu>
                                </cuppa-menu>
	                            
                                <cuppa-menu target=".btnMenu2" pos-x=${CuppaMenu.POSITION.LEFT_IN}
                                            pos-y=${CuppaMenu.POSITION.BOTTOM}>
                                    <button>Button21</button>
                                    <button>Button22</button>
                                    <button>Button23</button>
                                </cuppa-menu>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div class="flex d-row j-start a-center g-5 p-x-10 p-y-20 o-hidden bg-warning-light">
                    <button class="btnMenu4">Menu1</button>
                    <button class="btnMenu5">Menu2</button>
                    <button class="btnmenu6">Menu3</button>
                    <cuppa-menu target=".btnMenu4" pos-x=${CuppaMenu.POSITION.LEFT_IN}
                                pos-y=${CuppaMenu.POSITION.BOTTOM}>
                        <button>Button11</button>
                        <button>Button12</button>
                        <button>Button13</button>
                    </cuppa-menu>
                    <cuppa-menu target=".btnMenu5" pos-x=${CuppaMenu.POSITION.LEFT_IN}
                                pos-y=${CuppaMenu.POSITION.BOTTOM}>
                        <button>Button21</button>
                        <button>Button22</button>
                        <button>Button23</button>
                    </cuppa-menu>
                </div>
                <div class="flex d-row j-start a-center g-5 p-x-10 p-y-20 o-hidden bg-warning-light">
                    <button class="ctxButton1">ctxButton1</button>
                    <cuppa-menu target=".ctxButton1" contextual-menu="true" pos-x=${CuppaMenu.POSITION.LEFT_IN}
                                pos-y=${CuppaMenu.POSITION.BOTTOM}>
                        <button class="btn31">Button31</button>
                        <button>Button32</button>
                        <button>Button33</button>
                        <cuppa-menu
	                        target=".btn31" main-menu="false" show-on-mouse-over="true"
                            pos-x=${CuppaMenu.POSITION.RIGHT} pos-y=${CuppaMenu.POSITION.TOP_IN}
                        >
                            <button>Button311</button>
                            <button>Button312</button>
                            <button>Button313</button>
                        </cuppa-menu>
                    </cuppa-menu>
                </div>
                <div class="flex d-row j-start a-center g-5 p-x-10 p-y-20 o-hidden bg-warning-light"
                     style="margin-top: 500px">
                    <button class="ctxButton4">ctxButton4</button>
                    <cuppa-menu target=".ctxButton4" contextual-menu="true" pos-x=${CuppaMenu.POSITION.LEFT_IN}
                                pos-y=${CuppaMenu.POSITION.BOTTOM}>
                        <button class="btn41">Button41</button>
                        <button>Button42</button>
                        <button>Button43</button>
                        <cuppa-menu target=".btn41" main-menu="false"
                                    pos-x=${CuppaMenu.POSITION.RIGHT} pos-y=${CuppaMenu.POSITION.TOP_IN}>
                            <button>Button411</button>
                            <button>Button412</button>
                            <button>Button413</button>
                            <button>Button414</button>
                            <button>Button415</button>
                            <button>Button416</button>
                        </cuppa-menu>
                    </cuppa-menu>
                </div>
                <div class="flex d-row j-start a-center g-5 p-x-10 p-y-20 o-hidden bg-warning-light">
                    <button
                            class="ctxButton5"
                            @click=${e => {
                                let menu = cuppa.newElement(`
									<cuppa-menu
										class="ani-fade-up"
									 	target=".ctxButton5"
									 	force-show="true"
									 	contextual-menu="true"
								      	pos-x=${CuppaMenu.POSITION.LEFT_IN} pos-y=${CuppaMenu.POSITION.BOTTOM}
							      	>
										<button class="btn51">Button51</button>
										<button>Button52</button>
										<button>Button53</button>
										<cuppa-menu
											class="ani-fade-left"
					                        target=".btn51"
					                        main-menu="false"
				                            pos-x=${CuppaMenu.POSITION.RIGHT} pos-y=${CuppaMenu.POSITION.TOP_IN}
				                        >
				                            <button>Button511</button>
				                            <button>Button512</button>
				                            <button>Button513</button>
				                        </cuppa-menu>
									</cuppa-menu>
								`, {template:true});
								cuppa.on(menu, 'close', (e) => {
									log("close")
                                    e.target.remove()
								})
								log(menu)
	                            document.body.appendChild(menu)
                                //log("--", menu)
                                //renderHTML(menu, document.body)
                            }}
                    >
                        <span>ctxButton5</span>
                    </button>
                </div>
            </div>
		`
	}
}

customElements.define('app-comp', App);
