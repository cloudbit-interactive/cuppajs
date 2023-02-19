import {html} from "../../cuppa/cuppa.component.min.js";
import {cuppa} from "../../cuppa/cuppa.min.js";
import {Constants} from "./Constants.js";

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

	static prismCode({code = "", type=Utils.prismCodeTypes.html, removeTabsCount = 0}){
		if(removeTabsCount > 0){
			let tabs = ' '.repeat(Constants.TAB_SPACE).repeat(removeTabsCount);
			let codeLines = code.split("\n");
			for(let i = 0; i < codeLines.length; i++){
				codeLines[i] = codeLines[i].replace(tabs, '');
			}
			code = codeLines.join("\n");
		}
		return html`<pre><code class="${type}">${String(code).trim()}</code></pre>`;
	}

	static loadPrism(){
		cuppa.requiereCSS("./src/prism/prism.css");
		cuppa.requiereJS("./src/prism/prism.js");
		if(document.defaultView.Prism){
			document.defaultView.Prism.highlightAll();
		}
	}

	static removeTabs(code, removeTabsCount = 0, tabSpace = 1, removeEmptyLines = true,){
		if(removeTabsCount > 0){
			code = code.replaceAll('\t', ' ')
			let tabs = ' '.repeat(tabSpace).repeat(removeTabsCount);
			let codeLines = code.split("\n");
			if(removeEmptyLines) codeLines = codeLines.filter(codeLine=>codeLine != '');
			for(let i = 0; i < codeLines.length; i++){
				codeLines[i] = codeLines[i].replace(tabs, '');
			}
			code = codeLines.join("\n");
		}
		return code;
	}

}
