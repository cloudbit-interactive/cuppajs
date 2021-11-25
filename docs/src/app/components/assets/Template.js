import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";

export class Template extends CuppaComponent {

    constructor(){ super(); }

    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal; }

    render(){
        return html`
            <div>
                Template
            </div>
        `
    }
}

customElements.define('template-comp', Template);
