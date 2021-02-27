import {CuppaComponent} from "//cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.component.js";
//import {CuppaComponent} from "../../../../../libs/cuppa.component.js";

const CodeMirror = document.defaultView["CodeMirror"];

export default class BasicComponents extends CuppaComponent {
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
            <hr class="separator1" />
            <div class="grid_title_2" >
                <h2 class="title2" style="grid-area:title;">Counter Component</h2>
                <div style="grid-area:left; padding:0 6rem 0 0">
                    <p class="message message_blue">Create simple reactive component extending any class from CuppaComponent is simplle and pure vanilla javascript.</p>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/vYydQeJ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
            <hr class="separator1" />
            <div class="grid_title_2" >
                <h2 class="title2" style="grid-area:title;">Todo Implementation</h2>
                <div style="grid-area:left; padding:0 6rem 0 0">
                    <p class="message message_blue">Lets implement something a little bit more complex using different components.</p>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/XWNZOdY?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
        `;
    }
}

customElements.define('basic-components', BasicComponents);
