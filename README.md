
# CuppaJS - Standard libraries that work with everything out there.

A set of libraries to create any kind of javascript projects but regardless to other libraries, it is focus in vanilla javascript giving standard tools to built code and reuse it anywere, not matter the toolset (reactj, angular, vue, svelte).

There are tons of good frameworks and libraries implementations out there to create amazing projects and one of the biggest problems is found solid mature standard resources that works with alls of them, for example: if you are using Angular the way to go is found an Angular Component that solve your needed, but if you need switch or create a new project using other technology base "React", needs to found an alternative that supply your needs in that specific framework.

CuppaComponent.js | CuppaRouter.js | CuppaStorage.js

# Advantages

 - Compatible with any other framework or libraries due is just standard code.
 - Faster performance thanks to lit-html a simple, modern and fast HTML templeating.
 - No pre-compilation process.
 - Small size.
 - No dependencies.

# Documentation

Online: http://cuppajs.cloudbit.co/

# Cuppa Component ~5.5kB gzipped
```javascript
// Load or embed the cuppa.component.js library
import {CuppaComponent, html} from "https://cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.component.min.js";

export default class MyComponent extends CuppaComponent {
    count = this.observable("count", 0);
    refs = {myDivRef:null};

    constructor(){ super(); }

    // Standard webComponent to observe attributes
    static get observedAttributes() { return ['attr1', 'attr2'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal }
    
    // Invoked when the custom element is first connected to the document's DOM.
    mounted() { }   
    
    // Invoked when the custom element is disconnected from the document's DOM.
    unmounted() { }
  
    // Invoked after render execution
    rendered(){ }             
   
    render(){
        return html`
            <div ref="myDivRef">    
                <button @click=${ ()=>this.count-- }>+</button>
                <span>Count: ${this.count}</span>
                <button @click=${ ()=>this.count++ }>+</button>
            </div>`
    }
}

// Standard way to defines a new custom element.
customElements.define('my-component', MyComponent);

// Ok, now we can add a instance of our component and see the result
document.body.append(new MyComponent())

```
# Cuppa Router ~2.5kB gzipped
```javascript
// Load or embed the cuppa.component.js library
import { CuppaRouter } from "https://cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.router.min.js";

const router = new CuppaRouter();
router.addListener(onRouterUpdated);
router.updateLinks();
router.resolve();

function  onRouterUpdated(path)  {
	let content = document.getElementById("content");
	content.innerHTML =  "";
		
	if(router.match(path,  "/"))  {
		content.innerHTML = "Home Page";
	}else if(router.match(path, "works"))  {
		content.innerHTML = "Works";
	}else if(router.match(path, "works/:alias"))  {
		let data = router.match(path, "works/:alias");
		content.innerHTML = `<strong>Work Alias:</strong> ${data.params.alias}`;
	}
}
```
