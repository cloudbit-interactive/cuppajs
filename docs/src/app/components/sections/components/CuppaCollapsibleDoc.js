import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaCollapsible} from "../../../../cuppa/components/cuppa.collapsible.min.js";
import {Utils} from "../../../controlers/Utils.js";

export class CuppaCollapsibleDoc extends CuppaComponent {
    collapsibleStatus = this.observable("collapsibleStatus", {});

    mounted(){
        Utils.loadPrism();
    }

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
                cuppa-collapsible .cuppa-collapsible_header{ background:var(--color-blue-1) !important; color:var(--color-white); }
                cuppa-collapsible .cuppa-collapsible_content{ background: #fff !important; }
                cuppa-collapsible .cuppa-collapsible_arrow{ filter: invert(90%) sepia(92%) saturate(33%) hue-rotate(200deg) brightness(107%) contrast(100%); }
            </style>
            <div>
                <h1 class="title-2">Cuppa Collapsible</h1>
                <div class="message mt-10" style="display: flex; justify-content: space-between; gap:1rem">
                    <div style="max-width: 400px;">
                        <cuppa-collapsible header="Collapsible Title 1"
                                           content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                           @change=${ this.onChange }
                                           group="collapsible-group-1"
                                           name="collapsible-1"
                        ></cuppa-collapsible>
                        <cuppa-collapsible @change=${ this.onChange }
                                           group="collapsible-group-1"
                                           name="collapsible-2"
                        >
                            <cuppa-collapsible-header>Collapsible Title 2</cuppa-collapsible-header>
                            <cuppa-collapsible-content>
                                <h3 class="title-3">My Title Content</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </cuppa-collapsible-content>
                        </cuppa-collapsible>
                        <cuppa-collapsible @change=${ this.onChange }
                                           group="collapsible-group-1"
                                           name="collapsible-3"
                        >
                            <cuppa-collapsible-header>Collapsible Title 3</cuppa-collapsible-header>
                            <cuppa-collapsible-content>
                                <img width="100%" height="auto" src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" />
                           </cuppa-collapsible-content>
                        </cuppa-collapsible>
                    </div>
                    <div style="flex:1; position: relative">
                        <div class="tag-1" style="position: absolute;">Output</div>
                        <textarea ref="textarea" class="code" style="margin: 1.3rem 0 0; padding-top: 2rem;" >${JSON.stringify(this.collapsibleStatus, null, 2)}</textarea>
                    </div>
                </div>
                <hr class="separator-1" />
                <h2 class="title-3 mb-10">Code Example</h2>
                ${Utils.prismCode({removeTabsCount:5, code:`
                    <!-- Import component -->
                    <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.alert.min.js" type="module"></script>
                    
                    <!-- Use with HTML Tag -->
                    <cuppa-alert title="Message" message="Hello There!" @close="${(e)=>console.log(e.detail)}" ></cuppa-alert>
                    
                    <!-- Use with JS -->
                    <script type="module">
                        let alert = new CuppaAlert({
                            title: 'Message',
                            message: 'My message',
                            callback:(res)=>{ console.log(res); }
                        });
                        document.body.append(alert);
                    </script>
                `})}
            </div>
        `
    }
}

customElements.define('cuppa-collapsible-doc', CuppaCollapsibleDoc);
