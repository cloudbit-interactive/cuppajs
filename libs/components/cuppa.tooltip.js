/**
 * v0.0.7
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.binAll(this)}getPropertiesCallbacks(){let _entries=Object.entries(this);for(let i=0;i<_entries.length;i++){let[key,value]=_entries[i];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(key)&&this._callbacks.push({key:key,value:value})}}reSetPropertiesCallbacks(){for(let i=0;i<this._callbacks.length;i++){let{key:key,value:value}=this._callbacks[i];this[key]=value}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),setTimeout(()=>{this.mounted&&this.mounted(this),this.rendered&&this.rendered(this)},0)}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(args){Object.entries(args).map(([name,value])=>{this[`_${name}`]=value}),this.forceRender()}forceRender(callback,dispatchRender=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&dispatchRender&&this.rendered(this),this.renderedCount++}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}bind(element){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));for(let i=0;i<propertyNames.length;i++)if("function"==typeof element[propertyNames[i]]){if(this[propertyNames[i]])continue;this[propertyNames[i]]=element[propertyNames[i]].bind(element)}}observables(object,callback){let target=this,firstName;if(object){if(!Array.isArray(object))return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName];object.forEach(varName=>{this.observable(varName,this[varName])})}}observable(varName,defaultValue){return setTimeout(()=>{defaultValue&&void 0===this[varName]||(defaultValue=this[varName]),this.observables({[varName]:defaultValue})},0),defaultValue}}export function camelize(str){return(str=(str=(str=(str=(str=String(str)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(match,index){return 0==+match?"":0===index?match.toLowerCase():match.toUpperCase()}))}var t,e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{Al:()=>D,dy:()=>b,Jb:()=>C,Ld:()=>M,sY:()=>W,rx:()=>G,YP:()=>N});const s=window,n=s.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,h="?"+l,$=`<${h}>`,a=document,d=()=>a.createComment(""),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,_=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),u="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,f=/>/g,g=RegExp(`>|${u}(?:([^\\s"'>=/]+)(${u}*=${u}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,y=/"/g,x=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),b=H(1),N=H(2),C=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),w=new WeakMap,S=a.createTreeWalker(a,129,null,!1),T=(t,e)=>{const i=t.length-1,s=[];let n,h=2===e?"<svg>":"",a=v;for(let e=0;e<i;e++){const i=t[e];let o,d,A=-1,c=0;for(;c<i.length&&(a.lastIndex=c,d=a.exec(i),null!==d);)c=a.lastIndex,a===v?"!--"===d[1]?a=p:void 0!==d[1]?a=f:void 0!==d[2]?(x.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=g):void 0!==d[3]&&(a=g):a===g?">"===d[0]?(a=null!=n?n:v,A=-1):void 0===d[1]?A=-2:(A=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?g:'"'===d[3]?y:m):a===y||a===m?a=g:a===p||a===f?a=v:(a=g,n=void 0);const _=a===g&&t[e+1].startsWith("/>")?" ":"";h+=a===v?i+$:A>=0?(s.push(o),i.slice(0,A)+r+i.slice(A)+l+_):i+l+(-2===A?(s.push(void 0),e):_)}const d=h+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==o?o.createHTML(d):d,s]};class B{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,$=0;const a=t.length-1,A=this.parts,[c,_]=T(t,e);if(this.el=B.createElement(c,i),S.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=S.nextNode())&&A.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const i=_[$++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(i);A.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?j:E})}else A.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(x.test(s.tagName)){const t=s.textContent.split(l),e=t.length-1;if(e>0){s.textContent=n?n.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],d()),S.nextNode(),A.push({type:2,index:++o});s.append(t[e],d())}}}else if(8===s.nodeType)if(s.data===h)A.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(l,t+1));)A.push({type:7,index:o}),t+=l.length-1}o++}}static createElement(t,e){const i=a.createElement("template");return i.innerHTML=t,i}}function P(t,e,i=t,s){var n,o,r,l;if(e===C)return e;let h=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const $=A(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==$&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===$?h=void 0:(h=new $(t),h._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=h:i._$Cl=h),void 0!==h&&(e=P(t,h._$AS(t,e.values),h,s)),e}class I{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:a).importNode(i,!0);S.currentNode=n;let o=S.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new U(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new O(o,this,t)),this._$AV.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=S.nextNode(),r++)}return n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{constructor(t,e,i,s){var n;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),A(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==C&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):_(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==M&&A(this._$AH)?this._$AA.nextSibling.data=t:this.$(a.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=B.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new I(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=w.get(t.strings);return void 0===e&&w.set(t.strings,e=new B(t)),e}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new U(this.k(d()),this.k(d()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class E{constructor(t,e,i,s,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=P(this,t,e,0),o=!A(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=P(this,s[i+r],e,r),l===C&&(l=this._$AH[r]),o||(o=!A(l)||l!==this._$AH[r]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const k=n?n.emptyScript:"";class R extends E{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class j extends E{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=P(this,t,e,0))&&void 0!==i?i:M)===C)return;const s=this._$AH,n=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==M&&(s===M||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class O{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const D={O:r,P:l,A:h,C:1,M:T,L:I,D:_,R:P,I:U,V:E,H:R,N:j,U:L,F:O},V=s.litHtmlPolyfillSupport;null==V||V(B,U),(null!==(t=s.litHtmlVersions)&&void 0!==t?t:s.litHtmlVersions=[]).push("2.7.2");const W=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new U(e.insertBefore(d(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r},{I:Y}=D,z=()=>document.createComment(""),J=(t,e,i)=>{var s;const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(z(),o),s=n.insertBefore(z(),o);i=new Y(e,s,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,l=r!==t;if(l){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==o||l){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},Z=(t,e,i=t)=>(t._$AI(e,i),t),F={},Q=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},q=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},G=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let r=0;for(const e of t)n[r]=s?s(e,r):r,o[r]=i(e,r),r++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){var n;const o=(t=>t._$AH)(t),{values:r,keys:l}=this.dt(e,i,s);if(!Array.isArray(o))return this.ht=l,r;const h=null!==(n=this.ht)&&void 0!==n?n:this.ht=[],$=[];let a,d,A=0,c=o.length-1,_=0,u=r.length-1;for(;A<=c&&_<=u;)if(null===o[A])A++;else if(null===o[c])c--;else if(h[A]===l[_])$[_]=Z(o[A],r[_]),A++,_++;else if(h[c]===l[u])$[u]=Z(o[c],r[u]),c--,u--;else if(h[A]===l[u])$[u]=Z(o[A],r[u]),J(t,$[u+1],o[A]),A++,u--;else if(h[c]===l[_])$[_]=Z(o[c],r[_]),J(t,o[A],o[c]),c--,_++;else if(void 0===a&&(a=q(l,_,u),d=q(h,A,c)),a.has(h[A]))if(a.has(h[c])){const e=d.get(l[_]),i=void 0!==e?o[e]:null;if(null===i){const e=J(t,o[A]);Z(e,r[_]),$[_]=e}else $[_]=Z(i,r[_]),J(t,o[A],i),o[e]=null;_++}else Q(o[c]),c--;else Q(o[A]),A++;for(;_<=u;){const e=J(t,$[u+1]);Z(e,r[_]),$[_++]=e}for(;A<=c;){const t=o[A++];null!==t&&Q(t)}return this.ht=l,((t,e=F)=>{t._$AH=e})(t,$),C}});var K=i.Al,X=i.dy,tt=i.Jb,et=i.Ld,it=i.sY,st=i.rx,nt=i.YP;export{K as _$LH,X as html,tt as noChange,et as nothing,it as render,st as repeat,nt as svg};let $LH=K,html=X,noChange=tt,nothing=et,render=it,repeat=st,svg=nt;

export class CuppaTooltip extends CuppaComponent {
	static POSITION = {CENTER:"CENTER", LEFT:"LEFT", LEFT_IN:"LEFT_IN", RIGHT:"RIGHT", RIGHT_IN:"RIGHT_IN", TOP:"TOP", TOP_IN:"TOP_IN", BOTTOM:"BOTTOM", BOTTOM_IN:"BOTTOM_IN"}
	static ARROW = {UP:"UP", LEFT:"LEFT", RIGHT:"RIGHT", DOWN:"DOWN", NONE:"NONE"}
	text = this.observable('text', '')
	posX = this.observable('posX', CuppaTooltip.POSITION.CENTER);
	posY = this.observable('posY', CuppaTooltip.POSITION.BOTTOM);
	arrow = this.observable('arrow', CuppaTooltip.ARROW.UP);
	styleArrow = '';
	target;
	targetElement;
	forceShow = false;

	static get observedAttributes() { return ['target', 'text', 'pos-x', 'pos-y', 'arrow', 'style-arrow', 'force-show'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(attr == 'force-show' && newVal == "true") newVal = true;
		if(attr == 'force-show' && newVal == "false") newVal = false;
		this[camelize(attr)] = newVal;
	}

	mounted(){
		if(this.target) this.targetElement = document.querySelector(this.target);
		if(this.forceShow){
			this.show();
		}else{
			this.registerEvents(true);
		}
	}

	registerEvents(value = true){
		if(!this.targetElement) return;
		if(value){
			this.targetElement.addEventListener("click", this.onMouseEnter);
			this.targetElement.addEventListener("mouseenter", this.onMouseEnter);
			this.targetElement.addEventListener("focus", this.onMouseEnter);
			this.targetElement.addEventListener("mouseleave", this.onMouseLeave);
			this.targetElement.addEventListener("blur", this.onMouseLeave);
		}else{
			try{
				this.targetElement.removeEventListener("click", this.onMouseEnter);
				this.targetElement.removeEventListener("mouseenter", this.onMouseEnter);
				this.targetElement.removeEventListener("focus", this.onMouseEnter);
				this.targetElement.removeEventListener("mouseleave", this.onMouseLeave);
				this.targetElement.removeEventListener("blur", this.onMouseLeave);
			}catch(err){ }
		}
	}

	onMouseEnter(e){ this.show(); }

	show(autoAdjust = true){
		if(!this.targetElement) return;
		let dimTarget = this.targetElement.getBoundingClientRect();
		let dim = this.getBoundingClientRect();
		// x
		let posX = this.posX.toUpperCase();
		if(posX === CuppaTooltip.POSITION.CENTER){
			this.style.left = `${dimTarget.x + (dimTarget.width-dim.width)*0.5}px`;
		}else if(posX === CuppaTooltip.POSITION.LEFT){
			this.style.left = `${dimTarget.x - dim.width - 5}px`;
		}else if(posX === CuppaTooltip.POSITION.LEFT_IN){
			this.style.left = `${dimTarget.x}px`;
		}else if(posX === CuppaTooltip.POSITION.RIGHT){
			this.style.left = `${dimTarget.x + dimTarget.width + 5}px`;
		}else if(posX === CuppaTooltip.POSITION.RIGHT_IN){
			this.style.left = `${dimTarget.x + dimTarget.width -  dim.width}px`;
		}
		// y
		let posY = this.posY.toUpperCase();
		if(posY === CuppaTooltip.POSITION.CENTER){
			this.style.top = `${dimTarget.y + (dimTarget.height-dim.height)*0.5}px`;
		}else if(posY === CuppaTooltip.POSITION.TOP){
			this.style.top = `${dimTarget.y - dim.height - 5}px`;
		}else if(posY === CuppaTooltip.POSITION.TOP_IN){
			this.style.top = `${dimTarget.y}px`;
		}else if(posY === CuppaTooltip.POSITION.BOTTOM){
			this.style.top = `${dimTarget.y + dimTarget.height + 5}px`;
		}else if(posY === CuppaTooltip.POSITION.BOTTOM_IN){
			this.style.top = `${dimTarget.y+dimTarget.height-dim.height}px`;
		}
		if(autoAdjust) this.autoAdjust();
		this.classList.add("show");
	}

	autoAdjust(){
		let dimTarget = this.targetElement.getBoundingClientRect();
		let dim = this.getBoundingClientRect();
		let gap = 20;
		if(dim.x < 0){
			this.posX = CuppaTooltip.POSITION.LEFT_IN;
		}else if(dim.x + dim.width + gap > window.innerWidth){
			this.posX = CuppaTooltip.POSITION.RIGHT_IN;
			if(this.refs.arrow){
				let arrowDim = this.refs.arrow.getBoundingClientRect();
				this.refs.arrow.style.left = `calc(100% - ${dimTarget.width*0.5+arrowDim.width*0.5}px)`;
			}
		}

		if(dim.y < 0){
			this.posY = CuppaTooltip.POSITION.BOTTOM;
		}else if(dim.y + dim.height + gap > window.innerHeight){
			this.posY = CuppaTooltip.POSITION.TOP;
			this.arrow = CuppaTooltip.ARROW.DOWN;
		}

		this.show(false);
	}

	setText(text){
		this.text = text;
	}

	onMouseLeave(e){
		this.classList.remove("show");
	}

	unmounted(){
		this.registerEvents(false)
	}

	render(){
		return html`
      ${this.arrow === "" || this.arrow.toUpperCase() === CuppaTooltip.ARROW.NONE ? `` : html`
        <svg ref="arrow" class="cuppa-tooltip_arrow ${this.arrow.toLowerCase()}" width="10" height="5" viewBox="0 0 18 9" preserveAspectRatio="none" style="${this.styleArrow}" >
          <path data-name="Icon ionic-md-arrow-dropup" d="M9,22.5l9-9,9,9Z" transform="translate(-9 -13.5)"/>
        </svg>
      `}
      ${this.text ? html`${this.text}` : ``}
      <style>
        :root {
	        --cuppa-tooltip-bg:#eee;
          --cuppa-tooltip-color:#333;
	        --cuppa-tooltip-arrow-filter:invert(99%) sepia(5%) saturate(63%) hue-rotate(235deg) brightness(114%) contrast(87%);
        }
        cuppa-tooltip[theme=dark] {
          color-scheme: dark;
          --cuppa-tooltip-bg:#000;
          --cuppa-tooltip-color:#fff;
          --cuppa-tooltip-arrow-filter:invert(0%) sepia(27%) saturate(6198%) hue-rotate(185deg) brightness(79%) contrast(106%);
        }
        cuppa-tooltip{ 
	        transition: 0.3s opacity; 
	        opacity: 0;
	        visibility: hidden;
	        position: fixed;
	        top:0; 
	        left:0;
	        background: var(--cuppa-tooltip-bg); 
	        color:var(--cuppa-tooltip-color);
	        padding:5px 8px; 
	        font-size: 14px; 
	        border-radius: 3px; 
	        pointer-events: none; 
	        z-index: 999; 
	        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        cuppa-tooltip.show{ transition: 0.3s opacity; opacity: 1 !important; visibility: visible !important; }
        cuppa-tooltip .cuppa-tooltip_arrow{ position: absolute; filter:var(--cuppa-tooltip-arrow-filter); }
        cuppa-tooltip .cuppa-tooltip_arrow.up{ top:-4px; left:calc(50% - 5px); }
        cuppa-tooltip .cuppa-tooltip_arrow.left{ transform: rotate(-90deg); top:calc(50% - 3px); left:-7px; }
        cuppa-tooltip .cuppa-tooltip_arrow.right{ transform: rotate(90deg); top:calc(50% - 3px); right:-7px; }
        cuppa-tooltip .cuppa-tooltip_arrow.down{ transform: rotate(180deg); bottom: -4px; left:calc(50% - 5px); }
        cuppa-tooltip.warning{ background-color: #ff8800; color: #fff; }
        cuppa-tooltip.warning .cuppa-tooltip_arrow{ filter: invert(68%) sepia(38%) saturate(6957%) hue-rotate(0deg) brightness(104%) contrast(105%); }
        cuppa-tooltip.error{ background-color: #ff4444; color: #fff; }
        cuppa-tooltip.error .cuppa-tooltip_arrow{ filter: invert(28%) sepia(86%) saturate(1852%) hue-rotate(339deg) brightness(125%) contrast(105%); }
        cuppa-tooltip.error{ background-color: #ff4444; color: #fff; }
        cuppa-tooltip.error .cuppa-tooltip_arrow{ filter: invert(28%) sepia(86%) saturate(1852%) hue-rotate(339deg) brightness(125%) contrast(105%); }
				cuppa-tooltip.progress{ background-color: #1890ff; color: #fff; }
        cuppa-tooltip.progress .cuppa-tooltip_arrow{ filter: invert(40%) sepia(80%) saturate(1856%) hue-rotate(192deg) brightness(100%) contrast(107%); }
      	cuppa-tooltip.success{ background-color: #00c851; color:#fff; }
        cuppa-tooltip.success .cuppa-tooltip_arrow{ filter: invert(63%) sepia(42%) saturate(4588%) hue-rotate(103deg) brightness(95%) contrast(101%); }
      </style>
		`
	}
}

customElements.define('cuppa-tooltip', CuppaTooltip);
