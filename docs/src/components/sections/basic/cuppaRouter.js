import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js";

export default class CuppaRouter extends CuppaComponent {

    render(){
        return /*html*/`
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title">Counter Router</h2>
                <div style="grid-area:left">
                    <div class="message message_blue">Create simple router in pure vanilla javascript or integrate it in any framework.</div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" src="https://stackblitz.com/edit/web-platform-cuppa-router?embed=1&file=script.js" ></iframe>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Using Resolve Function</h2>
                
            </div>
        `
    }
}

customElements.define('cuppa-router', CuppaRouter);
