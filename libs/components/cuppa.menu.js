/*! v0.0.18 */
/*! v0.0.17 */
export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];static set tag(tagName){customElements.get(tagName)||customElements.define(tagName,this),this._tag=tagName}static get tag(){return this._tag}static set global(value){document.defaultView&&value&&(document.defaultView[this.name]=this)}constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.applyObservables=this.applyObservables.bind(this),this.applyObservables(),this.binAll(this)}static get observedAttributes(){return this.attributes||[]}attributeChangedCallback(attr,oldVal,newVal){oldVal!==newVal&&("false"===newVal&&(newVal=!1),"true"===newVal&&(newVal=!0),this[camelize(attr)]=newVal)}applyObservables(){this.constructor.observables&&setTimeout((()=>{let data={};for(let i=0;i<this.constructor.observables.length;i++){let name=this.constructor.observables[i];data[name]=this[name]}this.observables(data),this.forceRender()}),0)}getPropertiesCallbacks(){let _entries=Object.entries(this);for(let i=0;i<_entries.length;i++){let[key,value]=_entries[i];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(key)&&this._callbacks.push({key:key,value:value})}}reSetPropertiesCallbacks(){for(let i=0;i<this._callbacks.length;i++){let{key:key,value:value}=this._callbacks[i];this[key]=value}}connectedCallback(){this._children=[...this.childNodes],this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.beforeMount&&this.beforeMount(this),this.forceRender(null,!1),setTimeout((()=>{this.applyStylesAfterRender(),this.rendered&&this.rendered(this.renderedCount,this),this.mounted&&this.mounted(this)}),0)}applyStylesAfterRender(){const styleAfterRender=this.getAttribute("style-after-render");if(styleAfterRender)for(const style of styleAfterRender.split(";")){const[name,value]=style.split(":");name&&value&&(this.style[name.trim()]=value.trim())}}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(args={},{forceRender:forceRender=!0}={}){for(const key in args)void 0!==this[`_${key}`]&&(this[`_${key}`]=args[key]);forceRender&&this.forceRender()}forceRender(callback=null,dispatchRender=!0){this.beforeRender&&this.beforeRender(this),this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),callback&&callback(),this.renderedCount++,this.firstRendered&&1===this.renderedCount&&this.firstRendered(this.renderedCount,this),this.rendered&&dispatchRender&&this.rendered(this.renderedCount,this)}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"constructor"!==propertyNames[i]&&"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}bind(element){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));for(let i=0;i<propertyNames.length;i++)if("function"==typeof element[propertyNames[i]]){if(this[propertyNames[i]])continue;this[propertyNames[i]]=element[propertyNames[i]].bind(element)}}observables(object,callback){let firstName,target=this;if(object){if(!Array.isArray(object))return Object.keys(object).map(((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})})),target[firstName];object.forEach((varName=>{this.observable(varName,this[varName])}))}}observable(varName,defaultValue){return setTimeout((()=>{defaultValue&&void 0===this[varName]||(defaultValue=this[varName]),this.observables({[varName]:defaultValue})}),0),defaultValue}}export function camelize(str){return(str=(str=(str=(str=(str=String(str)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(match,index){return 0==+match?"":0===index?match.toLowerCase():match.toUpperCase()}))}const t=globalThis,i=t=>t,s=t.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),T=x(3),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o+x):s+o+(-2===d?i:x)}return[V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t)}else t.startsWith(o)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o),i=t.length-1;if(i>0){r.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c())}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(o,t+1));)d.push({type:7,index:l}),t+=o.length-1}l++}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,!0);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n]}o!==r?.index&&(h=P.nextNode(),o++)}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=i(t).nextSibling;i(t).remove(),t=s}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const j={M:h,P:o,A:n,C:1,L:N,R:R,D:d,V:M,I:k,H:H,N:L,U:z,B:I,F:Z},B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{})}return h._$AI(t),h},directive_t_CHILD=2,directive_e=t=>(...e)=>({_$litDirective$:t,values:e});class directive_i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const{I:directive_helpers_t}=j,directive_helpers_i=o=>o,directive_helpers_s=()=>document.createComment(""),directive_helpers_v=(o,n,e)=>{const l=o._$AA.parentNode,d=void 0===n?o._$AB:n._$AA;if(void 0===e){const i=l.insertBefore(directive_helpers_s(),d),n=l.insertBefore(directive_helpers_s(),d);e=new directive_helpers_t(i,n,o,o.options)}else{const t=e._$AB.nextSibling,n=e._$AM,c=n!==o;if(c){let t;e._$AQ?.(o),e._$AM=o,void 0!==e._$AP&&(t=o._$AU)!==n._$AU&&e._$AP(t)}if(t!==d||c){let o=e._$AA;for(;o!==t;){const t=directive_helpers_i(o).nextSibling;directive_helpers_i(l).insertBefore(o,d),o=t}}}return e},directive_helpers_u=(o,t,i=o)=>(o._$AI(t,i),o),directive_helpers_m={},directive_helpers_p=(o,t=directive_helpers_m)=>o._$AH=t,directive_helpers_h=o=>{o._$AR(),o._$AA.remove()},repeat_u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},repeat_c=directive_e(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return{values:o,keys:l}}render(e,s,t){return this.dt(e,s,t).values}update(s,[t,r,c]){const d=(o=>o._$AH)(s),{values:p,keys:a}=this.dt(t,r,c);if(!Array.isArray(d))return this.ut=a,p;const h=this.ut??=[],v=[];let m,y,x=0,j=d.length-1,k=0,w=p.length-1;for(;x<=j&&k<=w;)if(null===d[x])x++;else if(null===d[j])j--;else if(h[x]===a[k])v[k]=directive_helpers_u(d[x],p[k]),x++,k++;else if(h[j]===a[w])v[w]=directive_helpers_u(d[j],p[w]),j--,w--;else if(h[x]===a[w])v[w]=directive_helpers_u(d[x],p[w]),directive_helpers_v(s,v[w+1],d[x]),x++,w--;else if(h[j]===a[k])v[k]=directive_helpers_u(d[j],p[k]),directive_helpers_v(s,d[x],d[j]),j--,k++;else if(void 0===m&&(m=repeat_u(a,k,w),y=repeat_u(h,x,j)),m.has(h[x]))if(m.has(h[j])){const e=y.get(a[k]),t=void 0!==e?d[e]:null;if(null===t){const e=directive_helpers_v(s,d[x]);directive_helpers_u(e,p[k]),v[k]=e}else v[k]=directive_helpers_u(t,p[k]),directive_helpers_v(s,d[x],t),d[e]=null;k++}else directive_helpers_h(d[j]),j--;else directive_helpers_h(d[x]),x++;for(;k<=w;){const e=directive_helpers_v(s,v[w+1]);directive_helpers_u(e,p[k]),v[k++]=e}for(;x<=j;){const e=d[x++];null!==e&&directive_helpers_h(e)}return this.ut=a,directive_helpers_p(s,v),E}});class unsafe_html_e extends directive_i{constructor(i){if(super(i),this.it=A,2!==i.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this._t=void 0,this.it=r;if(r===E)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;const unsafe_html_o=directive_e(unsafe_html_e),async_directive_s=(i,t)=>{const e=i._$AN;if(void 0===e)return!1;for(const i of e)i._$AO?.(t,!1),async_directive_s(i,t);return!0},async_directive_o=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t}while(0===e?.size)},async_directive_r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),async_directive_c(t)}};function async_directive_h(i){void 0!==this._$AN?(async_directive_o(this),this._$AM=i,async_directive_r(this)):this._$AM=i}function async_directive_n(i,t=!1,e=0){const r=this._$AH,h=this._$AN;if(void 0!==h&&0!==h.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)async_directive_s(r[i],!1),async_directive_o(r[i]);else null!=r&&(async_directive_s(r,!1),async_directive_o(r));else async_directive_s(this,i)}const async_directive_c=i=>{2==i.type&&(i._$AP??=async_directive_n,i._$AQ??=async_directive_h)};class async_directive_f extends directive_i{constructor(){super(...arguments),this._$AN=void 0}_$AT(i,t,e){super._$AT(i,t,e),async_directive_r(this),this.isConnected=i._$AU}_$AO(i,t=!0){i!==this.isConnected&&(this.isConnected=i,i?this.reconnected?.():this.disconnected?.()),t&&(async_directive_s(this,i),async_directive_o(this))}setValue(t){if((o=>void 0===this._$Ct.strings)())this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}const ref_e=()=>new ref_h;class ref_h{}const ref_o=new WeakMap,ref_n=directive_e(class extends async_directive_f{render(i){return A}update(i,[s]){const e=s!==this.G;return e&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.G=s,this.ht=i.options?.host,this.rt(this.ct=i.element)),A}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){const i=this.ht??globalThis;let s=ref_o.get(i);void 0===s&&(s=new WeakMap,ref_o.set(i,s)),void 0!==s.get(this.G)&&this.G.call(this.ht,void 0),s.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?ref_o.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),keyed_i=directive_e(class extends directive_i{constructor(){super(...arguments),this.key=A}render(r,t){return this.key=r,t}update(r,[t,e]){return t!==this.key&&(directive_helpers_p(r),this.key=t),e}});export{unsafe_html_e as UnsafeHTMLDirective,j as _$LH,ref_e as createRef,b as html,keyed_i as keyed,T as mathml,E as noChange,A as nothing,ref_n as ref,D as render,repeat_c as repeat,w as svg,unsafe_html_o as unsafeHTML};let html=b,noChange=E,nothing=A,render=D,repeat=repeat_c,svg=w,unsafeHTML=unsafe_html_o,createRef=ref_e,ref=ref_n;

export class CuppaMenu extends CuppaComponent {
	static POSITION = {
		CENTER: "CENTER",
		LEFT: "LEFT",
		LEFT_IN: "LEFT_IN",
		RIGHT: "RIGHT",
		RIGHT_IN: "RIGHT_IN",
		TOP: "TOP",
		TOP_IN: "TOP_IN",
		BOTTOM: "BOTTOM",
		BOTTOM_IN: "BOTTOM_IN"
	}
	static ARROW = {UP: "UP", LEFT: "LEFT", RIGHT: "RIGHT", DOWN: "DOWN", NONE: "NONE"}
	static ADJUST_TYPE = {OPPOSITE: 'OPPOSITE', GAP: 'GAP', NONE: 'NONE'}
	static attributes = ['target', 'pos-x', 'pos-y', 'force-show', 'force-remove', 'arrow', 'style-arrow', 'main-menu', 'contextual-menu', 'adjust-type', 'theme', 'show-on-mouse-over', 'overwrite-left', 'overwrite-top'];
	static observables = ['posX', 'posY', 'arrow', 'adjustType'];
	posX = CuppaMenu.POSITION.RIGHT;
	posY = CuppaMenu.POSITION.TOP_IN;
	arrow = CuppaMenu.ARROW.NONE;
	adjustType = CuppaMenu.ADJUST_TYPE.GAP;
	styleArrow = "";
	target;
	targetElement;
	mainMenu = true;
	contextualMenu = false;
	onMenu = false;
	delayCloseTimeout;
	forceShow = false;
	forceRemove = false;
	groupEvents = `CuppaMenu_${crypto.randomUUID()}`;
	theme = "light";
	showOnMouseOver = false;
	showCallback;
	closeCallback;
	overwriteLeft;
	overwriteTop;
	
	mounted() {
		if (this.parentElement.closest('cuppa-menu')) {
			this.mainMenu = false;
		} else {
			this.mainMenu = true;
			this.classList.add('main-menu');
		}
		if (this.target) {
			this.targetElement = document.querySelector(this.target);
		}
		
		if(this.forceShow) this.setPosition();
		setTimeout(() => {
			this.addEvents()
		}, 200);
	}
	
	setPosition(autoAdjust = true) {
		if (!this.targetElement) return;
		this.style.visibility = 'hidden';
		this.style.display = 'block';
		let dimTarget = this.targetElement.getBoundingClientRect();
		let dim = this.getBoundingClientRect();
		this.style.display = 'none';
		this.style.visibility = 'visible';
		let offset = (this.arrow === CuppaMenu.ARROW.NONE || !this.arrow) ? 0 : 5;
		console.log('overwriteLeft', this.overwriteLeft);
		if(this.overwriteLeft !== ''){
			dimTarget.x = parseInt(this.overwriteLeft);
		}
		if(this.overwriteTop !== ''){
			dimTarget.y = parseInt(this.overwriteTop);
		}
		console.log(dimTarget.y)
		// x
		let posX = this.posX.toUpperCase();
		if (posX === CuppaMenu.POSITION.CENTER) {
			this.style.left = `${dimTarget.x + (dimTarget.width - dim.width) * 0.5}px`;
		} else if (posX === CuppaMenu.POSITION.LEFT) {
			this.style.left = `${dimTarget.x - dim.width - offset}px`;
		} else if (posX === CuppaMenu.POSITION.LEFT_IN) {
			this.style.left = `${dimTarget.x}px`;
		} else if (posX === CuppaMenu.POSITION.RIGHT) {
			this.style.left = `${dimTarget.x + dimTarget.width + offset}px`;
		} else if (posX === CuppaMenu.POSITION.RIGHT_IN) {
			this.style.left = `${dimTarget.x + dimTarget.width - dim.width}px`;
		}
		// y
		let posY = this.posY.toUpperCase();
		if (posY === CuppaMenu.POSITION.CENTER) {
			this.style.top = `${dimTarget.y + (dimTarget.height - dim.height) * 0.5}px`;
		} else if (posY === CuppaMenu.POSITION.TOP) {
			this.style.top = `${dimTarget.y - dim.height - offset}px`;
		} else if (posY === CuppaMenu.POSITION.TOP_IN) {
			this.style.top = `${dimTarget.y}px`;
		} else if (posY === CuppaMenu.POSITION.BOTTOM) {
			this.style.top = `${dimTarget.y + dimTarget.height + offset}px`;
		} else if (posY === CuppaMenu.POSITION.BOTTOM_IN) {
			this.style.top = `${dimTarget.y + dimTarget.height - dim.height}px`;
		}
		if (this.forceShow) {
			this.style.display = 'block';
			this.dispatchEvent(new CustomEvent("show", {detail: null}));
			if (this.showCallback) this.showCallback(this);
		} else {
			this.style.display = 'none';
		}
		if (autoAdjust) this.autoAdjust();
	}
	
	autoAdjust() {
		let dimTarget = cuppa.dim(this.targetElement);
		let dim = cuppa.dim(this);
		let gap = 20;
		
		if (dim.x < 0) {
			if (this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE) {
				this.posX = CuppaMenu.POSITION.LEFT_IN;
			} else if (this.adjustType === CuppaMenu.ADJUST_TYPE.GAP) {
				this.style.left = `10px`;
			}
		} else if (dim.x + dim.width + gap > window.innerWidth) {
			if (this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE) {
				this.posX = CuppaMenu.POSITION.RIGHT_IN;
				if (this.refs.arrow) {
					let arrowDim = this.refs.arrow.getBoundingClientRect();
					this.refs.arrow.style.left = `calc(100% - ${dimTarget.width * 0.5 + arrowDim.width * 0.5}px)`;
				}
			} else if (this.adjustType === CuppaMenu.ADJUST_TYPE.GAP) {
				this.style.left = `${window.innerWidth - dim.width - 10}px`;
			}
		}
		if (dim.y2 < 0) {
			if (this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE) {
				this.posY = CuppaMenu.POSITION.BOTTOM;
			} else if (this.adjustType === CuppaMenu.ADJUST_TYPE.GAP) {
				this.style.top = `10px`;
			}
		} else if (dim.y2 + dim.height + gap > window.innerHeight) {
			if (this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE) {
				this.posY = CuppaMenu.POSITION.TOP;
				this.arrow = CuppaMenu.ARROW.DOWN;
			} else if (this.adjustType === CuppaMenu.ADJUST_TYPE.GAP) {
				this.style.top = `${window.innerHeight - dim.height - 10}px`;
			}
		}
		
		if (this.adjustType === CuppaMenu.ADJUST_TYPE.OPPOSITE) {
			this.setPosition(false);
		}
	}
	
	addEvents() {
		if (this.contextualMenu) {
			cuppa.on(window, `click`, this.close, this.groupEvents);
			cuppa.on(window, `scroll`, this.close, this.groupEvents);
			cuppa.on(this.targetElement, `click`, this.show, this.groupEvents);
			if (this.showOnMouseOver) cuppa.on(this.targetElement, `mouseenter`, this.show, this.groupEvents);
		} else if (this.mainMenu) {
			cuppa.on(window, `click`, this.close, this.groupEvents);
			cuppa.on(window, `scroll`, this.close, this.groupEvents);
			cuppa.on(this.targetElement, `click`, (e) => {
				this.show(e, true);
			}, this.groupEvents);
			if (this.showOnMouseOver) cuppa.on(this.targetElement, `mouseenter`, this.show, this.groupEvents);
			cuppa.on(this.targetElement, `mouseenter`, (e) => {
				let others = this.getOthers({includeContextualMenu: false});
				if (others.length) {
					this.closeOthers();
					this.show(e);
				}
			}, this.groupEvents);
		} else {
			cuppa.on(this.targetElement, `click`, e => e.stopPropagation(), this.groupEvents);
			cuppa.on(this.targetElement, `mouseenter`, this.show, this.groupEvents);
			cuppa.on(this.targetElement, `mouseleave`, this.delayClose, this.groupEvents);
			cuppa.on(this, `mouseenter`, (e) => {
				this.onMenu = true
			}, this.groupEvents);
			cuppa.on(this, `mouseleave`, this.close, this.groupEvents);
		}
	}
	
	show(e, force = false) {
		e.stopPropagation();
		if (this.style.display === 'block' && this.mainMenu) {
			if (!this.showOnMouseOver || force) this.style.display = 'none';
		} else {
			this.setPosition();
			if (this.delayCloseTimeout) clearTimeout(this.delayCloseTimeout);
			this.style.display = 'block';
			this.closeOthers();
		}
		this.dispatchEvent(new CustomEvent("show", {detail: null}));
		if (this.showCallback) this.showCallback(this);
	}
	
	closeOthers() {
		if (!this.mainMenu) return;
		let elements = this.getOthers();
		elements.map(element => element.close());
	}
	
	getOthers({onlyShowed = true, includeContextualMenu = true} = {}) {
		let elements = document.querySelectorAll('cuppa-menu.main-menu');
		elements = Array.from(elements).filter(element => {
			if (element === this) return null;
			if (onlyShowed && element.style.display === 'none') return null;
			if (!includeContextualMenu && element.contextualMenu) return null;
			return element;
		});
		return elements || [];
	}
	
	delayClose(e) {
		if (this.delayCloseTimeout) clearTimeout(this.delayCloseTimeout);
		this.delayCloseTimeout = setTimeout(() => {
			if (!this.onMenu) {
				this.close();
			}
		}, 0)
	}
	
	close(e) {
		if (!this.targetElement || this.forceRemove) {
			this.remove();
		} else {
			this.onMenu = false;
			this.style.display = 'none';
		}
		this.dispatchEvent(new CustomEvent("close", {detail: null}));
		if (this.closeCallback) this.closeCallback(this);
	}
	
	unmounted() {
		cuppa.offGroup(this.groupEvents)
	}
	
	render() {
		return html`
            ${this.arrow === "" || this.arrow.toUpperCase() === CuppaMenu.ARROW.NONE ? `` : html`
                <svg class="cuppa-menu_arrow ${this.arrow.toLowerCase()}" width="10" height="5" viewBox="0 0 18 9"
                     preserveAspectRatio="none" style="${this.styleArrow}">
                    <path data-name="Icon ionic-md-arrow-dropup" d="M9,22.5l9-9,9,9Z" transform="translate(-9 -13.5)"/>
                </svg>
            `}
            <style>
                :root {
                    --cuppa-menu-bg: #fff;
                    --cuppa-menu-btn-bg: transparent;
                    --cuppa-menu-btn-bg-hover: rgba(0, 0, 0, 0.07);
                    --cuppa-menu-btn-color: #333;
                    --cuppa-menu-tint: invert(0%) sepia(96%) saturate(21%) hue-rotate(215deg) brightness(96%) contrast(102%);
                    --cuppa-menu-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
                    --cuppa-menu-border: 1px solid rgba(0, 0, 0, 0.06);
                    --cuppa-menu-border-bottom: 1px solid rgba(0, 0, 0, 0.02);
                    --cuppa-menu-separator: 1px solid rgba(0, 0, 0, 0.08);
                    --cuppa-menu-shortcut-color: rgba(0, 0, 0, 0.4);
                    --cuppa-menu-arrow-color: #fff;
                }

                cuppa-menu[theme=dark] {
                    color-scheme: dark;
                    --cuppa-menu-bg: #1e1e1e;
                    --cuppa-menu-btn-bg-hover: rgba(0, 0, 0, 0.3);
                    --cuppa-menu-btn-color: #fff;
                    --cuppa-menu-tint: invert(100%) sepia(3%) saturate(4%) hue-rotate(251deg) brightness(115%) contrast(100%);
                    --cuppa-menu-border: 1px solid rgba(255, 255, 255, 0.06);
                    --cuppa-menu-border-bottom: 1px solid rgba(255, 255, 255, 0.02);
                    --cuppa-menu-separator: 1px solid rgba(255, 255, 255, 0.08);
                    --cuppa-menu-arrow-color: #1e1e1e;
                }

                cuppa-menu {
                    display: block;
                    visibility: visible;
                    position: fixed;
                    left: 0;
                    top: 0;
                    border: var(--cuppa-menu-border);
                    border-bottom: var(--cuppa-menu-border-bottom);
                    padding: 4px 0px;
                    min-width: 140px;
                    white-space: nowrap;
                    background: var(--cuppa-menu-bg);
                    border-radius: 5px;
                    box-shadow: var(--cuppa-menu-shadow);
                    z-index: 1;
                    margin-top: 3px;
                }

                cuppa-menu button {
                    border: none;
                    outline: none;
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

                cuppa-menu button:hover {
                    background: var(--cuppa-menu-btn-bg-hover);
                }

                cuppa-menu hr {
                    border: none;
                    border-bottom: var(--cuppa-menu-separator);
                    margin: 7px 0;
                }

                cuppa-menu .shortcut {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    color: var(--cuppa-menu-shortcut-color);
                    min-width: 60px;
                    padding-left: 20px;
                }

                cuppa-menu img {
                    height: 14px;
                    margin-right: 14px;
                    filter: var(--cuppa-menu-tint);
                }

                cuppa-menu i {
                    width: 14px;
                    height: 14px;
                    background: no-repeat center;
                    background-size: contain;
                }

                cuppa-menu i {
                    margin: 0 14px 0 0;
                }

                cuppa-menu i.more {
                    width: 12px;
                    height: 12px;
                    filter: var(--cuppa-menu-tint);
                    margin: 0 0 0 14px;
                    background-image: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zNDEuOTU3MjA5IDk1OS4zNTQ2NzhjLTEyLjg5MzY1OCAwLTI1Ljg0MjU3NS00LjQyNTc5OS0zNi4zODY3MjItMTMuNDY3NzMzLTIzLjQ5MzA2NC0yMC4xMDU5Mi0yNi4yMjQyNjgtNTUuNDI2MzU3LTYuMDY0MTEzLTc4Ljg5MTc5MUw2MDMuOTI5NzM2IDUxMS43ODkxOTlsLTMwNC40MjMzNjEtMzU1LjIwNjk3OGMtMjAuMTYwMTU1LTIzLjQ2NTQzNC0xNy40Mjc5MjgtNTguNzg2ODk0IDYuMDY0MTEzLTc4Ljg5MTc5MSAyMy40Mzc4MDUtMjAuMDI0MDU2IDU4Ljc4Njg5NC0xNy4zNzM2OTMgNzguODM3NTU2IDYuMDY0MTEzbDMzNS42NzUxMzIgMzkxLjYyMDMwNWMxNy45NzQzNzMgMjAuOTUyMTk0IDE3Ljk3NDM3MyA1MS44NzU0ODQgMCA3Mi44Mjc2NzlsLTMzNS42NzUxMzIgMzkxLjYyMDMwNUMzNzMuMzcxNjg2IDk1Mi43MTc1MTQgMzU3LjY5MTU2NSA5NTkuMzU0Njc4IDM0MS45NTcyMDkgOTU5LjM1NDY3OHoiICAvPjwvc3ZnPg==)
                }

                cuppa-menu .cuppa-menu_arrow {
                    position: absolute;
                    fill: var(--cuppa-menu-arrow-color)
                }

                cuppa-menu .cuppa-menu_arrow.up {
                    top: -4px;
                    left: 15px;
                }

                cuppa-menu .cuppa-menu_arrow.left {
                    transform: rotate(-90deg);
                    top: 15px;
                    left: -7px;
                }

                cuppa-menu .cuppa-menu_arrow.right {
                    transform: rotate(90deg);
                    top: 15px;
                    right: -7px;
                }

                cuppa-menu .cuppa-menu_arrow.down {
                    transform: rotate(180deg);
                    bottom: -4px;
                    left: 15px;
                }
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
cuppa.on = function (elements, event, callback, groupName, useCapture) {
	if (!elements) return;
	if (!Array.isArray(elements)) elements = [elements];
	cuppa.off(elements, event, callback, groupName); // prevent duplicate events
	if (!groupName) groupName = "default";
	if (useCapture === undefined) useCapture = false;
	if (!cuppa.eventGroups[groupName]) cuppa.eventGroups[groupName] = new Map();
	for (let i = 0; i < elements.length; i++) {
		let element = elements[i];
		if (!element) continue;
		if (element.addEventListener) element.addEventListener(event, callback, useCapture);
		let events = cuppa.eventGroups[groupName].get(element);
		if (!events) events = [];
		events.push({event: event, callback: callback});
		cuppa.eventGroups[groupName].set(element, events);
	}
};
// Remove a single event
cuppa.off = function (elements, event, callback, groupName) {
	if (!Array.isArray(elements)) elements = [elements];
	if (!groupName) groupName = "default";
	if (!cuppa.eventGroups[groupName]) return;
	if (!elements) return;
	if (event === "removed") event = "DOMNodeRemoved";
	for (let i = 0; i < elements.length; i++) {
		let events = cuppa.eventGroups[groupName].get(elements[i]);
		if (!events) break;
		for (let j = events.length - 1; j >= 0; j--) {
			if (callback) {
				if (events[j].event === event && events[j].callback === callback) {
					elements[i].removeEventListener(events[j].event, events[j].callback);
					events.splice(j, 1);
					break;
				}
				;
			} else {
				if (events[j].event === event) {
					elements[i].removeEventListener(events[j].event, events[j].callback);
					events.splice(j, 1);
				}
				;
			}
			;
		}
		;
		cuppa.eventGroups[groupName].set(elements[i], events);
	}
	;
};

// Remove event by Group
cuppa.offGroup = function (groupName) {
	if (!groupName) groupName = "default";
	let map = cuppa.eventGroups[groupName];
	if (!map) return;
	map.forEach(function (events, element) {
		for (let i = 0; i < events.length; i++) {
			element.removeEventListener(events[i].event, events[i].callback);
		}
		;
	});
	map["delete"](groupName);
};
// getUUid
cuppa.uuid = function () {
	let d = new Date().getTime();
	if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
		d += performance.now(); //use high-precision timer if available
	}
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
};

cuppa.dim = function (element, opts) {
	if (!opts) opts = {}
	if (element == undefined || element == "body") element = document.body;
	let value = {width: 0, height: 0, x: 0, y: 0};
	// change parents elements
	let parents = cuppa.parents(element);
	let tmpParents = new Array();
	for (let i = 0; i < parents.length; i++) {
		if (cuppa.css(parents[i], "display") == "none") tmpParents.push(parents[i]);
	}
	if (cuppa.css(element, "display") == "none") tmpParents.push(element);
	cuppa.css(tmpParents, {display: "block", visibility: "hidden"});
	
	let clientRect = element.getBoundingClientRect();
	let scrollPos = cuppa.scrollPosition(opts.scrollRef);
	let style = getComputedStyle(element);
	// x,y (position from init of document) - not work
	value.x = (window.scrollX) ? clientRect.left + window.scrollX : clientRect.left + window.pageXOffset;
	value.y = (window.scrollY) ? clientRect.top + window.scrollY : clientRect.top + window.pageYOffset;
	// x2,y2 (position from parent element) - work
	value.x2 = element.offsetLeft;
	value.y2 = element.offsetTop;
	// x3,y3 (fixed position on window) - work
	value.x3 = clientRect.left;
	value.y3 = clientRect.top;
	// x4,y4 (position from parent element + scroll position) - work
	value.x4 = value.x + scrollPos.x;
	value.y4 = value.y + scrollPos.x;
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
	cuppa.css(tmpParents, {display: "none", visibility: "visible"});
	return value;
};

// scrollPosition
cuppa.scrollPosition = function (element) {
	let pos = {x: 0, y: 0}
	if (!element || element == "body" || cuppa.elementType(element) == "body" || element == window) {
		pos.x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
		pos.y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	} else {
		pos.x = element.scrollLeft;
		pos.y = element.scrollTop;
	}
	;
	return pos;
};

cuppa.css = function (elements, property, opts) {
	if (!elements) return;
	elements = cuppa.element(elements);
	for (let k = 0; k < elements.length; k++) {
		let element = elements[k];
		if (typeof (property) == "object") {
			if (!Array.isArray(element)) element = [element];
			for (let i = 0; i < element.length; i++) {
				for (let css in property) {
					let value = property[css];
					let priority = "";
					if (value) {
						value = String(value);
						if (value.indexOf("!important") != -1) {
							priority = "important";
							value = value.replace("!important", "");
						}
						;
						element[i].style.setProperty(cuppa.trim(css), cuppa.trim(value), priority);
					}
					;
				}
				;
			}
			;
		} else {
			// opts default
			opts = opts || {};
			opts.number = opts.number || false;
			// get value
			let value;
			try {
				let style = window.getComputedStyle(element);
				value = style.getPropertyValue(property);
				if (opts.number) value = parseFloat(value) || 0;
			} catch (err) {
				value = null;
			}
			;
			return value;
		}
		;
	}
	;
};

cuppa.nodeType = function (element) {
	return element.nodeName.toLowerCase();
};
cuppa.elementType = function (element) {
	return cuppa.nodeType(element);
};


cuppa.parents = function (ref, opts) {
	opts = cuppa.mergeObjects([{reverse: false, type: ""}, opts]);
	let element = cuppa.element(ref)[0];
	if (!element) return;
	let parents = [];
	if (cuppa.elementType(element) === "body") return parents;
	while (element) {
		if (element.toString() !== "[object HTMLDocument]" && element.toString() !== "[object HTMLHtmlElement]") {
			if (opts.type) {
				if (cuppa.elementType(element) === opts.type) {
					parents.push(element);
				}
			} else {
				parents.push(element);
			}
		}
		;
		element = element.parentNode;
	}
	;
	parents.shift();
	if (opts.reverse) parents = parents.reverse();
	return parents;
};


cuppa.mergeObjects = function (array_objs, create_new_object) {
	if (!create_new_object) {
		let obj1 = array_objs.shift();
		for (let i = 0; i < array_objs.length; i++) {
			let obj = array_objs[i];
			if (obj) {
				for (let attrname in obj) {
					obj1[attrname] = obj[attrname];
				}
			}
		}
		;
		return obj1;
	} else {
		let tmp_obj = {};
		for (let i = 0; i < array_objs.length; i++) {
			let obj = array_objs[i];
			if (obj) {
				for (let attrname in obj) {
					tmp_obj[attrname] = obj[attrname];
				}
			}
		}
		;
		return tmp_obj;
	}
	;
};

cuppa.element = function (ref, opts) {
	if (!ref) return;
	opts = opts || {}
	opts.returnType = opts.returnType || "all";
	opts.query = opts.query || true;
	if (opts.target) opts.parent = opts.target;
	if (ref === "body") {
		if (opts.returnType === "first") return document.body;
		else if (opts.returnType === "last") return document.body;
		else return [document.body];
	} else if (Array.isArray(ref)) {
		if (opts.returnType === "first") return ref.shift();
		else if (opts.returnType === "last") return ref.pop();
		else return ref;
	} else if (ref.toString() === "[object NodeList]" || ref.toString() === "[object HTMLCollection]") {
		ref = Array.from(ref);
		if (opts.returnType === "first") return ref.shift();
		else if (opts.returnType === "last") return ref.pop();
		else return ref;
	} else if (typeof (ref) === "object") {
		if (opts.returnType === "first") return ref;
		else if (opts.returnType === "last") return ref;
		else return [ref];
	}
	;
	
	if (!opts.parent || opts.parent === "body") opts.parent = [document.body];
	if (typeof (opts.parent) === "string") opts.parent = cuppa.element(opts.parent);
	if (!Array.isArray(opts.parent)) opts.parent = [opts.parent];
	
	let nodes = [];
	if (!opts.parent) return nodes;
	for (let i = 0; i < opts.parent.length; i++) {
		let t = opts.parent[i];
		let n = null;
		if (cuppa.search("#", ref) && !opts.query) {
			let e = cuppa.replace(ref, "#", "");
			try {
				n = t.getElementById(e);
			} catch (err) {
			}
			if (n) nodes.push(n);
		} else if (cuppa.search(".", ref) && !opts.query) {
			ref = cuppa.replace(ref, "\\.", "");
			try {
				n = Array.from(t.getElementsByClassName(ref));
			} catch (err) {
			}
			if (n && n.length) nodes = nodes.concat(n);
		} else {
			try {
				n = Array.from(t.querySelectorAll(ref));
			} catch (err) {
			}
			if (n && n.length) nodes = nodes.concat(n);
		}
		;
	}
	;
	if (opts.not) nodes = nodes.filter(function (item) {
		if (item !== opts.not) {
			return item;
		} else {
			return null;
		}
	});
	if (opts.reverse || opts.invert) nodes.reverse();
	if (opts.returnType === "first") return nodes.shift();
	else if (opts.returnType === "last") return nodes.pop();
	else return nodes;
};

cuppa.trim = function (string) {
	if (string) return string.replace(/^\s+|\s+$/g, '');
	else return "";
};
