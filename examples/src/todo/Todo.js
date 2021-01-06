import {CuppaComponent} from "../../../src/cuppa.component.js"
import {cuppa} from "../../../src/cuppa.js"
import TodoItem from "./TodoItem.js"

export const STORE_TODO = "STORE_TODO"

export default class Todo extends CuppaComponent {

    constructor(){
        super()
        this.cuppa = cuppa
        this.state = {todoList:[], value:''}
    }

    connected(){
        this.getData(STORE_TODO, {store:"local", callback:todoList=>this.setState({todoList})})
    }

    onAdd(e){
        e.preventDefault();
        if(!this.state.value.trim()) return;
        let todoItem = {name:this.state.value, done:false, uuid:cuppa.uuid()}
        let todoList = [...this.state.todoList, todoItem]
        this.setData(STORE_TODO, {data:todoList, store:"local"})
        this.setState({value:""})
    }
    
    render(){
        return /*html*/`
            <div>
                <h2>Todo (Store data using Local Storage)</h2>
                <form onsubmit="this.onAdd">
                    <input value="${this.state.value}" oninput="(e)=>this.setState({value:e.target.value})" placeholder="Type any word..." />
                    <button>Add</button>
                </form>
                <ul>
                    ${ (this.state.todoList || []).map((todoItem, index)=>{
                        return /*html*/`<todo-item key="${todoItem.uuid}" item="${cuppa.jsonEncode(todoItem)}" index="${index}" ></todo-item>`
                    }).join("") }
                </ul>
            </div>`
    }
}
customElements.define('todo-comp', Todo);