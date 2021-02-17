import {CuppaComponent} from "../../../../../libs/cuppa.component.js"
import {cuppa, val} from "../../../../../libs/cuppa.js"
import {STORE_TODO} from "./Todo.js"

export default class TodoItem extends CuppaComponent {
    cuppa = cuppa;
    state = {item:null, rename:false, index:null};

    constructor(){
        super();
    }

    static get observedAttributes() { return ['item', 'index'] }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:cuppa.jsonDecode(newVal)}) }

    onRename(e){
        let todoList = this.getData(STORE_TODO, {store:"local"})
            todoList[this.state.index].name = e.target.value;
        this.update(todoList);
        this.setState({rename:false});
    }

    onDone(){
        let todoList = this.getData(STORE_TODO, {store:"local"});
            todoList[this.state.index].done = !this.state.item.done;
        this.update(todoList);
    }

    onDelete(){
        let todoList = this.getData(STORE_TODO, {store:"local"});
            todoList.splice(this.state.index, 1);
        this.update(todoList);
    }

    update(data){
        this.setStorage(STORE_TODO, {data, store:"local"});
    }
    
    render(){
        return /*html*/`
            <li>
               <span style="text-decoration:${ val(this.state.item, 'done', false) ? 'line-through' : 'none' }; display:${!this.state.rename ? "auto" : "none"} ">${ val(this.state.item, 'name', '') }</span>
               <input value="${val(this.state.item, 'name', '')}" onchange="this.onRename" style="display:${this.state.rename ? "auto" : "none"}" />
               <button onclick="()=>this.setState({rename:true})" style="display:${this.state.rename ? 'none' : 'inline-block'}" >Rename</button>
               <button onclick="this.onDone">${val(this.state.item, 'done', false) ? 'Undone' : 'Done' }</button>
               <button onclick="this.onDelete">Delete</button>
            </li>`
    }
}
customElements.define('todo-item', TodoItem);