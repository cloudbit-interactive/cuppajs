import {CuppaComponent} from "../../../src/cuppa.component.js"
import {cuppa, log} from "../../../src/cuppa.min.js"
import CategoryList from "./components/categories/CategoryList.js"
import ProductList from "./components/products/ProductList.js"
import CuppaRouter from "../../../src/cuppa.router.js";

export const router = new CuppaRouter({root:"/examples/", hash:"#/"});

export default class ShoppingCart extends CuppaComponent {

    constructor(){
        super();
        this.cuppa = cuppa;
        this.state = {path:""}
        this.routes();
    }

    routes(){
        
        router.on('*',(params)=>this.setState({path:params.path}) )
        
       /*
       router.on('', (params)=>{
        console.log("1",params)
        }, {exact:false})
        
        router.on('category/:category', (params)=>{
            console.log("2",params)
        }, {exact:false})
        
        
        router.on('product/:id/*', (params)=>{
            console.log(params)
        })
        */

        router.resolve();
        
    }

    render(){
        console.log(router.match(this.state.path, "category/:category"))
        return /*html*/`
            <div>
                <category-list></category-list>
                ${ (router.match(this.state.path, "category/:category")) ? "Is category" : "Is general" }
            </div>`
    }
}

customElements.define('shopping-cart', ShoppingCart);
