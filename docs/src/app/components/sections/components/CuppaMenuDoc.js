import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Storages} from "../../../controllers/Storages.js";
import {CuppaMenu} from "../../../../cuppa/components/cuppa.menu.min.js";
import {CuppaTheme} from "../../../../../../libs/cuppa.theme.js";

export class CuppaMenuDoc extends CuppaComponent{
	render(){
		return html`
      <get-storage name=${Storages.theme.name} @change=${()=>this.forceRender()}></get-storage>
      <section>
        <h1 class="title-2">Cuppa Menu</h1>
	      <div class="flex m-t-20 j-start" style="gap:1rem">
          <button id="btnFile">File</button>
          <button id="btnEdit">Edit</button>
          <button id="btnHelp">Help</button>
	      </div>

        <cuppa-menu target="#btnFile" theme="${CuppaTheme.getTheme()}" pos-x="${CuppaMenu.POSITION.LEFT_IN}" pos-y="${CuppaMenu.POSITION.BOTTOM}">
	        <button>New File</button>
	        <button>Open File</button>
          <button>Close File</button>
	        <hr />
          <button>New Project</button>
          <button>Open Project</button>
          <button>Close Project</button>
        </cuppa-menu>
        <cuppa-menu target="#btnEdit" theme="${CuppaTheme.getTheme()}" pos-x="${CuppaMenu.POSITION.LEFT_IN}" pos-y="${CuppaMenu.POSITION.BOTTOM}">
          <button>Undo</button>
          <button>Redo</button>
          <hr />
          <button><i class="fas fa-cut"></i> Cut</button>
          <button><i class="fas fa-copy"></i> Copy</button>
          <button><i class="fas fa-paste"></i> Paste</button>
        </cuppa-menu>
        <cuppa-menu theme="${CuppaTheme.getTheme()}" target="#btnHelp" pos-x="${CuppaMenu.POSITION.LEFT_IN}" pos-y="${CuppaMenu.POSITION.BOTTOM}">
          <button>Help Page</button>
          <button id="btnAbout">About <i class="more"></i></button>
	          <cuppa-menu target="#btnAbout" >
	            <button>What's New</button>
	            <button>Help Center</button>
	          </cuppa-menu>
          <button>Settings</button>
          <button>Log Out</button>
        </cuppa-menu>
      </section>
		`
	}
}

customElements.define('cuppa-menu-doc', CuppaMenuDoc);
