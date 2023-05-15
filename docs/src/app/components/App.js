import {CuppaComponent, html, camelize} from "../../cuppa/cuppa.component.min.js";
import {Globals} from "../controllers/Globals.js";
import "./common/Menu.js";
import "../../cuppa/components/cuppa.drawer.min.js";
import "../../cuppa/components/cuppa.portal.min.js";
import("./sections/welcome/Welcome.js");
import("./sections/basic/cuppaComponent.js");
import("./sections/basic/cuppaRouter.js");
import("./sections/basic/cuppaStorage.js");
import("./sections/performance/Performance.js");
import("./sections/components/CuppaAlertDoc.js");
import("./sections/components/CuppaSwitchDoc.js");
import("./sections/components/CuppaTabsDoc.js");
import("./sections/components/CuppaCollapsibleDoc.js");
import("./sections/components/CuppaDrawerDoc.js");
import("./sections/components/CuppaTooltipDoc.js");
import("./sections/components/CuppaNotificationDoc.js");
import("./sections/components/CuppaMenuDoc.js");

export class App extends CuppaComponent {
	path = this.observable("path");

	constructor(){
		super();
		Globals.router.addListener(path=>{
			this.path = path;
			window.scrollTo(0, 0);
		});
		Globals.router.resolve();
	}

	mounted(){
		Globals.menuMobile = this.refs.menuMobile;
	}

	render(){
		return html`
      <!-- desktop menu -->
      <nav class="nav-main">
        <menu-comp></menu-comp>
      </nav>
      <!-- mobile menu -->
      <nav class="nav-top">
        <button class="button-icon" style="color: var(--color-menu-mobile)" aria-label="Mobile Menu" @click=${ (e)=>{ Globals.menuMobile.open() } }><i class="fas fa-bars"></i></button>
      </nav>
      <cuppa-drawer 
	      ref="menuMobile"
	      class="nav-mobile" 
        status="${CuppaDrawer.CLOSE}"
      >
        <cuppa-drawer-content>
          <menu-comp></menu-comp>
        </cuppa-drawer-content>
      </cuppa-drawer>
      <!-- main section -->
      <section class="main-section">
        ${ this.path == "simple-todo" ? "<simple-todo></simple-todo>"
        : (this.path == "cuppa-component") ? html`<cuppa-component />`
        : (this.path == "cuppa-router") ? html`<cuppa-router />`
        : (this.path == "cuppa-storage") ? html`<cuppa-storage-base />`
        : (this.path == "performance") ? html`<performance-comp />`
        : (this.path == "cuppa-alert") ? html`<cuppa-alert-doc />`
				: (this.path == "cuppa-switch") ? html`<cuppa-switch-doc />`
				: (this.path == "cuppa-tabs") ? html`<cuppa-tabs-doc />`
				: (this.path == "cuppa-collapsible") ? html`<cuppa-collapsible-doc />`
				: (this.path == "cuppa-drawer") ? html`<cuppa-drawer-doc />`
				: (this.path == "cuppa-tooltip") ? html`<cuppa-tooltip-doc />`
        : (this.path == "cuppa-notification") ? html`<cuppa-notification-doc />`
        : (this.path == "cuppa-menu") ? html`<cuppa-menu-doc />`
				: html`<welcome-comp></welcome-comp>`}
      </section>
      <cuppa-portal class="fixed a-l-t z-index-9999"></cuppa-portal>
		`
	}
}

customElements.define('app-comp', App);
