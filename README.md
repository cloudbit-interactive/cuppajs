# CuppaComponent

Standard vanilla implementation of Reactive Component with the advantage of update based in state.

# Advantages

    * Compatible with any other framework or libraries due is just standard code.
    * Faster performance.
    * No pre-compilation process.
    * Small size (6KB).

# Example

Online: https://repl.it/@tufik2/CuppaComponent#index.html

```
import {CuppaComponent} from "https://int-server-one.info/cuppa/cuppajs/cuppa.component.min.js"

export default class TemplateComponent extends CuppaComponent {
    state = {name:'Foo', age:0}
    
    static get observedAttributes() { return ['name', 'age']; }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:newVal}); }

    constructor() { super(); }
    connected() { }
    disconnected() { }

    render(){
        return /*html*/`
            <div>
                <div>Name: ${this.state.name}</div>
                <div>Age: ${this.state.age}</div>
            </div>`
    }
}

customElements.define('template-comp', TemplateComponent);

```

Check-out the ./examples/ folder to see more complex code