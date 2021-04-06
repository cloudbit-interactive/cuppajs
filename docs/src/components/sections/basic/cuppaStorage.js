import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js";
import {CuppaStorage, GetStorage} from "../../../../libs/cuppa/cuppa.storage.js"

const STORAGE = {NAME:"STORAGE_NAME", STORE:"session"};

export default class CuppaStorageBase extends CuppaComponent {
    cuppaStorage = CuppaStorage;
    storeData = "Default";

    constructor(){
        super();
        this.getStorage(STORAGE.NAME, {store:STORAGE.STORE, callback:this.onUpdateStorage})
    }

    onUpdateStorage(data){
        this.storeData =  data;
    }
    
    updateData(){
        CuppaStorage.setData(STORAGE.NAME, {data:Math.random(), store:STORAGE.STORE})
    }

    render(){
        return /*html*/`
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Centralize Data</h2>
                <div style="grid-area:left;">
                    ${this.storeData}
                </div>
                <button onclick="this.updateData">UpdateData</button>
            </div>    
        `
    }
}

customElements.define('cuppa-storage-base', CuppaStorageBase);
