import {CuppaComponent} from "../../../../../src/cuppa.component.js"
import {cuppa} from "../../../../../src/cuppa.min.js"
import API from "../../controllers/Api.js"
import { router } from "../../ShoppingCart.js";
import ProductListItem from "./ProductListItem.js"

export default class ProductList extends CuppaComponent {
    constructor(){
        super();
        this.cuppa = cuppa;
        this.state = {products:null}
    }

    connected(){
        this.loadProducts().then();
    }

    async loadProducts(){
        let products = await API.getProducts();
        this.setState({products}, ()=>router.updatePageLinks())
    }

    render(){
        return /*html*/`
            <div>
                ${(this.state.products || []).map(product=>{
                    return /*html*/`<product-list-item key="${product.id}" product="${cuppa.jsonEncode(product)}"></product-list-item>`
                }).join("")}
            </div>`
    }
}

customElements.define('product-list', ProductList);
