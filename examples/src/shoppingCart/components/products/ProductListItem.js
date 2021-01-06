import {CuppaComponent} from "../../../../../libs/cuppa.component.js"
import {cuppa} from "../../../../../libs/cuppa.min.js"

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
            <a class="product-list-item" href="product/${this.state.product?.id}/${cuppa.urlFriendly(this.state.product?.title)}" >
                <div class="image" style="background-image:url(${this.state.product?.image})"></div>
                <h3>${this.state.product?.title}</h2>
                <p>${this.state.product?.category}</p>
                <p>$ ${this.state.product?.price}</p>
            </a>`
    }
}

customElements.define('product-list-item', ProductListItem);
