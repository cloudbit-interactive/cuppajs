import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaSwitch} from "../../../../cuppa/components/cuppa.switch.min.js";
import {Utils} from "../../../controlers/Utils.js";

export class CuppaSwitchDoc extends CuppaComponent {
    checked = this.observable("checked", false);
    disabled = this.observable("disabled", false);

    mounted(){
        Utils.loadPrism();
    }

    render(){
        return html`
            <div>
                <h1 class="title-2 mb-10">Cuppa Switch</h1>
                <div class="message" style="display: flex; align-items: center;">
                    <cuppa-switch 
                        name="switch" 
                        checked=${this.checked} 
                        disabled=${this.disabled} 
                        @change=${e=>this.checked=e.target.checked }
                    ></cuppa-switch>
                    <div class="separator-v"></div>
                    <button class="button-1" @click=${ ()=>this.disabled = !this.disabled }>
                        ${ this.disabled ? 'Enable' : 'Disable' }
                    </button>
                    <button class="button-1" @click=${ ()=>this.checked = !this.checked }>
                        ${ this.checked ? 'Uncheck' : 'Check' }
                    </button>
                </div>
                
                <hr class="separator-1" />
                <h2 class="title-3 mb-10">Properties</h2>
                <div style="overflow: auto;">
                    <table class="table-1 min-width">
                        <thead>
                            <tr>
                                <th style="width: 30rem">
                                    <div class="tag-1">Property</div> 
                                    <div class="tag-1 tag-1-white">attribute</div>
                                    <div class="tag-1 tag-1-yellow">event</div>
                                </th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="tag-1">name</div>
                                    <div class="tag-1 tag-1-white">name</div>
                                </td>
                                <td>string</td>
                                <td></td>
                                <td>Specify a checkbox name.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">checked</div>
                                    <div class="tag-1 tag-1-white">checked</div>
                                </td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>If true, the switch is checked.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">disabled</div>
                                    <div class="tag-1 tag-1-white">disabled</div>
                                </td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>If true, the switch is disabled.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">callback</div>
                                </td>
                                <td>function</td>
                                <td></td>
                                <td>
                                    Callback function when user switch.
                                    <br />
                                    return: {name:string, checked: boolean, ref:Component}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1 tag-1-yellow">onchange</div>
                                </td>
                                <td>Event</td>
                                <td></td>
                                <td>Fires when the switch is checked or unchecked.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr class="separator-1" />
                <h2 class="title-3 mb-10">Code Example</h2>
                ${Utils.prismCode({removeTabsCount:5, code:`
                    <!-- Import component -->
                    <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.switch.min.js" type="module"></script>
                    
                    <!-- Use with HTML Tag -->
                    <cuppa-switch name="switch" onchange="console.log(this.checked, this.name)"></cuppa-switch>
                `})}
                
            </div>
        `
    }
}

customElements.define('cuppa-switch-doc', CuppaSwitchDoc);
