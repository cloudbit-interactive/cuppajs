import {CuppaComponent} from "../../../../../src/cuppa.component.js"
import {cuppa} from "../../../../../src/cuppa.min.js"

export default class ProductListItem extends CuppaComponent {
    constructor(){
        super();
        this.cuppa = cuppa
        this.state = {product:null}
    }

    static get observedAttributes() { return ['product'] }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:cuppa.jsonDecode(newVal)}) }

    render(){
        return /*html*/`
            <a href="product/${this.state.product?.id}/${cuppa.urlFriendly(this.state.product?.title)}" data-navigo="1" >
                <img src="${this.state.product?.image}" height="100px"  />
                <h2>${this.state.product?.title}</h2>
                <p>${this.state.product?.category}</p>
                <p>$ ${this.state.product?.price}</p>
            </a>`
    }
}

customElements.define('product-list-item', ProductListItem);
