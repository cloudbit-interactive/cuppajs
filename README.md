# CuppaComponent

```
import {CuppaComponent} from "cuppa-component";

export default class TemplateComponent extends CuppaComponent {
    cuppa = cuppa;
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