/*! v0.0.8 */
/*
	Example:
		<tr key={field?.id || index}
			className={'sortable-element'}
			ref={ref=>{
				if(!ref) return;
				CuppaSortable.sortable({
					currentElement: ref,
					sortableClass: '.sortable-element',
					value:field,
					valueKey:"id",
                    values: this.fields,
					returnValue:true,
					dropCallback:(data)=>{
						console.log(data)
					}
				})
			}}
		></tr>
*/
/*! v0.0.14 */
export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.applyObservables=this.applyObservables.bind(this),this.applyObservables(),this.binAll(this)}static get observedAttributes(){return this.attributes||[]}attributeChangedCallback(e,t,s){t!==s&&("false"===s&&(s=!1),"true"===s&&(s=!0),this[camelize(e)]=s)}applyObservables(){this.constructor.observables&&setTimeout((()=>{let e={};for(let t=0;t<this.constructor.observables.length;t++){let s=this.constructor.observables[t];e[s]=this[s]}this.observables(e),this.forceRender()}),0)}getPropertiesCallbacks(){let e=Object.entries(this);for(let t=0;t<e.length;t++){let[s,i]=e[t];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(s)&&this._callbacks.push({key:s,value:i})}}reSetPropertiesCallbacks(){for(let e=0;e<this._callbacks.length;e++){let{key:t,value:s}=this._callbacks[e];this[t]=s}}connectedCallback(){this._children=[...this.childNodes],this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.beforeMount&&this.beforeMount(this),this.forceRender(null,!1),setTimeout((()=>{this.applyStylesAfterRender(),this.rendered&&this.rendered(this.renderedCount,this),this.mounted&&this.mounted(this)}),0)}applyStylesAfterRender(){const e=this.getAttribute("style-after-render");if(e)for(const t of e.split(";")){const[e,s]=t.split(":");e&&s&&(this.style[e.trim()]=s.trim())}}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(e){Object.entries(e).map((([e,t])=>{this[`${e}`]=t})),this.forceRender()}forceRender(e=null,t=!0){this.beforeRender&&this.beforeRender(this),this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),e&&e(),this.renderedCount++,this.firstRendered&&1===this.renderedCount&&this.firstRendered(this.renderedCount,this),this.rendered&&t&&this.rendered(this.renderedCount,this)}processRefs(e,t,s){s||(s="id");let i={},r=Array.from(e.querySelectorAll(`[${s}]`));for(let e=0;e<r.length;e++)t?t[r[e].getAttribute(s)]=r[e]:i[r[e].getAttribute(s)]=r[e];return t?t.rootHtml=e:i.rootHtml=e,i}binAll(e,t){let s=Object.getOwnPropertyNames(Object.getPrototypeOf(e));t&&(s=Object.keys(e));for(let t=0;t<s.length;t++)"constructor"!==s[t]&&"function"==typeof e[s[t]]&&(e[s[t]]=e[s[t]].bind(e))}bind(e){let t=Object.getOwnPropertyNames(Object.getPrototypeOf(e));for(let s=0;s<t.length;s++)if("function"==typeof e[t[s]]){if(this[t[s]])continue;this[t[s]]=e[t[s]].bind(e)}}observables(e,t){let s,i=this;if(e){if(!Array.isArray(e))return Object.keys(e).map(((r,n)=>{n||(s=r);let o=e[r],h="_"+r;i[h]=o,Object.defineProperty(i,r,{set:e=>{i[h]=e,i.forceRender&&i.forceRender(),t&&t()},get:()=>i[h],configurable:!0})})),i[s];e.forEach((e=>{this.observable(e,this[e])}))}}observable(e,t){return setTimeout((()=>{t&&void 0===this[e]||(t=this[e]),this.observables({[e]:t})}),0),t}}export function camelize(e){return(e=(e=(e=(e=(e=String(e)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(e,t){return 0==+e?"":0===t?e.toLowerCase():e.toUpperCase()}))}const t=globalThis,i=t.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:e=>e}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+h,n=`<${o}>`,r=document,l=()=>r.createComment(""),c=e=>null===e||"object"!=typeof e&&"function"!=typeof e,a=Array.isArray,u=e=>a(e)||"function"==typeof e?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),x=y(1),b=y(2),w=y(3),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(e,t){if(!a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(t):t}const V=(t,s)=>{const i=t.length-1,r=[];let o,l=2===s?"<svg>":3===s?"<math>":"",c=f;for(let s=0;s<i;s++){const i=t[s];let a,d,u=-1,A=0;for(;A<i.length&&(c.lastIndex=A,d=c.exec(i),null!==d);)A=c.lastIndex,c===f?"!--"===d[1]?c=v:void 0!==d[1]?c=_:void 0!==d[2]?($.test(d[2])&&(o=RegExp("</"+d[2],"g")),c=m):void 0!==d[3]&&(c=m):c===m?">"===d[0]?(c=o??f,u=-1):void 0===d[1]?u=-2:(u=c.lastIndex-d[2].length,a=d[1],c=void 0===d[3]?m:'"'===d[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,o=void 0);const b=c===m&&t[s+1].startsWith("/>")?" ":"";l+=c===f?i+n:u>=0?(r.push(a),i.slice(0,u)+e+i.slice(u)+h+b):i+h+(-2===u?s:b)}return[P(t,l+(t[i]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),r]};class N{constructor({strings:t,_$litType$:s},r){let n;this.parts=[];let c=0,_=0;const a=t.length-1,d=this.parts,[u,p]=V(t,s);if(this.el=N.createElement(u,r),C.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=C.nextNode())&&d.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(e)){const e=p[_++],s=n.getAttribute(t).split(h),i=/([.?@])?(.*)/.exec(e);d.push({type:1,index:c,name:i[2],strings:s,ctor:"."===i[1]?H:"?"===i[1]?I:"@"===i[1]?L:k}),n.removeAttribute(t)}else t.startsWith(h)&&(d.push({type:6,index:c}),n.removeAttribute(t));if($.test(n.tagName)){const e=n.textContent.split(h),t=e.length-1;if(t>0){n.textContent=i?i.emptyScript:"";for(let s=0;s<t;s++)n.append(e[s],l()),C.nextNode(),d.push({type:2,index:++c});n.append(e[t],l())}}}else if(8===n.nodeType)if(n.data===o)d.push({type:2,index:c});else{let e=-1;for(;-1!==(e=n.data.indexOf(h,e+1));)d.push({type:7,index:c}),e+=h.length-1}c++}}static createElement(e,t){const s=r.createElement("template");return s.innerHTML=e,s}}function S(e,t,s=e,i){if(t===T)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=c(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=S(e,r._$AS(e,t.values),r,i)),t}class M{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??r).importNode(t,!0);C.currentNode=i;let n=C.nextNode(),o=0,h=0,l=s[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new R(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new z(n,this,e)),this._$AV.push(t),l=s[++h]}o!==l?.index&&(n=C.nextNode(),o++)}return C.currentNode=r,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),c(e)?e===E||null==e||""===e?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==T&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):u(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=e:this.T(r.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new M(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=A.get(e.strings);return void 0===t&&A.set(e.strings,t=new N(e)),t}k(e){a(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E}_$AI(e,t=this,s,i){const r=this.strings;let n=!1;if(void 0===r)e=S(this,e,t,0),n=!c(e)||e!==this._$AH&&e!==T,n&&(this._$AH=e);else{const i=e;let o,h;for(e=r[0],o=0;o<r.length-1;o++)h=S(this,i[s+o],t,o),h===T&&(h=this._$AH[o]),n||=!c(h)||h!==this._$AH[o],h===E?e=E:e!==E&&(e+=(h??"")+r[o+1]),this._$AH[o]=h}n&&!i&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class H extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}}class I extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}}class L extends k{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??E)===T)return;const s=this._$AH,i=e===E&&s!==E||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==E&&(s===E||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class z{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const Z={M:e,P:h,A:o,C:1,L:V,R:M,D:u,V:S,I:R,H:k,N:I,U:L,B:H,F:z},j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new R(t.insertBefore(l(),e),e,void 0,s??{})}return r._$AI(e),r},directive_t_CHILD=2,directive_e=e=>(...t)=>({_$litDirective$:e,values:t});class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:directive_helpers_t}=Z,directive_helpers_r=()=>document.createComment(""),directive_helpers_s=(e,t,s)=>{const i=e._$AA.parentNode,r=void 0===t?e._$AB:t._$AA;if(void 0===s){const t=i.insertBefore(directive_helpers_r(),r),n=i.insertBefore(directive_helpers_r(),r);s=new directive_helpers_t(t,n,e,e.options)}else{const t=s._$AB.nextSibling,n=s._$AM,o=n!==e;if(o){let t;s._$AQ?.(e),s._$AM=e,void 0!==s._$AP&&(t=e._$AU)!==n._$AU&&s._$AP(t)}if(t!==r||o){let e=s._$AA;for(;e!==t;){const t=e.nextSibling;i.insertBefore(e,r),e=t}}}return s},directive_helpers_v=(e,t,s=e)=>(e._$AI(t,s),e),directive_helpers_u={},directive_helpers_M=e=>{e._$AR(),e._$AA.remove()},repeat_u=(e,t,s)=>{const i=new Map;for(let r=t;r<=s;r++)i.set(e[r],r);return i},repeat_c=directive_e(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,s){let i;void 0===s?s=t:void 0!==t&&(i=t);const r=[],n=[];let o=0;for(const t of e)r[o]=i?i(t,o):o,n[o]=s(t,o),o++;return{values:n,keys:r}}render(e,t,s){return this.dt(e,t,s).values}update(e,[t,s,i]){const r=(e=>e._$AH)(e),{values:n,keys:o}=this.dt(t,s,i);if(!Array.isArray(r))return this.ut=o,n;const h=this.ut??=[],l=[];let c,_,a=0,d=r.length-1,u=0,p=n.length-1;for(;a<=d&&u<=p;)if(null===r[a])a++;else if(null===r[d])d--;else if(h[a]===o[u])l[u]=directive_helpers_v(r[a],n[u]),a++,u++;else if(h[d]===o[p])l[p]=directive_helpers_v(r[d],n[p]),d--,p--;else if(h[a]===o[p])l[p]=directive_helpers_v(r[a],n[p]),directive_helpers_s(e,l[p+1],r[a]),a++,p--;else if(h[d]===o[u])l[u]=directive_helpers_v(r[d],n[u]),directive_helpers_s(e,r[a],r[d]),d--,u++;else if(void 0===c&&(c=repeat_u(o,u,p),_=repeat_u(h,a,d)),c.has(h[a]))if(c.has(h[d])){const t=_.get(o[u]),s=void 0!==t?r[t]:null;if(null===s){const t=directive_helpers_s(e,r[a]);directive_helpers_v(t,n[u]),l[u]=t}else l[u]=directive_helpers_v(s,n[u]),directive_helpers_s(e,r[a],s),r[t]=null;u++}else directive_helpers_M(r[d]),d--;else directive_helpers_M(r[a]),a++;for(;u<=p;){const t=directive_helpers_s(e,l[p+1]);directive_helpers_v(t,n[u]),l[u++]=t}for(;a<=d;){const e=r[a++];null!==e&&directive_helpers_M(e)}return this.ut=o,((e,t=directive_helpers_u)=>{e._$AH=t})(e,l),T}});class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=E,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===E||null==e)return this._t=void 0,this.it=e;if(e===T)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;const unsafe_html_o=directive_e(unsafe_html_e),async_directive_s=(e,t)=>{const s=e._$AN;if(void 0===s)return!1;for(const e of s)e._$AO?.(t,!1),async_directive_s(e,t);return!0},async_directive_o=e=>{let t,s;do{if(void 0===(t=e._$AM))break;s=t._$AN,s.delete(e),e=t}while(0===s?.size)},async_directive_r=e=>{for(let t;t=e._$AM;e=t){let s=t._$AN;if(void 0===s)t._$AN=s=new Set;else if(s.has(e))break;s.add(e),async_directive_c(t)}};function async_directive_h(e){void 0!==this._$AN?(async_directive_o(this),this._$AM=e,async_directive_r(this)):this._$AM=e}function async_directive_n(e,t=!1,s=0){const i=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(t)if(Array.isArray(i))for(let e=s;e<i.length;e++)async_directive_s(i[e],!1),async_directive_o(i[e]);else null!=i&&(async_directive_s(i,!1),async_directive_o(i));else async_directive_s(this,e)}const async_directive_c=e=>{2==e.type&&(e._$AP??=async_directive_n,e._$AQ??=async_directive_h)};class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),async_directive_r(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(async_directive_s(this,e),async_directive_o(this))}setValue(e){if((e=>void 0===this._$Ct.strings)())this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const ref_e=()=>new ref_h;class ref_h{}const ref_o=new WeakMap,ref_n=directive_e(class extends async_directive_f{render(e){return E}update(e,[t]){const s=t!==this.G;return s&&void 0!==this.G&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),E}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){const t=this.ht??globalThis;let s=ref_o.get(t);void 0===s&&(s=new WeakMap,ref_o.set(t,s)),void 0!==s.get(this.G)&&this.G.call(this.ht,void 0),s.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?ref_o.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});export{unsafe_html_e as UnsafeHTMLDirective,Z as _$LH,ref_e as createRef,x as html,w as mathml,T as noChange,E as nothing,ref_n as ref,B as render,repeat_c as repeat,b as svg,unsafe_html_o as unsafeHTML};let $LH=unsafe_html_e,html=x,noChange=T,nothing=A,render=B,repeat=repeat_c,svg=b,unsafeHTML=unsafe_html_o,ref=ref_e;
export class CuppaSortable extends CuppaComponent {
	static attributes = ['handle', 'sortable-class', 'on-drag-class', 'drag-opacity', 'return-value', 'value-key', 'order-key'];
	handle;
	sortableClass = 'cuppa-sortable';
	value;
	values;
	returnValue = false;
	valueKey = 'value';
	orderKey = '';
	content;
	startCallback;
	endCallback;
	overCallback;
	enterCallback;
	leaveCallback;
	dropCallback;
	
	mounted() {
		CuppaSortable.sortable({
			currentElement: this,
			sortableClass: this.sortableClass,
			handle:this.handle,
			value:this.value,
			values:this.values,
			returnValue:this.returnValue,
			valueKey:this.valueKey,
			orderKey:this.orderKey,
			startCallback:(e)=>{
				if(this.startCallback) this.startCallback(this);
				this.dispatchEvent(new CustomEvent("start", {detail:this}));
			},
			endCallback:(e)=>{
				if(this.endCallback) this.endCallback(this);
				this.dispatchEvent(new CustomEvent("end", {detail:this}));
			},
			overCallback:(e)=>{
				if(this.overCallback) this.overCallback(this);
			},
			enterCallback:(e)=>{
				if(this.enterCallback) this.enterCallback(this);
				this.dispatchEvent(new CustomEvent("enter", {detail:this}));
			},
			leaveCallback:(e)=>{
				if(this.leaveCallback) this.leaveCallback(this);
				this.dispatchEvent(new CustomEvent("leave", {detail:this}));
			},
			dropCallback:(result)=>{
				if(this.dropCallback) this.dropCallback(result);
				this.dispatchEvent(new CustomEvent("change", {detail:result}));
			}
		})
	}
	
	static sortable(
		{
			currentElement,
			sortableClass,
			handle,
			value,
			values,
			returnValue = false,
			valueKey = 'value',
			orderKey = '',
			startCallback,
			endCallback,
			overCallback,
			enterCallback,
			leaveCallback,
			dropCallback,
		}
	) {
		cuppa.sortable({
			currentElement,
			sortableClass,
			handle,
			value,
			values,
			returnValue,
			valueKey,
			orderKey,
			startCallback,
			endCallback,
			overCallback,
			enterCallback,
			leaveCallback,
			dropCallback,
		})
	}
	
	render(){
		return html`
            ${this._children}
            ${this.content}
		`
	}
}
customElements.define('cuppa-sortable', CuppaSortable);

const cuppa = {};
cuppa.newElement = function(str, {useTemplate = false} = {}){
	if(useTemplate){
		const temp = document.createElement('template');
		temp.innerHTML = str.trim();
		return temp.content.firstChild
	}else{
		let parent;
		let substr = str.substring(0,3);
		if(substr === "<tr") parent = document.createElement('tbody');
		else if(substr === "<td" || substr === "<th") parent = document.createElement('tr');
		else if(substr === "<col") parent = document.createElement('colgroup');
		else parent = document.createElement('div');
		parent.innerHTML = (str || '').trim();
		return parent.firstChild;
	}
};

cuppa.addClass = (elements, className)=>{
	if(typeof elements === 'string') elements = document.querySelectorAll(elements);
	if(elements && !(elements instanceof NodeList)) elements = [elements];
	elements.forEach(sortable => sortable.classList.add(className));
}

cuppa.removeClass = (elements, className)=>{
	if(typeof elements === 'string') elements = document.querySelectorAll(elements);
	if(elements && !(elements instanceof NodeList)) elements = [elements];
	elements.forEach(sortable => sortable.classList.remove(className));
}
cuppa.setAttribute = (elements, attribute, value)=>{
	if(typeof elements === 'string') elements = document.querySelectorAll(elements);
	if(elements && !(elements instanceof NodeList)) elements = [elements];
	elements.forEach(sortable => sortable.setAttribute(attribute, value));
}
cuppa.removeAttribute = (elements, attribute)=>{
	if(typeof elements === 'string') elements = document.querySelectorAll(elements);
	if(elements && !(elements instanceof NodeList)) elements = [elements];
	elements.forEach(sortable => sortable.removeAttribute(attribute));
}
cuppa.attribute = function(elements, name, value, remove){
	if(!elements || !name) return;
	if(typeof elements === 'string') elements = document.querySelectorAll(elements);
	if(elements && !(elements instanceof NodeList)) elements = [elements];
	let i;
	let element;
	if(remove){
		for(i = 0; i < elements.length; i++){
			element = elements[i];
			element.removeAttribute(name);
		}
		return;
	}
	if(value !== undefined && value !== null){
		for(i = 0; i < elements.length; i++){
			element = elements[i];
			element.setAttribute(name, value);
		}
	}else{
		try{ value = elements[0].getAttribute(name); }catch(err){}
		return value;
	}
}

cuppa.reorderArrayObject = function({values, key = 'value', from, to, orderKey = ''} = {}){
	if (!from || !to) return values;
	let fromIndex = values.findIndex(d => d[key] === from);
	let toIndex = values.findIndex(d => d[key] === to);
	if (fromIndex === -1 || toIndex === -1) return values;
	values.splice(toIndex, 0, values.splice(fromIndex, 1)[0]);
	if(orderKey) values.forEach((item, index) => item[orderKey] = index);
	return values;
}

cuppa.getSortableElementAtCoords = ({x, y, elements, ignore = null})=>{
	if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
	let best = null;
	let bestDistance = Infinity;
	for (const element of elements) {
		if (!element || element === ignore) continue;
		const rect = element.boundingClientRect;
		if (!rect) continue;
		if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
			return element;
		}
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = x - cx;
		const dy = y - cy;
		const distance = dx * dx + dy * dy;
		if (distance < bestDistance) {
			bestDistance = distance;
			best = element;
		}
	}
	return best;
}

cuppa.dragElement = null;
cuppa.elements = [];
cuppa.from = null;
cuppa.to = null;
cuppa.sortable = (
	{
		currentElement,
		sortableClass,
		handle,
		value,
		returnValue = false,
		values,
		valueKey = 'value',
		orderKey = '',
		startCallback,
		endCallback,
		overCallback,
		enterCallback,
		leaveCallback,
		dropCallback,
	}
) => {
	if(handle){
		const _handle = currentElement.querySelector(handle);
		if(_handle){
			_handle.onmousedown = (e) => { currentElement.draggable = true; }
			_handle.onmouseleave = (e) => { cuppa.attribute(sortableClass, 'draggable', 'false'); }
		}
	}else{
		currentElement.setAttribute('draggable', 'true');
	}
	currentElement.value = value;
	currentElement.ondragstart = (e)=>{
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.dropEffect = 'move';
		resetElements();
		cuppa.from = currentElement;
		setTimeout(()=>{ cuppa.from.style.opacity = 0; }, 0);
		cuppa.to = null;
		cuppa.elements = getElements();
		if(startCallback) startCallback();
	}
	currentElement.ondragend = (e)=>{
		resetElements();
		currentElement.style.opacity = '';
		if(endCallback) endCallback();
	}
	currentElement.ondragover = (e)=>{
		e.preventDefault();
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.dropEffect = 'move';
		if(overCallback) overCallback();
	};
	currentElement.ondragenter = (e)=>{
		cuppa.to = cuppa.getSortableElementAtCoords({x:e.clientX, y:e.clientY, elements:cuppa.elements});
		reordering({from:cuppa.from, to:cuppa.to });
		if (e.target === cuppa.from) return;
		if(enterCallback) enterCallback();
	};
	
	currentElement.ondragleave = (e)=>{
		if(leaveCallback) leaveCallback();
	};
	currentElement.ondrop = (e)=>{
		e.preventDefault();
		resetElements();
		if(cuppa.to === cuppa.from) return;
		const result = {from:cuppa.from, to:cuppa.to};
		if(returnValue){
			result.from = cuppa.from?.value;
			result.to = cuppa.to?.value;
			if(values){
				result.values = cuppa.reorderArrayObject({values, from:result.from?.[valueKey], to:result.to?.[valueKey], key:valueKey, orderKey});
			}
		}
		if(dropCallback) dropCallback(result);
	}
	
	const styleId = `cuppa-sortable-styles-${sortableClass}`;
	if(!document.querySelector(`#${styleId}`)){
		document.body.append(cuppa.newElement(`
			<style id="${styleId}">
				${sortableClass}{
					&.animated{ transition: transform 0.3s, opacity 0.01s; }
					&.d-i-children *{ pointer-events: none; -webkit-user-select: none; user-select: none; outline: none; }
					&.d-i-children&::after{ content: ''; position: absolute; top: 0; right: 0; left:0; bottom:0; background: rgba(0,0,0,0); }
				}
			</style>`
			, {useTemplate:true}))
	}
	
	function getElements(){
		const elements = Array.from(document.querySelectorAll(sortableClass));
		for(const element of elements){
			element.boundingClientRect = element.getBoundingClientRect();
			element.classList.add('d-i-children');
		}
		return elements;
	}
	
	function resetElements(){
		for(const element of cuppa.elements){
			element.classList.remove('animated');
			element.classList.remove('d-i-children');
			element.style.transform = `translateX(0) translateY(0)`;
		}
	}
	
	function reordering({from, to} = {}){
		if(!from || !to) return;
		const list = Array.from(cuppa.elements);
		const fromIndex = list.indexOf(from);
		const toIndex = list.indexOf(to);
		if(fromIndex === -1 || toIndex === -1) return;
		for(const element of list){ applyTransform({element, x: '0px', y: '0px'}); }
		const isForward = fromIndex < toIndex;
		const draggedRect = from.boundingClientRect;
		// move dragged element to the hovered element position
		const targetRect = to.boundingClientRect;
		applyTransform({element: from, x: `${targetRect.left - draggedRect.left}px`, y: `${targetRect.top - draggedRect.top}px`,});
		// shift the elements between from and to one by one
		if(isForward){
			for(let i = fromIndex + 1; i <= toIndex; i++){
				const element = list[i];
				const prev = i === fromIndex + 1 ? from : list[i - 1];
				const prevRect = prev.boundingClientRect;
				const currentRect = element.boundingClientRect;
				applyTransform({element, x: `${prevRect.left - currentRect.left}px`, y: `${prevRect.top - currentRect.top}px`, animated:true});
			}
		}else{
			for(let i = fromIndex - 1; i >= toIndex; i--){
				const element = list[i];
				const next = i === fromIndex - 1 ? from : list[i + 1];
				const nextRect = next.boundingClientRect;
				const currentRect = element.boundingClientRect;
				applyTransform({element, x: `${nextRect.left - currentRect.left}px`, y: `${nextRect.top - currentRect.top}px`, animated:true});
			}
		}
	}
	
	function applyTransform({element, x = '0px', y = '0px', animated = false} = {}){
		if(animated) element.classList.add('animated');
		element.style.transform = `translateX(${x}) translateY(${y})`;
	}
	
}
