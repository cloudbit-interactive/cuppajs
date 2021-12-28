import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controlers/Utils.js";
import {CuppaNavBar} from "../../../../cuppa/components/cuppa.navbar.min.js";

export class CuppaNavBarDoc extends CuppaComponent {

    mounted(){
        Utils.loadPrism();
    }

    openNavBar(){
        this.refs.navBar.open();
    }

    render(){
        return html`
            <div>
                <h1 class="title-2 mb-10">Cuppa NavBar</h1>
                <div class="message" style="display: flex; align-items: center;">
                    <button class="button-1" @click="${this.openNavBar}" >Open NavBar</button>
                    <div class="separator-v"></div>
                </div>
                <cuppa-navbar ref="navBar">
                    <cuppa-navbar-content style="padding:2rem;">Menu</cuppa-navbar-content>
                </cuppa-navbar>
            </div>
        `
    }
}

customElements.define('cuppa-navbar-doc', CuppaNavBarDoc);
