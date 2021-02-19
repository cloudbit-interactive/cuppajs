import {CuppaComponent} from "../../../../../libs/cuppa.component.js";

export default class Welcome extends CuppaComponent {
    constructor(){
        super();
    }

    render(){
        return /*html*/`
            <div class="message">
                <h2 class="title2">Welcome...</h2>
                <p>Here you can found some examples using Cuppa Components, a standard vanilla implementation inpired of Reactive Component based on state.</p>
                <ul>
                    <li>Faster performance. Doesn't use virtual DOM instead use the real DOM.</li>
                    <li>No needed install dependencies or pre-compile source code each time you made an change, just work.</li>
                    <li>Small size, only need extend your class from a small base class. CuppaComponent (6KB minified / 2KB gzipped).</li>
                    <li>Create your own component library just 1 time. and use it in any other framework without limitations, yes, it is not necesarry re-implement its again when a new hot framework is launched.</li>
                </ul>
            </div>`
    }
}

customElements.define('welcome-comp', Welcome);
