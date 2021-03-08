import {CuppaComponent} from "../../../../../libs/cuppa.component.js"

export class SimpleTodoComponent extends CuppaComponent {
    value = "";
    list = ["Task1", "Task2", "Task3"];
  
    onAdd(e) {
      if(!this.value || !this.value.trim()) return;
      this.list.push(this.value);
      this.list = this.list;
      this.value = "";
    }
    
    onDelete(e){
      this.list.splice(e.target.index, 1);
      this.list = this.list;
    }
  
    render() {
      return /*html*/`
            <div>
              <span>Add: </span>
              <input value="${this.value}" oninput="e => this.value = e.target.value" placeholder="Write something..."/>
              <button onclick="this.onAdd" >Add</button>
            </div>
            <h3>List</h3>
            <ul>
              ${this.list.map((item, index) => {
                return /*html*/`
                    <li>
                      <simple-todo-item ondelete="this.onDelete" text="${item}" index="${index}"></simple-todo-item>
                    </li>
                  `;
              }).join("")}
            </ul>
          `;
    }
  }
  customElements.define("simple-todo", SimpleTodoComponent);
  
  export class SimpleTodoItem extends CuppaComponent {
    text = ""; index = 0;
    
    static get observedAttributes() { return ['text', 'index']; }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal; this.forceRender(); }
    
    onDelete(e){
      this.dispatchEvent(new Event('delete'));
    }
    
    render() {
      return /*html*/`
        <span>${this.text}</span>
        <button onclick="this.onDelete">Delete</button>
      `;
    }
  }
  customElements.define("simple-todo-item", SimpleTodoItem);