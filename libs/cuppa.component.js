/**
 * v0.0.7
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

export class CuppaComponent extends HTMLElement {
	refs = {};
	shadow = null;
	renderedCount = 0;
	_template;
	_callbacks = [];

	constructor() {
		super();
		this.getPropertiesCallbacks();
		this.binAll = this.binAll.bind(this);
		this.connectedCallback = this.connectedCallback.bind(this);
		this.forceRender = this.forceRender.bind(this);
		this.disconnectedCallback = this.disconnectedCallback.bind(this);
		this.observables = this.observables.bind(this);
		this.applyObservables = this.applyObservables.bind(this);
		this.applyObservables();
		this.binAll(this);
	}

	static get observedAttributes() { return this['attributes'] || [] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(newVal === 'false') newVal = false;
		if(newVal === 'true') newVal = true;
		this[camelize(attr)] = newVal;
	}

	applyObservables(){
		if(!this.constructor.observables) return;
		setTimeout(()=>{
			let data = {};
			for(let i = 0; i < this.constructor.observables.length; i++){
				let name = this.constructor.observables[i];
				data[name] = this[name];
			}
			this.observables(data);
			this.forceRender();
		}, 0);
	}

	getPropertiesCallbacks(){
		let _entries = Object.entries(this);
		for(let i = 0; i < _entries.length; i++){
			let [key, value] = _entries[i];
			if(['refs', 'shadow', 'renderedCount', '_template', '_callbacks'].indexOf(key) !== -1) continue;
			this._callbacks.push( {key, value});
		}
	}
	reSetPropertiesCallbacks(){
		for(let i = 0; i < this._callbacks.length; i++){
			let {key, value} = this._callbacks[i];
			this[key] = value;
		}
	}

	connectedCallback() {
		this.reSetPropertiesCallbacks();
		if(this.shadow) this.attachShadow({mode: this.shadow});
		this.forceRender(null, false);
		if(this.rendered) this.rendered(this.renderedCount, this);
		setTimeout(()=>{
			if(this.mounted) this.mounted(this);
		}, 0);
	}

	disconnectedCallback() {
		if(this.unmounted) this.unmounted(this);
	}

	setVariables(args){
		Object.entries(args).map(([name, value])=>{
			this[`${name}`] = value;
		});
		this.forceRender();
	}

	forceRender(callback = null, dispatchRender = true){
		if(!this._template){ this._template = () => this.render(); }
		if(this.shadowRoot){
			render(this._template(), this.shadowRoot);
		}else{
			render(this._template(), this);
		}
		this.processRefs(this, this.refs, "ref");
		if(callback) callback();
		this.renderedCount++;
		if(this.firstRendered && this.renderedCount === 1) this.firstRendered(this.renderedCount, this);
		if(this.rendered && dispatchRender) this.rendered(this.renderedCount, this);
	}

	processRefs(html, addTo, tagAttr){
		if(!tagAttr) tagAttr = "id";
		let nodes = {}
		let elements = Array.from(html.querySelectorAll(`[${tagAttr}]`));
		for(let i = 0; i < elements.length; i++){
			if(addTo) addTo[elements[i].getAttribute(tagAttr)] = elements[i];
			else nodes[elements[i].getAttribute(tagAttr)] = elements[i];
		}
		if(addTo) addTo["rootHtml"] = html;
		else nodes["rootHtml"] = html;
		return nodes;
	};

	binAll(element, isFunction){
		let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
		if(isFunction)  propertyNames = Object.keys(element);
		for(let i = 0; i < propertyNames.length; i++){
			if(propertyNames[i] === "constructor") continue;
			if(typeof element[propertyNames[i]] == "function"){
				element[propertyNames[i]]= element[propertyNames[i]].bind(element);
			}
		}
	};

	bind(element){
		let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
		for(let i = 0; i < propertyNames.length; i++){
			if(typeof element[propertyNames[i]] == "function"){
				if(this[propertyNames[i]]) continue;
				this[propertyNames[i]] = element[propertyNames[i]].bind(element);
			};
		};
	}

	observables(object, callback) {
		let target = this;
		if(!object) return;
		if(Array.isArray(object)){
			object.forEach(varName => {
				this.observable(varName, this[varName]);
			});
			return;
		}

		let firstName;
		Object.keys(object).map((name, index)=>{
			if(!index) firstName = name;
			let value = object[name];
			let privateVar = "_" + name;
			target[privateVar] = value;
			Object.defineProperty(target, name, {
				set: value => {
					target[privateVar] = value;
					if(target["forceRender"]) target.forceRender();
					if(callback) callback();
				},
				get: () => { return target[privateVar]; },
				configurable:true,
			});
		})
		return target[firstName];
	}

	observable(varName, defaultValue){
		setTimeout(()=>{
			if(!defaultValue || this[varName] !== undefined) defaultValue = this[varName];
			this.observables( {[varName]:defaultValue} );
		}, 0);
		return defaultValue;
	}
}

export function camelize(str) {
	str = String(str) || "";
	str = str.replace(new RegExp("-", 'g'), " ");
	str = str.replace(new RegExp("_", 'g'), " ");
	str = str.toLowerCase();
	str = str.replace(/[^\w\s]/gi, '');
	return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
		if (+match === 0) return "";
		return index === 0 ? match.toLowerCase() : match.toUpperCase();
	});
};

// DEPENDENCIES
// lit-html 2.7.2
var t,e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{BJ:()=>tt,Al:()=>O,dy:()=>b,Jb:()=>M,Ld:()=>w,sY:()=>W,rx:()=>X,YP:()=>N,Au:()=>et});const s=window,n=s.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,h="?"+l,a=`<${h}>`,d=document,$=()=>d.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,A=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),_="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,f=/>/g,g=RegExp(`>|${_}(?:([^\\s"'>=/]+)(${_}*=${_}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,y=/"/g,x=/^(?:script|style|textarea|title)$/i,H=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),b=H(1),N=H(2),M=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,C=d.createTreeWalker(d,129,null,!1),S=(t,e)=>{const i=t.length-1,s=[];let n,h=2===e?"<svg>":"",d=v;for(let e=0;e<i;e++){const i=t[e];let o,$,c=-1,u=0;for(;u<i.length&&(d.lastIndex=u,$=d.exec(i),null!==$);)u=d.lastIndex,d===v?"!--"===$[1]?d=p:void 0!==$[1]?d=f:void 0!==$[2]?(x.test($[2])&&(n=RegExp("</"+$[2],"g")),d=g):void 0!==$[3]&&(d=g):d===g?">"===$[0]?(d=null!=n?n:v,c=-1):void 0===$[1]?c=-2:(c=d.lastIndex-$[2].length,o=$[1],d=void 0===$[3]?g:'"'===$[3]?y:m):d===y||d===m?d=g:d===p||d===f?d=v:(d=g,n=void 0);const A=d===g&&t[e+1].startsWith("/>")?" ":"";h+=d===v?i+a:c>=0?(s.push(o),i.slice(0,c)+r+i.slice(c)+l+A):i+l+(-2===c?(s.push(void 0),e):A)}const $=h+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==o?o.createHTML($):$,s]};class B{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,a=0;const d=t.length-1,c=this.parts,[u,A]=S(t,e);if(this.el=B.createElement(u,i),C.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=C.nextNode())&&c.length<d;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const i=A[a++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(i);c.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?j:U})}else c.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(x.test(s.tagName)){const t=s.textContent.split(l),e=t.length-1;if(e>0){s.textContent=n?n.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],$()),C.nextNode(),c.push({type:2,index:++o});s.append(t[e],$())}}}else if(8===s.nodeType)if(s.data===h)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(l,t+1));)c.push({type:7,index:o}),t+=l.length-1}o++}}static createElement(t,e){const i=d.createElement("template");return i.innerHTML=t,i}}function P(t,e,i=t,s){var n,o,r,l;if(e===M)return e;let h=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const a=c(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=h:i._$Cl=h),void 0!==h&&(e=P(t,h._$AS(t,e.values),h,s)),e}class E{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:d).importNode(i,!0);C.currentNode=n;let o=C.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new I(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new D(o,this,t)),this._$AV.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=C.nextNode(),r++)}return n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class I{constructor(t,e,i,s){var n;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),c(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==M&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):A(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==w&&c(this._$AH)?this._$AA.nextSibling.data=t:this.$(d.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=B.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new E(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=T.get(t.strings);return void 0===e&&T.set(t.strings,e=new B(t)),e}T(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new I(this.k($()),this.k($()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class U{constructor(t,e,i,s,n){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=P(this,t,e,0),o=!c(t)||t!==this._$AH&&t!==M,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=P(this,s[i+r],e,r),l===M&&(l=this._$AH[r]),o||(o=!c(l)||l!==this._$AH[r]),l===w?t=w:t!==w&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}}const k=n?n.emptyScript:"";class R extends U{constructor(){super(...arguments),this.type=4}j(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class j extends U{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=P(this,t,e,0))&&void 0!==i?i:w)===M)return;const s=this._$AH,n=t===w&&s!==w||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==w&&(s===w||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class D{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const O={O:r,P:l,A:h,C:1,M:S,L:E,D:A,R:P,I,V:U,H:R,N:j,U:L,F:D},V=s.litHtmlPolyfillSupport;null==V||V(B,I),(null!==(t=s.litHtmlVersions)&&void 0!==t?t:s.litHtmlVersions=[]).push("2.7.2");const W=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new I(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r},J=t=>(...e)=>({_$litDirective$:t,values:e});class Y{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const{I:z}=O,Z=()=>document.createComment(""),F=(t,e,i)=>{var s;const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(Z(),o),s=n.insertBefore(Z(),o);i=new z(e,s,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,l=r!==t;if(l){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==o||l){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},Q=(t,e,i=t)=>(t._$AI(e,i),t),q={},G=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},K=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},X=J(class extends Y{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let r=0;for(const e of t)n[r]=s?s(e,r):r,o[r]=i(e,r),r++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){var n;const o=(t=>t._$AH)(t),{values:r,keys:l}=this.dt(e,i,s);if(!Array.isArray(o))return this.ht=l,r;const h=null!==(n=this.ht)&&void 0!==n?n:this.ht=[],a=[];let d,$,c=0,u=o.length-1,A=0,_=r.length-1;for(;c<=u&&A<=_;)if(null===o[c])c++;else if(null===o[u])u--;else if(h[c]===l[A])a[A]=Q(o[c],r[A]),c++,A++;else if(h[u]===l[_])a[_]=Q(o[u],r[_]),u--,_--;else if(h[c]===l[_])a[_]=Q(o[c],r[_]),F(t,a[_+1],o[c]),c++,_--;else if(h[u]===l[A])a[A]=Q(o[u],r[A]),F(t,o[c],o[u]),u--,A++;else if(void 0===d&&(d=K(l,A,_),$=K(h,c,u)),d.has(h[c]))if(d.has(h[u])){const e=$.get(l[A]),i=void 0!==e?o[e]:null;if(null===i){const e=F(t,o[c]);Q(e,r[A]),a[A]=e}else a[A]=Q(i,r[A]),F(t,o[c],i),o[e]=null;A++}else G(o[u]),u--;else G(o[c]),c++;for(;A<=_;){const e=F(t,a[_+1]);Q(e,r[A]),a[A++]=e}for(;c<=u;){const t=o[c++];null!==t&&G(t)}return this.ht=l,((t,e=q)=>{t._$AH=e})(t,a),M}});class tt extends Y{constructor(t){if(super(t),this.et=w,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||null==t)return this.ft=void 0,this.et=t;if(t===M)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}tt.directiveName="unsafeHTML",tt.resultType=1;const et=J(tt);var it=i.BJ,st=i.Al,nt=i.dy,ot=i.Jb,rt=i.Ld,lt=i.sY,ht=i.rx,at=i.YP,dt=i.Au;
export{it as UnsafeHTMLDirective,st as _$LH,nt as html,ot as noChange,rt as nothing,lt as render,ht as repeat,at as svg,dt as unsafeHTML};

let $LH = st;
let html = nt;
let noChange = ot;
let nothing = rt;
let render = lt;
let repeat = ht;
let svg = at;
let unsafeHTML = dt;
