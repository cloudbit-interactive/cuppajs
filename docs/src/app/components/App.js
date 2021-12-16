import {CuppaComponent, html} from "../../cuppa/cuppa.component.min.js";
import {Globals} from "../controlers/Globals.js";
import {NavBar} from "./common/NavBar.js";
import("./sections/welcome/Welcome.js");
import("./sections/basic/cuppaComponent.js");
import("./sections/basic/cuppaRouter.js");
import("./sections/basic/cuppaStorage.js");
import("./sections/performance/Performance.js");
import("./sections/components/CuppaAlertDoc.js");
import("./sections/components/CuppaSwitchDoc.js");
import("./sections/components/CuppaTabsDoc.js");

export class App extends CuppaComponent {
    path = this.observable("path");

    constructor(){
        super();
        Globals.router.addListener(path=>this.path = path);
        Globals.router.resolve();
    }

    render(){
        return html`
            <section class="main-section">
                ${ this.path == "simple-todo" ? "<simple-todo></simple-todo>"
                    : (this.path == "cuppa-component") ? html`<cuppa-component></cuppa-component>`
                    : (this.path == "cuppa-router") ? html`<cuppa-router></cuppa-router>`
                    : (this.path == "cuppa-storage") ? html`<cuppa-storage-base></cuppa-storage-base>`
                    : (this.path == "performance") ? html`<performance-comp></performance-comp>`
                    : (this.path == "shopping-cart") ? "<div>Shopping cart</div>" 
                    : (this.path == "cuppa-alert") ? html`<cuppa-alert-doc></cuppa-alert-doc>`
                    : (this.path == "cuppa-switch") ? html`<cuppa-switch-doc></cuppa-switch-doc>`
                    : (this.path == "cuppa-tabs") ? html`<cuppa-tabs-doc></cuppa-tabs-doc>`
                    : html`<welcome-comp></welcome-comp>`
                }
            </section>
            <navbar-comp></navbar-comp>
        `
    }
}

customElements.define('app-comp', App);