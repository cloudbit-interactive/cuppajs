import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaTabs, CuppaTab} from "../../../../cuppa/components/cuppa.tabs.min.js";
import {Utils} from "../../../controllers/Utils.js";

export class CuppaTabsDoc extends CuppaComponent {
	tabSelected = this.observable("tabSelected", "microsoft");

	mounted(){
		Utils.loadPrism();
	}

	render(){
		return html`
      <div>
        <h1 class="title-2 mb-10">Cuppa Tabs</h1>
        <div class="message" style="display: flex; align-items: center;">
          <cuppa-tabs selected="${this.tabSelected}" @change="${ e=>{ this.tabSelected = e.detail.selected } }" >
            <cuppa-tab value="apple" >Apple</cuppa-tab>
            <cuppa-tab value="microsoft" >Microsoft</cuppa-tab>
            <cuppa-tab value="google" >Google</cuppa-tab>
          </cuppa-tabs>
          <div class="separator-v"></div>
          <div><strong>Tab Selected:</strong> ${this.tabSelected}</div>
        </div>

        <hr class="separator-1" />
        <h2 class="title-3 mb-10">Properties <div class="tag-1 tag-1-blue">cuppa-tabs</div></h2>
        <div style="overflow: auto;">
          <table class="table-1 min-width" >
            <thead>
            <tr>
              <th style="width: 30rem">
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

        <hr class="separator-1" />
        <h2 class="title-3 mb-10">Properties <div class="tag-1 tag-1-blue">cuppa-tab</div></h2>
        <div style="overflow: auto;">
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

        <hr class="separator-1" />
        <h2 class="title-3 mb-10">Code Example</h2>
        ${Utils.prismCode({removeTabsCount:5, code:`
                    <!-- Import component -->
                    <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.tabs.min.js" type="module"></script>
                    
                    <!-- Use with HTML Tag -->
                    <cuppa-tabs selected="microsoft" onchange="console.log(this.selected)" >
                        <cuppa-tab value="apple" >Apple</cuppa-tab>
                        <cuppa-tab value="microsoft" >Microsoft</cuppa-tab>
                        <cuppa-tab value="google" >Google</cuppa-tab>
                    </cuppa-tabs>
                `})}
      </div>
		`
	}
}

customElements.define('cuppa-tabs-doc', CuppaTabsDoc);
