import {CuppaComponent} from "../../../../../libs/cuppa.component.js"

export default class SimpleTodo extends CuppaComponent {
   
    constructor(){
        super();
        this.state = {todoList:['Todo1', 'Todo2', 'Todo3'], value:''};
    }

    onAdd(e){
        e.preventDefault();
        if(!this.state.value.trim()) return;
        let todoList = [...this.state.todoList, this.state.value]
        this.setState({todoList, value:''})
    }

    onDelete(index){
        let todoList = [...this.state.todoList]
            todoList.splice(index, 1)
        this.setState({todoList})
    }
    
    render(){
        return /*html*/`
            <div>
                <h2>Simple Todo &nbsp;</h2>
                <form onsubmit="this.onAdd">
                    <input value="${this.state.value}" oninput="(e)=>this.setState({value:e.target.value})" placeholder="Type any word..." />
                    <button>Add</button>
                </form>
                <ul>
                    ${ this.state.todoList.map((todoItem, index)=>{
                        return /*html*/`
                            <li key="${todoItem}">
                                <span>${todoItem}</span>
                                <button onclick="this.onDelete(${index})" >Delete</button>
                            </li>`
                    }).join("") }
                </ul>
            </div>`
    }
}
customElements.define('simple-todo', SimpleTodo);