/**
 * v0.0.4
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

import * as ace from 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/ace.min.js';

export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.binAll(this)}getPropertiesCallbacks(){let _entries=Object.entries(this);for(let i=0;i<_entries.length;i++){let[key,value]=_entries[i];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(key)&&this._callbacks.push({key:key,value:value})}}reSetPropertiesCallbacks(){for(let i=0;i<this._callbacks.length;i++){let{key:key,value:value}=this._callbacks[i];this[key]=value}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),setTimeout(()=>{this.mounted&&this.mounted(this),this.rendered&&this.rendered(this)},0)}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(args){Object.entries(args).map(([name,value])=>{this[`_${name}`]=value}),this.forceRender()}forceRender(callback,dispatchRender=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&dispatchRender&&this.rendered(this),this.renderedCount++}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}bind(element){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));for(let i=0;i<propertyNames.length;i++)if("function"==typeof element[propertyNames[i]]){if(this[propertyNames[i]])continue;this[propertyNames[i]]=element[propertyNames[i]].bind(element)}}observables(object,callback){let target=this,firstName;if(object){if(!Array.isArray(object))return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName];object.forEach(varName=>{this.observable(varName,this[varName])})}}observable(varName,defaultValue){return setTimeout(()=>{defaultValue&&void 0===this[varName]||(defaultValue=this[varName]),this.observables({[varName]:defaultValue})},0),defaultValue}}export function camelize(str){return(str=(str=(str=(str=(str=String(str)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(match,index){return 0==+match?"":0===index?match.toLowerCase():match.toUpperCase()}))}var t,e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{Al:()=>D,dy:()=>b,Jb:()=>C,Ld:()=>M,sY:()=>W,rx:()=>G,YP:()=>N});const s=window,n=s.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,h="?"+l,$=`<${h}>`,a=document,d=()=>a.createComment(""),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,_=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),u="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,f=/>/g,g=RegExp(`>|${u}(?:([^\\s"'>=/]+)(${u}*=${u}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,y=/"/g,x=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),b=H(1),N=H(2),C=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),w=new WeakMap,S=a.createTreeWalker(a,129,null,!1),T=(t,e)=>{const i=t.length-1,s=[];let n,h=2===e?"<svg>":"",a=v;for(let e=0;e<i;e++){const i=t[e];let o,d,A=-1,c=0;for(;c<i.length&&(a.lastIndex=c,d=a.exec(i),null!==d);)c=a.lastIndex,a===v?"!--"===d[1]?a=p:void 0!==d[1]?a=f:void 0!==d[2]?(x.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=g):void 0!==d[3]&&(a=g):a===g?">"===d[0]?(a=null!=n?n:v,A=-1):void 0===d[1]?A=-2:(A=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?g:'"'===d[3]?y:m):a===y||a===m?a=g:a===p||a===f?a=v:(a=g,n=void 0);const _=a===g&&t[e+1].startsWith("/>")?" ":"";h+=a===v?i+$:A>=0?(s.push(o),i.slice(0,A)+r+i.slice(A)+l+_):i+l+(-2===A?(s.push(void 0),e):_)}const d=h+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==o?o.createHTML(d):d,s]};class B{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,$=0;const a=t.length-1,A=this.parts,[c,_]=T(t,e);if(this.el=B.createElement(c,i),S.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=S.nextNode())&&A.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const i=_[$++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(i);A.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?j:E})}else A.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(x.test(s.tagName)){const t=s.textContent.split(l),e=t.length-1;if(e>0){s.textContent=n?n.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],d()),S.nextNode(),A.push({type:2,index:++o});s.append(t[e],d())}}}else if(8===s.nodeType)if(s.data===h)A.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(l,t+1));)A.push({type:7,index:o}),t+=l.length-1}o++}}static createElement(t,e){const i=a.createElement("template");return i.innerHTML=t,i}}function P(t,e,i=t,s){var n,o,r,l;if(e===C)return e;let h=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const $=A(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==$&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===$?h=void 0:(h=new $(t),h._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=h:i._$Cl=h),void 0!==h&&(e=P(t,h._$AS(t,e.values),h,s)),e}class I{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:a).importNode(i,!0);S.currentNode=n;let o=S.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new U(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new O(o,this,t)),this._$AV.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=S.nextNode(),r++)}return n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{constructor(t,e,i,s){var n;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),A(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==C&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):_(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==M&&A(this._$AH)?this._$AA.nextSibling.data=t:this.$(a.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=B.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new I(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=w.get(t.strings);return void 0===e&&w.set(t.strings,e=new B(t)),e}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new U(this.k(d()),this.k(d()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class E{constructor(t,e,i,s,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=P(this,t,e,0),o=!A(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=P(this,s[i+r],e,r),l===C&&(l=this._$AH[r]),o||(o=!A(l)||l!==this._$AH[r]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const k=n?n.emptyScript:"";class R extends E{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class j extends E{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=P(this,t,e,0))&&void 0!==i?i:M)===C)return;const s=this._$AH,n=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==M&&(s===M||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class O{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const D={O:r,P:l,A:h,C:1,M:T,L:I,D:_,R:P,I:U,V:E,H:R,N:j,U:L,F:O},V=s.litHtmlPolyfillSupport;null==V||V(B,U),(null!==(t=s.litHtmlVersions)&&void 0!==t?t:s.litHtmlVersions=[]).push("2.7.2");const W=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new U(e.insertBefore(d(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r},{I:Y}=D,z=()=>document.createComment(""),J=(t,e,i)=>{var s;const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(z(),o),s=n.insertBefore(z(),o);i=new Y(e,s,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,l=r!==t;if(l){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==o||l){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},Z=(t,e,i=t)=>(t._$AI(e,i),t),F={},Q=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},q=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},G=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let r=0;for(const e of t)n[r]=s?s(e,r):r,o[r]=i(e,r),r++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){var n;const o=(t=>t._$AH)(t),{values:r,keys:l}=this.dt(e,i,s);if(!Array.isArray(o))return this.ht=l,r;const h=null!==(n=this.ht)&&void 0!==n?n:this.ht=[],$=[];let a,d,A=0,c=o.length-1,_=0,u=r.length-1;for(;A<=c&&_<=u;)if(null===o[A])A++;else if(null===o[c])c--;else if(h[A]===l[_])$[_]=Z(o[A],r[_]),A++,_++;else if(h[c]===l[u])$[u]=Z(o[c],r[u]),c--,u--;else if(h[A]===l[u])$[u]=Z(o[A],r[u]),J(t,$[u+1],o[A]),A++,u--;else if(h[c]===l[_])$[_]=Z(o[c],r[_]),J(t,o[A],o[c]),c--,_++;else if(void 0===a&&(a=q(l,_,u),d=q(h,A,c)),a.has(h[A]))if(a.has(h[c])){const e=d.get(l[_]),i=void 0!==e?o[e]:null;if(null===i){const e=J(t,o[A]);Z(e,r[_]),$[_]=e}else $[_]=Z(i,r[_]),J(t,o[A],i),o[e]=null;_++}else Q(o[c]),c--;else Q(o[A]),A++;for(;_<=u;){const e=J(t,$[u+1]);Z(e,r[_]),$[_++]=e}for(;A<=c;){const t=o[A++];null!==t&&Q(t)}return this.ht=l,((t,e=F)=>{t._$AH=e})(t,$),C}});var K=i.Al,X=i.dy,tt=i.Jb,et=i.Ld,it=i.sY,st=i.rx,nt=i.YP;export{K as _$LH,X as html,tt as noChange,et as nothing,it as render,st as repeat,nt as svg};let $LH=K,html=X,noChange=tt,nothing=et,render=it,repeat=st,svg=nt;

export class CuppaPreviewCode extends CuppaComponent {
	content = this.observable('content');
	mode = this.observable('mode', AceModes.html);
	aceTheme = this.observable('aceTheme', AceThemes.tomorrow_night);
	preview = this.observable('preview', true);
	height = this.observable('height', '200px');
	previewWidth = this.observable('previewWidth', 'auto');
	previewHeight = this.observable('previewHeight', '200px');
	disabled = this.observable('disabled', false);
	expandable = this.observable('expandable', true);
	showToolsBar = this.observable('showToolsBar', true);
	removeTabs = this.observable('removeTabs', 0);
	previewCss = this.observable('previewCss', '');
	previewHtml = this.observable('previewHtml', '');
	editor;
	tmpHeight;

	static get observedAttributes() { return ['mode', 'ace-theme', 'content', 'preview', 'height', 'preview-height', 'preview-width', 'disabled', 'expandable', 'show-tools-bar', 'remove-tabs', 'preview-css', 'preview-html' ] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(['preview','disabled','expandable','show-tools-bar'].indexOf(attr) != -1) newVal = (newVal === 'true') ? true : false;
		this[camelize(attr)] = newVal;
	}

	mounted(){
		this.configEditor();
	}

	configEditor(){
		let contentNode = this.querySelector("cuppa-preview-content") || this.querySelector('pre') || this.querySelector('template') || this.querySelector('code');
		if(contentNode){
			this.content = String(contentNode.innerHTML);
			this.content = this.removeCommentTag(this.content)
			this.content = (this.content || "").trim();
			this.content = removeTabs(this.content, {tabsCount:parseInt(this.removeTabs)})
			contentNode.remove();
		}
		let previewHtml = this.querySelector("preview-html");
		if(previewHtml){
			this.previewHtml = String(previewHtml.innerHTML);
			this.previewHtml = this.removeCommentTag(this.previewHtml);
			previewHtml.remove();
		}

		window.ace.config.set('basePath', 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/');
		this.editor = window.ace.edit(this.refs.editor);
		this.editor.setTheme(this.aceTheme);
		this.editor.session.on('change', this.onEditorChange);
		this.editor.setReadOnly(this.disabled);
		this.editor.session.setOptions({
			mode:this.mode,
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
		let output = '';
		if(this.previewCss){ output += `<style rel="stylesheet">${this.removeCommentTag(this.previewCss)}</style>`;}
		if(this.previewHtml){ output += this.previewHtml; }

		let code = this.editor.session.getValue();
		if([AceModes.javascript, AceModes.jsx].indexOf(this.mode) != -1){
			code = `<script type="module">${code}</script>`;
		}else if(this.mode === AceModes.css){
			code = `<style rel="stylesheet">${code}</style>`;
		}
		output += code;
		this.refs.output.srcdoc = output;
	}

	expandContent(value = true){
		if(value){
			let newHeight = this.editor.getSession().getScreenLength() * this.editor.renderer.lineHeight + this.editor.renderer.scrollBar.getWidth();
			this.height = `${newHeight+40}px`;
			this.editor.resize();
		}else{
			this.height = `${this.tmpHeight}`;
		}
	}

	isExpanded(){
		if(this.tmpHeight && this.tmpHeight != this.height){
			return true;
		}else{
			return false;
		}
	}

	removeCommentTag(text){
		if(!text) text = '';
		if(text.indexOf('<!--[') === -1) return text;
		text = text.substring(text.indexOf('<!--[')+'<!--['.length);
		text = text.substring(text.indexOf("]-->"),-1);
		return text;
	}

	rendered(){
		if(!this.tmpHeight) this.tmpHeight = this.height;
		this.editor.resize();
		this.onEditorChange();
	}

	render(){
		return html`
      <div ref="wrap" class="cuppa-preview-code__wrap" style="height: ${this.height}">
        <div ref="editor" class="cuppa-preview-code__editor"  style="align-self: stretch"></div>
        ${!this.preview ? `` : html`
          <iframe
	          ref="output" 
	          class="cuppa-preview-code__output" 
	          style="align-self: stretch; flex:${this.previewWidth != 'auto' ? 'none' : 1}; width: ${this.previewWidth}; "
            allowtransparency="true" 
	          allowfullscreen="true"
	          title="output"
          ></iframe>
        `}
      </div>
      ${!this.showToolsBar ? `` : html`
        <div class="cuppa-preview-code__tools">
          <div>
            ${!this.expandable ? `` : html`
              <button
                class="cuppa-preview-code__btn"
                title="Show more"
                @click="${()=>{
			this.expandContent(!this.isExpanded())
		}}"
              >
                <img 
	                style="margin-right: 8px; transform:rotate(${this.isExpanded() ? '180deg' : '0deg'});" 
	                src='${iconArrowDown}'
                  alt="Expand"
                />
                <span>Show more</span>
              </button>
            `}
          </div>
          <div>
            <button 
	            class="cuppa-preview-code__btn cuppa-preview-code__btn-icon btn-show"
              title="Hide/Show Preview"
	            @click="${()=>this.preview = !this.preview}" 
            >
              <img height="16" src='${iconPreview}' alt="Preview"/>
            </button>
          </div>
        </div>
      `}
      <style>
        cuppa-preview-code{ display: flex; flex-direction: column; border: 0; border-radius: 5px; overflow: hidden; }
       	.cuppa-preview-code__wrap{ display: flex; flex-direction: row; height: 100%; }
        .cuppa-preview-code__editor{ flex:1; overflow: hidden; }
        .cuppa-preview-code__output{
	        position: relative; 
	        font-family: "Arial", sans-serif;
	        flex:1;
	        width: auto;
	        background: #23272f; 
	        color:#fff; border:0; 
	        border-left: 1px solid rgba(0,0,0,1);
        }
        .cuppa-preview-code__tools{ display: flex; justify-content: space-between; align-items: center; background: #343a46; padding:7px; }
        .cuppa-preview-code__btn{
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
        .cuppa-preview-code__btn:hover{ background: rgba(0,0,0,0.3); }
        .cuppa-preview-code__btn-icon{ width: 30px; }
        .cuppa-preview-code__btn i, .cuppa-preview-code__btn img{ opacity: 0.6; width: auto; height: 14px; filter: invert(100%) sepia(95%) saturate(0%) hue-rotate(173deg) brightness(106%) contrast(104%); }
        .cuppa-preview-code__editor ::-webkit-scrollbar { width: 6px; height: 6px; }
        .cuppa-preview-code__editor ::-webkit-scrollbar-track { background: transparent; }
        .cuppa-preview-code__editor ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.4); border-radius: 6px; visibility: hidden; }
        .cuppa-preview-code__editor:active ::-webkit-scrollbar-thumb,
        .cuppa-preview-code__editor:focus ::-webkit-scrollbar-thumb,
        .cuppa-preview-code__editor:hover ::-webkit-scrollbar-thumb { visibility: visible; }
        
        @media screen and (max-width: 1000px) {
          .cuppa-preview-code__wrap{ display: block; height: auto !important; }
          .cuppa-preview-code__editor{ height:${this.height}; }
          .cuppa-preview-code__output{ height:${this.previewHeight}; border-left: 0; border-top: 1px solid rgba(0,0,0,1); width: 100% !important; }
        }
      </style>
		`
	}
}

customElements.define('cuppa-preview-code', CuppaPreviewCode);

export let iconPreview = 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik00ODAuMzg0IDMxOS44NzJjLTEyMy43MTIgMC0yMjQgMTAwLjI4OC0yMjQgMjI0czEwMC4yODggMjI0IDIyNCAyMjQgMjI0LTEwMC4yODggMjI0LTIyNFM2MDQuMDk2IDMxOS44NzIgNDgwLjM4NCAzMTkuODcyek00ODAuMzg0IDcwMy44NzJjLTg4LjM4NCAwLTE2MC03MS42MTYtMTYwLTE2MHM3MS42MTYtMTYwIDE2MC0xNjAgMTYwIDcxLjYxNiAxNjAgMTYwUzU2OC43NjggNzAzLjg3MiA0ODAuMzg0IDcwMy44NzJ6TTkyNC4wOTYgNDMxLjI5NmMtMTA4LjM1Mi0xNDYuNDk2LTI2Ni45NDQtMjM5LjEwNC00NDQuMDMyLTIzOS4xMDRTMTQ0LjQ0OCAyODQuOCAzNi4wOTYgNDMxLjI5NmMtNDcuODcyIDY0LjcwNC00Ny44NzIgMTYwLjgzMiAwIDIyNS40NzIgMTA4LjM1MiAxNDYuNDk2IDI2Ni45NDQgMjM5LjEwNCA0NDQuMDMyIDIzOS4xMDRzMzM1LjYxNi05Mi42MDggNDQ0LjAzMi0yMzkuMTA0Qzk3MS45NjggNTkyLjEyOCA5NzEuOTY4IDQ5NiA5MjQuMDk2IDQzMS4yOTZ6TTg3NS45NjggNjAzLjcxMkM3NzUuNDg4IDc0OC43MzYgNjMwLjc4NCA4MzIgNDc4Ljk3NiA4MzJjLTE1MS42OCAwLTI5Ni4zODQtODMuMjY0LTM5Ni45MjgtMjI4LjIyNC0yMy45MzYtMzQuNTYtMjMuOTM2LTg0LjczNiAwLTExOS4yOTYgMTAwLjU0NC0xNDUuMDg4IDI0NS4yNDgtMjI4LjIyNCAzOTYuOTI4LTIyOC4yMjQgMTUxLjgwOCAwIDI5Ni41MTIgODMuMiAzOTYuOTkyIDIyOC4yMjRDODk5LjkwNCA1MTguOTc2IDg5OS45MDQgNTY5LjIxNiA4NzUuOTY4IDYwMy43MTJ6IiAgLz48L3N2Zz4='
export let iconArrowDown = 'data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01MTEuNSA3ODkuOSA4MC42IDM1OWMtMjIuOC0yMi44LTIyLjgtNTkuOCAwLTgyLjYgMjIuOC0yMi44IDU5LjgtMjIuOCA4Mi42IDBsMzQ4LjMgMzQ4LjMgMzQ4LjMtMzQ4LjNjMjIuOC0yMi44IDU5LjgtMjIuOCA4Mi42IDAgMjIuOCAyMi44IDIyLjggNTkuOCAwIDgyLjZMNTExLjUgNzg5LjkgNTExLjUgNzg5Ljl6TTUxMS41IDc4OS45IiAgLz48L3N2Zz4=';

export const AceModes = {
	abap:'ace/mode/abap',
	abc:'ace/mode/abc',
	actionscript:'ace/mode/actionscript',
	ada:'ace/mode/ada',
	alda:'ace/mode/alda',
	apache_conf:'ace/mode/apache_conf',
	apex:'ace/mode/apex',
	aql:'ace/mode/aql',
	asciidoc:'ace/mode/asciidoc',
	asl:'ace/mode/asl',
	assembly_x86:'ace/mode/assembly_x86',
	autohotkey:'ace/mode/autohotkey',
	batchfile:'ace/mode/batchfile',
	bibtex:'ace/mode/bibtex',
	c_cpp:'ace/mode/c_cpp',
	c9search:'ace/mode/c9search',
	cirru:'ace/mode/cirru',
	clojure:'ace/mode/clojure',
	cobol:'ace/mode/cobol',
	coffee:'ace/mode/coffee',
	coldfusion:'ace/mode/coldfusion',
	crystal:'ace/mode/crystal',
	csharp:'ace/mode/csharp',
	csound_document:'ace/mode/csound_document',
	csound_orchestra:'ace/mode/csound_orchestra',
	csound_score:'ace/mode/csound_score',
	css:'ace/mode/css',
	curly:'ace/mode/curly',
	d:'ace/mode/d',
	dart:'ace/mode/dart',
	diff:'ace/mode/diff',
	dockerfile:'ace/mode/dockerfile',
	dot:'ace/mode/dot',
	drools:'ace/mode/drools',
	edifact:'ace/mode/edifact',
	eiffel:'ace/mode/eiffel',
	ejs:'ace/mode/ejs',
	elixir:'ace/mode/elixir',
	elm:'ace/mode/elm',
	erlang:'ace/mode/erlang',
	forth:'ace/mode/forth',
	fortran:'ace/mode/fortran',
	fsharp:'ace/mode/fsharp',
	fsl:'ace/mode/fsl',
	ftl:'ace/mode/ftl',
	gcode:'ace/mode/gcode',
	gherkin:'ace/mode/gherkin',
	gitignore:'ace/mode/gitignore',
	glsl:'ace/mode/glsl',
	gobstones:'ace/mode/gobstones',
	golang:'ace/mode/golang',
	graphqlschema:'ace/mode/graphqlschema',
	groovy:'ace/mode/groovy',
	haml:'ace/mode/haml',
	handlebars:'ace/mode/handlebars',
	haskell:'ace/mode/haskell',
	haskell_cabal:'ace/mode/haskell_cabal',
	haxe:'ace/mode/haxe',
	hjson:'ace/mode/hjson',
	html:'ace/mode/html',
	html_elixir:'ace/mode/html_elixir',
	html_ruby:'ace/mode/html_ruby',
	ini:'ace/mode/ini',
	io:'ace/mode/io',
	ion:'ace/mode/ion',
	jack:'ace/mode/jack',
	jade:'ace/mode/jade',
	java:'ace/mode/java',
	javascript:'ace/mode/javascript',
	jexl:'ace/mode/jexl',
	json:'ace/mode/json',
	json5:'ace/mode/json5',
	jsoniq:'ace/mode/jsoniq',
	jsp:'ace/mode/jsp',
	jssm:'ace/mode/jssm',
	jsx:'ace/mode/jsx',
	julia:'ace/mode/julia',
	kotlin:'ace/mode/kotlin',
	latex:'ace/mode/latex',
	latte:'ace/mode/latte',
	less:'ace/mode/less',
	liquid:'ace/mode/liquid',
	lisp:'ace/mode/lisp',
	livescript:'ace/mode/livescript',
	log:'ace/mode/log',
	logiql:'ace/mode/logiql',
	logtalk:'ace/mode/logtalk',
	lsl:'ace/mode/lsl',
	lua:'ace/mode/lua',
	luapage:'ace/mode/luapage',
	lucene:'ace/mode/lucene',
	makefile:'ace/mode/makefile',
	markdown:'ace/mode/markdown',
	mask:'ace/mode/mask',
	matlab:'ace/mode/matlab',
	maze:'ace/mode/maze',
	mediawiki:'ace/mode/mediawiki',
	mel:'ace/mode/mel',
	mips:'ace/mode/mips',
	mixal:'ace/mode/mixal',
	mushcode:'ace/mode/mushcode',
	mysql:'ace/mode/mysql',
	nginx:'ace/mode/nginx',
	nim:'ace/mode/nim',
	nix:'ace/mode/nix',
	nsis:'ace/mode/nsis',
	nunjucks:'ace/mode/nunjucks',
	objectivec:'ace/mode/objectivec',
	ocaml:'ace/mode/ocaml',
	partiql:'ace/mode/partiql',
	pascal:'ace/mode/pascal',
	perl:'ace/mode/perl',
	pgsql:'ace/mode/pgsql',
	php:'ace/mode/php',
	php_laravel_blade:'ace/mode/php_laravel_blade',
	pig:'ace/mode/pig',
	plsql:'ace/mode/plsql',
	powershell:'ace/mode/powershell',
	praat:'ace/mode/praat',
	prisma:'ace/mode/prisma',
	prolog:'ace/mode/prolog',
	properties:'ace/mode/properties',
	protobuf:'ace/mode/protobuf',
	puppet:'ace/mode/puppet',
	python:'ace/mode/python',
	qml:'ace/mode/qml',
	r:'ace/mode/r',
	raku:'ace/mode/raku',
	razor:'ace/mode/razor',
	rdoc:'ace/mode/rdoc',
	red:'ace/mode/red',
	rhtml:'ace/mode/rhtml',
	robot:'ace/mode/robot',
	rst:'ace/mode/rst',
	ruby:'ace/mode/ruby',
	rust:'ace/mode/rust',
	sac:'ace/mode/sac',
	sass:'ace/mode/sass',
	scad:'ace/mode/scad',
	scala:'ace/mode/scala',
	scheme:'ace/mode/scheme',
	scrypt:'ace/mode/scrypt',
	scss:'ace/mode/scss',
	sh:'ace/mode/sh',
	sjs:'ace/mode/sjs',
	slim:'ace/mode/slim',
	smarty:'ace/mode/smarty',
	smithy:'ace/mode/smithy',
	snippets:'ace/mode/snippets',
	soy_template:'ace/mode/soy_template',
	space:'ace/mode/space',
	sparql:'ace/mode/sparql',
	sql:'ace/mode/sql',
	sqlserver:'ace/mode/sqlserver',
	stylus:'ace/mode/stylus',
	svg:'ace/mode/svg',
	swift:'ace/mode/swift',
	tcl:'ace/mode/tcl',
	terraform:'ace/mode/terraform',
	tex:'ace/mode/tex',
	text:'ace/mode/text',
	textile:'ace/mode/textile',
	toml:'ace/mode/toml',
	tsx:'ace/mode/tsx',
	turtle:'ace/mode/turtle',
	twig:'ace/mode/twig',
	typescript:'ace/mode/typescript',
	vala:'ace/mode/vala',
	vbscript:'ace/mode/vbscript',
	velocity:'ace/mode/velocity',
	verilog:'ace/mode/verilog',
	vhdl:'ace/mode/vhdl',
	visualforce:'ace/mode/visualforce',
	wollok:'ace/mode/wollok',
	xml:'ace/mode/xml',
	xquery:'ace/mode/xquery',
	yaml:'ace/mode/yaml',
	zeek:'ace/mode/zeek',
	django:'ace/mode/django',
};

export const AceThemes = {
	clouds: 'ace/theme/clouds',
	crimson_editor: 'ace/theme/crimson_editor',
	dawn: 'ace/theme/dawn',
	dreamweaver: 'ace/theme/dreamweaver',
	eclipse: 'ace/theme/eclipse',
	github: 'ace/theme/github',
	iplastic: 'ace/theme/iplastic',
	solarized_light: 'ace/theme/solarized_light',
	textmate: 'ace/theme/textmate',
	tomorrow: 'ace/theme/tomorrow',
	xcode: 'ace/theme/xcode',
	kuroir: 'ace/theme/kuroir',
	katzenmilch: 'ace/theme/katzenmilch',
	sqlserver: 'ace/theme/sqlserver',
	ambiance: 'ace/theme/ambiance',
	chaos: 'ace/theme/chaos',
	clouds_midnight: 'ace/theme/clouds_midnight',
	dracula: 'ace/theme/dracula',
	cobalt: 'ace/theme/cobalt',
	gruvbox: 'ace/theme/gruvbox',
	gob: 'ace/theme/gob',
	idle_fingers: 'ace/theme/idle_fingers',
	kr_theme: 'ace/theme/kr_theme',
	merbivore: 'ace/theme/merbivore',
	merbivore_soft: 'ace/theme/merbivore_soft',
	mono_industrial: 'ace/theme/mono_industrial',
	monokai: 'ace/theme/monokai',
	nord_dark: 'ace/theme/nord_dark',
	one_dark: 'ace/theme/one_dark',
	pastel_on_dark: 'ace/theme/pastel_on_dark',
	solarized_dark: 'ace/theme/solarized_dark',
	terminal: 'ace/theme/terminal',
	tomorrow_night: 'ace/theme/tomorrow_night',
	tomorrow_night_blue: 'ace/theme/tomorrow_night_blue',
	tomorrow_night_bright: 'ace/theme/tomorrow_night_bright',
	tomorrow_night_eighties: 'ace/theme/tomorrow_night_eighties',
	twilight: 'ace/theme/twilight',
	vibrant_ink: 'ace/theme/vibrant_ink'
}


export function removeTabs(code, {tabsCount = 0, tabSpace = 1, removeFirstLine = false, removeLastLine = false, addEmptyLine = false} = {}){
	if(tabsCount > 0){
		let tabs = '\t'.repeat(tabSpace).repeat(tabsCount);
		let spaces = ' '.repeat(tabSpace).repeat(tabsCount);
		let codeLines = code.split("\n");
		for(let i = 0; i < codeLines.length; i++){
			codeLines[i] = codeLines[i].replace(tabs, '');
			codeLines[i] = codeLines[i].replace(spaces, '');
		}
		if(removeFirstLine) codeLines.shift();
		if(removeLastLine) codeLines.pop();
		if(addEmptyLine) codeLines.push('');
		code = codeLines.join("\n");
	}
	return code;
}
