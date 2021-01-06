import {CuppaComponent} from "../../../../../libs/cuppa.component.js"
import {cuppa, log, val} from "../../../../../libs/cuppa.min.js"
import API from "../../controllers/Api.js"
import { router } from "../../ShoppingCart.js";
import ProductListItem from "./ProductListItem.js"

export default class ProductList extends CuppaComponent {
    constructor(){
        super();
        this.cuppa = cuppa;
        this.state = {products:null, category:null}
    }

    static get observedAttributes() { return ['category'] }
    attributeChangedCallback(attr, oldVal, newVal) { 
        this.setState({[attr]:newVal},  this.loadProducts)
    }

    connected(){
        this.loadProducts().then();
    }

    async loadProducts(){
        if(!this) return;
        let products = await API.getProducts(this.state?.category);
        this.setState({products}, ()=>router.updateLinks())
    }

    render(){
        return /*html*/`
            <div class="category-title">${ val(this.state, 'category', 'All Items').replace("-", " ") }</div>
            <div class="list" style="margin:10px 0 0">
                ${(this.state.products || []).map(product=>{
                    return /*html*/`<product-list-item key="${product.id}" product="${cuppa.jsonEncode(product)}"></product-list-item>`
                }).join("")}
            </div>`
    }
}

customElements.define('product-list', ProductList);
