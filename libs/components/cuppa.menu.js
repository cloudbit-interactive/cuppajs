/**
 * v0.0.7
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.binAll(this)}getPropertiesCallbacks(){let _entries=Object.entries(this);for(let i=0;i<_entries.length;i++){let[key,value]=_entries[i];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(key)&&this._callbacks.push({key:key,value:value})}}reSetPropertiesCallbacks(){for(let i=0;i<this._callbacks.length;i++){let{key:key,value:value}=this._callbacks[i];this[key]=value}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),setTimeout(()=>{this.mounted&&this.mounted(this),this.rendered&&this.rendered(this)},0)}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(args){Object.entries(args).map(([name,value])=>{this[`_${name}`]=value}),this.forceRender()}forceRender(callback,dispatchRender=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&dispatchRender&&this.rendered(this),this.renderedCount++}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}bind(element){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));for(let i=0;i<propertyNames.length;i++)if("function"==typeof element[propertyNames[i]]){if(this[propertyNames[i]])continue;this[propertyNames[i]]=element[propertyNames[i]].bind(element)}}observables(object,callback){let target=this,firstName;if(object){if(!Array.isArray(object))return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName];object.forEach(varName=>{this.observable(varName,this[varName])})}}observable(varName,defaultValue){return setTimeout(()=>{defaultValue&&void 0===this[varName]||(defaultValue=this[varName]),this.observables({[varName]:defaultValue})},0),defaultValue}}export function camelize(str){return(str=(str=(str=(str=(str=String(str)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(match,index){return 0==+match?"":0===index?match.toLowerCase():match.toUpperCase()}))}var t,e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{Al:()=>D,dy:()=>b,Jb:()=>C,Ld:()=>M,sY:()=>W,rx:()=>G,YP:()=>N});const s=window,n=s.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,h="?"+l,$=`<${h}>`,a=document,d=()=>a.createComment(""),A=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,_=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),u="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,f=/>/g,g=RegExp(`>|${u}(?:([^\\s"'>=/]+)(${u}*=${u}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,y=/"/g,x=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),b=H(1),N=H(2),C=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),w=new WeakMap,S=a.createTreeWalker(a,129,null,!1),T=(t,e)=>{const i=t.length-1,s=[];let n,h=2===e?"<svg>":"",a=v;for(let e=0;e<i;e++){const i=t[e];let o,d,A=-1,c=0;for(;c<i.length&&(a.lastIndex=c,d=a.exec(i),null!==d);)c=a.lastIndex,a===v?"!--"===d[1]?a=p:void 0!==d[1]?a=f:void 0!==d[2]?(x.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=g):void 0!==d[3]&&(a=g):a===g?">"===d[0]?(a=null!=n?n:v,A=-1):void 0===d[1]?A=-2:(A=a.lastIndex-d[2].length,o=d[1],a=void 0===d[3]?g:'"'===d[3]?y:m):a===y||a===m?a=g:a===p||a===f?a=v:(a=g,n=void 0);const _=a===g&&t[e+1].startsWith("/>")?" ":"";h+=a===v?i+$:A>=0?(s.push(o),i.slice(0,A)+r+i.slice(A)+l+_):i+l+(-2===A?(s.push(void 0),e):_)}const d=h+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==o?o.createHTML(d):d,s]};class B{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,$=0;const a=t.length-1,A=this.parts,[c,_]=T(t,e);if(this.el=B.createElement(c,i),S.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=S.nextNode())&&A.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const i=_[$++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(i);A.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?j:E})}else A.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(x.test(s.tagName)){const t=s.textContent.split(l),e=t.length-1;if(e>0){s.textContent=n?n.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],d()),S.nextNode(),A.push({type:2,index:++o});s.append(t[e],d())}}}else if(8===s.nodeType)if(s.data===h)A.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(l,t+1));)A.push({type:7,index:o}),t+=l.length-1}o++}}static createElement(t,e){const i=a.createElement("template");return i.innerHTML=t,i}}function P(t,e,i=t,s){var n,o,r,l;if(e===C)return e;let h=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const $=A(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==$&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===$?h=void 0:(h=new $(t),h._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=h:i._$Cl=h),void 0!==h&&(e=P(t,h._$AS(t,e.values),h,s)),e}class I{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:a).importNode(i,!0);S.currentNode=n;let o=S.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new U(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new O(o,this,t)),this._$AV.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=S.nextNode(),r++)}return n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{constructor(t,e,i,s){var n;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),A(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==C&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):_(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==M&&A(this._$AH)?this._$AA.nextSibling.data=t:this.$(a.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=B.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new I(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=w.get(t.strings);return void 0===e&&w.set(t.strings,e=new B(t)),e}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new U(this.k(d()),this.k(d()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class E{constructor(t,e,i,s,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=P(this,t,e,0),o=!A(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=P(this,s[i+r],e,r),l===C&&(l=this._$AH[r]),o||(o=!A(l)||l!==this._$AH[r]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const k=n?n.emptyScript:"";class R extends E{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class j extends E{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=P(this,t,e,0))&&void 0!==i?i:M)===C)return;const s=this._$AH,n=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==M&&(s===M||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class O{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const D={O:r,P:l,A:h,C:1,M:T,L:I,D:_,R:P,I:U,V:E,H:R,N:j,U:L,F:O},V=s.litHtmlPolyfillSupport;null==V||V(B,U),(null!==(t=s.litHtmlVersions)&&void 0!==t?t:s.litHtmlVersions=[]).push("2.7.2");const W=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new U(e.insertBefore(d(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r},{I:Y}=D,z=()=>document.createComment(""),J=(t,e,i)=>{var s;const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(z(),o),s=n.insertBefore(z(),o);i=new Y(e,s,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,l=r!==t;if(l){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==o||l){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},Z=(t,e,i=t)=>(t._$AI(e,i),t),F={},Q=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},q=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},G=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let r=0;for(const e of t)n[r]=s?s(e,r):r,o[r]=i(e,r),r++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){var n;const o=(t=>t._$AH)(t),{values:r,keys:l}=this.dt(e,i,s);if(!Array.isArray(o))return this.ht=l,r;const h=null!==(n=this.ht)&&void 0!==n?n:this.ht=[],$=[];let a,d,A=0,c=o.length-1,_=0,u=r.length-1;for(;A<=c&&_<=u;)if(null===o[A])A++;else if(null===o[c])c--;else if(h[A]===l[_])$[_]=Z(o[A],r[_]),A++,_++;else if(h[c]===l[u])$[u]=Z(o[c],r[u]),c--,u--;else if(h[A]===l[u])$[u]=Z(o[A],r[u]),J(t,$[u+1],o[A]),A++,u--;else if(h[c]===l[_])$[_]=Z(o[c],r[_]),J(t,o[A],o[c]),c--,_++;else if(void 0===a&&(a=q(l,_,u),d=q(h,A,c)),a.has(h[A]))if(a.has(h[c])){const e=d.get(l[_]),i=void 0!==e?o[e]:null;if(null===i){const e=J(t,o[A]);Z(e,r[_]),$[_]=e}else $[_]=Z(i,r[_]),J(t,o[A],i),o[e]=null;_++}else Q(o[c]),c--;else Q(o[A]),A++;for(;_<=u;){const e=J(t,$[u+1]);Z(e,r[_]),$[_++]=e}for(;A<=c;){const t=o[A++];null!==t&&Q(t)}return this.ht=l,((t,e=F)=>{t._$AH=e})(t,$),C}});var K=i.Al,X=i.dy,tt=i.Jb,et=i.Ld,it=i.sY,st=i.rx,nt=i.YP;export{K as _$LH,X as html,tt as noChange,et as nothing,it as render,st as repeat,nt as svg};let $LH=K,html=X,noChange=tt,nothing=et,render=it,repeat=st,svg=nt;

export class CuppaMenu extends CuppaComponent {
	static POSITION = {CENTER:"CENTER", LEFT:"LEFT", LEFT_IN:"LEFT_IN", RIGHT:"RIGHT", RIGHT_IN:"RIGHT_IN", TOP:"TOP", TOP_IN:"TOP_IN", BOTTOM:"BOTTOM", BOTTOM_IN:"BOTTOM_IN"}
	static ARROW = {UP:"UP", LEFT:"LEFT", RIGHT:"RIGHT", DOWN:"DOWN", NONE:"NONE"}
	static ADJUST_TYPE = {OPPOSITE:'OPPOSITE', GAP:'GAP', NONE:'NONE'}
	posX = this.observables('posX', CuppaMenu.POSITION.RIGHT);
	posY = this.observable('posY', CuppaMenu.POSITION.TOP_IN);
	arrow = this.observable('arrow', CuppaMenu.ARROW.NONE);
	adjustType = this.observable('adjustType', CuppaMenu.ADJUST_TYPE.GAP);
	styleArrow = "";
	target;
	targetElement;
	mainMenu = true;
	contextualMenu = false;
	onMenu = false;
	delayCloseTimeout;
	forceShow = false;
	forceRemove = false;
	groupEvents = `CuppaMenu_${cuppa.uuid()}`;

	static get observedAttributes() { return ['target', 'pos-x', 'pos-y', 'force-show', 'force-remove', 'main-menu', 'arrow', 'style-arrow', 'contextual-menu', 'adjust-type'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(newVal === "true") newVal = true;
		if(newVal === "false") newVal = false;
		this[camelize(attr)] = newVal;
	}

	mounted(){
		if(this.parentElement.closest('cuppa-menu')) this.mainMenu = false;
		else this.classList.add('main-menu')
		if(this.target){
			this.targetElement = document.querySelector(this.target);
		}
		this.setPosition();
		setTimeout(()=>{ this.addEvents() }, 200);
	}

	setPosition(autoAdjust = true){
		if(!this.targetElement) return;
		this.style.visibility = 'hidden';
		this.style.display = 'block';
		let dimTarget = this.targetElement.getBoundingClientRect();
		let dim = this.getBoundingClientRect();
		this.style.display = 'none';
		this.style.visibility = 'visible';
		let offset = (this.arrow === CuppaMenu.ARROW.NONE || !this.arrow) ? 0 : 5;
		// x
		let posX = this.posX.toUpperCase();
		if(posX === CuppaMenu.POSITION.CENTER){
			this.style.left = `${dimTarget.x + (dimTarget.width-dim.width)*0.5}px`;
		}else if(posX === CuppaMenu.POSITION.LEFT){
			this.style.left = `${dimTarget.x - dim.width - offset}px`;
		}else if(posX === CuppaMenu.POSITION.LEFT_IN){
			this.style.left = `${dimTarget.x}px`;
		}else if(posX === CuppaMenu.POSITION.RIGHT){
			this.style.left = `${dimTarget.x + dimTarget.width + offset}px`;
		}else if(posX === CuppaMenu.POSITION.RIGHT_IN){
			this.style.left = `${dimTarget.x + dimTarget.width -  dim.width}px`;
		}
		// y
		let posY = this.posY.toUpperCase();
		if(posY === CuppaMenu.POSITION.CENTER){
			this.style.top = `${dimTarget.y + (dimTarget.height-dim.height)*0.5}px`;
		}else if(posY === CuppaMenu.POSITION.TOP){
			this.style.top = `${dimTarget.y - dim.height - offset}px`;
		}else if(posY === CuppaMenu.POSITION.TOP_IN){
			this.style.top = `${dimTarget.y}px`;
		}else if(posY === CuppaMenu.POSITION.BOTTOM){
			this.style.top = `${dimTarget.y + dimTarget.height + offset}px`;
		}else if(posY === CuppaMenu.POSITION.BOTTOM_IN){
			this.style.top = `${dimTarget.y+dimTarget.height-dim.height}px`;
		}
		this.style.display = (this.forceShow) ? 'block' : 'none';
		if(autoAdjust) this.autoAdjust();
	}

	autoAdjust(){
		let dimTarget = cuppa.dim(this.targetElement);
		let dim = cuppa.dim(this);
		let gap = 20;

		if(dim.x < 0){
			if(this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE){
			this.posX = CuppaMenu.POSITION.LEFT_IN;
			}else if(this.adjustType === CuppaMenu.ADJUST_TYPE.GAP){
				this.style.left = `10px`;
			}
		}else if(dim.x + dim.width + gap > window.innerWidth){
			if(this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE){
				this.posX = CuppaMenu.POSITION.RIGHT_IN;
				if(this.refs.arrow){
					let arrowDim = this.refs.arrow.getBoundingClientRect();
					this.refs.arrow.style.left = `calc(100% - ${dimTarget.width*0.5+arrowDim.width*0.5}px)`;
				}
			}else if(this.adjustType === CuppaMenu.ADJUST_TYPE.GAP){
				this.style.left = `${window.innerWidth - dim.width - 10}px`;
			}
		}

		if(dim.y < 0){
			if(this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE){
				this.posY = CuppaMenu.POSITION.BOTTOM;
			}else if(this.adjustType === CuppaMenu.ADJUST_TYPE.GAP){
				this.style.top = `10px`;
			}
		}else if(dim.y + dim.height + gap > window.innerHeight){
			if(this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE){
				this.posY = CuppaMenu.POSITION.TOP;
				this.arrow = CuppaMenu.ARROW.DOWN;
			}else if(this.adjustType === CuppaMenu.ADJUST_TYPE.GAP){
				this.style.top = `${window.innerHeight - dim.height - 10}px`;
			}
		}

		if(this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE){
			this.setPosition(false);
		}
	}

	addEvents(){
		if(this.contextualMenu){
			cuppa.on(window, `click`, this.close, this.groupEvents);
			cuppa.on(window, `scroll`, this.close, this.groupEvents);
			cuppa.on(this.targetElement, `click`, this.show, this.groupEvents);
		}else if(this.mainMenu){
			cuppa.on(window, `click`, this.close, this.groupEvents);
			cuppa.on(window, `scroll`, this.close, this.groupEvents);
			cuppa.on(this.targetElement, `click`, this.show, this.groupEvents);
			cuppa.on(this.targetElement, `mouseenter`, (e)=>{
				let others = this.getOthers();
				if(others.length){ this.closeOthers(); this.show(e); }
			}, this.groupEvents);
		}else{
			cuppa.on(this.targetElement, `click`, e=>e.stopPropagation(), this.groupEvents);
			cuppa.on(this.targetElement, `mouseenter`, this.show, this.groupEvents);
			cuppa.on(this.targetElement, `mouseleave`, this.delayClose, this.groupEvents);
			cuppa.on(this, `mouseenter`, (e)=>{this.onMenu = true}, this.groupEvents);
			cuppa.on(this, `mouseleave`, this.close, this.groupEvents);
		}
	}

	show(e){
		e.stopPropagation();
		if(this.style.display === 'block' && this.mainMenu){
			this.style.display = 'none';
		}else{
			this.setPosition();
			if(this.delayCloseTimeout) clearTimeout(this.delayCloseTimeout);
			this.style.display = 'block';
			this.closeOthers();
		}
	}

	closeOthers(){
		if(!this.mainMenu) return;
		let elements = this.getOthers();
		elements.map(element=>element.close());
	}

	getOthers({onlyShowed = true} = {}){
		let elements = document.querySelectorAll('cuppa-menu.main-menu');
		elements = Array.from(elements).filter(element=>{
			if(element === this) return null;
			if(onlyShowed && element.style.display === 'none') return null;
			return element;
		});
		return elements || [];
	}

	delayClose(e){
		if(this.delayCloseTimeout) clearTimeout(this.delayCloseTimeout);
		this.delayCloseTimeout = setTimeout(()=>{
			if(!this.onMenu){ this.close(); }
		}, 0)
	}

	close(e){
		if(!this.targetElement || this.forceRemove){
			this.remove();
		}else{
			this.onMenu = false;
			this.style.display = 'none';
		}
	}

	unmounted() {
		cuppa.offGroup(this.groupEvents)
	}

	render(){
		return html`
      ${this.arrow === "" || this.arrow.toUpperCase() === CuppaMenu.ARROW.NONE ? `` : html`
        <svg class="cuppa-menu_arrow ${this.arrow.toLowerCase()}" width="10" height="5" viewBox="0 0 18 9" preserveAspectRatio="none" style="${this.styleArrow}" >
          <path data-name="Icon ionic-md-arrow-dropup" d="M9,22.5l9-9,9,9Z" transform="translate(-9 -13.5)"/>
        </svg>
      `}
      <style>
        :root{
          --cuppa-menu-bg:#fff;
          --cuppa-menu-btn-bg:transparent;
          --cuppa-menu-btn-bg-hover:rgba(0,0,0,0.07);
          --cuppa-menu-btn-color:#333;
          --cuppa-menu-tint:invert(0%) sepia(96%) saturate(21%) hue-rotate(215deg) brightness(96%) contrast(102%);
          --cuppa-menu-shadow:0px 3px 10px rgba(0,0,0,0.1);
          --cuppa-menu-border:1px solid rgba(0, 0, 0, 0.06);
          --cuppa-menu-border-bottom:1px solid rgba(0, 0, 0, 0.02);
          --cuppa-menu-separator:1px solid rgba(0, 0, 0, 0.08);
          --cuppa-menu-shortcut-color:rgba(0, 0, 0, 0.4);
          --cuppa-menu-arrow-color:#fff;
        }

        cuppa-menu[theme=dark] {
          color-scheme: dark;
          --cuppa-menu-bg:#1e1e1e;
          --cuppa-menu-btn-bg-hover:rgba(0,0,0,0.3);
          --cuppa-menu-btn-color:#fff;
          --cuppa-menu-tint:invert(100%) sepia(3%) saturate(4%) hue-rotate(251deg) brightness(115%) contrast(100%);
          --cuppa-menu-border:1px solid rgba(255, 255, 255, 0.06);
          --cuppa-menu-border-bottom:1px solid rgba(255, 255, 255, 0.02);
          --cuppa-menu-separator:1px solid rgba(255, 255, 255, 0.08);
          --cuppa-menu-arrow-color:#1e1e1e;
        }

        cuppa-menu{
          display: block;
	        visibility: visible;
          position: fixed;
          left: 0; top:0;
          border: var(--cuppa-menu-border);
          border-bottom: var(--cuppa-menu-border-bottom);
          padding: 4px 0px;
          min-width:140px;
          white-space:nowrap;
          background: var(--cuppa-menu-bg);
          border-radius: 5px;
          box-shadow: var(--cuppa-menu-shadow);
          z-index: 1;
          margin-top:3px;
        }
        cuppa-menu button{
          border: none;
          outline:none;
          white-space: nowrap;
          width: 100%;
          background: var(--cuppa-menu-btn-bg);
          color: var(--cuppa-menu-btn-color);
          padding: 7px 15px 7px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap;
          font-size: 14px;
        }
        cuppa-menu button:hover{ background: var(--cuppa-menu-btn-bg-hover);}
        cuppa-menu hr{ border:none; border-bottom: var(--cuppa-menu-separator); margin:7px 0; }
        cuppa-menu .shortcut{ display: flex; align-items: center; justify-content: flex-end; color:var(--cuppa-menu-shortcut-color); min-width: 60px; padding-left: 20px; }
        cuppa-menu img{ height: 14px; margin-right: 14px; filter: var(--cuppa-menu-tint); }
        cuppa-menu i{ width: 14px; height: 14px; background: no-repeat center; background-size: contain; }
        cuppa-menu i{ margin: 0 14px 0 0; }
        cuppa-menu i.more{
          width: 12px;
          height: 12px;
          filter: var(--cuppa-menu-tint);
          margin:0 0 0 14px;
          background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zNDEuOTU3MjA5IDk1OS4zNTQ2NzhjLTEyLjg5MzY1OCAwLTI1Ljg0MjU3NS00LjQyNTc5OS0zNi4zODY3MjItMTMuNDY3NzMzLTIzLjQ5MzA2NC0yMC4xMDU5Mi0yNi4yMjQyNjgtNTUuNDI2MzU3LTYuMDY0MTEzLTc4Ljg5MTc5MUw2MDMuOTI5NzM2IDUxMS43ODkxOTlsLTMwNC40MjMzNjEtMzU1LjIwNjk3OGMtMjAuMTYwMTU1LTIzLjQ2NTQzNC0xNy40Mjc5MjgtNTguNzg2ODk0IDYuMDY0MTEzLTc4Ljg5MTc5MSAyMy40Mzc4MDUtMjAuMDI0MDU2IDU4Ljc4Njg5NC0xNy4zNzM2OTMgNzguODM3NTU2IDYuMDY0MTEzbDMzNS42NzUxMzIgMzkxLjYyMDMwNWMxNy45NzQzNzMgMjAuOTUyMTk0IDE3Ljk3NDM3MyA1MS44NzU0ODQgMCA3Mi44Mjc2NzlsLTMzNS42NzUxMzIgMzkxLjYyMDMwNUMzNzMuMzcxNjg2IDk1Mi43MTc1MTQgMzU3LjY5MTU2NSA5NTkuMzU0Njc4IDM0MS45NTcyMDkgOTU5LjM1NDY3OHoiICAvPjwvc3ZnPg==)
        }
        cuppa-menu .cuppa-menu_arrow{ position: absolute; fill:var(--cuppa-menu-arrow-color)  }
        cuppa-menu .cuppa-menu_arrow.up{ top:-4px; left:15px; }
        cuppa-menu .cuppa-menu_arrow.left{ transform: rotate(-90deg); top:15px; left:-7px; }
        cuppa-menu .cuppa-menu_arrow.right{ transform: rotate(90deg); top:15px; right:-7px; }
        cuppa-menu .cuppa-menu_arrow.down{ transform: rotate(180deg); bottom: -4px; left:15px; }
      </style>
		`
	}
}

customElements.define('cuppa-menu', CuppaMenu);
document.defaultView.CuppaMenu = CuppaMenu;

// DEPENDENCIES
let cuppa = {};
/* on / off
    EventManager, Structure
    cuppa.eventGroups =	{ 'groupName':  Map<Element>:[{event:String, callback:Function}, {event:String, callback:Function}, ]
                                        Map<Element>:[{event:String, callback:Function}, {event:String, callback:Function}, ]
*/
cuppa.eventGroups = [];
// Add Event listener
cuppa.on = function(elements, event, callback, groupName, useCapture) {
	if(!elements) return;
	if(!Array.isArray(elements)) elements = [elements];
	cuppa.off(elements, event, callback, groupName); // prevent duplicate events
	if(!groupName) groupName = "default";
	if(useCapture === undefined) useCapture = false;
	if(!cuppa.eventGroups[groupName]) cuppa.eventGroups[groupName] = new Map();
	for(let i = 0; i < elements.length; i++){
		let element = elements[i];
		if(!element) continue;
		if(element.addEventListener) element.addEventListener(event, callback, useCapture);
		let events = cuppa.eventGroups[groupName].get(element);
		if(!events) events = [];
		events.push({event:event, callback:callback});
		cuppa.eventGroups[groupName].set(element, events);
	}
};
// Remove a single event
cuppa.off = function(elements, event, callback, groupName){
	if(!Array.isArray(elements)) elements = [elements];
	if(!groupName) groupName = "default";
	if(!cuppa.eventGroups[groupName]) return;
	if(!elements) return;
	if(event === "removed") event = "DOMNodeRemoved";
	for(let i = 0; i < elements.length; i++){
		let events = cuppa.eventGroups[groupName].get(elements[i]);
		if(!events) break;
		for(let j = events.length-1; j >= 0; j--){
			if(callback){
				if(events[j].event === event && events[j].callback === callback ){
					elements[i].removeEventListener(events[j].event, events[j].callback);
					events.splice(j, 1);
					break;
				};
			}else{
				if(events[j].event === event ){
					elements[i].removeEventListener(events[j].event, events[j].callback);
					events.splice(j, 1);
				};
			};
		};
		cuppa.eventGroups[groupName].set(elements[i], events);
	};
};

// Remove event by Group
cuppa.offGroup = function(groupName){
	if(!groupName) groupName = "default";
	let map = cuppa.eventGroups[groupName];
	if(!map) return;
	map.forEach(function(events, element) {
		for(let i = 0; i < events.length; i++){
			element.removeEventListener(events[i].event, events[i].callback);
		};
	});
	map["delete"](groupName);
};
// getUUid
cuppa.uuid = function(){
	let d = new Date().getTime();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
		d += performance.now(); //use high-precision timer if available
	}
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
};

cuppa.dim = function(element, opts){
	if(!opts) opts = {}
	if(element == undefined || element == "body" ) element = document.body;
	let value = {width:0, height:0, x:0, y:0 };
	// change parents elements
	let parents = cuppa.parents(element);
	let tmpParents = new Array();
	for(let i = 0; i < parents.length; i++){ if( cuppa.css(parents[i], "display") == "none" ) tmpParents.push(parents[i]); }
	if(cuppa.css(element, "display") == "none") tmpParents.push(element);
	cuppa.css(tmpParents, {display:"block", visibility:"hidden"});

	let clientRect = element.getBoundingClientRect();
	let scrollPos = cuppa.scrollPosition(opts.scrollRef);
	let style = getComputedStyle(element);
	// x,y (position from init of document) - not work
	value.x = (window.scrollX) ? clientRect.left + window.scrollX :  clientRect.left + window.pageXOffset;
	value.y = (window.scrollY) ? clientRect.top + window.scrollY : clientRect.top + window.pageYOffset;
	// x2,y2 (position from parent element) - work
	value.x2 = element.offsetLeft;
	value.y2 = element.offsetTop;
	// x3,y3 (fixed position on window) - work
	value.x3 = clientRect.left;
	value.y3 =  clientRect.top;
	// x4,y4 (position from parent element + scroll position) - work
	value.x4 = value.x + scrollPos.x;
	value.y4 =  value.y + scrollPos.x;
	// dimentions, + border, + padding
	value.width = element.offsetWidth;
	value.height = element.offsetHeight;
	// dimentions, - border, - padding
	value.width2 = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
	value.height2 = element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
	// dimentions, - border
	value.width3 = element.clientWidth;
	value.height3 = element.clientHeight;
	// dimentions, + border, + padding, + margin
	value.width4 = element.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
	value.height4 = element.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
	// scroll dimensions
	value.scrollWidth = element.scrollWidth;
	value.scrollHeight = element.scrollHeight;
	// client dimentions
	value.clientWidth = element.clientWidth;
	value.clientHeight = element.clientHeight;
	// return parents to default
	cuppa.css(tmpParents, {display:"none", visibility:"visible"});
	return value;
};

// scrollPosition
cuppa.scrollPosition = function(element){
	let pos = {x:0, y:0}
	if(!element || element == "body" || cuppa.elementType(element) == "body" || element == window){
		pos.x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
		pos.y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	}else{
		pos.x = element.scrollLeft;
		pos.y = element.scrollTop;
	};
	return pos;
};

cuppa.css = function(elements, property, opts){
	if(!elements) return;
	elements = cuppa.element(elements);
	for(let k = 0; k < elements.length; k++){
		let element = elements[k];
		if(typeof(property) == "object"){
			if(!Array.isArray(element)) element = [element];
			for(let i = 0; i < element.length; i++){
				for (let css in property) {
					let value = property[css];
					let priority = "";
					if(value){
						value = String(value);
						if(value.indexOf("!important") != -1){
							priority = "important";
							value = value.replace("!important", "");
						};
						element[i].style.setProperty( cuppa.trim(css), cuppa.trim(value), priority);
					};
				};
			};
		}else{
			// opts default
			opts = opts || {};
			opts.number = opts.number || false;
			// get value
			let value;
			try{
				let style = window.getComputedStyle(element);
				value = style.getPropertyValue(property);
				if(opts.number) value = parseFloat(value) || 0;
			}catch(err){ value = null; };
			return value;
		};
	};
};

cuppa.nodeType = function(element){ return  element.nodeName.toLowerCase(); };
cuppa.elementType = function(element){ return cuppa.nodeType(element); };


cuppa.parents = function(ref, opts){
	opts = cuppa.mergeObjects([{reverse:false, type:""}, opts]);
	let element = cuppa.element(ref)[0];
	if(!element) return;
	let parents = [];
	if(cuppa.elementType(element) === "body") return parents;
	while (element) {
		if(element.toString() !== "[object HTMLDocument]" && element.toString() !== "[object HTMLHtmlElement]"){
			if(opts.type){
				if(cuppa.elementType(element) === opts.type){
					parents.push(element);
				}
			}else{
				parents.push(element);
			}
		};
		element = element.parentNode;
	};
	parents.shift();
	if(opts.reverse) parents = parents.reverse();
	return parents;
};


cuppa.mergeObjects = function(array_objs, create_new_object){
	if(!create_new_object){
		let obj1 = array_objs.shift();
		for(let i = 0; i < array_objs.length; i++){
			let obj = array_objs[i];
			if(obj){ for (let attrname in obj) { obj1[attrname] =  obj[attrname]; } }
		};
		return obj1;
	}else{
		let tmp_obj = {};
		for(let i = 0; i < array_objs.length; i++){
			let obj = array_objs[i];
			if(obj){ for (let attrname in obj) { tmp_obj[attrname] = obj[attrname]; } }
		};
		return tmp_obj;
	};
};

cuppa.element = function(ref, opts){
	if(!ref) return;
	opts = opts || {}
	opts.returnType = opts.returnType || "all";
	opts.query = opts.query || true;
	if(opts.target) opts.parent = opts.target;
	if(ref === "body"){
		if(opts.returnType === "first") return document.body;
		else if(opts.returnType === "last") return document.body;
		else return [document.body];
	}else if(Array.isArray(ref)){
		if(opts.returnType === "first") return ref.shift();
		else if(opts.returnType === "last") return ref.pop();
		else return ref;
	}else if(ref.toString() === "[object NodeList]" || ref.toString() === "[object HTMLCollection]"){
		ref = Array.from(ref);
		if(opts.returnType === "first") return ref.shift();
		else if(opts.returnType === "last") return ref.pop();
		else return ref;
	}else if(typeof(ref) === "object"){
		if(opts.returnType === "first") return ref;
		else if(opts.returnType === "last") return ref;
		else return [ref];
	};

	if(!opts.parent || opts.parent === "body") opts.parent = [document.body];
	if(typeof(opts.parent) === "string") opts.parent = cuppa.element(opts.parent);
	if(!Array.isArray(opts.parent)) opts.parent = [opts.parent];

	let nodes = []; if(!opts.parent) return nodes;
	for(let i = 0; i < opts.parent.length; i++){
		let t = opts.parent[i];
		let n = null;
		if(cuppa.search("#", ref) && !opts.query){
			let e = cuppa.replace(ref, "#", "");
			try{ n = t.getElementById(e); }catch(err){  }
			if(n) nodes.push(n);
		}else if(cuppa.search(".", ref) && !opts.query){
			ref = cuppa.replace(ref, "\\.", "");
			try{ n = Array.from(t.getElementsByClassName(ref)); }catch(err){  }
			if(n && n.length) nodes= nodes.concat(n);
		}else{
			try{ n = Array.from(t.querySelectorAll(ref)); }catch(err){  }
			if(n && n.length) nodes= nodes.concat(n);
		};
	};
	if(opts.not) nodes = nodes.filter(function(item){ if(item !== opts.not){ return item; }else{ return null; } });
	if(opts.reverse || opts.invert) nodes.reverse();
	if(opts.returnType === "first") return nodes.shift();
	else if(opts.returnType === "last") return nodes.pop();
	else return nodes;
};

cuppa.trim = function(string){
	if(string) return string.replace(/^\s+|\s+$/g, '');
	else return "";
};
