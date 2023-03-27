import {CuppaComponent, html, repeat} from "../../../../cuppa/cuppa.component.min.js";

export class Performance extends CuppaComponent {
    id = 1;
    quantity = 1000;
    positions = { start: "start", middle: "middle", end: "end" };
    position = this.positions.start;
    list = this.observable("list", []);

    constructor(){
        super();
    }

    onAdd(e){
        let list = [...this.list];
        let newValues = [];
        for(let i = 0; i < this.quantity; i++){
            let item = {name:this.getRandomName(), id:this.id};
            newValues.push(item);
            this.id++;
        }

        if(this.position === this.positions.end){
            list = [...list, ...newValues];
        }else if(this.position === this.positions.start){
            list = [...newValues, ...list];
        }else if(this.position === this.positions.middle){
            let index = Math.floor(list.length/2);
            list.splice(index, 0, ...newValues);
        }
        this.list = list;
    }

    onRemove(id){
        let list = [...this.list];
        let index = list.findIndex(item=>item.id==id);
            list.splice(index, 1);
        this.list = list;
    }

    onRemoveAll(e){
        this.list = [];
    }

    onRename(id){
        let list = [...this.list];
        let index = list.findIndex(item=>item.id==id);
            list[index].name = this.getRandomName();
        this.list = list;
    }

    onRenameAll(e){
        let list = [...this.list];
        for(let i = 0; i < list.length; i++){
            list[i].name = this.getRandomName();
        }
        this.list = list;
    }

    getRandomName(){
        return `Task ${Math.round(Math.random()*9999)}`;
    }

    render(){
        return  html`
            <div>
                <h1 class="title-2 mb-20">Performance Test</h1>
                <div>
                    <span class="tag-1 bold">Add Values</span>
                    <label for="quantity" style="margin:0 0 0 0.5rem">Quantity: </label>
                    <input class="input-1" value=${this.quantity} name="quantity" @change="${e=>this.quantity= parseInt(e.target.value) || 1}" />
                    <label for="position" style="margin:0 0 0 10px">Position: </label>
                    <select class="input-1" ref="txtPosition" name="position" @change=${e=>this.position=e.target.value}>
                        ${Object.keys(this.positions).map(position=>{
                            return html`<option value=${position} ?selected=${ position === this.position} >${position}</option>`
                        })}
                    </select>
                </div>
                <div style="margin:10px 0; display:flex;">
                    <button class="button-1" @click="${this.onAdd}">Add</button>
                    <button class="button-1" @click="${this.onRemoveAll}">Remove All</button>
                    <button class="button-1" @click="${this.onRenameAll}">Rename All</button>
                    <button class="button-1" @click=${()=>this.forceRender()}>Force Update</button>
                </div>
                <hr class="separator-1" />
                <div class="title-3"><strong>Total:</strong> ${this.list.length}</div>
                <ul style="margin:0; padding:0;">
                    ${ repeat(this.list, item=>item.id, item=>html`
                        <li style="display:flex; align-items:center;">
                            <span style="margin:0 1rem 0 0; min-width:20rem"><strong>${item.id}:</strong> ${item.name}</span>
                            <button class="button-1" @click="${()=>this.onRemove(item.id)}">Remove</button>
                            <button class="button-1" @click="${()=>this.onRename(item.id)}">Rename</button>
                        </li>`
                    )}
                </ul>
            </div>
        `
    }
}

customElements.define('performance-comp', Performance);
