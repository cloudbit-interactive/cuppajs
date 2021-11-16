import {CuppaComponent} from "../../../../cuppa/cuppa.component.js";

export class Performance extends CuppaComponent {
    quantity = 1000;
    position = "start";
    positions = ["start", "end", "middle"];
    list = this.observable("list", []);

    constructor(){
        super();
    }

    onAdd(e){
        let list = [...this.list];
        let newValues = [];
        for(let i = 0; i < this.quantity; i++){
            newValues.push(`Task ${Math.random()}`);
        }

        if(this.position == "end"){
            list = [...list, ...newValues];
        }else if(this.position == "start"){
            list = [...newValues, ...list];
        }else if(this.position == "middle"){
            let index = Math.floor(list.length/2);
            list.splice(index, 0, ...newValues);
        }
        
        this.list = list;
    }

    onRemove(e){
        let index = e.target.getAttribute("data-index");
        let list = [...this.list];
            list.splice(index, 1);
        this.list = list;
    }

    onRemoveAll(e){
        this.list = [];
    }

    onRename(e){
        let index = e.target.getAttribute("data-index");
        let list = [...this.list];
            list[index] = "Task Renamed " + Math.random();
        this.list = list;
    }
    
    onRenameAll(e){
        let list = [...this.list];
        for(let i = 0; i < list.length; i++){
            list[i] = `Task ${Math.random()}`;
        }
        this.list = list;
    }

    render(){
        return  /*html*/`
            <div>
                <h1 class="title2 m-b-20">Performance Test</h1>
                <button onclick="()=>this.forceRender()">Force Update</button>
                <h3>Add new values</h3>
                <div>
                    <label for="quantity">Quantity: </label>
                    <input value="${this.quantity}" name="quantity" onchange="${e=>this.quantity= parseInt(e.target.value) || 1}" />
                    <label for="position" style="margin:0 0 0 10px">Position: </label>
                    <select ref="txtPosition" name="position" style="margin:0 0 0 10px" onchange="${e=>this.position=e.target.value}">
                        ${this.positions.map(p=>`<option value="${p}" ${p==this.position ? "selected='1'" : ""}>${p}</option>`)}
                    </select>
                </div>
                <div style="margin:10px 0;">
                    <button onclick="this.onAdd">Add</button>
                    <button onclick="this.onRemoveAll">Remove All</button>
                    <button onclick="this.onRenameAll">Rename All</button>
                </div>
                <h1>Total: ${this.list.length}</h1>
                <ul>
                    ${ this.list.map((item, index)=>{
                        return /*html*/`
                            <li key="${item}">
                                ${item}
                                <button onclick="this.onRemove" data-index="${index}">Remove</button>
                                <button onclick="this.onRename" data-index="${index}">Rename</button>
                            </li>`
                    }).join("")}
                </ul>
            </div>
        `
    }
}

customElements.define('performance-comp', Performance);
