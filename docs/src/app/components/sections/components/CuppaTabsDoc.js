import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import "../../../../cuppa/components/cuppa.tabs.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";

export class CuppaTabsDoc extends CuppaComponent {
	tabSelected = this.observable("tabSelected", "microsoft");

	render(){
		return html`
			<section>
				<h1 class="title-2 ">Cuppa Tabs</h1>
				<div class="m-t-20 flex j-start a-center" >
					<cuppa-tabs selected="${this.tabSelected}" @change="${ e=>{ this.tabSelected = e.detail.selected } }" >
						<cuppa-tab value="apple" >Apple</cuppa-tab>
						<cuppa-tab value="microsoft" >Microsoft</cuppa-tab>
						<cuppa-tab value="google" >Google</cuppa-tab>
					</cuppa-tabs>
				<div class="separator-v"></div>
					<div><strong>Tab Selected:</strong> ${this.tabSelected}</div>
				</div>
			</section>
     
			<hr />
     
			<section>
				<h2 class="title-3">Code Example</h2>
				<cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="40rem"
          preview-width="40rem"
					preview-height="20rem"
					mode=${AceModes.html}
					remove-tabs=${6}
          preview=${true}
          expandable=${true}
          preview-css="${Utils.getPreviewCSS()}"
				>
		      <code>
            <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.tabs.min.js" type="module"></script>
						<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
						
						<cuppa-tabs selected="general" onchange="console.log(this.selected)" >
							<cuppa-tab value="general" >
								<i class="fa-solid fa-gear"></i> General
							</cuppa-tab>
							<cuppa-tab value="notifications">
								<i class="fa-solid fa-bell" ></i>Notifications
							</cuppa-tab>
							<cuppa-tab value="sound" >
								<i class="fa-solid fa-headphones"></i> Sound
							</cuppa-tab>
							<cuppa-tab value="battery" >
								<i class="fa-solid fa-battery-three-quarters"></i> Battery
							</cuppa-tab>
						</cuppa-tabs>
			      
						<style>
							cuppa-tabs{ flex-direction: column; }
							cuppa-tab{ justify-content: flex-start; }
							cuppa-tab i{ min-width: 20px; }
							cuppa-tab:first-of-type{ border-radius:5px 5px 0 0; }
							cuppa-tab:last-of-type{ border-radius:0 0 5px 5px; }
						</style>
		      </code>
				</cuppa-preview-code>
			</section>
     
			<hr />
     	
			<section>
        <h2 class="title-3">Properties <div class="tag-1 tag-1-blue">cuppa-tabs</div></h2>
        <div class="m-t-20 b-radius-10 o-auto">
          <table class="table-1 min-width" >
            ${Utils.tableHeaderDoc()}
            <tbody>
            <tr>
              <td class="text-left">
                <div class="tag-1">selected</div>
                <div class="tag-1 tag-1-white">selected</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                The value of the tab that will be selected by default.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">callback</div>
              </td>
              <td>function</td>
              <td></td>
              <td>
                The callback function that will be called when the tab is selected.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-yellow">onchange</div>
              </td>
              <td> event </td>
              <td></td>
              <td>
                Event that will be triggered when the selected tab changes.
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
			
      <hr />
			<section>
        <h2 class="title-3">Properties <div class="tag-1 tag-1-blue">cuppa-tab</div></h2>
        <div class="m-t-20 b-radius-10 o-auto" >
          <table class="table-1 min-width" >
            <thead>
            <tr>
              <th>
                <div class="tag-1">Property</div>
                <div class="tag-1 tag-1-white">attribute</div>
                <div class="tag-1 tag-1-yellow">event</div>
              </th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <div class="tag-1">value</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                The value of the tab.
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
		`
	}
}

customElements.define('cuppa-tabs-doc', CuppaTabsDoc);
