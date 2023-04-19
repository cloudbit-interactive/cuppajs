import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Storages} from "../../../controllers/Storages.js";
import {CuppaMenu} from "../../../../cuppa/components/cuppa.menu.min.js";
import {CuppaTheme} from "../../../../cuppa/cuppa.theme.min.js";
import {CuppaShortcut} from "../../../../cuppa/components/cuppa.shortcut.min.js";

export class CuppaMenuDoc extends CuppaComponent{
	output = this.observable('output', '');
	timeout;

	setOutput(value){
		this.output = value;
		clearTimeout(this.timeout);
		if(!value) return;
		this.timeout = setTimeout(()=>this.setOutput(''), 2000);
	}

	render(){
		return html`
      <get-storage name=${Storages.theme.name} @change=${()=>this.forceRender()}></get-storage>
      <section>
        <h1 class="title-2">Cuppa Menu</h1>
	      <div class="flex m-t-20 j-start a-center" style="gap:0.5rem">
          <button id="btnFile" class="button-1" >File</button>
          <button id="btnEdit" class="button-1" >Edit</button>
          <button id="btnHelp" class="button-1" >Help</button>
		      <hr class="separator-v" />
		      <span>
			      <strong>Output: </strong>
			      ${this.output}
		      </span>
	      </div>

        <cuppa-menu
	        target="#btnFile" 
	        theme="${CuppaTheme.getTheme()}" 
	        pos-x="${CuppaMenu.POSITION.LEFT_IN}" 
	        pos-y="${CuppaMenu.POSITION.BOTTOM}"
	        arrow="${CuppaMenu.ARROW.UP}"
        >
	        <button @click="${()=>this.setOutput('New File')}" >
		        New File
            <cuppa-shortcut
              keys="control+N"
              label="${CuppaShortcut.ICONS.CONTROL} N"
              @input=${ ()=>this.setOutput('New File') }
            />
	        </button>
	        <button @click="${()=>this.setOutput('Open File')}" >
		        Open File
            <cuppa-shortcut
              keys="control+O"
              label="${CuppaShortcut.ICONS.CONTROL} O"
              @input=${ ()=>this.setOutput('Open File') }
            />
	        </button>
          <button @click="${()=>this.setOutput('Save File')}" >
            Save File
            <cuppa-shortcut
              keys="control+S"
              label="${CuppaShortcut.ICONS.CONTROL} S"
              @input=${ ()=>this.setOutput('Save File') }
            />
          </button>
          <button @click="${()=>this.setOutput('Close File')}" >
	          Close File
            <cuppa-shortcut
              keys="control+W"
              label="${CuppaShortcut.ICONS.CONTROL} W"
              @input=${ ()=>this.setOutput('Close File') }
            />
          </button>
	        <hr />
          <button @click="${()=>this.setOutput('New Project')}" >
	          New Project
            <cuppa-shortcut
              keys="shift+N"
              label="${CuppaShortcut.ICONS.SHIFT} N"
              @input=${ ()=>this.setOutput('New Project') }
            />
          </button>
          <button @click="${()=>this.setOutput('Open Project')}" >
	          Open Project
            <cuppa-shortcut
              keys="shift+O"
              label="${CuppaShortcut.ICONS.SHIFT} O"
              @input=${ ()=>this.setOutput('Open Project') }
            />
          </button>
          <button @click="${()=>this.setOutput('Save Project')}" >
            Save File
            <cuppa-shortcut
              keys="shift+S"
              label="${CuppaShortcut.ICONS.SHIFT} S"
              @input=${ ()=>this.setOutput('Save Project') }
            />
          </button>
          <button @click="${()=>this.setOutput('Close Project')}" >
	          Close Project
            <cuppa-shortcut
              keys="shift+W"
              label="${CuppaShortcut.ICONS.SHIFT} W"
              @input=${ ()=>this.setOutput('Close Project') }
            />
          </button>
	        <hr />
          <button @click="${()=>this.setOutput('Settings')}" >
	          Settings
            <cuppa-shortcut
              keys="control+,"
              label="${CuppaShortcut.ICONS.CONTROL} ,"
              @input=${ ()=>this.setOutput('Settings') }
            />
          </button>
	        <button @click="${()=>this.setOutput('Quick')}" >
		        Quit
            <cuppa-shortcut
	            keys="control+Q"
	            label="${CuppaShortcut.ICONS.CONTROL} Q" 
	            @input=${ ()=>this.setOutput('Quick') } 
            />
	        </button>
        </cuppa-menu>
        <cuppa-menu 
	        target="#btnEdit" 
	        theme="${CuppaTheme.getTheme()}" 
	        pos-x="${CuppaMenu.POSITION.LEFT_IN}" 
	        pos-y="${CuppaMenu.POSITION.BOTTOM}"
          arrow="${CuppaMenu.ARROW.UP}"
        >
          <button @click="${()=>this.setOutput('Undo')}" >
	          Undo
            <cuppa-shortcut
              keys="control+Z"
              label="${CuppaShortcut.ICONS.CONTROL} Z"
              @input=${ ()=>this.setOutput('Undo') }
            />
          </button>
          <button @click="${()=>this.setOutput('Redo')}" >
	          Redo
            <cuppa-shortcut
              keys="control+Y"
              label="${CuppaShortcut.ICONS.CONTROL} Y"
              @input=${ ()=>this.setOutput('Redo') }
            />
          </button>
          <hr />
          <button @click="${()=>this.setOutput('Cut')}" >
	          <span><i class="fas fa-cut"></i> Cut</span>
            <cuppa-shortcut
              keys="control+X"
              label="${CuppaShortcut.ICONS.CONTROL} X"
              @input=${ ()=>this.setOutput('Cut') }
            />
          </button>
          <button @click="${()=>this.setOutput('Copy')}" >
	          <span><i class="fas fa-copy"></i> Copy</span>
            <cuppa-shortcut
              keys="control+C"
              label="${CuppaShortcut.ICONS.CONTROL} C"
              @input=${ ()=>this.setOutput('Copy') }
            />
          </button>
          <button @click="${()=>this.setOutput('Paste')}" >
	          <span><i class="fas fa-paste"></i> Paste</span>
            <cuppa-shortcut
              keys="control+V"
              label="${CuppaShortcut.ICONS.CONTROL} V"
              @input=${ ()=>this.setOutput('Paste') }
            />
          </button>
        </cuppa-menu>
        <cuppa-menu
	        theme="${CuppaTheme.getTheme()}" 
	        target="#btnHelp" 
	        pos-x="${CuppaMenu.POSITION.LEFT_IN}"
	        pos-y="${CuppaMenu.POSITION.BOTTOM}"
          arrow="${CuppaMenu.ARROW.UP}"
        >
          <button  @click="${()=>this.setOutput('Support')}">Support</button>
          <button id="btnAbout">About <i class="more"></i></button>
	          <cuppa-menu target="#btnAbout" >
	            <button @click="${()=>this.setOutput("What's New")}" >What's New</button>
	            <button @click="${()=>this.setOutput('Help Center')}">Help Center</button>
	          </cuppa-menu>
        </cuppa-menu>
      </section>
		`
	}
}

customElements.define('cuppa-menu-doc', CuppaMenuDoc);
