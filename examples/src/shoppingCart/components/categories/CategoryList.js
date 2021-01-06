import {CuppaComponent} from "../../../../../src/cuppa.component.js"
import {cuppa} from "../../../../../src/cuppa.min.js"
import API from "../../controllers/Api.js";
import { router } from "../../ShoppingCart.js";

export default class CategoryList extends CuppaComponent {
    constructor(){
        super();
        this.cuppa = cuppa
        this.state = {categories:null}
    }
    
    connected() {
        this.loadCategories().then();

        
    }

    async loadCategories(){
        let categories = await API.getCategories();
        this.setState({categories},()=>{ router.updateLinks(); });
    }

    render(){
        return /*html*/`
            <div>
                <ul>
                    <li><a href="#">All</a></li>
                    ${ (this.state.categories || []).map(category=>{
                        return /*html*/`<li><a href="category/${cuppa.urlFriendly(category)}" title="${category}" >${category}</a></li>`
                    }).join("") }
                </ul>
            </div>`
    }
}

customElements.define('category-list', CategoryList);
