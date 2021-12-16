import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaCollapsible} from "../../../../cuppa/components/cuppa.collapsible.min.js";

export class CuppaCollapsibleDoc extends CuppaComponent {
    render(){
        return html`
            <style>
                cuppa-collapsible .cuppa-collapsible_header{ background:var(--color-blue-1); color:var(--color-white); }
                cuppa-collapsible .cuppa-collapsible_content{ background: #fff; }
            </style>
            <div>
                <h1 class="title-2">Cuppa Collapsible</h1>
                <div class="message mt-20" style="display: flex; align-items: center;">
                    <div >
                        <cuppa-collapsible header="Lorem Ipsum"
                                           content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                           @change=${ e=>console.log(e.detail) }
                        ></cuppa-collapsible>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('cuppa-collapsible-doc', CuppaCollapsibleDoc);
