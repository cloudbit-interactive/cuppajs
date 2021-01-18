import {CuppaComponent} from "../../../../../libs/cuppa.component.js"
import {cuppa} from "../../../../../libs/cuppa.min.js"
import API from "../../controllers/Api.js";
import { router } from "../../ShoppingCart.js";

export default class CategoryList extends CuppaComponent {
    constructor(){
        super();
        this.cuppa = cuppa
        this.state = {categories:null}
    }
    
    connected() {
        this.loadCategories();

        
    }

    loadCategories(){
        let categories = API.getCategories();
        this.setState({categories}, ()=>router.updateLinks());
    }

    render(){
        return /*html*/`
            <nav>
                <ul>
                    <li><a href="#">All</a></li>
                    ${ (this.state.categories || []).map(category=>{
                        return /*html*/`<li><a href="category/${cuppa.urlFriendly(category)}" title="${cuppa.capitaliseAllWords(category)}" >${category}</a></li>`
                    }).join("") }
                </ul>
            </nav>`
    }
}

customElements.define('category-list', CategoryList);
