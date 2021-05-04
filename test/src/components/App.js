import {CuppaComponent} from "../../../libs/cuppa.component.js";
import {CuppaTab, CuppaTabs} from "../../../libs/components/cuppa.tabs.js"

export default class App extends CuppaComponent {

    render(){

        return /*html*/`
            <cuppa-tabs selected="tab1">
                <cuppa-tab value='tab1'>Tab1</cuppa-tab>
                <cuppa-tab value='tab2'>Tab2</cuppa-tab>
            </cuppa-tabs>
        `
    }
}

customElements.define('app-comp', App);