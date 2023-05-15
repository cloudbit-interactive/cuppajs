import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import "../../../../cuppa/components/cuppa.switch.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";

export class CuppaSwitchDoc extends CuppaComponent {
	checked = this.observable("checked", false);
	disabled = this.observable("disabled", false);

	render(){
		return html`
      <section>
        <h1 class="title-2">Cuppa Switch</h1>
        <div class="flex j-start m-t-20">
          <cuppa-switch
            name="switch"
            checked=${this.checked}
            disabled=${this.disabled}
            @change=${e=>this.checked=e.target.checked }
          ></cuppa-switch>
          <div class="separator-v"></div>
          <button class="button-1" @click=${ ()=>this.disabled = !this.disabled }>
            ${ this.disabled ? 'Enable' : 'Disable' }
          </button>
          <button class="button-1 m-l-5" @click=${ ()=>this.checked = !this.checked }>
            ${ this.checked ? 'Uncheck' : 'Check' }
          </button>
        </div>
      </section>

      <hr />
      
      <section>
        <h2 class="title-3 mb-10">Code Example</h2>
	      <cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="23rem"
          preview-width="40rem
					preview-height="12rem"
					mode=${AceModes.html}
					remove-tabs=${6}
          preview=${true}
          expandable=${false}
          preview-css="${Utils.getPreviewCSS()}"
	      >
		      <code>
          	<!--[
          	<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.switch.min.js" type="module"></script>
						<cuppa-switch 
							name="switch" 
							checked="true"
							onchange="console.log(this.checked, this.name)"
						></cuppa-switch>	
          	]-->
		      </code>
	      </cuppa-preview-code>
      </section>
      
      <hr />
      
      <section>
	      <h2 class="title-3">Properties</h2>
	      <div class="m-t-20 b-radius-10 o-auto">
	        <table class="table-1 min-width">
            ${Utils.tableHeaderDoc()}
	          <tbody>
	          <tr>
	            <td>
	              <div class="tag-1">name</div>
	              <div class="tag-1 tag-1-white">name</div>
	            </td>
	            <td>string</td>
	            <td></td>
	            <td>Specify a checkbox name.</td>
	          </tr>
	          <tr>
	            <td>
	              <div class="tag-1">checked</div>
	              <div class="tag-1 tag-1-white">checked</div>
	            </td>
	            <td>boolean</td>
	            <td>false</td>
	            <td>If true, the switch is checked.</td>
	          </tr>
	          <tr>
	            <td>
	              <div class="tag-1">disabled</div>
	              <div class="tag-1 tag-1-white">disabled</div>
	            </td>
	            <td>boolean</td>
	            <td>false</td>
	            <td>If true, the switch is disabled.</td>
	          </tr>
	          <tr>
	            <td>
	              <div class="tag-1">callback</div>
	            </td>
	            <td>function</td>
	            <td></td>
	            <td>
	              Callback function when user switch.
	              <br />
	              return: {name:string, checked: boolean, ref:Component}
	            </td>
	          </tr>
	          <tr>
	            <td>
	              <div class="tag-1 tag-1-yellow">onchange</div>
	            </td>
	            <td>Event</td>
	            <td></td>
	            <td>Fires when the switch is checked or unchecked.</td>
	          </tr>
	          </tbody>
	        </table>
	      </div>
      </section>
		`
	}
}

customElements.define('cuppa-switch-doc', CuppaSwitchDoc);
