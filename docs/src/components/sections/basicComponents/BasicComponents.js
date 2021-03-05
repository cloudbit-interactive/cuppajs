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
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Counter Component</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">Create simple reactive component extending any class from CuppaComponent is simplle and pure vanilla javascript.</div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/vYydQeJ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
            <hr class="separator1" />
            <div class="grid_title_2_columns" >
                <h2 class="title2" style="grid-area:title;">Todo Implementation</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">Lets implement something a little bit more complex using different components.</div>
                    <div class="message message_yellow m-t-10">
                        <h3 class="title4">Note:</h3>
                        <ul>
                            <li>Is possible add event listeners in render templating and dispach those events from inside the compoent.</li>
                            <li>All events should follow the standard declaration adding a <strong>"on"</strong> at beginning of the attribute name <strong>"ondelete"</strong>, <strong>"onremove"</strong>.</li>
                        </ul>
                    </div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/XWNZOdY?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
        `;
    }
}

customElements.define('basic-components', BasicComponents);
