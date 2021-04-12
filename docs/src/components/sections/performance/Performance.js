import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js";

export default class Performance extends CuppaComponent {
    state = {list:[], q:1000, position:"start"};

    constructor(){
        super();
    }

    onAdd(e){
        this.startTime = new Date();
        
        let list = [...this.state.list];

        let newValues = [];
        for(let i = 0; i < this.state.q; i++){
            newValues.push(`Task ${Math.random()}`);
        }

        if(this.state.position == "end"){
            list = [...list, ...newValues];
        }else if(this.state.position == "start"){
            list = [...newValues, ...list];
        }else if(this.state.position == "middle"){
            let index = Math.floor(list.length/2);
            list.splice(index, 0, ...newValues);
        }

        this.setState({list});
    }

    onRemove(e){
        let index = e.target.getAttribute("data-index");
        let list = [...this.state.list];
            list.splice(index, 1);
        this.setState({list});
    }

    onRemoveAll(e){
        this.setState({list:[]})
    }

    onRename(e){
        let index = e.target.getAttribute("data-index");
        let list = [...this.state.list];
            list[index] = "Task Renamed " + Math.random();
        this.setState({list});
    }
    
    onRenameAll(e){
        let list = [...this.state.list];
        for(let i = 0; i < list.length; i++){
            list[i] = `Task ${Math.random()}`;
        }
        this.setState({list});
    }

    render(){
        return  /*html*/`
            <div>
                <h1 class="title2 m-b-20">Performance Test</h1>
                <button onclick="()=>this.forceRender()">Force Update</button>
                <h3>Add new values</h3>
                <div>
                    <!-- comment 1 -->
                    <label for="quantity">Quantity: </label>
                    <input value="${this.state.q}" name="quantity" onchange="${e=>this.setState({q:e.target.value})}" />
                    <label for="position" style="margin:0 0 0 10px">Position: </label>
                    <select ref="txtPosition" name="position" style="margin:0 0 0 10px" onchange="${e=>this.setState({position:e.target.value})}">
                        <option value="end" ${(this.state.position == "end") ? "selected='1'" : ""} >End</option>
                        <option value="start" ${(this.state.position == "start") ? "selected='1'" : ""} >Start</option>
                        <option value="middle" ${(this.state.position == "middle") ? "selected='1'" : ""}>Middle</option>
                    </select>
                </div>
                <div style="margin:10px 0;">
                    <button onclick="this.onAdd">Add</button>
                    <button onclick="this.onRemoveAll">Remove All</button>
                    <button onclick="this.onRenameAll">Rename All</button>
                </div>
                <h1>Total: ${this.state.list.length}</h1>
                <!-- comment 2 -->
                <ul>
                    ${ this.state.list.map((item, index)=>{
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
