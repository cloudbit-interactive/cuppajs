import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Globals} from "../../../controllers/Globals.js";

export class Welcome extends CuppaComponent {
	constructor(){
		super();
	}

	mounted() {
		Globals.router.updateLinks();
	}

	render(){
		return html`
      <div class="m-b-20">
        <h2 class="title-2">CuppaJS</h2>
        <p>A set of libraries to create any kind of javascript projects but regardless to other libraries, it is focus in vanilla javascript giving standard tools to built code and reuse it anywere, not matter the toolset (reactj, angular, vue, svelte).</p>
        <p>There are tons of good frameworks and libraries implementations out there to create amazing projects and one of the biggest problems is found solid mature standard resources that works with alls of them, for example: if you are using Angular the way to go is found an Angular Component that solve your needed, but if you need switch or create a new project using other technology base "React", needs to found an alternative that supply your needs in that specific framework.</p>
      </div>
      <div class="grid-cards">
        <a class="button-alpha message message_red" href="cuppa-component">
          <h3 class="title-3"><i class="fas fa-puzzle-piece message_icon"></i> Cuppa Component</h3>
          <p>A standard web component class implementation based on lit-html and observables.</p>
          <p>Small boilerplate that help you to develop fast reactive vanilla components and reuse anywhere reaching good performance with a small footprint. (~5.5kb gzipped)</p>
          <p>Faster, thanks to lit-html a simple, modern and fast HTML templeating.</p>
          <p>Create your own components just 1 time and re-use it anywhere.</p>
        </a>
        <a class="button-alpha message message_blue" href="cuppa-router">
          <h3 class="title-3"><i class="fas fa-map-signs message_icon"></i> Cuppa Router</h3>
          <p>Simple Vanilla Router for any kind of projects (~2.5kb gzipped).</p>
          <p>Small size (~2.5kB gzipped).</p>
        </a>
        <a class="button-alpha message message_purple" href="cuppa-storage">
          <h3 class="title-3"><i class="fas fa-database message_icon"></i> Cuppa Storage</h3>
          <p>Centralize data and automatic update all listeners when data change.</p>
          <p>Make data persistence using localStorage, sessionStorage or IndexedDB.</p>
          <p>Small size (~2kb gzipped).</p>
        </a>
      </div>
		`
	}
}

customElements.define('welcome-comp', Welcome);
