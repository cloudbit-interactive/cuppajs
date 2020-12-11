# CuppaComponent

```
import {CuppaComponent} from "cuppa_component";

export default class TemplateComponent extends CuppaComponent {
    cuppa = cuppa;
    state = {name:'Foo', age:0}

    constructor() { super(); }
    connected() { }
    disconnected() { }

    static get observedAttributes() { return ['name', 'age']; }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:newVal}); }

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