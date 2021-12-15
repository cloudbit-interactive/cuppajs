import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaSwitch} from "../../../../cuppa/components/cuppa.switch.js";

export class CuppaSwitchDoc extends CuppaComponent {
    checked = this.observable("checked", false);
    disabled = this.observable("disabled", false);

    constructor(){ super(); }

    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal; }

    render(){
        return html`
            <div>
                <h1 class="title-2">Cuppa Switch</h1>
                <div class="message mt-20" style="display: flex; align-items: center;">
                    <cuppa-switch 
                        name="switch" 
                        checked=${this.checked} 
                        disabled=${this.disabled} 
                        @change=${e=>this.checked=e.target.checked }
                    ></cuppa-switch>
                    <div class="separator-v"></div>
                    <button class="button-1" @click=${ ()=>this.disabled = !this.disabled }>
                        ${ this.disabled ? 'enable' : 'disable' }
                    </button>
                    <button class="button-1" @click=${ ()=>this.checked = !this.checked }>
                        ${ this.checked ? 'uncheck' : 'check' }
                    </button>
                </div>
                <hr class="separator-1" />
                <table class="table-1 mt-20" >
                    <thead>
                        <tr>
                            <th>
                                <div class="tag-1">Property</div> <div class="tag-1 tag-1-white">attribute</div>  
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
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Specify a checkbox name.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">checked</div>
                            </td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>If true, the switch is checked.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">disabled</div>
                            </td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>If true, the switch is disabled.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">@change</div>
                            </td>
                            <td>Event</td>
                            <td></td>
                            <td>Fires when the switch is checked or unchecked.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }
}

customElements.define('cuppa-switch-doc', CuppaSwitchDoc);