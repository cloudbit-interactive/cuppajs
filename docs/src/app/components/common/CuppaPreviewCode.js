import {CuppaComponent, html, camelize} from "../../../cuppa/cuppa.component.min.js";
import {cuppa, log} from "../../../../../libs/cuppa.js";
import * as ace from 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/ace.min.js';
import {Utils} from "../../controllers/Utils.js";

const aceModes = {
	html:'ace/mode/html',
	javascript:'ace/mode/javascript',
	css:'ace/mode/css',
};

export class CuppaPreviewCode extends CuppaComponent {
	content = this.observable('content','');
	mode = this.observable('mode', 'html');
	aceTheme = this.observable('aceTheme', 'ace/theme/tomorrow_night');
	preview = this.observable('preview', true);
	height = this.observable('height', '200px');
	editor;

	static get observedAttributes() { return ['mode', 'ace-theme', 'content', 'preview', 'height'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(attr === 'preview') newVal = (newVal === 'true') ? true : false;
		this[camelize(attr)] = newVal;
	}

	mounted(){
		let content = this.querySelector("cuppa-preview-content");
		if(content){
			this.content = content.innerHTML;
			content.remove()
		}
		window.ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/');
		this.editor = window.ace.edit(this.refs.editor);
		this.editor.setTheme(this.aceTheme);
		this.editor.session.on('change', this.onEditorChange);
		this.editor.session.setOptions({
			mode:aceModes[this.mode],
			tabSize: 2,
			useSoftTabs: true
		});
		this.editor.renderer.setScrollMargin(5, 5);
		if(this.content){
			this.setContent(this.content);
		}
	}

	setContent(content){
		this.editor.setValue(content);
		this.editor.clearSelection();
	}

	onEditorChange(){
		if(!this.refs.output) return;
		let code = this.editor.session.getValue();
		this.refs.output.src = "data:text/html;charset=utf-8," + escape(code);
	}

	render(){
		return html`
        <div ref="editor" class="editor"  style="align-self: stretch">
        </div>
	      ${!this.preview ? `` : html`
          <iframe ref="output" class="output wire" style="align-self: stretch">
            <button>dd</button>
          </iframe>
	      `}
      <style>
	      cuppa-preview-code{ 
		      display: flex;
		      flex-direction: row;
          border: 1px solid #ddd;
          border-radius: 5px;
		      overflow: hidden;
	      }
        cuppa-preview-code .editor{
	        flex:1;
          overflow: hidden;
        }
	      cuppa-preview-code .output{
          font-family: "Arial", sans-serif;
		      flex:1;
		      background: #23272f;
		      border:0;
		      padding: 10px;
	      }
      </style>
    `
	}
}

customElements.define('cuppa-preview-code', CuppaPreviewCode);
