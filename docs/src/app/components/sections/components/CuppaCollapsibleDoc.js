import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaCollapsible} from "../../../../cuppa/components/cuppa.collapsible.min.js";

export class CuppaCollapsibleDoc extends CuppaComponent {
    collapsibleStatus = this.observable("collapsibleStatus", {});

    onChange(e){
        let data = e.detail;
        this.collapsibleStatus[data.name] = data.status;
        this.collapsibleStatus = this.collapsibleStatus;
        this.resizeTextArea();
        window.onresize = this.resizeTextArea;
    }

    resizeTextArea(){
        this.refs.textarea.style.minHeight = 0;
        this.refs.textarea.style.minHeight = `${this.refs.textarea.scrollHeight}px`;
    }

    render(){
        return html`
            <style>
                cuppa-collapsible{ border-radius: 0 !important; }
                cuppa-collapsible:first-of-type{ border-radius: 0.5rem 0.5rem 0 0 !important; }
                cuppa-collapsible:last-of-type{ border-radius: 0 0 0.5rem 0.5rem !important; }
                cuppa-collapsible .cuppa-collapsible_header{ background:var(--color-blue-1); color:var(--color-white); }
                cuppa-collapsible .cuppa-collapsible_content{ background: #fff; }
                cuppa-collapsible .cuppa-collapsible_arrow{ filter: invert(90%) sepia(92%) saturate(33%) hue-rotate(200deg) brightness(107%) contrast(100%); }
            </style>
            <div>
                <h1 class="title-2">Cuppa Collapsible</h1>
                <div class="message mt-20" style="display: flex; justify-content: space-between; gap:1rem">
                    <div style="max-width: 400px;">
                        <cuppa-collapsible header="Lorem Ipsum"
                                           content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                           @change=${ this.onChange }
                                           group="collapsible-group-1"
                                           name="collapsible-1"
                        ></cuppa-collapsible>
                        <cuppa-collapsible header="Lorem Ipsum 2"
                                           content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                           @change=${ this.onChange }
                                           group="collapsible-group-1"
                                           name="collapsible-2"
                        ></cuppa-collapsible>
                        <cuppa-collapsible header="Lorem Ipsum 3"
                                           content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                           @change=${ this.onChange }
                                           group="collapsible-group-1"
                                           name="collapsible-3"
                        ></cuppa-collapsible>
                    </div>
                    <div style="flex:1">
                        <h3 class="title-4 mb-10">Output</h3>
                        <textarea ref="textarea" class="code" >${JSON.stringify(this.collapsibleStatus, null, 2)}</textarea>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('cuppa-collapsible-doc', CuppaCollapsibleDoc);
