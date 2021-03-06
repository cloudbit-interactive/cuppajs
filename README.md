# CuppaJS - Standard libraries that work with everything out there.

CuppaComponent: Standard vanilla implementation of reactive component with the advantage of update node based in State or Observers.

# Advantages

    * Compatible with any other framework or libraries due is just standard code.
    * Faster performance.
    * No pre-compilation process.
    * Small size (6KB minified / 2KB gzipped).
    * No extra syntaxis "@click, v-on:, ng-, :(" just the code that you know.

# Example

Online: https://repl.it/@tufik2/CuppaComponent#index.html

```
import {CuppaComponent} from "https://unpkg.com/cuppa-component/libs/cuppa.component.min.js"

export default class TemplateComponent extends CuppaComponent {
    
    constructor(){
        super();
        this.state = {name:'Foo', age:0}
    }
    
    static get observedAttributes() { return ['name', 'age']; }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:newVal}); }
    
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
