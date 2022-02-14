import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controlers/Utils.js";
import {CuppaDrawer} from "../../../../cuppa/components/cuppa.drawer.min.js";

export class CuppaDrawerDoc extends CuppaComponent {

    mounted(){
        Utils.loadPrism();
    }

    openNavBar(){
        this.refs.drawer.open();
    }

    render(){
        let data = []; for(let i = 1; i <= 40; i++){ data.push(i); }
        return html`
            <div>
                <h1 class="title-2 mb-10">Cuppa Drawer</h1>
                <div class="message" style="display: flex; align-items: center;">
                    <button class="button-1" @click="${this.openNavBar}" >Open NavBar</button>
                    <div class="separator-v"></div>
                </div>
                <cuppa-drawer ref="drawer" disable-content=".nav-top, .nav-main, .main-section" >
                    <cuppa-drawer-content style="display:flex; height: 100%; flex-direction: column;">
                        <h2 class="title-2" style="padding:1rem;">Menu</h2>
                        <div class="scroll-1" style="overflow: auto; padding: 1rem; flex:1;">
                            <a class="button-1"
                               style="display: block; width: 100%; margin:2px 0; text-align: center;"
                               @click="${()=>{
                                   alert(`Clicked item`);
                               }}"
                            >Item a Tag</a>
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
                        </div>
                    </cuppa-drawer-content>
                </cuppa-navbar>
            </div>
        `
    }
}

customElements.define('cuppa-drawer-doc', CuppaDrawerDoc);