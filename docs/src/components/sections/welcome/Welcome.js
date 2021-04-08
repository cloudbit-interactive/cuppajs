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
                <p>A set of libraries to create any kind of javascript projects but regardless to other libraries, it is focus in vanilla javascript giving standard tools to built code and reuse it anywere, not matter the toolset (reactj, angular, vue, svelte).</p>
                <p>There are thons of good frameworks and libraries implementations out there to create amazing projects and one of the biggest problems is found solid mature standard resources that works with alls of them, for example: if you are using Angular the way to go is found an Angular Component that solve your needed, but if you need switch or create a new project using other technology base "React", needs to found an alternative that supply your needs in that specific framework.</p>
            </div>
            <div class="grid-cards m-t-10 ">
                <a class="button-alpha message message_red" href="cuppa-component">
                    <h3 class="title3"><i class="fas fa-puzzle-piece message_icon"></i> Cuppa Component</h3>
                    <p>A standard vanilla class implementation based on observables or state.</p>    
                    <p>Small boilerplate that help you to develop fast reactive vanilla components and reuse anywhere reaching good performance with a small footprint. (~2.5kB gzipped)</p>
                    <p>Faster, it doesn't use virtual DOM instead use the real DOM.</p>
                    <p>Create your own components just 1 time and re-use it anywhere.</p>
                </a>
                <a class="button-alpha message message_blue" href="cuppa-router">
                    <h3 class="title3"><i class="fas fa-map-signs message_icon"></i> Cuppa Router</h3>
                    <p>Simple Vanilla Router for any kind of projects (~2.5kB gzipped).</p>
                    <p>Small size (~2.5kB gzipped).</p>
                </a>
                <a class="button-alpha message message_purple" href="cuppa-storage">
                    <h3 class="title3"><i class="fas fa-database message_icon"></i> Cuppa Storage</h3>
                    <p>Centralize data and automatique update all listeners when data change.</p>
                    <p>Make data persistence using localStorage or sessionStorage.</p>
                    <p>Small size (~1.5kB gzipped).</p>
                </a>
                <div class="message message_purple disabled">
                    <h3 class="title3"><i class="fas fa-toolbox message_icon"></i> Cuppa Tools</h3>
                </div>
            </div>
            `
    }
}

customElements.define('welcome-comp', Welcome);
