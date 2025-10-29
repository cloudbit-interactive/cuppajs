import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Storages} from "../../../controllers/Storages.js";
import {CuppaMenu} from "../../../../cuppa/components/cuppa.menu.min.js";
import {CuppaTheme} from "../../../../cuppa/cuppa.theme.min.js";
import {CuppaShortcut} from "../../../../cuppa/components/cuppa.shortcut.min.js";
import {AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import {Utils} from "../../../controllers/Utils.js";

export class CuppaMenuDoc extends CuppaComponent{
	static observables = ['output', 'sort']
	output = '';
	sort = 'az';
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
      <h1 class="title-2">Cuppa Menu</h1>
      <hr />
      <section>
        <h2 class="title-3">Main Menu</h2>
	      <div class="flex m-t-10 j-start a-center" style="gap:0.5rem">
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
	        <button @click="${()=>this.setOutput('Quit')}" >
		        Quit
            <cuppa-shortcut
	            keys="control+Q"
	            label="${CuppaShortcut.ICONS.CONTROL} Q" 
	            @input=${ ()=>this.setOutput('Quit') } 
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
      <hr />
      <section>
        <h2 class="title-3">Contextual Menu</h2>
        <button id="btnContextual" class="button-1 transparent m-t-10" >Contextual Menu</button>
        <cuppa-menu 
          target="#btnContextual" 
          contextual-menu="true"
          pos-x="${CuppaMenu.POSITION.LEFT_IN}"
          pos-y="${CuppaMenu.POSITION.BOTTOM}"
          theme="${CuppaTheme.getTheme()}" 
        >
          <button id="btnSort">
            <span><i class="fas fa-sort-amount-down"></i> Sort</span>
	          <i class="more"></i>
          </button>
          <cuppa-menu 
            target="#btnSort" 
            pos-x="${CuppaMenu.POSITION.RIGHT}"
            pos-y="${CuppaMenu.POSITION.TOP_IN}"
            theme="${CuppaTheme.getTheme()}" 
          >
            <button @click=${e=>{ e.stopPropagation(); this.sort='az' }} >
	            <span>A to Z</span> 
	            ${this.sort === 'az' ? html`<i class="fas fa-check f-10 m-r-0"></i>` : ''}
            </button>
            <button @click=${e=>{ e.stopPropagation(); this.sort='za' }}>
	            <span>Z to A</span>
              ${this.sort === 'za' ? html`<i class="fas fa-check f-10 m-r-0"></i>` : ''}
            </button>
          </cuppa-menu>
          <hr />
          <button>
	          <span><i class="fas fa-cut"></i> Cut</span>
          </button>
          <button>
	          <span><i class="fas fa-copy"></i> Copy</span>
          </button>
          <button>
	          <span><i class="fas fa-paste"></i> Paste</span>
          </button>
          <hr />
          <button>
            <span><i class="fas fa-cog"></i> Settings</span>
          </button>
        </cuppa-menu>
      </section>
      <hr />
      <section>
        <h2 class="title-3">Code Example</h2>
        <cuppa-preview-code
          class="box-shadow-1 m-t-20"
          height="42rem"
          preview-height="28rem"
          mode=${AceModes.html}
          remove-tabs=${6}
          preview=${true}
          expandable=${false}
          preview-css="${Utils.getPreviewCSS()}"
        >
          <code>
            <!--[
						<script src="https://cdn.jsdelivr.net/npm/cuppajs@0.0.142/libs/components/cuppa.menu.min.js" type="module"></script>
						<button id="btnContextual" class="button-1 transparent m-t-10" >Contextual Menu</button>
						<cuppa-menu 
							target="#btnContextual" 
							contextual-menu="true"
							pos-x="LEFT_IN"
							pos-y="BOTTOM"
							style="display:none;"
							theme="dark"
						>
						  <button id="btnSort">
						    <span><i class="fas fa-sort-amount-down"></i> Sort</span>
						    <i class="more"></i>
						  </button>
						  <cuppa-menu 
						    target="#btnSort" 
						    pos-x="RIGHT"
						    pos-y="TOP_IN"
						    theme="$dark" 
						  >
						    <button>
									<span>A to Z</span> 
						    </button>
						    <button>
									<span>Z to A</span>
						    </button>
						  </cuppa-menu>
						  <hr />
						  <button>
						    <span><i class="fas fa-cut"></i> Cut</span>
						  </button>
						  <button>
								<span><i class="fas fa-copy"></i> Copy</span>
						  </button>
						  <button>
						    <span><i class="fas fa-paste"></i> Paste</span>
						  </button>
						  <hr />
						  <button>
						    <span><i class="fas fa-cog"></i> Settings</span>
						  </button>
						</cuppa-menu>
						]-->
          </code>
        </cuppa-preview-code>
      </section>
		`
	}
}

customElements.define('cuppa-menu-doc', CuppaMenuDoc);
