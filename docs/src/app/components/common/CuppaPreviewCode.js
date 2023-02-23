import {CuppaComponent, html, camelize} from "../../../cuppa/cuppa.component.min.js";
import * as ace from 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/ace.min.js';

const aceModes = {
	html:'ace/mode/html',
	javascript:'ace/mode/javascript',
	css:'ace/mode/css',
};

export let iconPreview = 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik00ODAuMzg0IDMxOS44NzJjLTEyMy43MTIgMC0yMjQgMTAwLjI4OC0yMjQgMjI0czEwMC4yODggMjI0IDIyNCAyMjQgMjI0LTEwMC4yODggMjI0LTIyNFM2MDQuMDk2IDMxOS44NzIgNDgwLjM4NCAzMTkuODcyek00ODAuMzg0IDcwMy44NzJjLTg4LjM4NCAwLTE2MC03MS42MTYtMTYwLTE2MHM3MS42MTYtMTYwIDE2MC0xNjAgMTYwIDcxLjYxNiAxNjAgMTYwUzU2OC43NjggNzAzLjg3MiA0ODAuMzg0IDcwMy44NzJ6TTkyNC4wOTYgNDMxLjI5NmMtMTA4LjM1Mi0xNDYuNDk2LTI2Ni45NDQtMjM5LjEwNC00NDQuMDMyLTIzOS4xMDRTMTQ0LjQ0OCAyODQuOCAzNi4wOTYgNDMxLjI5NmMtNDcuODcyIDY0LjcwNC00Ny44NzIgMTYwLjgzMiAwIDIyNS40NzIgMTA4LjM1MiAxNDYuNDk2IDI2Ni45NDQgMjM5LjEwNCA0NDQuMDMyIDIzOS4xMDRzMzM1LjYxNi05Mi42MDggNDQ0LjAzMi0yMzkuMTA0Qzk3MS45NjggNTkyLjEyOCA5NzEuOTY4IDQ5NiA5MjQuMDk2IDQzMS4yOTZ6TTg3NS45NjggNjAzLjcxMkM3NzUuNDg4IDc0OC43MzYgNjMwLjc4NCA4MzIgNDc4Ljk3NiA4MzJjLTE1MS42OCAwLTI5Ni4zODQtODMuMjY0LTM5Ni45MjgtMjI4LjIyNC0yMy45MzYtMzQuNTYtMjMuOTM2LTg0LjczNiAwLTExOS4yOTYgMTAwLjU0NC0xNDUuMDg4IDI0NS4yNDgtMjI4LjIyNCAzOTYuOTI4LTIyOC4yMjQgMTUxLjgwOCAwIDI5Ni41MTIgODMuMiAzOTYuOTkyIDIyOC4yMjRDODk5LjkwNCA1MTguOTc2IDg5OS45MDQgNTY5LjIxNiA4NzUuOTY4IDYwMy43MTJ6IiAgLz48L3N2Zz4='
export let iconArrowDown = 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01MTEuNSA3ODkuOSA4MC42IDM1OWMtMjIuOC0yMi44LTIyLjgtNTkuOCAwLTgyLjYgMjIuOC0yMi44IDU5LjgtMjIuOCA4Mi42IDBsMzQ4LjMgMzQ4LjMgMzQ4LjMtMzQ4LjNjMjIuOC0yMi44IDU5LjgtMjIuOCA4Mi42IDAgMjIuOCAyMi44IDIyLjggNTkuOCAwIDgyLjZMNTExLjUgNzg5LjkgNTExLjUgNzg5Ljl6TTUxMS41IDc4OS45IiAgLz48L3N2Zz4=';

export class CuppaPreviewCode extends CuppaComponent {
	content = this.observable('content','');
	mode = this.observable('mode', 'html');
	aceTheme = this.observable('aceTheme', 'ace/theme/tomorrow_night');
	preview = this.observable('preview', true);
	height = this.observable('height');
	disabled = this.observable('disabled', false);
	expandable = this.observable('expandable', true);
	showToolsBar = this.observable('showToolsBar', true);
	editor;
	tmpHeight;

	constructor() {
		super();
		this.height = '200px';
	}

	static get observedAttributes() { return ['mode', 'ace-theme', 'content', 'preview', 'height', 'disabled', 'expandable', 'show-tools-bar' ] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(['preview','disabled','expandable','show-tools-bar'].indexOf(attr) != -1) newVal = (newVal === 'true') ? true : false;
		this[camelize(attr)] = newVal;
	}

	mounted(){
		this.configEditor();
	}

	configEditor(){
		let content = this.querySelector("cuppa-preview-content");
		if(content){
			this.content = content.innerHTML;
			content.remove()
		}
		window.ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/');
		this.editor = window.ace.edit(this.refs.editor);
		this.editor.setTheme(this.aceTheme);
		this.editor.session.on('change', this.onEditorChange);
		this.editor.setReadOnly(this.disabled);
		this.editor.session.setOptions({
			mode:aceModes[this.mode],
			tabSize: 2,
			useSoftTabs: true,
			useWorker:false,
		});
		this.editor.container.style.lineHeight = 2;
		this.editor.renderer.setScrollMargin(14, 14);
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

	expandContent(value = true){
		if(value){
			let newHeight = this.editor.getSession().getScreenLength() * this.editor.renderer.lineHeight + this.editor.renderer.scrollBar.getWidth();
			this.height = `${newHeight+40}px`;
			this.editor.resize();
		}else{
			this.height = `${this.tmpHeight}`;
		}
		this.editor.resize();
	}

	isExpanded(){
		if(this.tmpHeight != this.height){
			return true;
		}else{
			return false;
		}
	}

	rendered(){
		if(!this.tmpHeight) this.tmpHeight = this.height;
		this.onEditorChange();
	}

	render(){
		return html`
      <div ref="wrap" class="wrap" style="height: ${this.height}">
        <div ref="editor" class="editor"  style="align-self: stretch"></div>
        ${!this.preview ? `` : html`
	        <iframe ref="output" class="output wire" style="align-self: stretch">
	        </iframe>
	      `}
      </div>
      ${!this.showToolsBar ? `` : html`
        <div class="tools">
          <div>
            ${!this.expandable ? `` : html`
            <button
              class="btn"
              @click="${()=>{
              this.expandContent(!this.isExpanded())
            }}">
              <img style="margin-right: 8px" src='${iconArrowDown}'/>
              <span>Show more</span>
            </button>
		      `}

          </div>
          <div>
            <button class="btn btn-icon btn-show" @click="${()=>this.preview = !this.preview}" title="Hide/Show Preview">
              <img height="16" src='${iconPreview}'/>
            </button>
          </div>
        </div>
      `}
      <style>
	      cuppa-preview-code{ display: flex; flex-direction: column; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; }
        cuppa-preview-code .wrap{ display: flex; flex-direction: row; height: 100%; }
        cuppa-preview-code .editor{ flex:1; overflow: hidden; }
	      cuppa-preview-code .output{
		      position: relative;
          font-family: "Arial", sans-serif;
		      flex:1;
		      background: #23272f;
		      border:0;
		      border-left: 1px solid rgba(0,0,0,1);
		      padding: 10px;
	      }
        cuppa-preview-code .tools{
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        background: #343a46;
	        padding:7px;
        }
        cuppa-preview-code .btn{
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(0,0,0,0.3);
          border-radius: 5px;
          background: rgba(0,0,0,0);
          width: auto;
          height: 25px;
          cursor: pointer;
          transition: 0.3s;
	        color:#bbb;
        }
        cuppa-preview-code .btn:hover{ background: rgba(0,0,0,0.3); }
	      cuppa-preview-code .btn-icon{ width: 30px; }
        cuppa-preview-code .btn i, cuppa-preview-code .btn img{
	        width: auto; height: 16px;
          filter: invert(100%) sepia(95%) saturate(0%) hue-rotate(173deg) brightness(106%) contrast(104%);
	        opacity: 0.6;
        }
      </style>
    `
	}
}

customElements.define('cuppa-preview-code', CuppaPreviewCode);
