import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js";

export default class CuppaRouter extends CuppaComponent {

    render(){
        return /*html*/`
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title">Cuppa Router</h2>
                <div style="grid-area:content">
                    <div class="message" style="border-radius:5px 5px 0 0">Create simple router in pure vanilla javascript or integrate it in any framework.</div>
                    <iframe height="550" style="width: 100%;" src="https://codesandbox.io/embed/distracted-matsumoto-0k2kf?fontsize=14&theme=dark" ></iframe>
                </div>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Using On Method</h2>
                <iframe height="550" style="width: 100%;" src="https://codesandbox.io/embed/cupparouter-resolver-7v1us?fontsize=14&theme=dark" ></iframe>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Adding Predefined Title Map</h2>
            </div>
        `
    }
}

customElements.define('cuppa-router', CuppaRouter);
