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
                <div style="background: #DDD; height: 1000px"></div>
                <cuppa-navbar ref="navBar">
                    <cuppa-navbar-content style="padding:2rem;">
                        <h2 class="title-2" style="margin:0 0 10px 0;">Menu</h2>
                        ${  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(item=>{
                            return html`
                                <button class="button-1" 
                                        style="display: block; width: 100%; margin:2px 0;"
                                        @click="${()=>{
                                            alert(`Clicked item ${item}`);
                                        }}"
                                >
                                    Item ${item}
                                </button>
                            `
                        }) }
                    </cuppa-navbar-content>
                </cuppa-navbar>
            </div>
        `
    }
}

customElements.define('cuppa-navbar-doc', CuppaNavBarDoc);
