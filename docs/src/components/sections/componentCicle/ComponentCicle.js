import {CuppaComponent} from "../../../../../libs/cuppa.component.js";
import {Utils} from "../../../controlers/Utils.js";
import PrismCode from "../../common/PrismCode.js";

export default class ComponentCicle extends CuppaComponent {
    
    constructor(){ super(); }

    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:newVal}) }
    
    connected() {
        
    }

    disconnected() { }

    render(){
        return /*html*/`
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title">Component Cicle</h2>
                <div style="grid-area:left">
                    <div class="message message_blue">Create simple reactive component extending any class from CuppaComponent is simplle and pure vanilla javascript.</div>
                </div>
                <div class="grid-area:right">
                    <p class="m-t-0">dd2</p>
                    <prism-code 
                        type="language-javascript" 
                        content="connected2() { }"
                    ></prism-code>

                    <p>dd</p>
                    <prism-code 
                        type="language-javascript" 
                        content="disconnected() { }"
                    ></prism-code>

                    <p>dd2</p>
                    <prism-code 
                        type="language-javascript" 
                        content="${
                            `
static get observedAttributes() { return ['attr1', 'attr2'] }];
attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:newVal})
`                            
                        }"
                    ></prism-code>
                </div>
            </div>
        `
    }
}

customElements.define('component-cicle', ComponentCicle);
