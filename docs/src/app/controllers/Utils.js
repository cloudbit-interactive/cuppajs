import {html} from "../../cuppa/cuppa.component.min.js";
import {cuppa} from "../../cuppa/cuppa.min.js";
import {Constants} from "./Constants.js";
import {CuppaTheme} from "../../cuppa/cuppa.theme.min.js";

export class Utils{
	static prismCodeTypes = {
		"html": "language-markup",
		"css": "language-css",
		"javascript": "language-javascript",
		"json": "language-json",
		"markdown": "language-markdown",
		"php": "language-php",
		"sql": "language-sql",
		"xml": "language-xml"
	}

	static removeTabs(code, {tabsCount = 0, tabSpace = 1, removeFirstLine = true, removeLastLine = true, addEmptyLine = true} = {}){
		if(tabsCount > 0){
			let tabs = '\t'.repeat(tabSpace).repeat(tabsCount);
			let codeLines = code.split("\n");
			for(let i = 0; i < codeLines.length; i++){
				codeLines[i] = codeLines[i].replace(tabs, '');
			}
			if(removeFirstLine) codeLines.shift();
			if(removeLastLine) codeLines.pop();
			if(addEmptyLine) codeLines.push('');
			code = codeLines.join("\n");
		}
		return code;
	}

	static getPreviewCSS(){
		let theme = CuppaTheme.getTheme();
		if(theme === 'light') return Constants.PREVIEW_CSS;
		else if(theme === 'dark') return Constants.PREVIEW_CSS;
	}

	static tableHeaderDoc(){

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
