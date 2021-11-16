import {CuppaComponent} from "../../../cuppa/cuppa.component.js";
import { Utils } from "../../controlers/Utils.js";

export class BarTop extends CuppaComponent {

    toggleMenu(e){
        Utils.toggleMenu();
    }

    render(){
        return /*html*/`
            <a onclick="this.toggleMenu" class="button1">
                <i class="fas fa-bars"></i>
            </a>
        `
    }
}

customElements.define('bar-top', BarTop);
