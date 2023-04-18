import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";

export class TableHeaderDoc extends CuppaComponent{

	render(){
		return html`
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
		`;
	}
}

customElements.define('table-header-doc', TableHeaderDoc);
