import {CuppaComponent} from "../../../../../libs/cuppa.component.js"
import {cuppa} from "../../../../../libs/cuppa.min.js"

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
