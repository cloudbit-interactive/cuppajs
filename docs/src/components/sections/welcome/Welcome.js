import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js";
import { router } from "../../App.js";

export default class Welcome extends CuppaComponent {
    constructor(){
        super();
    }

    connected() { 
        router.updateLinks();
    }

    render(){
        return /*html*/`
            <div class="message ">
                <h2 class="title2">CuppaJS</h2>
                <p>Another set of libraries to create amazing javascript projects, but regardless others It is compromised with the standard implementation and his main focus is give standard tools to create standard code and reuse that code anywere, not matter your toolset (reactj, angular, vue, svelte, vanilla), will work with all of theme.</p>
                <p>There are thons of good frameworks and libraries implementations out there to create amazing projects, but one of the biggest paint for fron-end developers is fount standard libraries or components, if you are using Angular (need to use the Angular Component solution), but if you will switch or create a new project in React, need to go to the market and found an alternative that supply youe needed in React and so.</p>
                <p>This library aims give to all developers a base set to create his globals compoents in pure vanilla and simply import it in his projects not matter the framework.</p>
                
                <ul>
                    <li>Faster performance. Doesn't use virtual DOM instead use the real DOM.</li>
                    <li>No needed install dependencies or pre-compile source code each time you made an change, just work.</li>
                    <li>Small size, only need extend your class from a small base class. CuppaComponent (6KB minified / 2KB gzipped).</li>
                    <li>Create your own component library just 1 time. and use it in any other framework without limitations, yes, it is not necesarry re-implement its again when a new hot framework is launched.</li>
                </ul>
            </div>
            <div class="grid-cards m-t-10 ">
                <a class="button-alpha message message_red" href="cuppa-component">
                    <h3 class="title3"><i class="fas fa-puzzle-piece message_icon"></i> Cuppa Component</h3>
                    <p>A standard vanilla class implementation based on Observables or State.</p>    
                    <p>Small boilerplate that help you to develop fast reactive vanilla components and reuse anywhere reaching good performance with a small footprint. (~2.5kB gzipped)</p>
                </a>
                <a class="button-alpha message message_blue" href="cuppa-router">
                    <h3 class="title3"><i class="fas fa-map-signs message_icon"></i> Cuppa Router</h3>
                    <p>Simple Router for Vanilla Projects (~2.5kB gzipped)</p>
                    <p>Here you can found some examples using Cuppa Components, a standard vanilla implementation inpired of Reactive Component based on Observable or state.</p>    
                </a>
                <div class="message message_purple disabled">
                    <h3 class="title3"><i class="fas fa-toolbox message_icon"></i> Cuppa Storage</h3>
                </div>
                <div class="message message_purple disabled">
                    <h3 class="title3"><i class="fas fa-toolbox message_icon"></i> Cuppa Tools</h3>
                </div>
            </div>
            `
    }
}

customElements.define('welcome-comp', Welcome);
