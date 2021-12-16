import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaTabs, CuppaTab} from "../../../../cuppa/components/cuppa.tabs.js";
import {Utils} from "../../../controlers/Utils.js";

export class CuppaTabsDoc extends CuppaComponent {
    tabSelected = this.observable("tabSelected", "microsoft");

    mounted(){
        Utils.loadPrism();
    }

    render(){
        return html`
            <div>
                <h1 class="title-2">Cuppa Tabs</h1>
                <div class="message mt-20" style="display: flex; align-items: center;">
                    <cuppa-tabs selected="${this.tabSelected}" @change="${ e=>{ this.tabSelected = e.detail.selected } }" >
                        <cuppa-tab value="apple" >Apple</cuppa-tab>
                        <cuppa-tab value="microsoft" >Microsoft</cuppa-tab>
                        <cuppa-tab value="google" >Google</cuppa-tab>
                    </cuppa-tabs>
                    <div class="separator-v"></div>
                    <div><strong>Tab Selected:</strong> ${this.tabSelected}</div>
                </div>
                <hr class="separator-1" />
                <h2 class="title-3 mb-20">Code Example</h2>
                ${Utils.prismCode({removeTabsCount:5, code:`
                    <!-- Import component -->
                    <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.tabs.min.js" type="module"></script>
                    
                    <!-- Use with HTML Tag -->
                    <cuppa-tabs selected="microsoft" @change="${ e=>console.log(e.detail) }" >
                        <cuppa-tab value="apple" >Apple</cuppa-tab>
                        <cuppa-tab value="microsoft" >Microsoft</cuppa-tab>
                        <cuppa-tab value="google" >Google</cuppa-tab>
                    </cuppa-tabs>
                `})}
            </div>
        `
    }
}

customElements.define('cuppa-tabs-doc', CuppaTabsDoc);
