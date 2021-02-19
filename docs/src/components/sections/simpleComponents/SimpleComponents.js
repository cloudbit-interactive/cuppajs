import {CuppaComponent} from "//cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.component.min.js";

const CodeMirror = document.defaultView["CodeMirror"];

export default class SimpleComponents extends CuppaComponent {
    count = this.observable({ count: 30 });

    constructor(){
        super();
        setInterval(() => { this.count++; }, 1000);
    }

    connected() {
        // let cm = CodeMirror.fromTextArea(this.refs.textArea, {value:"333", mode:"css", lineNumbers: true, theme:"dracula"});
        let cm = CodeMirror(this, {value:"333\n22", mode:"css", lineNumbers: true, theme:"dracula"})
    }

    render(){
        return /*html*/ `
        <div>
            ${this.count}
        </div>`;
    }
}

customElements.define('simple-comps', SimpleComponents);
