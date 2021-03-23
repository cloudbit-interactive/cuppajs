import {CuppaComponent} from "../../libs/cuppa/cuppa.component.js";
import {CuppaRouter} from "../../libs/cuppa/cuppa.router.js";
import NavBar from "./common/NavBar.js";
import("./sections/welcome/Welcome.js");
import("./sections/basicComponent/BasicComponent.js");
import("./sections/performance/Performance.js");

const titlesMap = {
    "/":"CuppaJS Doc.",
    "basic-component":"Basic Component",
    "performance":"Performance"
}

export const router = new CuppaRouter({root:"/docs/", hash:"#/", titlesMap});

export default class App extends CuppaComponent {
    path;

    constructor(){
        super();
        router.addListener(path=>this.path = path);
        router.resolve();
    }

    render(){
        return /*html*/`
            <navbar-comp></navbar-comp>
            <section style="padding:2rem">
                ${ this.path == "simple-todo" ? "<simple-todo></simple-todo>"
                    : (this.path == "basic-component") ? "<basic-component></basic-component>" 
                    : (this.path == "performance") ? "<performance-comp></performance-comp>" 
                    : (this.path == "shopping-cart") ? "<div>Shopping cart</div>" 
                    : "<welcome-comp></welcome-comp>"
                }
            </section>
        `
    }
}

customElements.define('app-comp', App);