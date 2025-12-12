import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";
import { Globals } from "../../controllers/Globals.js";
import {CuppaTheme} from "../../../cuppa/cuppa.theme.min.js";
import {CuppaStorage} from "../../../cuppa/cuppa.storage.min.js";
import {Storages} from "../../controllers/Storages.js";
import {Constants} from "../../controllers/Constants.js";

export class Menu extends CuppaComponent {
  static observables = ['path', 'theme'];
	path;
	theme;

	mounted() {
		Globals.router.updateLinks();
		Globals.router.addListener( this.onRouter );
		Globals.router.resolve();
		setTimeout(()=>{this.onRouter(Globals.router.getPath())});
		CuppaTheme.init({btnToggle:this.refs.btnThemeToggle, callback:this.onUpdateTheme});
		this.theme = CuppaTheme.getTheme();
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
      <get-storage name=${Storages.theme.name} @change=${(e) => { this.theme = e.detail; }}></get-storage>
      <div class="flex j-between a-center p-x-20 p-y-20" style="background: var(--menu-bg-bar)">
        <a class="link-clear f-20 bold " href="/" aria-label="Home">CuppaJS.</a>
        <div class="flex a-center ">
          <a class="btn-icon button-alpha d-i-children p-x-10"
             href="https://www.npmjs.com/package/cuppajs" 
             aria-label="NPM" 
             target="_blank"
          >
            <img 
	            src="./media/images/npm.svg"
              class="${this.theme === "dark" ? 'tint-white' : 'tint-black'}"
            />
          </a>
          <a class="btn-icon button-alpha d-i-children p-x-10"
             href="https://github.com/cloudbit-interactive/cuppajs"
             aria-label="Github" 
             target="_blank"
          >
            <img
              src="./media/images/github.svg"
              class="${this.theme === "dark" ? 'tint-white' : 'tint-black'}"
            />
          </a>
          <button 
	          ref="btnThemeToggle" 
	          class="btn-icon button-alpha d-i-children p-l-10" 
	          aria-label="Theme"
          >
            <img 
	            src="${ (this.theme === "dark") ? "./media/images/sun.svg" : "./media/images/moon.svg" }" 
	            class="${this.theme === "dark" ? 'tint-white' : 'tint-black'}" />
          </button>
        </div>
      </div>
      <nav class="p-x-10 flex-1 o-auto p-b-40 scroll-1">
        <div class="m-y-20">
          <a class="menu-item ${this.isSelected('cuppa-component')}" href="cuppa-component" aria-label="Component">
	          <i class="fas fa-puzzle-piece "></i> Component
          </a>
          <a class="menu-item ${this.isSelected('cuppa-router')}" href="cuppa-router" aria-label="Router">
	          <i class="fas fa-map-signs"></i> Router
          </a>
          <a class="menu-item ${this.isSelected('cuppa-storage')}" href="cuppa-storage" aria-label="Storage">
	          <i class="fas fa-database"></i> Storage
          </a>
        </div>

        <h2 class="title-3">Cuppa Components</h2>
        <div class="m-y-20">
	        ${Constants.components.map(component =>{
						return html`
              <a class="menu-item ${this.isSelected(component.href)} ${component.disabled ? 'disabled' : ''}" href="${component.href}" aria-label="${component.label}">${component.label}</a>
						`
	        })}
        </div>

        <h2 class="title-3">More</h2>
        <div class="m-y-20">
          <a class="menu-item ${this.isSelected('performance')}" href="performance" aria-label="Performance">
	          <i class="fas fa-tachometer-alt"></i> Component Performance
          </a>
        </div>
      </nav>
      <div class="a-r-b f-10 m-r-5 disabled">v.${Globals.version}</div>
      <style>
	      menu-comp {
          background-color: var(--menu-bg);
          color: var(--menu-color);
          display: flex;
          flex-direction: column;
          height: 100vh;
          overflow: auto;
        }
        menu-comp .menu-item {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0);
          color: var(--menu-color);
          cursor: pointer;
          padding: 0.9rem 0.8rem;
          text-decoration: none;
          transition: 0.3s opacity;
          opacity: 0.7;
          position: relative;
          user-select: none;
          border-radius: 0.5rem;
        }
        menu-comp .menu-item *{ pointer-events:none!important; -webkit-user-select:none!important; user-select:none!important; }
        menu-comp .menu-item:hover { opacity: 1; }
        menu-comp .menu-item.selected { opacity: 1; background: var(--menu-selected-bg); cursor: default; color: var(--menu-selected-color) !important; }
        menu-comp .menu-item i { min-width: 3rem; }
	      menu-comp .btn-icon{ background: transparent; border: none; display: flex; align-items: center; justify-content: center; padding:5px; }
        menu-comp .btn-icon img{ width: auto; height: 2rem; }
      </style>
		`
	}
}

customElements.define('menu-comp', Menu);
