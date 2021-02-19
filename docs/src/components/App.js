import {CuppaComponent} from "../../../libs/cuppa.component.js";
import {CuppaRouter} from "../../../libs/cuppa.router.js";
import NavBar from "./common/NavBar.js";

import("./sections/welcome/Welcome.js");
import("./sections/simpleComponents/simpleComponents.js");
import("./sections/simpleTodo/SimpleTodo.js");
import("./sections/todo/Todo.js");
import("./sections/performance/Performance.js");
import("./sections/cuppaComponents/CuppaComponents.js");

export const router = new CuppaRouter({root:"/docs/", hash:"#/", titlesMap:{"/":"Cuppa Examples"}});

export default class App extends CuppaComponent {

    constructor(){
        super();
        this.state = { path:null }
        router.addListener(path=>this.setState({path}));
        router.resolve();
        
    }

    render(){
        return /*html*/`
            <navbar-comp></navbar-comp>
            <section style="padding:2rem">
                ${ this.state.path == "simple-todo" ? "<simple-todo></simple-todo>"
                    : (this.state.path == "simple-components") ? "<simple-comps></simple-comps>" 
                    : (this.state.path == "todo") ? "<todo-comp></todo-comp>" 
                    : (this.state.path == "performance") ? "<performance-comp></performance-comp>" 
                    : (this.state.path == "shopping-cart") ? "<div>Shopping cart</div>" 
                    : (this.state.path == "cuppa-components") ? "<cuppa-components></cuppa-components>" 
                    : "<welcome-comp></welcome-comp>"
                }
            </section>
        `
    }
}

customElements.define('app-comp', App);