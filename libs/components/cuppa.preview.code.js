/*! v0.0.9 */
import * as ace from 'https://cdn.jsdelivr.net/npm/ace-builds@1.15.2/src-min-noconflict/ace.min.js';
/*! v0.0.9 */
export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.applyObservables=this.applyObservables.bind(this),this.applyObservables(),this.binAll(this)}static get observedAttributes(){return this.attributes||[]}attributeChangedCallback(e,t,s){t!==s&&("false"===s&&(s=!1),"true"===s&&(s=!0),this[camelize(e)]=s)}applyObservables(){this.constructor.observables&&setTimeout((()=>{let e={};for(let t=0;t<this.constructor.observables.length;t++){let s=this.constructor.observables[t];e[s]=this[s]}this.observables(e),this.forceRender()}),0)}getPropertiesCallbacks(){let e=Object.entries(this);for(let t=0;t<e.length;t++){let[s,i]=e[t];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(s)&&this._callbacks.push({key:s,value:i})}}reSetPropertiesCallbacks(){for(let e=0;e<this._callbacks.length;e++){let{key:t,value:s}=this._callbacks[e];this[t]=s}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),this.rendered&&this.rendered(this.renderedCount,this),setTimeout((()=>{this.applyStylesAfterRender(),this.mounted&&this.mounted(this)}),0)}applyStylesAfterRender(){const e=this.getAttribute("style-after-render");if(e)for(const t of e.split(";")){const[e,s]=t.split(":");e&&s&&(this.style[e.trim()]=s.trim())}}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(e){Object.entries(e).map((([e,t])=>{this[`${e}`]=t})),this.forceRender()}forceRender(e=null,t=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),e&&e(),this.renderedCount++,this.firstRendered&&1===this.renderedCount&&this.firstRendered(this.renderedCount,this),this.rendered&&t&&this.rendered(this.renderedCount,this)}processRefs(e,t,s){s||(s="id");let i={},r=Array.from(e.querySelectorAll(`[${s}]`));for(let e=0;e<r.length;e++)t?t[r[e].getAttribute(s)]=r[e]:i[r[e].getAttribute(s)]=r[e];return t?t.rootHtml=e:i.rootHtml=e,i}binAll(e,t){let s=Object.getOwnPropertyNames(Object.getPrototypeOf(e));t&&(s=Object.keys(e));for(let t=0;t<s.length;t++)"constructor"!==s[t]&&"function"==typeof e[s[t]]&&(e[s[t]]=e[s[t]].bind(e))}bind(e){let t=Object.getOwnPropertyNames(Object.getPrototypeOf(e));for(let s=0;s<t.length;s++)if("function"==typeof e[t[s]]){if(this[t[s]])continue;this[t[s]]=e[t[s]].bind(e)}}observables(e,t){let s,i=this;if(e){if(!Array.isArray(e))return Object.keys(e).map(((r,n)=>{n||(s=r);let o=e[r],h="_"+r;i[h]=o,Object.defineProperty(i,r,{set:e=>{i[h]=e,i.forceRender&&i.forceRender(),t&&t()},get:()=>i[h],configurable:!0})})),i[s];e.forEach((e=>{this.observable(e,this[e])}))}}observable(e,t){return setTimeout((()=>{t&&void 0===this[e]||(t=this[e]),this.observables({[e]:t})}),0),t}}export function camelize(e){return(e=(e=(e=(e=(e=String(e)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(e,t){return 0==+e?"":0===t?e.toLowerCase():e.toUpperCase()}))}const t=globalThis,i=t.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:e=>e}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+h,n=`<${o}>`,r=document,l=()=>r.createComment(""),c=e=>null===e||"object"!=typeof e&&"function"!=typeof e,a=Array.isArray,u=e=>a(e)||"function"==typeof e?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),x=y(1),b=y(2),w=y(3),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(e,t){if(!a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(t):t}const V=(t,s)=>{const i=t.length-1,r=[];let o,l=2===s?"<svg>":3===s?"<math>":"",c=f;for(let s=0;s<i;s++){const i=t[s];let a,d,u=-1,A=0;for(;A<i.length&&(c.lastIndex=A,d=c.exec(i),null!==d);)A=c.lastIndex,c===f?"!--"===d[1]?c=v:void 0!==d[1]?c=_:void 0!==d[2]?($.test(d[2])&&(o=RegExp("</"+d[2],"g")),c=m):void 0!==d[3]&&(c=m):c===m?">"===d[0]?(c=o??f,u=-1):void 0===d[1]?u=-2:(u=c.lastIndex-d[2].length,a=d[1],c=void 0===d[3]?m:'"'===d[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,o=void 0);const b=c===m&&t[s+1].startsWith("/>")?" ":"";l+=c===f?i+n:u>=0?(r.push(a),i.slice(0,u)+e+i.slice(u)+h+b):i+h+(-2===u?s:b)}return[P(t,l+(t[i]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),r]};class N{constructor({strings:t,_$litType$:s},r){let n;this.parts=[];let c=0,a=0;const _=t.length-1,d=this.parts,[p,u]=V(t,s);if(this.el=N.createElement(p,r),C.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=C.nextNode())&&d.length<_;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(e)){const e=u[a++],s=n.getAttribute(t).split(h),i=/([.?@])?(.*)/.exec(e);d.push({type:1,index:c,name:i[2],strings:s,ctor:"."===i[1]?H:"?"===i[1]?I:"@"===i[1]?L:k}),n.removeAttribute(t)}else t.startsWith(h)&&(d.push({type:6,index:c}),n.removeAttribute(t));if($.test(n.tagName)){const e=n.textContent.split(h),t=e.length-1;if(t>0){n.textContent=i?i.emptyScript:"";for(let s=0;s<t;s++)n.append(e[s],l()),C.nextNode(),d.push({type:2,index:++c});n.append(e[t],l())}}}else if(8===n.nodeType)if(n.data===o)d.push({type:2,index:c});else{let e=-1;for(;-1!==(e=n.data.indexOf(h,e+1));)d.push({type:7,index:c}),e+=h.length-1}c++}}static createElement(e,t){const s=r.createElement("template");return s.innerHTML=e,s}}function S(e,t,s=e,i){if(t===T)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=c(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=S(e,r._$AS(e,t.values),r,i)),t}class M{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??r).importNode(t,!0);C.currentNode=i;let n=C.nextNode(),o=0,h=0,l=s[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new R(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new z(n,this,e)),this._$AV.push(t),l=s[++h]}o!==l?.index&&(n=C.nextNode(),o++)}return C.currentNode=r,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),c(e)?e===E||null==e||""===e?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==T&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):u(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=e:this.T(r.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new M(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=A.get(e.strings);return void 0===t&&A.set(e.strings,t=new N(e)),t}k(e){a(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E}_$AI(e,t=this,s,i){const r=this.strings;let n=!1;if(void 0===r)e=S(this,e,t,0),n=!c(e)||e!==this._$AH&&e!==T,n&&(this._$AH=e);else{const i=e;let o,h;for(e=r[0],o=0;o<r.length-1;o++)h=S(this,i[s+o],t,o),h===T&&(h=this._$AH[o]),n||=!c(h)||h!==this._$AH[o],h===E?e=E:e!==E&&(e+=(h??"")+r[o+1]),this._$AH[o]=h}n&&!i&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class H extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}}class I extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}}class L extends k{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??E)===T)return;const s=this._$AH,i=e===E&&s!==E||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==E&&(s===E||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class z{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const Z={M:e,P:h,A:o,C:1,L:V,R:M,D:u,V:S,I:R,H:k,N:I,U:L,B:H,F:z},j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new R(t.insertBefore(l(),e),e,void 0,s??{})}return r._$AI(e),r},directive_t_CHILD=2,directive_e=e=>(...t)=>({_$litDirective$:e,values:t});class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:directive_helpers_t}=Z,directive_helpers_r=()=>document.createComment(""),directive_helpers_s=(e,t,s)=>{const i=e._$AA.parentNode,r=void 0===t?e._$AB:t._$AA;if(void 0===s){const t=i.insertBefore(directive_helpers_r(),r),n=i.insertBefore(directive_helpers_r(),r);s=new directive_helpers_t(t,n,e,e.options)}else{const t=s._$AB.nextSibling,n=s._$AM,o=n!==e;if(o){let t;s._$AQ?.(e),s._$AM=e,void 0!==s._$AP&&(t=e._$AU)!==n._$AU&&s._$AP(t)}if(t!==r||o){let e=s._$AA;for(;e!==t;){const t=e.nextSibling;i.insertBefore(e,r),e=t}}}return s},directive_helpers_v=(e,t,s=e)=>(e._$AI(t,s),e),directive_helpers_u={},directive_helpers_M=e=>{e._$AR(),e._$AA.remove()},repeat_u=(e,t,s)=>{const i=new Map;for(let r=t;r<=s;r++)i.set(e[r],r);return i},repeat_c=directive_e(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,s){let i;void 0===s?s=t:void 0!==t&&(i=t);const r=[],n=[];let o=0;for(const t of e)r[o]=i?i(t,o):o,n[o]=s(t,o),o++;return{values:n,keys:r}}render(e,t,s){return this.dt(e,t,s).values}update(e,[t,s,i]){const r=(e=>e._$AH)(e),{values:n,keys:o}=this.dt(t,s,i);if(!Array.isArray(r))return this.ut=o,n;const h=this.ut??=[],l=[];let c,a,_=0,d=r.length-1,p=0,u=n.length-1;for(;_<=d&&p<=u;)if(null===r[_])_++;else if(null===r[d])d--;else if(h[_]===o[p])l[p]=directive_helpers_v(r[_],n[p]),_++,p++;else if(h[d]===o[u])l[u]=directive_helpers_v(r[d],n[u]),d--,u--;else if(h[_]===o[u])l[u]=directive_helpers_v(r[_],n[u]),directive_helpers_s(e,l[u+1],r[_]),_++,u--;else if(h[d]===o[p])l[p]=directive_helpers_v(r[d],n[p]),directive_helpers_s(e,r[_],r[d]),d--,p++;else if(void 0===c&&(c=repeat_u(o,p,u),a=repeat_u(h,_,d)),c.has(h[_]))if(c.has(h[d])){const t=a.get(o[p]),s=void 0!==t?r[t]:null;if(null===s){const t=directive_helpers_s(e,r[_]);directive_helpers_v(t,n[p]),l[p]=t}else l[p]=directive_helpers_v(s,n[p]),directive_helpers_s(e,r[_],s),r[t]=null;p++}else directive_helpers_M(r[d]),d--;else directive_helpers_M(r[_]),_++;for(;p<=u;){const t=directive_helpers_s(e,l[u+1]);directive_helpers_v(t,n[p]),l[p++]=t}for(;_<=d;){const e=r[_++];null!==e&&directive_helpers_M(e)}return this.ut=o,((e,t=directive_helpers_u)=>{e._$AH=t})(e,l),T}});class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=E,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===E||null==e)return this._t=void 0,this.it=e;if(e===T)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;const unsafe_html_o=directive_e(unsafe_html_e);export{unsafe_html_e as UnsafeHTMLDirective,Z as _$LH,x as html,w as mathml,T as noChange,E as nothing,B as render,repeat_c as repeat,b as svg,unsafe_html_o as unsafeHTML};let $LH=unsafe_html_e,html=x,noChange=T,nothing=A,render=B,repeat=repeat_c,svg=b,unsafeHTML=unsafe_html_o;

export class CuppaPreviewCode extends CuppaComponent {
	static attributes = ['mode', 'ace-theme', 'content', 'preview', 'height', 'preview-height', 'preview-width', 'disabled', 'expandable', 'show-tools-bar', 'remove-tabs', 'preview-css', 'preview-html'];
	static observables = ['content', 'mode', 'aceTheme', 'preview', 'height', 'previewWidth', 'previewHeight', 'disabled', 'expandable', 'showToolsBar', 'removeTabs', 'previewCss', 'previewHtml'];
	content;
	mode = AceModes.html;
	aceTheme = AceThemes.tomorrow_night;
	preview = true;
	height = '200px';
	previewWidth = 'auto';
	previewHeight = '200px';
	disabled = false;
	expandable = true;
	showToolsBar = true
	removeTabs = 0;
	previewCss = '';
	previewHtml = '';
	editor;
	tmpHeight;

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
		this.editor?.setValue(content);
		this.editor?.clearSelection();
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
		if(!this.editor) return;
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
