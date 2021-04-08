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
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Basic Usage</h2>
                <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/poRWKPE?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Storage with ReactJS</h2>
                <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/abpLjOQ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
        `
    }
}

customElements.define('cuppa-storage-base', CuppaStorageBase);
