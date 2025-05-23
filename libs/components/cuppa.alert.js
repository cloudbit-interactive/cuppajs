/**
 * v0.0.4
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 *
 *  @tag cuppa-alert
 *  @attr {string} data-title - title to display
 *  @attr {string} message - message to display
 *  @attr {string} accept-text - text for accept button, if is '' then no button will be displayed
 *  @attr {string} cancel-text - text for cancel button, if is '' then no button will be displayed
 *  @attr {boolean} backdrop-enabled - enable backdrop, default is false
 *  @attr {string} input-text - text for input field, if is null then no input field will be displayed
 *  @attr {string} placeholder - placeholder for input field
 *  @prop {function} callback - callback function excecuted when alert is closed
 *  @event {CustomEvent} close - event fired when alert is closed
 *
 */

export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.binAll(this)}getPropertiesCallbacks(){let _entries=Object.entries(this);for(let i=0;i<_entries.length;i++){let[key,value]=_entries[i];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(key)&&this._callbacks.push({key:key,value:value})}}reSetPropertiesCallbacks(){for(let i=0;i<this._callbacks.length;i++){let{key:key,value:value}=this._callbacks[i];this[key]=value}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),setTimeout(()=>{this.mounted&&this.mounted(this),this.rendered&&this.rendered(this)},0)}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(args){Object.entries(args).map(([name,value])=>{this[`_${name}`]=value}),this.forceRender()}forceRender(callback,dispatchRender=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&dispatchRender&&this.rendered(this),this.renderedCount++}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}bind(element){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));for(let i=0;i<propertyNames.length;i++)if("function"==typeof element[propertyNames[i]]){if(this[propertyNames[i]])continue;this[propertyNames[i]]=element[propertyNames[i]].bind(element)}}observables(object,callback){let target=this,firstName;if(object){if(!Array.isArray(object))return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName];object.forEach(varName=>{this.observable(varName,this[varName])})}}observable(varName,defaultValue){return setTimeout(()=>{defaultValue&&void 0===this[varName]||(defaultValue=this[varName]),this.observables({[varName]:defaultValue})},0),defaultValue}}export function camelize(str){return(str=(str=(str=(str=(str=String(str)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(match,index){return 0==+match?"":0===index?match.toLowerCase():match.toUpperCase()}))}var t,e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{Al:()=>D,dy:()=>b,Jb:()=>C,Ld:()=>M,sY:()=>W,rx:()=>G,YP:()=>N});const s=window,n=s.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,h="?"+l,$=`<${h}>`,a=document,d=()=>a.createComment(""),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,_=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),u="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,f=/>/g,g=RegExp(`>|${u}(?:([^\\s"'>=/]+)(${u}*=${u}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,y=/"/g,x=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),b=H(1),N=H(2),C=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),w=new WeakMap,S=a.createTreeWalker(a,129,null,!1),T=(t,e)=>{const i=t.length-1,s=[];let n,h=2===e?"<svg>":"",a=v;for(let e=0;e<i;e++){const i=t[e];let o,d,A=-1,c=0;for(;c<i.length&&(a.lastIndex=c,d=a.exec(i),null!==d);)c=a.lastIndex,a===v?"!--"===d[1]?a=p:void 0!==d[1]?a=f:void 0!==d[2]?(x.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=g):void 0!==d[3]&&(a=g):a===g?">"===d[0]?(a=null!=n?n:v,A=-1):void 0===d[1]?A=-2:(A=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?g:'"'===d[3]?y:m):a===y||a===m?a=g:a===p||a===f?a=v:(a=g,n=void 0);const _=a===g&&t[e+1].startsWith("/>")?" ":"";h+=a===v?i+$:A>=0?(s.push(o),i.slice(0,A)+r+i.slice(A)+l+_):i+l+(-2===A?(s.push(void 0),e):_)}const d=h+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==o?o.createHTML(d):d,s]};class B{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,$=0;const a=t.length-1,A=this.parts,[c,_]=T(t,e);if(this.el=B.createElement(c,i),S.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=S.nextNode())&&A.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const i=_[$++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(i);A.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?j:E})}else A.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(x.test(s.tagName)){const t=s.textContent.split(l),e=t.length-1;if(e>0){s.textContent=n?n.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],d()),S.nextNode(),A.push({type:2,index:++o});s.append(t[e],d())}}}else if(8===s.nodeType)if(s.data===h)A.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(l,t+1));)A.push({type:7,index:o}),t+=l.length-1}o++}}static createElement(t,e){const i=a.createElement("template");return i.innerHTML=t,i}}function P(t,e,i=t,s){var n,o,r,l;if(e===C)return e;let h=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const $=A(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==$&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===$?h=void 0:(h=new $(t),h._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=h:i._$Cl=h),void 0!==h&&(e=P(t,h._$AS(t,e.values),h,s)),e}class I{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:a).importNode(i,!0);S.currentNode=n;let o=S.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new U(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new O(o,this,t)),this._$AV.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=S.nextNode(),r++)}return n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{constructor(t,e,i,s){var n;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),A(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==C&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):_(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==M&&A(this._$AH)?this._$AA.nextSibling.data=t:this.$(a.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=B.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new I(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=w.get(t.strings);return void 0===e&&w.set(t.strings,e=new B(t)),e}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new U(this.k(d()),this.k(d()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class E{constructor(t,e,i,s,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=P(this,t,e,0),o=!A(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=P(this,s[i+r],e,r),l===C&&(l=this._$AH[r]),o||(o=!A(l)||l!==this._$AH[r]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const k=n?n.emptyScript:"";class R extends E{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class j extends E{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=P(this,t,e,0))&&void 0!==i?i:M)===C)return;const s=this._$AH,n=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==M&&(s===M||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class O{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const D={O:r,P:l,A:h,C:1,M:T,L:I,D:_,R:P,I:U,V:E,H:R,N:j,U:L,F:O},V=s.litHtmlPolyfillSupport;null==V||V(B,U),(null!==(t=s.litHtmlVersions)&&void 0!==t?t:s.litHtmlVersions=[]).push("2.7.2");const W=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new U(e.insertBefore(d(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r},{I:Y}=D,z=()=>document.createComment(""),J=(t,e,i)=>{var s;const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(z(),o),s=n.insertBefore(z(),o);i=new Y(e,s,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,l=r!==t;if(l){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==o||l){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},Z=(t,e,i=t)=>(t._$AI(e,i),t),F={},Q=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},q=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},G=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let r=0;for(const e of t)n[r]=s?s(e,r):r,o[r]=i(e,r),r++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){var n;const o=(t=>t._$AH)(t),{values:r,keys:l}=this.dt(e,i,s);if(!Array.isArray(o))return this.ht=l,r;const h=null!==(n=this.ht)&&void 0!==n?n:this.ht=[],$=[];let a,d,A=0,c=o.length-1,_=0,u=r.length-1;for(;A<=c&&_<=u;)if(null===o[A])A++;else if(null===o[c])c--;else if(h[A]===l[_])$[_]=Z(o[A],r[_]),A++,_++;else if(h[c]===l[u])$[u]=Z(o[c],r[u]),c--,u--;else if(h[A]===l[u])$[u]=Z(o[A],r[u]),J(t,$[u+1],o[A]),A++,u--;else if(h[c]===l[_])$[_]=Z(o[c],r[_]),J(t,o[A],o[c]),c--,_++;else if(void 0===a&&(a=q(l,_,u),d=q(h,A,c)),a.has(h[A]))if(a.has(h[c])){const e=d.get(l[_]),i=void 0!==e?o[e]:null;if(null===i){const e=J(t,o[A]);Z(e,r[_]),$[_]=e}else $[_]=Z(i,r[_]),J(t,o[A],i),o[e]=null;_++}else Q(o[c]),c--;else Q(o[A]),A++;for(;_<=u;){const e=J(t,$[u+1]);Z(e,r[_]),$[_++]=e}for(;A<=c;){const t=o[A++];null!==t&&Q(t)}return this.ht=l,((t,e=F)=>{t._$AH=e})(t,$),C}});var K=i.Al,X=i.dy,tt=i.Jb,et=i.Ld,it=i.sY,st=i.rx,nt=i.YP;export{K as _$LH,X as html,tt as noChange,et as nothing,it as render,st as repeat,nt as svg};let $LH=K,html=X,noChange=tt,nothing=et,render=it,repeat=st,svg=nt;

export class CuppaAlert extends CuppaComponent {
	dataTitle = "";
	message = "";
	acceptText = "Accept";
	cancelText = "";
	backdropEnabled = false;
	inputText = null;
	placeholder = "";
	callback = null;
	value = false;
	classModal = "";
	styleModal = ""

	constructor() {
		super();
		this.onclick = ()=>{
			if(this.backdropEnabled === true || this.backdropEnabled === "true"){
				this.onClick(false);
			}
		}
	}

	mounted(){ this.addChilds(); }

	static get observedAttributes() { return ['data-title', 'message', 'accept-text', 'cancel-text', 'backdrop-enabled', 'input-text', 'placeholder', 'class-modal', 'style-modal'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(newVal === 'false') newVal = false;
		if(newVal === 'true') newVal = true;
		this[camelize(attr)] = newVal;
	}

	onClick(value){
		this.value = value;
		let data = {value, inputText: this.inputText};
		this.dispatchEvent(new CustomEvent("close", {detail:data}));
		if(this.callback) this.callback(data, this);
		this.close();
	}

	close(){
		try{
			this.parentNode.removeChild(this);
		}catch(err){}
	}

	addChilds(){
		let childs = this.querySelectorAll("cuppa-alert-content");
		if(childs.length){
			childs.forEach(child => { this.refs.contentWrap.append(child); });
		}
		let closeAlertButtons = this.querySelectorAll('.close-alert');
		if(closeAlertButtons.length){
			closeAlertButtons.forEach(button => { button.addEventListener('click', this.close); });
		}
	}

	render(){
		return html`
      <div class="cuppa-alert_blockade"></div>
      <div ref="contentWrap" class=${`cuppa-alert_modal ${this.classModal}`} style="${this.styleModal}" @click=${e => e.stopPropagation()}>
        ${!this.dataTitle ? '' : html`<div class="cuppa-alert_title">${html`${this.dataTitle}`}</div>`}
        ${!this.message ? '' : html`<div class="cuppa-alert_message">${html`${this.message}`}</div>`}
        ${this.inputText == undefined ? '' : html`
          <input
            class="cuppa-alert_input"
            value="${this.inputText}"
            @input=${e => this.inputText = e.currentTarget.value}
            placeholder="${this.placeholder}"
          />
        `}
        ${this.cancelText || this.acceptText ? html`
          <div class="cuppa-alert_buttons">
            ${!this.cancelText ? '' : html`
              <button  @click=${() => this.onClick(false)} class="cuppa-alert_button cuppa-alert_button-cancel">
                ${html`${this.cancelText}`}
              </button>
            `}
            ${!this.acceptText ? '' : html`
              <button @click=${() => this.onClick(true)} class="cuppa-alert_button cuppa-alert_button-accept">
                ${html`${this.acceptText}`}
              </button>
            `}
          </div>
        ` : ''}
      </div>
      <style>
        :root {
          --cuppa-alert-backdrop-bg: rgba(0, 0, 0, 0.5);
          --cuppa-alert-bg: #fff;
          --cuppa-alert-color: #333;
          --cuppa-alert-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
          --cuppa-alert-input-bg: #FFF;
          --cuppa-alert-input-color: #333;
          --cuppa-alert-input-border: 1px solid #CCC;
          --cuppa-alert-button-bg: #0072f5;
          --cuppa-alert-button-bg-hover: #1a62c1;
          --cuppa-alert-button-color: #FFF;
          --cuppa-alert-button-cancel-bg: #CCC;
          --cuppa-alert-button-cancel-bg-hover: #A0A0A0;
          --cuppa-alert-button-cancel-color: #333;
          --cuppa-alert-close-color: #ff4243;
          --cuppa-alert-close-color-hover: #b01516;
        }

        cuppa-alert[theme=dark] {
          color-scheme: dark;
          --cuppa-alert-bg: #16181a;
          --cuppa-alert-color: #fff;
          --cuppa-alert-input-bg: #16181a;
          --cuppa-alert-input-color: #fff;
          --cuppa-alert-input-border: 1px solid #444;
          --cuppa-alert-button-cancel-bg: transparent;
          --cuppa-alert-button-cancel-bg-hover: #111113;
          --cuppa-alert-button-cancel-color: #fff;
        }

        html, body {
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: none;
          -webkit-overflow-scrolling: auto;
        }

        cuppa-alert, cuppa-alert * {
          box-sizing: border-box;
        }

        cuppa-alert {
          animation-name: cuppa_alert_animation;
          animation-duration: 0.2s;
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          overflow: auto;
          background: var(--cuppa-alert-backdrop-bg);
          z-index: 9999;
        }

        .cuppa-alert_modal {
          background: var(--cuppa-alert-bg);
          color: var(--cuppa-alert-color);
          box-shadow: var(--cuppa-alert-shadow);
          margin: auto;
          position: relative;
          width: 100%;
          max-width: 500px;
          padding: 25px 35px;
          overflow: hidden;
          border-radius: 5px;
        }

        .cuppa-alert_modal:has(cuppa-alert-content){
          padding: 0;;
        }

        .cuppa-alert_title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 10px;
        }

        .cuppa-alert_input {
          background: var(--cuppa-alert-input-bg);
          color: var(--cuppa-alert-input-color);
          border: var(--cuppa-alert-input-border);
          width: 100%;
          height: 32px;
          width: 100%;
          margin: 10px 0 0;
          border-radius: 3px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          padding: 0 10px;
          font-weight: 500;
        }

        .cuppa-alert_buttons {
          margin: 15px 0 0;
          display: flex;
          justify-content: flex-end;
        }

        .cuppa-alert_button {
          background: var(--cuppa-alert-button-bg);
          color: var(--cuppa-alert-button-color);
          transition: 0.3s background-color;
          border: none;
          cursor: pointer;
          height: 36px;
          padding: 0 15px;
          margin: 0 0 0 6px;
          border-radius: 3px;
        }

        .cuppa-alert_button:hover {
          background: var(--cuppa-alert-button-bg-hover);
        }

        .cuppa-alert_button-cancel {
          background: var(--cuppa-alert-button-cancel-bg);
          color: var(--cuppa-alert-button-cancel-color);
        }

        .cuppa-alert_button-cancel:hover {
          background: var(--cuppa-alert-button-cancel-bg-hover);
        }

        .cuppa-alert_modal cuppa-alert-content {
          display: block;
        }

        @keyframes cuppa_alert_animation {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      </style>
		`
	}
};

customElements.define('cuppa-alert', CuppaAlert);
document.defaultView.CuppaAlert = CuppaAlert;
