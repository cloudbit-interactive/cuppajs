import {CuppaComponent, html, camelize} from "../../cuppa/cuppa.component.min.js";
import {Globals} from "../controllers/Globals.js";
import {Menu} from "./common/Menu.js";
import {CuppaDrawer} from "../../cuppa/components/cuppa.drawer.min.js";
import("./sections/welcome/Welcome.js");
import("./sections/basic/cuppaComponent.js");
import("./sections/basic/cuppaRouter.js");
import("./sections/basic/cuppaStorage.js");
import("./sections/performance/Performance.js");
import("./sections/components/CuppaAlertDoc.js");
import("./sections/components/CuppaSwitchDoc.js");
import("./sections/components/CuppaTabsDoc.js");
import("./sections/components/CuppaCollapsibleDoc.js");
import("./sections/components/CuppaDrawerDoc.js");

export class App extends CuppaComponent {
    path = this.observable("path");

    constructor(){
        super();
        Globals.router.addListener(path=>this.path = path);
        Globals.router.resolve();
    }

    mounted(){
        Globals.menuMobile = this.refs.menuMobile;
    }

    render(){
        return html`
            <!-- desktop menu -->
                <nav class="nav-main">
                    <menu-comp></menu-comp>
                </nav>
            <!-- mobile menu -->
                <nav class="nav-top">
                    <button class="button-icon" aria-label="Mobile Menu" @click=${ (e)=>{ Globals.menuMobile.open() } }><i class="fas fa-bars"></i></button>
                </nav>
                <cuppa-drawer ref="menuMobile" class="nav-mobile" disable-content=".nav-top, .main-section" disable-scroll=".drawer_content_wrap" >
                    <cuppa-drawer-content>
                        <menu-comp></menu-comp>
                    </cuppa-drawer-content>
                </cuppa-drawer>
            <!-- main section -->
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
                    : (this.path == "cuppa-collapsible") ? html`<cuppa-collapsible-doc></cuppa-collapsible-doc>`   
                    : (this.path == "cuppa-drawer") ? html`<cuppa-drawer-doc></cuppa-drawer-doc>`                                                                            
                    : html`<welcome-comp></welcome-comp>`}
                </section>
        `
    }
}

customElements.define('app-comp', App);
