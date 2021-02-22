import {CuppaComponent} from "//cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.component.js";
//import {CuppaComponent} from "../../../../../libs/cuppa.component.js";

const CodeMirror = document.defaultView["CodeMirror"];

export default class SimpleComponents extends CuppaComponent {
    count = 0;
    
    constructor(){
        super();
        setInterval(() => { this.count++; }, 1000);
    }

    connected() {
        // let cm = CodeMirror.fromTextArea(this.refs.textArea, {value:"333", mode:"css", lineNumbers: true, theme:"dracula"});
        //let cm = CodeMirror(this, {value:"333\n22", mode:"css", lineNumbers: true, theme:"dracula"})
    }

    render(){
        return /*html*/ `
        <div>
            ${this.count}
        </div>`;
    }
}

customElements.define('simple-comps', SimpleComponents);
