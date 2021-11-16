import {CuppaComponent} from "../../../../cuppa/cuppa.component.js";

export class CuppaRouter extends CuppaComponent {

    render(){
        return /*html*/`
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title">Cuppa Router</h2>
                <div style="grid-area:content">
                    <div class="message" style="border-radius:5px 5px 0 0">Create simple router in pure vanilla javascript or integrate it with any framework.</div>
                    <iframe height="550" style="width: 100%;" src="https://codesandbox.io/embed/distracted-matsumoto-0k2kf?fontsize=14&theme=dark" ></iframe>
                </div>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title">Using On Method and Hash Configuration</h2>
                <iframe height="550" style="width: 100%;" src="https://codesandbox.io/embed/cupparouter-resolver-7v1us?fontsize=14&theme=dark" ></iframe>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title">Other Configurations</h2>
                <iframe style="grid-are:right" height="400" style="width: 100%;" src="https://codepen.io/tufik2/embed/qBRaLbe?&theme-id=dark&default-tab=html" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
        `
    }
}

customElements.define('cuppa-router', CuppaRouter);
