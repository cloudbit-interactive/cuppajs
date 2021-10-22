import {CuppaComponent} from "../../../../libs/cuppa.component.js";
import {CuppaStorage} from "../../../../libs/cuppa.storage.js";

export const storage = {name:"STORAGE_TODO", store:CuppaStorage.INDEXED_DB, default:[]};

export default class CuppaStorageTest extends CuppaComponent {
    value = this.observable("value", "");
    list = this.observable("list", []);

    constructor(){ 
        super();
    }

    mounted(){
        CuppaStorage.getData({name:storage.name, store:storage.store, callback:data=>this.list = data});
    }

    async add(e){
        let list = await CuppaStorage.getData({name:storage.name, store:storage.store, defaultValue:storage.default});
            list.push(this.value);
        CuppaStorage.setData({name:storage.name, data:list, store:storage.store});
        this.value = "";
    }

    async remove(index){
        this.list.splice(index, 1);
        CuppaStorage.setData({name:storage.name, data:this.list, store:storage.store}).then();	
    }

    render(){
        return /*html*/`
            <div>
                <h1>Cuppa Storage</h1>
                <input type="text" value="${this.value}" oninput="e=>this.value = e.target.value" /><button onclick="this.add">Add</button>
                <hr/>
                <h2>List</h2>
                <ul>
                    ${this.list.map((item, index)=>/*html*/`
                        <li>
                            ${item} <button onclick="this.remove(${index})">Remove</button>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `
    }
}

customElements.define('cuppa-storage-test', CuppaStorageTest);
