import {CuppaComponent} from "../../../libs/cuppa.component.js"
import {cuppa, log, val} from "../../../libs/cuppa.min.js"
import CategoryList from "./components/categories/CategoryList.js"
import {CuppaRouter} from "../../../libs/cuppa.router.js"
import ProductList from "./components/products/ProductList.js"
import ProductDesc from "./components/products/ProductDesc.js"
cuppa.requiereCSS("./src/shoppingCart/styles.css");

export const router = new CuppaRouter({root:"/examples/", hash:"#/", titlesMap:{"/":"Shopping Cart"}});

export default class ShoppingCart extends CuppaComponent {

    constructor(){
        super();
        this.cuppa = cuppa;
        router.on('*',(params)=>this.forceRender() );
        router.resolve();
    }

    render(){
        let pathData = router.getPathData();
        return /*html*/`
            <main>
                <category-list></category-list>
                <section class="main-content">
                    ${ 
                        (val(pathData, 'pathArray.0') == "category" ) ? /*html*/`<product-list category="${pathData.pathArray[1]}"></product-list>` 
                        : (val(pathData, 'pathArray.0') == "product") ? /*html*/`<product-desc productId="${pathData.pathArray[1]}"></product-desc>`  
                        : /*html*/`<product-list category=""></product-list>`
                    }
                </section>
            </main>`
    }
}

customElements.define('shopping-cart', ShoppingCart);
