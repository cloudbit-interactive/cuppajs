# CuppaJS - Standard libraries that work with everything out there.

CuppaComponent: Standard vanilla implementation of reactive component with the advantage of update node based in State or Observers.

# Advantages

    * Compatible with any other framework or libraries due is just standard code.
    * Faster performance.
    * No pre-compilation process.
    * Small size (6KB minified / 2KB gzipped).
    * No extra syntaxis "@click, v-on:, ng-, :(" just the code that you know.

# Documentation

Online: http://cuppajs.cloudbit.co/

# CuppaComponent ~2.5kB gzipped
```
// Load or embed the cuppa.component.js library
import { CuppaComponent } from "https://cdn.jsdelivr.net/npm/cuppajs@0.0.64/libs/cuppa.component.js";

export default class MyComponent extends CuppaComponent {
    pure = false;               // false (default), true will render one time using insertAdjacentHTML and user should update the component manually
    shadow = false;             // false (default), true/open
    myText = "Hellow There";
  
    /*  By default the component react to all variables defined in class level, 
        but is possible define and control the observed variables manually 
        using this.observables({variableName:defaultValue, ...})
        
        autoDefineObservables = false;  
        myObservableVariable;
        constructor(){ 
          super(); 
          this.observables({myObservableVariable:'Default value', myText:this.myText});
        }
    */
    
    constructor(){ super(); }

    // Standard webComponent to observe attributes
    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal }
    
    // Invoked when the custom element is first connected to the document's DOM.
    connected() { }   
    
    // Invoked when the custom element is disconnected from the document's DOM.
    disconnected() { }
  
    // Invoked after render execution
    rendered(){ }             
   
    render(){
        return /*html*/`
            <!-- Use ref attribute to create a htmlNode reference. It will be accesible after connected() invocation -->
            <div ref="rootRef">    
                <h1>${this.myText}</h1>
                <button onclick="()=>this.myText = 'Keep safe'">Click to Change Text</button>
            </div>`
    }
}

// Standard way to defines a new custom element.
customElements.define('my-component', MyComponent);

```
