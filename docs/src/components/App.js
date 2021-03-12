import {CuppaComponent} from "//cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.component.min.js";
import {CuppaRouter} from "//cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.router.min.js";
import NavBar from "./common/NavBar.js";

import("./sections/welcome/Welcome.js");
import("./sections/basicComponents/BasicComponents.js");
import("./sections/simpleTodo/SimpleTodo.js");
import("./sections/todo/Todo.js");
import("./sections/performance/Performance.js");
import("./sections/useComponents/UseComponents.js");
import("./sections/componentCicle/ComponentCicle.js");

export const router = new CuppaRouter({root:"/docs/", hash:"#/", titlesMap:{"/":"Cuppa Examples"}});

export default class App extends CuppaComponent {
    state = { path:null }

    constructor(){
        super();
        router.addListener(path=>this.setState({path}));
        router.resolve();
        
    }

    render(){
        return /*html*/`
            <navbar-comp></navbar-comp>
            <section style="padding:2rem">
                ${ this.state.path == "simple-todo" ? "<simple-todo></simple-todo>"
                    : (this.state.path == "basic-components") ? "<basic-components></basic-components>" 
                    : (this.state.path == "simple-todo") ? "<simple-todo></simple-todo>" 
                    : (this.state.path == "todo") ? "<todo-comp></todo-comp>" 
                    : (this.state.path == "performance") ? "<performance-comp></performance-comp>" 
                    : (this.state.path == "shopping-cart") ? "<div>Shopping cart</div>" 
                    : (this.state.path == "use-components") ? "<use-components></use-components>" 
                    : (this.state.path == "component-cicle") ? "<component-cicle></component-cicle>" 
                    : "<welcome-comp></welcome-comp>"
                }
            </section>
        `
    }
}

customElements.define('app-comp', App);