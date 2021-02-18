import {CuppaComponent} from "../../../../../libs/cuppa.component.js"

export default class SimpleComponents extends CuppaComponent {
    _count = this.observable("count", 0);

    constructor(){ 
        super(); 
        setInterval(() => { this.count++; }, 1000);
    }

    render(){
        return /*html*/`
            <style>
                simple-comps{ background:#AAA; padding:5px 10px; border-radius:5px; }
            </style>
            <span>${this.count}</span>
        `
    }
}

customElements.define('simple-comps', SimpleComponents);
