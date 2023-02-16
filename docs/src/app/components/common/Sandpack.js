import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";
import {cuppa} from "../../../../../libs/cuppa.js";

export class SandPack extends CuppaComponent {
	unique = cuppa.unique('sand_pack_');
	client;

	mounted(){
		import('https://cdn.jsdelivr.net/npm/@codesandbox/sandpack-client@1.20.9/+esm').then(res=>{
			const {SandpackClient} = res;
			this.client = new SandpackClient(`#${this.unique}`,
				{
					files: {
						"/index.js": {
							code: `
								import {CuppaComponent, html} from "cuppajs";	 
							`,
						},
					},
					entry: "/index.js",
					dependencies: {
						cuppajs: "latest",
					},
					template:'static'
				},
				{
					height:'300px',
					showOpenInCodeSandbox: true,
					showErrorScreen: true,
					showLoadingScreen: false,
				}
			);
		})
	}

	static get observedAttributes() { return ['attr1', 'attr2'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		this[attr] = newVal;
	}

	render(){
		return html`
      <div ref="preview" id="${this.unique}" class="wire">
      </div>
      <style>
        sand-pack{
          display: block;
          border: 1px solid #aaa;
          border-radius: 5px;
          overflow: hidden;
          background: #333;
        }
      </style>
    `
	}
}

customElements.define('sand-pack', SandPack);
