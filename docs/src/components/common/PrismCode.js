import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js";

export class PrismCode extends CuppaComponent {
    pure = true;

    static get observedAttributes() { return ['type', 'content'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal; }

    connected(){
        Prism.highlightAll();
    }

    render(){
        return /*html*/`
            <pre><code class="${this.type}">${ js_beautify(this.content) }</code></pre>`
    }
}

customElements.define('prism-code', PrismCode);
