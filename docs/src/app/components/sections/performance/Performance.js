import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";

export class Performance extends CuppaComponent {
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
            newValues.push(`Task ${Math.random()}`);
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
        return  html`
            <div>
                <h1 class="title2 m-b-20">Performance Test</h1>
                <button @click=${()=>this.forceRender()}>Force Update</button>
                <h3>Add new values</h3>
                <div>
                    <label for="quantity">Quantity: </label>
                    <input value=${this.quantity} name="quantity" @change="${e=>this.quantity= parseInt(e.target.value) || 1}" />
                    <label for="position" style="margin:0 0 0 10px">Position: </label>
                    <select ref="txtPosition" name="position" style="margin:0 0 0 10px" @change=${e=>this.position=e.target.value}>
                        ${Object.keys(this.positions).map(position=>{
                            return html`<option value=${position} ?selected=${ position === this.position} >${position}</option>`
                        })}
                    </select>
                </div>
                <div style="margin:10px 0;">
                    <button @click="${this.onAdd}">Add</button>
                    <button @click="${this.onRemoveAll}">Remove All</button>
                    <button @click="${this.onRenameAll}">Rename All</button>
                </div>
                <h1>Total: ${this.list.length}</h1>
                <ul>
                    ${ this.list.map((item, index)=>{
                        return html`
                            <li id=${item}>
                                ${item}
                                <button @click="${this.onRemove}" data-index="${index}">Remove</button>
                                <button @click="${this.onRename}" data-index="${index}">Rename</button>
                            </li>`
                    })}
                </ul>
            </div>
        `
    }
}

customElements.define('performance-comp', Performance);
