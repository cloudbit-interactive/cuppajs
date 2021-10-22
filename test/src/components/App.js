import {CuppaComponent} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";

export default class App extends CuppaComponent {
    
    mounted(){
       
    }

    render(){
        return /*html*/`
            <div>
               <cuppa-storage-test></cuppa-storage-test>
            </div>
        `
    }
}

customElements.define('app-comp', App);