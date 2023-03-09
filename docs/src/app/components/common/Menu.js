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

	isSelected(value){
		return (this.path == value) ? 'selected' : '';
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
          <a ref="btnThemeToggle" class="button-alpha d-i-children p-l-10 f-18" aria-label="Light / Dark" >
            <i class=${`far ${this.theme === "dark-theme" ? 'fa-sun' : 'fa-moon' }`}></i>
          </a>
        </div>
      </div>
			<nav class="p-x-10 flex-1 o-auto p-b-100 ">
        <div class="m-t-10">
          <a class="menu-item ${this.isSelected('cuppa-component') }" href="cuppa-component" aria-label="Component" ><i class="fas fa-puzzle-piece " ></i> Component</a>
          <a class="menu-item ${this.isSelected('cuppa-router') }" href="cuppa-router" aria-label="Router" ><i class="fas fa-map-signs"></i> Router</a>
          <a class="menu-item ${this.isSelected('cuppa-storage') }" href="cuppa-storage" aria-label="Storage" ><i class="fas fa-database"></i> Storage</a>
        </div>
	
	      <h2 class="title-3 m-t-20">Cuppa Components</h2>
	      <div class="m-y-20">
          <a class="menu-item ${this.isSelected('cuppa-alert')}" href="cuppa-alert" aria-label="Cuppa Alert" >Cuppa Alert</a>
          <a class="menu-item ${this.isSelected('cuppa-switch')}" href="cuppa-switch" aria-label="Cuppa Switch" >Cuppa Switch</a>
          <a class="menu-item ${this.isSelected('cuppa-tabs')}" href="cuppa-tabs" aria-label="Cuppa Tabs" >Cuppa Tabs</a>
          <a class="menu-item ${this.isSelected('cuppa-collapsible')}" href="cuppa-collapsible" aria-label="Cuppa Collapsible" >Cuppa Collapsible</a>
          <a class="menu-item ${this.isSelected('cuppa-drawer')}" href="cuppa-drawer" aria-label="Cuppa Drawer" >Cuppa Drawer</a>
          <a class="menu-item ${this.isSelected('cuppa-tooltip')}" href="cuppa-tooltip" aria-label="Cuppa Tooltip" >Cuppa Tooltip</a>
	      </div>
	
	      <h2 class="title-3 m-t-20">More</h2>
	      <div class=" m-y-10">
          <a class="menu-item ${this.isSelected('performance')}" href="performance" aria-label="Performance" ><i class="fas fa-tachometer-alt"></i> Component Performance</a>
        </div>
      </nav>
      <style>
        menu-comp{ 
	        display: flex; 
	        flex-direction: column;
	        height: 100%; 
	        color:var(--color-white);
	        overflow: auto;
        }
        menu-comp .menu-item{
          display: flex; 
	        align-items: center;
          background: rgba(0,0,0,0);
	        color:var(--color-white); 
	        cursor: pointer; 
	        padding:0.9rem 0.8rem;
          text-decoration: none;
	        transition: 0.3s opacity; 
	        opacity: 0.6; 
	        position: relative; 
	        user-select: none; 
	        border-radius: 0.5rem; 
        }
        menu-comp .menu-item:hover{ opacity: 1; }
        menu-comp .menu-item.selected{ opacity: 1; background: rgba(0,0,0,0.15); cursor: default; color:var(--color-blue-1) !important; }
        menu-comp .menu-item i{ min-width: 3rem; }
      </style>
		`
	}
}

customElements.define('menu-comp', Menu);
