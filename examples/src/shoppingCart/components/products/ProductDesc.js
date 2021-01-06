import {CuppaComponent} from "../../../src/cuppa.component.js"
import {cuppa} from "../../../src/cuppa.min.js"

export default class ProductDesc extends CuppaComponent {
    constructor(){
        super();
        this.cuppa = cuppa
    }

    render(){
        return /*html*/`
            <div>
                PD
            </div>`
    }
}

customElements.define('product-desc', ProductDesc);
