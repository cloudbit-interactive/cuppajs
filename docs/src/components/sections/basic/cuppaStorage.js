import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js";

export default class CuppaStorage extends CuppaComponent {
    
    render(){
        return /*html*/`
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Centralize Data</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">...</div>
                </div>
            </div>    
        `
    }
}

customElements.define('cuppa-storage', CuppaStorage);
