import { CuppaComponent } from "../../../libs/cuppa.component.js";

export default class IncreaseDecreaseNumber extends CuppaComponent {
    autoDefineObservables = false;
    count = this.observable("count", 20);
    form = this.observable("form", {name:"Tufik"});

    constructor(){ 
        super();
    }

    render(){
        return /*html*/`
            <style>
                increase-decrease-number .number{ display:inline-block; text-align:center; min-width:30px; }
            </style>
            <div>
                <button class="button" onclick="()=>this.count--" >-</button>
                <span class="number">${this.count}</span>
                <button class="button" onclick="()=>this.count++" >+</button>
                <hr />
                <div><b>Name:</b> ${this.form.name}</div>
                <button onclick="()=>{ this.form.name = 'New Name ' + Math.random(); this.forceRender(); }">Change Name</button>
            </div>
        `
    }
}

customElements.define('increase-decrease-number', IncreaseDecreaseNumber);
