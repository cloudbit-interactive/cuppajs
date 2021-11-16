import {CuppaComponent} from "../../../libs/cuppa/cuppa.component.js";

export default class Template extends CuppaComponent {

    constructor(){ super(); }

    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal; }
    
    mounteed() { }
    unmounted() { }
    rendered(){ }

    render(){
        return /*html*/`
            <div>
                Template
            </div>
        `
    }
}

customElements.define('template-comp', Template);
