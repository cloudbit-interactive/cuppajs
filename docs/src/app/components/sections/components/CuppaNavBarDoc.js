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
        let data = []; for(let i = 1; i <= 40; i++){ data.push(i); }
        return html`
            <div>
                <h1 class="title-2 mb-10">Cuppa NavBar</h1>
                <div class="message" style="display: flex; align-items: center;">
                    <button class="button-1" @click="${this.openNavBar}" >Open NavBar</button>
                    <div class="separator-v"></div>
                </div>
                <cuppa-navbar ref="navBar" >
                    <cuppa-navbar-content style="display:flex; height: 100%; flex-direction: column;">
                        <h2 class="title-2" style="padding:1rem;">Menu</h2>
                        <div class="scroll-1" style="overflow: auto; padding: 1rem; flex:1;">
                            ${ data.map(item=>{
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

                            <div style="padding:1rem;">
                                End of menu
                            </div>
                        </div>
                    </cuppa-navbar-content>
                </cuppa-navbar>
            </div>
        `
    }
}

customElements.define('cuppa-navbar-doc', CuppaNavBarDoc);
