import {CuppaComponent} from "../../../src/cuppa.component.min.js"
import {cuppa} from "../../../src/cuppa.min.js"

export default class Template extends CuppaComponent {
    cuppa = cuppa
    pure = false
    shadow = false
    state = {attr1:null, attr2:false}

    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:newVal}) }
    
    constructor() { super(); }
    connected() { }
    disconnected() { }

    render(){
        return /*html*/`
            <div>
                Template
            </div>`
    }
}

customElements.define('template-comp', Template);
