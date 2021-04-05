
# CuppaJS - Standard libraries that work with everything out there.

A set of libraries to create any kind of javascript projects but regardless to other libraries, it is focus in vanilla javascript giving standard tools to built code and reuse it anywere, not matter the toolset (reactj, angular, vue, svelte).

There are thons of good frameworks and libraries implementations out there to create amazing projects and one of the biggest problems is found solid mature standard resources that works with alls of them, for example: if you are using Angular the way to go is found an Angular Component that solve your needed, but if you need switch or create a new project using other technology base "React", needs to found an alternative that supply your needs in that specific framework.

# Advantages

 - Compatible with any other framework or libraries due is just standard code.
 - Faster performance.
 - No pre-compilation process.
 - Small size.
 - No extra syntaxis "@click, v-on:, ng-, :(" just the code that you know.

# Documentation

Online: http://cuppajs.cloudbit.co/

# Cuppa Component ~2.5kB gzipped
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
# Cuppa Router ~2.5kB gzipped
```
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
