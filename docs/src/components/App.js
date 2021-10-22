import {CuppaComponent} from "../../libs/cuppa/cuppa.component.js";
import {CuppaRouter} from "../../libs/cuppa/cuppa.router.js";
import NavBar from "./common/NavBar.js";
import BarTop from "./common/BarTop.js";
import("./sections/welcome/Welcome.js");
import("./sections/basic/cuppaComponent.js");
import("./sections/basic/cuppaRouter.js");
import("./sections/basic/cuppaStorage.js");
import("./sections/performance/Performance.js");

const titlesMap = {
    "/":"CuppaJS Doc.",
    "cuppa-component":"Cuppa Component",
    "cuppa-router":"Cuppa Router",
    "cuppa-storage":"Cuppa Storage",
    "performance":"Performance",
}


export const router = new CuppaRouter({root:(document.location.hostname.indexOf("127.0.0.1") != -1) ? "docs/" : "", hash:"#/", titlesMap});

export default class App extends CuppaComponent {
    path = this.observable("path");

    constructor(){
        super();
        router.addListener(path=>this.path = path);
        router.resolve();
    }

    render(){
        return /*html*/`
            <section class="main-section">
                ${ this.path == "simple-todo" ? "<simple-todo></simple-todo>"
                    : (this.path == "cuppa-component") ? "<cuppa-component></cuppa-component>" 
                    : (this.path == "cuppa-router") ? "<cuppa-router></cuppa-router>"
                    : (this.path == "cuppa-storage") ? "<cuppa-storage-base></cuppa-storage-base>" 
                    : (this.path == "performance") ? "<performance-comp></performance-comp>" 
                    : (this.path == "shopping-cart") ? "<div>Shopping cart</div>" 
                    : "<welcome-comp></welcome-comp>"
                }
            </section>
            <bar-top></bar-top>
            <navbar-comp></navbar-comp>
        `
    }
}

customElements.define('app-comp', App);