/*! v0.0.3 */
/*! v0.0.9 */
export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.applyObservables=this.applyObservables.bind(this),this.applyObservables(),this.binAll(this)}static get observedAttributes(){return this.attributes||[]}attributeChangedCallback(e,t,s){t!==s&&("false"===s&&(s=!1),"true"===s&&(s=!0),this[camelize(e)]=s)}applyObservables(){this.constructor.observables&&setTimeout((()=>{let e={};for(let t=0;t<this.constructor.observables.length;t++){let s=this.constructor.observables[t];e[s]=this[s]}this.observables(e),this.forceRender()}),0)}getPropertiesCallbacks(){let e=Object.entries(this);for(let t=0;t<e.length;t++){let[s,i]=e[t];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(s)&&this._callbacks.push({key:s,value:i})}}reSetPropertiesCallbacks(){for(let e=0;e<this._callbacks.length;e++){let{key:t,value:s}=this._callbacks[e];this[t]=s}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),this.rendered&&this.rendered(this.renderedCount,this),setTimeout((()=>{this.applyStylesAfterRender(),this.mounted&&this.mounted(this)}),0)}applyStylesAfterRender(){const e=this.getAttribute("style-after-render");if(e)for(const t of e.split(";")){const[e,s]=t.split(":");e&&s&&(this.style[e.trim()]=s.trim())}}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(e){Object.entries(e).map((([e,t])=>{this[`${e}`]=t})),this.forceRender()}forceRender(e=null,t=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),e&&e(),this.renderedCount++,this.firstRendered&&1===this.renderedCount&&this.firstRendered(this.renderedCount,this),this.rendered&&t&&this.rendered(this.renderedCount,this)}processRefs(e,t,s){s||(s="id");let i={},r=Array.from(e.querySelectorAll(`[${s}]`));for(let e=0;e<r.length;e++)t?t[r[e].getAttribute(s)]=r[e]:i[r[e].getAttribute(s)]=r[e];return t?t.rootHtml=e:i.rootHtml=e,i}binAll(e,t){let s=Object.getOwnPropertyNames(Object.getPrototypeOf(e));t&&(s=Object.keys(e));for(let t=0;t<s.length;t++)"constructor"!==s[t]&&"function"==typeof e[s[t]]&&(e[s[t]]=e[s[t]].bind(e))}bind(e){let t=Object.getOwnPropertyNames(Object.getPrototypeOf(e));for(let s=0;s<t.length;s++)if("function"==typeof e[t[s]]){if(this[t[s]])continue;this[t[s]]=e[t[s]].bind(e)}}observables(e,t){let s,i=this;if(e){if(!Array.isArray(e))return Object.keys(e).map(((r,n)=>{n||(s=r);let o=e[r],h="_"+r;i[h]=o,Object.defineProperty(i,r,{set:e=>{i[h]=e,i.forceRender&&i.forceRender(),t&&t()},get:()=>i[h],configurable:!0})})),i[s];e.forEach((e=>{this.observable(e,this[e])}))}}observable(e,t){return setTimeout((()=>{t&&void 0===this[e]||(t=this[e]),this.observables({[e]:t})}),0),t}}export function camelize(e){return(e=(e=(e=(e=(e=String(e)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(e,t){return 0==+e?"":0===t?e.toLowerCase():e.toUpperCase()}))}const t=globalThis,i=t.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:e=>e}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+h,n=`<${o}>`,r=document,l=()=>r.createComment(""),c=e=>null===e||"object"!=typeof e&&"function"!=typeof e,a=Array.isArray,u=e=>a(e)||"function"==typeof e?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),x=y(1),b=y(2),w=y(3),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(e,t){if(!a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(t):t}const V=(t,s)=>{const i=t.length-1,r=[];let o,l=2===s?"<svg>":3===s?"<math>":"",c=f;for(let s=0;s<i;s++){const i=t[s];let a,d,u=-1,A=0;for(;A<i.length&&(c.lastIndex=A,d=c.exec(i),null!==d);)A=c.lastIndex,c===f?"!--"===d[1]?c=v:void 0!==d[1]?c=_:void 0!==d[2]?($.test(d[2])&&(o=RegExp("</"+d[2],"g")),c=m):void 0!==d[3]&&(c=m):c===m?">"===d[0]?(c=o??f,u=-1):void 0===d[1]?u=-2:(u=c.lastIndex-d[2].length,a=d[1],c=void 0===d[3]?m:'"'===d[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,o=void 0);const b=c===m&&t[s+1].startsWith("/>")?" ":"";l+=c===f?i+n:u>=0?(r.push(a),i.slice(0,u)+e+i.slice(u)+h+b):i+h+(-2===u?s:b)}return[P(t,l+(t[i]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),r]};class N{constructor({strings:t,_$litType$:s},r){let n;this.parts=[];let c=0,a=0;const _=t.length-1,d=this.parts,[p,u]=V(t,s);if(this.el=N.createElement(p,r),C.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=C.nextNode())&&d.length<_;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(e)){const e=u[a++],s=n.getAttribute(t).split(h),i=/([.?@])?(.*)/.exec(e);d.push({type:1,index:c,name:i[2],strings:s,ctor:"."===i[1]?H:"?"===i[1]?I:"@"===i[1]?L:k}),n.removeAttribute(t)}else t.startsWith(h)&&(d.push({type:6,index:c}),n.removeAttribute(t));if($.test(n.tagName)){const e=n.textContent.split(h),t=e.length-1;if(t>0){n.textContent=i?i.emptyScript:"";for(let s=0;s<t;s++)n.append(e[s],l()),C.nextNode(),d.push({type:2,index:++c});n.append(e[t],l())}}}else if(8===n.nodeType)if(n.data===o)d.push({type:2,index:c});else{let e=-1;for(;-1!==(e=n.data.indexOf(h,e+1));)d.push({type:7,index:c}),e+=h.length-1}c++}}static createElement(e,t){const s=r.createElement("template");return s.innerHTML=e,s}}function S(e,t,s=e,i){if(t===T)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=c(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=S(e,r._$AS(e,t.values),r,i)),t}class M{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??r).importNode(t,!0);C.currentNode=i;let n=C.nextNode(),o=0,h=0,l=s[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new R(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new z(n,this,e)),this._$AV.push(t),l=s[++h]}o!==l?.index&&(n=C.nextNode(),o++)}return C.currentNode=r,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),c(e)?e===E||null==e||""===e?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==T&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):u(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=e:this.T(r.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new M(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=A.get(e.strings);return void 0===t&&A.set(e.strings,t=new N(e)),t}k(e){a(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E}_$AI(e,t=this,s,i){const r=this.strings;let n=!1;if(void 0===r)e=S(this,e,t,0),n=!c(e)||e!==this._$AH&&e!==T,n&&(this._$AH=e);else{const i=e;let o,h;for(e=r[0],o=0;o<r.length-1;o++)h=S(this,i[s+o],t,o),h===T&&(h=this._$AH[o]),n||=!c(h)||h!==this._$AH[o],h===E?e=E:e!==E&&(e+=(h??"")+r[o+1]),this._$AH[o]=h}n&&!i&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class H extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}}class I extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}}class L extends k{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??E)===T)return;const s=this._$AH,i=e===E&&s!==E||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==E&&(s===E||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class z{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const Z={M:e,P:h,A:o,C:1,L:V,R:M,D:u,V:S,I:R,H:k,N:I,U:L,B:H,F:z},j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new R(t.insertBefore(l(),e),e,void 0,s??{})}return r._$AI(e),r},directive_t_CHILD=2,directive_e=e=>(...t)=>({_$litDirective$:e,values:t});class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:directive_helpers_t}=Z,directive_helpers_r=()=>document.createComment(""),directive_helpers_s=(e,t,s)=>{const i=e._$AA.parentNode,r=void 0===t?e._$AB:t._$AA;if(void 0===s){const t=i.insertBefore(directive_helpers_r(),r),n=i.insertBefore(directive_helpers_r(),r);s=new directive_helpers_t(t,n,e,e.options)}else{const t=s._$AB.nextSibling,n=s._$AM,o=n!==e;if(o){let t;s._$AQ?.(e),s._$AM=e,void 0!==s._$AP&&(t=e._$AU)!==n._$AU&&s._$AP(t)}if(t!==r||o){let e=s._$AA;for(;e!==t;){const t=e.nextSibling;i.insertBefore(e,r),e=t}}}return s},directive_helpers_v=(e,t,s=e)=>(e._$AI(t,s),e),directive_helpers_u={},directive_helpers_M=e=>{e._$AR(),e._$AA.remove()},repeat_u=(e,t,s)=>{const i=new Map;for(let r=t;r<=s;r++)i.set(e[r],r);return i},repeat_c=directive_e(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,s){let i;void 0===s?s=t:void 0!==t&&(i=t);const r=[],n=[];let o=0;for(const t of e)r[o]=i?i(t,o):o,n[o]=s(t,o),o++;return{values:n,keys:r}}render(e,t,s){return this.dt(e,t,s).values}update(e,[t,s,i]){const r=(e=>e._$AH)(e),{values:n,keys:o}=this.dt(t,s,i);if(!Array.isArray(r))return this.ut=o,n;const h=this.ut??=[],l=[];let c,a,_=0,d=r.length-1,p=0,u=n.length-1;for(;_<=d&&p<=u;)if(null===r[_])_++;else if(null===r[d])d--;else if(h[_]===o[p])l[p]=directive_helpers_v(r[_],n[p]),_++,p++;else if(h[d]===o[u])l[u]=directive_helpers_v(r[d],n[u]),d--,u--;else if(h[_]===o[u])l[u]=directive_helpers_v(r[_],n[u]),directive_helpers_s(e,l[u+1],r[_]),_++,u--;else if(h[d]===o[p])l[p]=directive_helpers_v(r[d],n[p]),directive_helpers_s(e,r[_],r[d]),d--,p++;else if(void 0===c&&(c=repeat_u(o,p,u),a=repeat_u(h,_,d)),c.has(h[_]))if(c.has(h[d])){const t=a.get(o[p]),s=void 0!==t?r[t]:null;if(null===s){const t=directive_helpers_s(e,r[_]);directive_helpers_v(t,n[p]),l[p]=t}else l[p]=directive_helpers_v(s,n[p]),directive_helpers_s(e,r[_],s),r[t]=null;p++}else directive_helpers_M(r[d]),d--;else directive_helpers_M(r[_]),_++;for(;p<=u;){const t=directive_helpers_s(e,l[u+1]);directive_helpers_v(t,n[p]),l[p++]=t}for(;_<=d;){const e=r[_++];null!==e&&directive_helpers_M(e)}return this.ut=o,((e,t=directive_helpers_u)=>{e._$AH=t})(e,l),T}});class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=E,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===E||null==e)return this._t=void 0,this.it=e;if(e===T)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;const unsafe_html_o=directive_e(unsafe_html_e);export{unsafe_html_e as UnsafeHTMLDirective,Z as _$LH,x as html,w as mathml,T as noChange,E as nothing,B as render,repeat_c as repeat,b as svg,unsafe_html_o as unsafeHTML};let $LH=unsafe_html_e,html=x,noChange=T,nothing=A,render=B,repeat=repeat_c,svg=b,unsafeHTML=unsafe_html_o;
/*! v0.0.6 */
export class CuppaStorage{static LOCAL="LOCAL";static SESSION="SESSION";static COOKIE="COOKIE";static INDEXED_DB="INDEXED_DB";static db;static data={};static callbacks={};static async setData({name:e="default",data:t=null,store:a="",silence:o=!1}){"function"==typeof a?a({name:e,data:t,silence:o,type:"set"}):String(a).toUpperCase()===CuppaStorage.LOCAL?localStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.SESSION?sessionStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.INDEXED_DB?await CuppaStorage.db.add(e,t):String(a).toUpperCase()===CuppaStorage.COOKIE?CuppaStorage.setCookie(e,JSON.stringify(t)):CuppaStorage.data[e]=t,o||CuppaStorage.executeCallbacks({name:e,data:t})}static setDataSync({name:e="default",data:t=null,store:a="",silence:o=!1}){"function"==typeof a?a({name:e,data:t,silence:o,type:"setSync"}):String(a).toUpperCase()===CuppaStorage.LOCAL?localStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.SESSION?sessionStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.COOKIE?CuppaStorage.setCookie(e,JSON.stringify(t)):CuppaStorage.data[e]=t,o||CuppaStorage.executeCallbacks({name:e,data:t})}static async getData({name:e="default",callback:t=null,store:a="",defaultValue:o=null}){let r;if("function"==typeof a)r=await a({name:e,callback:t,defaultValue:o,type:"get"});else if(String(a).toUpperCase()===CuppaStorage.LOCAL){let t=localStorage.getItem(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else if(String(a).toUpperCase()===CuppaStorage.SESSION){let t=sessionStorage.getItem(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else if(String(a).toUpperCase()===CuppaStorage.INDEXED_DB)r=await CuppaStorage.db.get(e);else if(String(a).toUpperCase()===CuppaStorage.COOKIE){let t=CuppaStorage.getCookie(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else r=CuppaStorage.data[e];return void 0===r&&(r=o),null!=r&&t&&t(r),t&&CuppaStorage.addCallback({name:e,callback:t}),r}static getDataSync({name:e="default",callback:t=null,store:a="",defaultValue:o=null}){let r;if("function"==typeof a)r=a({name:e,callback:t,defaultValue:o,type:"getSync"});else if(String(a).toUpperCase()===CuppaStorage.LOCAL){let t=localStorage.getItem(e);t&&(r=JSON.parse(t))}else if(String(a).toUpperCase()===CuppaStorage.SESSION){let t=sessionStorage.getItem(e);t&&(r=JSON.parse(t))}else if(String(a).toUpperCase()===CuppaStorage.COOKIE){let t=CuppaStorage.getCookie(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else r=CuppaStorage.data[e];return void 0===r&&(r=o),null!=r&&t&&t(r),t&&CuppaStorage.addCallback({name:e,callback:t}),r}static removeCallback({name:e,callback:t,likeString:a=!1}){if(!CuppaStorage.callbacks[e])return;let o=CuppaStorage.callbacks[e];for(let e=0;e<o.length;e++)a?o[e].toString()===t.toString()&&o.splice(e,1):o[e]===t&&o.splice(e,1)}static removeAllCallbacks({name:e}){delete CuppaStorage.callbacks[e]}static executeCallbacks({name:e,data:t}){if(!CuppaStorage.callbacks[e])return;let a=CuppaStorage.callbacks[e];for(let e=0;e<a.length;e++)a[e](t)}static addCallback=function({name:e,callback:t}){CuppaStorage.callbacks[e]||(CuppaStorage.callbacks[e]=[]),CuppaStorage.callbacks[e].push(t)}}document.defaultView.CuppaStorage||(document.defaultView.CuppaStorage=CuppaStorage);export class GetStorage extends HTMLElement{name;store;defaultValue;data;constructor(){super(),bindAll(this),this.style.display="none"}connectedCallback(){setTimeout((()=>{this.name=this.getAttribute("name"),this.store=this.getAttribute("store"),this.defaultValue=this.getAttribute("default-value"),CuppaStorage.getData({name:this.name,callback:this.onUpdateStorage,defaultValue:this.defaultValue,store:this.store}).then()}),0)}onUpdateStorage(e){this.data=e,this.dispatchEvent(new CustomEvent("change",{detail:this.data}))}disconnectedCallback(){CuppaStorage.removeCallback({name:this.name,callback:this.onUpdateStorage})}}document.defaultView.GetStorage||(customElements.define("get-storage",GetStorage),document.defaultView.GetStorage=GetStorage);class CuppaStorageInnoDB{config={db:"cuppa_db",storage:"cuppa_storage",version:1,update:!1};db;constructor(e){this.config={...this.config,...e},bindAll(this)}async connect(){let e=this.config;if(indexedDB.databases){let t=await indexedDB.databases();t=t.filter((t=>t.name==e.db))[0],e.version=t&&e.update?t.version+1:t?t.version:e.version}else e.version=e.version;const t=indexedDB.open(e.db,e.version);return t.onupgradeneeded=this.onUpdateDB,await new Promise((e=>{t.onsuccess=t=>{this.db=t.target.result,e(this)}}))}async onUpdateDB(e){this.db=e.target.result;let{db:t,config:a}=this;t.objectStoreNames.contains(a.storage)||t.createObjectStore(a.storage,{keyPath:"name"})}async add(e,t,a){this.db||await this.connect();let{db:o,config:r}=this,s=o.transaction(r.storage,"readwrite").objectStore(r.storage),n={name:e,value:t};return await new Promise((e=>{let t=s.put(n);t.onsuccess=()=>{e(t.result)},t.onerror=t=>{e(null,t.target.error)}})),await this.get(e,a)}async get(e,t){null==t&&(t=!0),this.db||await this.connect();let{db:a,config:o}=this,r=a.transaction(o.storage,"readwrite").objectStore(o.storage);return await new Promise((a=>{let o=r.get(e);o.onsuccess=()=>{a(t&&o.result?o.result.value:o.result)},o.onerror=e=>{a(null)}}))}async delete(e){this.db||await this.connect();let{db:t,config:a}=this;t.transaction(a.storage,"readwrite").objectStore(a.storage).delete(e)}}function bindAll(e,t){let a=Object.getOwnPropertyNames(Object.getPrototypeOf(e));t&&(a=Object.keys(e));for(let t=0;t<a.length;t++)"function"==typeof e[a[t]]&&(e[a[t]]=e[a[t]].bind(e))}CuppaStorage.db=new CuppaStorageInnoDB,CuppaStorage.setCookie=function(e,t="",a){if(a){let o=new Date;o.setDate(o.getDate()+a),t=encodeURIComponent(t)+"; expires="+o.toUTCString(),document.cookie=e+"="+t+";path=/; SameSite=Strict;"}else document.cookie=e+"="+t+";path=/; SameSite=Strict;"},CuppaStorage.getCookie=function(e,t){null==t&&(t=document);let a=t.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return a?decodeURIComponent(a[2]):null},CuppaStorage.deleteCookie=function(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"};

export const iconX = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`

export class CuppaColorPicker extends CuppaComponent {
	static attributes = ['value', 'label', 'force-show', 'show-reset', 'storage-name', 'max-colors', 'store-type'];
	static observables = ['storageName', 'storeType', 'colors', 'maxColors', 'value', 'showReset'];
	storageName = 'CuppaColorPicker';
	storeType = CuppaStorage.LOCAL;
	colors = [];
	maxColors = 10;
	value = '';
	showReset = true;
	forceShow = false;
	naviveColorPickerFocus = false;
	callback;
	showCallback;
	closeCallback;

	mounted() {
		this.refs.dialog.addEventListener('click', this.onDialogClick)
		if (this.forceShow) this.show();
	}

	show() {
		this.refs.dialog.showModal();
		const btnDim = this.refs.pickerButton.getBoundingClientRect();
		const dialogDim = this.refs.dialog.getBoundingClientRect();
		this.refs.dialog.style.top = `${btnDim.y + btnDim.height}px`;
		this.refs.dialog.style.left = `${btnDim.x + btnDim.width * 0.5 - dialogDim.width * 0.5}px`;
		this.classList.add('open');
		this.dispatchEvent(new CustomEvent("show", {detail: null}));
		if (this.showCallback) this.showCallback(this);
	}

	onDialogClick(e) {
		if (e.target === this.refs.dialog) {
			this.close();
		}
	}

	onChange(value) {
		this.value = value;
		if (this.callback) this.callback(this.value);
		this.dispatchEvent(new CustomEvent("change", {detail: {color: this.value}}));
		this.storeColor(value);
	}

	storeColor(color) {
		if (!this.storageName || !color) return;
		let colors = CuppaStorage.getDataSync({name: this.storageName, store: this.storeType}) || [];
		if (colors.includes(color)) return;
		colors.unshift(color);
		if (colors.length > this.maxColors) colors.pop();
		CuppaStorage.setDataSync({name: this.storageName, data: colors, store: this.storeType});
		this.forceRender();
	}

	close() {
		this.refs.dialog.close();
		this.classList.remove('open');
		this.dispatchEvent(new CustomEvent("close", {detail: null}));
		if (this.closeCallback) this.closeCallback(this);
	}

	render() {
		let colors = this.colors?.length || CuppaStorage.getDataSync({
			name: this.storageName,
			store: this.storeType
		}) || [];
		return html`
            <div
                    ref="pickerButton"
                    class="picker-button"
                    style="background-color: ${this.value}"
                    @click=${this.show}
            ></div>
            <dialog ref="dialog" class="dialog" style="background: #FFF; padding:20">
                <div class="dialog-content">
                    <div class="picker-area">
                        <div class="color-picker">
                            <input
                                    title="Select Color"
                                    type="color"
                                    .value="${this.value || '#FFFFFF'}"
                                    @change=${(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        this.onChange(e.target.value);
                                        this.close();
                                    }}
                                    @click=${e => {
                                        if (!this.naviveColorPickerFocus) {
                                            this.naviveColorPickerFocus = true;
                                        } else {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.naviveColorPickerFocus = false;
                                            e.target.blur();
                                        }
                                    }}
                                    @blur=${e => {
                                        setTimeout(e => {
                                            this.naviveColorPickerFocus = false;
                                        }, 300)
                                    }}
                            >
                        </div>
                        ${!this.showReset ? `` : html`
                            <div
                                    class="btn-clear"
                                    title="Clear"
                                    @click=${e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        this.onChange(this.defaultValue);
                                        this.close();
                                    }}
                            >
                                ${unsafeHTML(iconX)}
                            </div>
                        `}
                    </div>
                    ${!colors?.length ? `` : html`
                        <div class="color-list">
                            ${colors.map(color => {
                                return html`
                                    <div
                                            class="btn-color ${color === this.value ? 'selected' : ''}"
                                            style="background: ${color}"
                                            @click=${(e) => this.onChange(color)}
                                    ></div>
                                `
                            })}
                        </div>
                    `}
                </div>
            </dialog>
            <div
                    class="picker-modal"
                    style="display:${this.open ? 'flex' : 'none'}"
                    @click=${e => {
                        e.stopPropagation();
                    }}
            >
                <div class="picker-area">
                    <div class="color-picker">
                        <input
                                title="Select Color"
                                type="color"
                                .value="${this.value || '#FFFFFF'}"
                                @change=${(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.onChange(e.target.value);
                                    this.close();
                                }}
                                @click=${e => {
                                    if (!this.naviveColorPickerFocus) {
                                        this.naviveColorPickerFocus = true;
                                    } else {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        this.naviveColorPickerFocus = false;
                                        e.target.blur();
                                    }
                                }}
                                @blur=${e => {
                                    setTimeout(e => {
                                        this.naviveColorPickerFocus = false;
                                    }, 300)
                                }}
                        >
                    </div>
                    ${!this.showReset ? `` : html`
                        <div
                                class="btn-clear"
                                title="Clear"
                                @click=${e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    this.onChange(this.defaultValue);
                                    this.close();
                                }}
                        >
                            ${unsafeHTML(iconX)}
                        </div>
                    `}
                </div>
                ${!colors?.length ? `` : html`
                    <div class="color-list">
                        ${colors.map(color => {
                            return html`
                                <div
                                        class="btn-color ${color === this.value ? 'selected' : ''}"
                                        style="background: ${color}"
                                        @click=${(e) => this.onChange(color)}
                                ></div>
                            `
                        })}
                    </div>
                `}
            </div>
            <style>
                cuppa-color-picker {
                    .picker-button {
                        width: 20px;
                        height: 20px;
                        border-radius: 5px;
                        border: 1px solid rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                    }

                    .dialog {
                        position: fixed;
                        inset: auto;
                        left: 0px;
                        top: 0px;
                        width: 200px;
                        border: 1px solid rgba(0, 0, 0, 0.2);
                        border-radius: 5px;
                        margin-top: 2px;
                        padding: 0;
                        background: #fff;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

                        &:focus, &:focus-visible {
                            outline: none;
                        }

                        &::backdrop {
                            background: transparent;
                        }

                        & .dialog-content {
                            display: flex;
                            flex-direction: column;
                            gap: 5px;
                            padding: 10px;

                            .picker-area {
                                display: flex;
                                flex-direction: row;
                                gap: 5px;

                                & .color-picker {
                                    position: relative;
                                    grid-area: color-picker;
                                    height: 20px;
                                    place-self: end;
                                    width: 100%;
                                    overflow: hidden;
                                    border: 1px solid rgba(0, 0, 0, 0.2);
                                    border-radius: 3px;

                                    & input {
                                        position: absolute;
                                        top: -50px;
                                        left: -50px;
                                        width: calc(100% + 100px);
                                        height: calc(100% + 100px);
                                    }
                                }

                                & .btn-clear {
                                    grid-area: btn-clear;
                                    width: 30px;
                                    height: 20px;
                                    cursor: pointer;
                                    border-radius: 5px;
                                    border: 1px solid rgba(0, 0, 0, 0.1);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    & svg {
                                        width: 12px;
                                        height: 12px;
                                    }
                                }
                            }

                            & .color-list {
                                grid-area: color-list;
                                border-top: 1px solid rgba(0, 0, 0, 0.1);
                                padding-top: 5px;
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                justify-content: start;
                                align-items: flex-start;
                                gap: 5px;

                                & .btn-color {
                                    cursor: pointer;
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 5px;
                                    border: 1px solid rgba(0, 0, 0, 0.1);
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;

                                    & svg {
                                        width: 12px;
                                        height: 12px;
                                    }

                                    &.selected {
                                        border: 1px solid rgba(0, 0, 0, 0.2);
                                        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
                                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
                                    }
                                }
                            }
                        }
                    }
                }
            </style>
		`
	}
}

customElements.define('cuppa-color-picker', CuppaColorPicker);
