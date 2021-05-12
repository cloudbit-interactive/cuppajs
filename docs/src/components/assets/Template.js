import {CuppaComponent} from "../../../libs/cuppa/cuppa.component.js";
import {cuppa} from "../../../../libs/cuppa.js";

export default class Template extends CuppaComponent {
    cuppa = cuppa
    pure = false
    shadow = false

    constructor(){ super(); }

    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal; }
    
    connected() { }
    disconnected() { }

    render(){
        return /*html*/`
            <div>
                Template
            </div>
        `
    }
}

customElements.define('template-comp', Template);
