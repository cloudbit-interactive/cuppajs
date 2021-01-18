import {CuppaComponent} from "../../../../../libs/cuppa.component.js"
import {cuppa, log} from "../../../../../libs/cuppa.min.js"
import API from "../../controllers/Api.js";
import { router} from "../../ShoppingCart.js";

export default class ProductDesc extends CuppaComponent {
    constructor(){
        super();
        this.cuppa = cuppa;
        this.state = {product:null};
    }

    connected(){
        let pathData = router.getPathData();
        let product = API.getProduct(pathData.pathArray[1]);
        this.setState({product});
    }

    render(){
        return /*html*/`
            <div>
                <h3>${this.state.product?.title}</h2>
                <div class="image" style="background-image:url(${this.state.product?.image})"></div>
                <p>${this.state.product?.category}</p>
                <p>$ ${this.state.product?.price}</p>
                <p>${this.state.product?.description}</p>
            </div>`
    }
}

customElements.define('product-desc', ProductDesc);
