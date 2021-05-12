import {CuppaComponent} from "../../../libs/cuppa.component.js";
import {CuppaTab, CuppaTabs} from "../../../libs/components/cuppa.tabs.js"
import CuppaCountDown from "../../../libs/components/cuppa.countdown.js";

export default class App extends CuppaComponent {

    render(){

        return /*html*/`
            <cuppa-countdown time="2021-06-01 23:20:30" ></cuppa-countdown>
        `
    }
}

customElements.define('app-comp', App);