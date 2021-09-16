import {CuppaComponent} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";

export default class App extends CuppaComponent {
    
    mounted(){
        this.querySelectorAll("code").forEach(el=>{
            Prism.highlightElement(el);
        })
    }

    render(){
        return /*html*/`
            <div>
                <h1>TextArea</h1>
                <pre>
                    <code class="code language-css">
body{ font-size:20px; }
::placeholder {
    color: var(--placeholder);
    opacity: 1;
}
                    </code>
                </pre>

                <pre>
                    <code class="code language-js">
let value = 2;
const val2 = 3;
                    </code>
                </pre>

                <pre>
                    <code class="code language-markup">
                        ${ cuppa.htmlEntitiesEncode(/*html*/`                        
<script src="prism.js"></script>
<p class="hey">Type some code here</p>
<div>
    <a href="#">CLICK HERE</a>
</div>
                        `)}
                    </code>
                </pre>

            </div>
        `
    }
}

customElements.define('app-comp', App);