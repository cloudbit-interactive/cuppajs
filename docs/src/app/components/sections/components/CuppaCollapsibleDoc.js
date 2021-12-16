import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaCollapsible} from "../../../../cuppa/components/cuppa.collapsible.min.js";

export class CuppaCollapsibleDoc extends CuppaComponent {
    render(){
        return html`
            <div>
                <h1 class="title-2">Cuppa Collapsible</h1>
                <div class="message mt-20" style="display: flex; align-items: center;">
                    <cuppa-collapsible .content="ddd">
                        
                    </cuppa-collapsible>
                </div>
            </div>
        `
    }
}

customElements.define('cuppa-collapsible-doc', CuppaCollapsibleDoc);
