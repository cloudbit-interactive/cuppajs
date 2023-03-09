import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";
import { Globals } from "../../controllers/Globals.js";
import {CuppaTheme} from "../../../cuppa/cuppa.theme.min.js";
import {CuppaStorage, GetStorage} from "../../../cuppa/cuppa.storage.min.js";
import {Storages} from "../../controllers/Storages.js";

export class Menu extends CuppaComponent {
	path = this.observable("path");
	theme = this.observable('theme');

	mounted() {
		Globals.router.updateLinks();
		Globals.router.addListener( this.onRouter );
		Globals.router.resolve();
		setTimeout(()=>{this.onRouter(Globals.router.getPath())});
		CuppaTheme.init({btnToggle:this.refs.btnThemeToggle, callback:this.onUpdateTheme});
	}

	onUpdateTheme(theme){
		CuppaStorage.setData({...Storages.theme, data:theme}).then();
	}

	onRouter(path){
		this.path = path;
		if(Globals.menuMobile) Globals.menuMobile.close();
	}

	render(){
		return html`
      <get-storage name=${Storages.theme.name} @update=${(e)=>{ this.theme = e.detail; }}></get-storage>
      <div class="flex j-between a-center p-x-20 p-y-20" style="background: rgba(0,0,0,0.2)">
        <a class="link-clear f-20 bold " href="/" aria-label="Home">CuppaJS.</a>
        <div class="flex">
          <a class="button-alpha d-i-children p-x-10 f-18" href="https://www.npmjs.com/package/cuppajs" aria-label="NPM" target="_blank">
            <i class="fab fa-npm"></i>
          </a>
          <a class="button-alpha d-i-children p-x-10 f-18" href="https://github.com/cloudbit-interactive/cuppajs" aria-label="Github" target="_blank">
            <i class="fab fa-github" ></i>
          </a>
          <a ref="btnThemeToggle" class="button-alpha d-i-children p-l-10 f-18" aria-label="Github" >
            <i class=${`far ${this.theme === "dark-theme" ? 'fa-sun' : 'fa-moon' }`}></i>
          </a>
        </div>
      </div>
			<div class="p-x-10 flex-1 o-auto p-b-100">
	      <ul class="menu m-t-10">
	        <li class="menu-item ${ this.path == "cuppa-component" ? "selected" : "" }" >
	          <a class="menu-item-link" href="cuppa-component" ><i class="fas fa-puzzle-piece" ></i> Component</a>
	        </li>
	
	        <li class="menu-item ${ this.path == "cuppa-router" ? "selected" : "" }" >
	          <a class="menu-item-link" href="cuppa-router" ><i class="fas fa-map-signs"></i> Router</a>
	        </li>
	
	        <li class="menu-item ${ this.path == "cuppa-storage" ? "selected" : "" }" >
	          <a class="menu-item-link" href="cuppa-storage" ><i class="fas fa-database"></i> Storage</a>
	        </li>
	      </ul>
	
	      <h2 class="title-3 m-t-20">Cuppa Components</h2>
	      <ul class="menu m-y-20">
	        <li class="menu-item ${ this.path == "cuppa-alert" ? "selected" : "" }" >
	          <a class="menu-item-link" href="cuppa-alert" ><i class="fas fa-puzzle-piece"></i> Cuppa Alert</a>
	        </li>
	        <li class="menu-item ${ this.path == "cuppa-switch" ? "selected" : "" }" >
	          <a class="menu-item-link" href="cuppa-switch" ><i class="fas fa-puzzle-piece"></i> Cuppa Switch</a>
	        </li>
	        <li class="menu-item ${ this.path == "cuppa-tabs" ? "selected" : "" }">
	          <a class="menu-item-link" href="cuppa-tabs" ><i class="fas fa-puzzle-piece"></i> Cuppa Tabs</a>
	        </li>
	        <li class="menu-item ${ this.path == "cuppa-collapsible" ? "selected" : "" }">
	          <a class="menu-item-link" href="cuppa-collapsible" ><i class="fas fa-puzzle-piece"></i> Cuppa Collapsible</a>
	        </li>
	        <li class="menu-item ${ this.path == "cuppa-drawer" ? "selected" : "" }">
	          <a class="menu-item-link" href="cuppa-drawer" ><i class="fas fa-puzzle-piece"></i> Cuppa Drawer</a>
	        </li>
	        <li class="menu-item ${ this.path == "cuppa-tooltip" ? "selected" : "" }">
	          <a class="menu-item-link" href="cuppa-tooltip" ><i class="fas fa-puzzle-piece"></i> Cuppa Tooltip</a>
	        </li>
	      </ul>
	
	      <h2 class="title-3 m-t-20">More</h2>
	      <ul class="menu m-y-10">
	        <li class="menu-item ${ this.path == "performance" ? "selected" : "" }" >
	          <a class="menu-item-link" href="performance" ><i class="fas fa-tachometer-alt"></i> Component Performance</a>
	        </li>
	      </ul>
      </div>
      <style>
        menu-comp{ display: flex; flex-direction: column; height: 100%; color:var(--color-white);  font-size: 1.5rem; overflow: auto; }
        menu-comp .menu{ padding:0; list-style: none; margin:0; font-weight: 300; }
        menu-comp .menu-item{ transition: 0.3s opacity; opacity: 0.6; position: relative; user-select: none; border-radius: 0.5rem; }
        menu-comp .menu-item:hover{ opacity: 1; }
        menu-comp .menu-item.selected{  opacity: 1; background: rgba(0,0,0,0.1); }
        menu-comp .menu-item-link{ 
	        text-decoration: none; 
	        background: rgba(0,0,0,0);
	        display: grid;
	        grid-template-columns: 3rem auto; 
	        grid-template-rows: auto; 
	        grid-template-areas: "icon text";
	        color:var(--color-white); 
	        cursor: pointer; padding:0.9rem 0.8rem; 
        }
        menu-comp .menu-item.selected .menu-item-link{ color:var(--color-blue-1) !important; }
        menu-comp .menu-item-underline{ transition: 0.3s width; position: absolute; left:0; bottom:-1px; width: 0%; height: 0; border-bottom: 1px solid #FFF; }
        menu-comp .menu-item.selected .menu-item-underline{ width:100%; }
        menu-comp .menu-item-clear{ color:#FFF; text-decoration: none; }
      </style>
		`
	}
}

customElements.define('menu-comp', Menu);
