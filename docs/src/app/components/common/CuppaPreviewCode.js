import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";
import {cuppa, log} from "../../../../../libs/cuppa.js";
import * as ace from 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/ace.min.js';
import {Utils} from "../../controllers/Utils.js";

export class CuppaPreviewCode extends CuppaComponent {
	value = this.observable('value','');
	editor;

	mounted(){
		window.ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/')
		this.editor = window.ace.edit(this.refs.editor);
		this.editor.setTheme("ace/theme/tomorrow_night");
		this.editor.session.setMode("ace/mode/html");
		this.editor.session.on('change', this.onEditorChange);
		this.setValue(Utils.removeTabs(`
			<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.tooltip.min.js" type="module"></script>
			<button class="button-1 btn-default" >Default/Bottom</button>
			<cuppa-tooltip target=".btn-default" text="Default position" style="margin-top:8px"></cuppa-tooltip>
			`, 3), );
		this.editor.clearSelection();
	}

	setValue(value){
		this.editor.setValue(value);
	}

	onEditorChange(delta){
		let code = this.editor.session.getValue();
		this.refs.output.src = "data:text/html;charset=utf-8," + escape(code);
	}

	static get observedAttributes() { return ['attr1', 'attr2'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		this[attr] = newVal;
	}

	render(){
		return html`
      <div class="cuppa-preview-code">
        <div ref="editor"  class="editor" style="height:30rem">
        </div>
        <iframe ref="output" class="output">
          <button>dd</button>
        </iframe>
      </div>
      <style>
	      .cuppa-preview-code{ 
		      display: flex; flex-direction: row;
          border: 1px solid #ddd;
          border-radius: 5px;
	      }
        .cuppa-preview-code .editor{
	        flex:1;;
          overflow: hidden;
        }
	      .cuppa-preview-code .output{
          flex:1;
		      background: #333;
	      }
      </style>
    `
	}
}

customElements.define('cuppa-preview-code', CuppaPreviewCode);
