import {CuppaComponent} from "../../../../../libs/cuppa.component.js";

const CodeMirror = document.defaultView["CodeMirror"]

export default class SimpleComponents extends CuppaComponent {
    count; age; _= this.observable({count:0, age:10});

    constructor(){
        super();
        setInterval(() => { this.count++; this.age++ }, 1000);
    }

    connected() {
        // let cm = CodeMirror.fromTextArea(this.refs.textArea, {value:"333", mode:"css", lineNumbers: true, theme:"dracula"});
        let cm = CodeMirror(this, {value:"333\n22", mode:"css", lineNumbers: true, theme:"dracula"})
    }

    render(){
        return /*html*/`
            <div>
                <span>${this.count} ${this.age}</span>
            </div>
        `
    }
}

customElements.define('simple-comps', SimpleComponents);
