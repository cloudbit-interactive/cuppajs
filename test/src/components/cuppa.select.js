/*! v0.0.9 */
/*! v0.0.9 */
export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.applyObservables=this.applyObservables.bind(this),this.applyObservables(),this.binAll(this)}static get observedAttributes(){return this.attributes||[]}attributeChangedCallback(e,t,s){t!==s&&("false"===s&&(s=!1),"true"===s&&(s=!0),this[camelize(e)]=s)}applyObservables(){this.constructor.observables&&setTimeout((()=>{let e={};for(let t=0;t<this.constructor.observables.length;t++){let s=this.constructor.observables[t];e[s]=this[s]}this.observables(e),this.forceRender()}),0)}getPropertiesCallbacks(){let e=Object.entries(this);for(let t=0;t<e.length;t++){let[s,i]=e[t];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(s)&&this._callbacks.push({key:s,value:i})}}reSetPropertiesCallbacks(){for(let e=0;e<this._callbacks.length;e++){let{key:t,value:s}=this._callbacks[e];this[t]=s}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),this.rendered&&this.rendered(this.renderedCount,this),setTimeout((()=>{this.applyStylesAfterRender(),this.mounted&&this.mounted(this)}),0)}applyStylesAfterRender(){const e=this.getAttribute("style-after-render");if(e)for(const t of e.split(";")){const[e,s]=t.split(":");e&&s&&(this.style[e.trim()]=s.trim())}}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(e){Object.entries(e).map((([e,t])=>{this[`${e}`]=t})),this.forceRender()}forceRender(e=null,t=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),e&&e(),this.renderedCount++,this.firstRendered&&1===this.renderedCount&&this.firstRendered(this.renderedCount,this),this.rendered&&t&&this.rendered(this.renderedCount,this)}processRefs(e,t,s){s||(s="id");let i={},r=Array.from(e.querySelectorAll(`[${s}]`));for(let e=0;e<r.length;e++)t?t[r[e].getAttribute(s)]=r[e]:i[r[e].getAttribute(s)]=r[e];return t?t.rootHtml=e:i.rootHtml=e,i}binAll(e,t){let s=Object.getOwnPropertyNames(Object.getPrototypeOf(e));t&&(s=Object.keys(e));for(let t=0;t<s.length;t++)"constructor"!==s[t]&&"function"==typeof e[s[t]]&&(e[s[t]]=e[s[t]].bind(e))}bind(e){let t=Object.getOwnPropertyNames(Object.getPrototypeOf(e));for(let s=0;s<t.length;s++)if("function"==typeof e[t[s]]){if(this[t[s]])continue;this[t[s]]=e[t[s]].bind(e)}}observables(e,t){let s,i=this;if(e){if(!Array.isArray(e))return Object.keys(e).map(((r,n)=>{n||(s=r);let o=e[r],h="_"+r;i[h]=o,Object.defineProperty(i,r,{set:e=>{i[h]=e,i.forceRender&&i.forceRender(),t&&t()},get:()=>i[h],configurable:!0})})),i[s];e.forEach((e=>{this.observable(e,this[e])}))}}observable(e,t){return setTimeout((()=>{t&&void 0===this[e]||(t=this[e]),this.observables({[e]:t})}),0),t}}export function camelize(e){return(e=(e=(e=(e=(e=String(e)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(e,t){return 0==+e?"":0===t?e.toLowerCase():e.toUpperCase()}))}const t=globalThis,i=t.trustedTypes,s=i?i.createPolicy("lit-html",{createHTML:e=>e}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o="?"+h,n=`<${o}>`,r=document,l=()=>r.createComment(""),c=e=>null===e||"object"!=typeof e&&"function"!=typeof e,a=Array.isArray,u=e=>a(e)||"function"==typeof e?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=e=>(t,...s)=>({_$litType$:e,strings:t,values:s}),x=y(1),b=y(2),w=y(3),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r.createTreeWalker(r,129);function P(e,t){if(!a(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(t):t}const V=(t,s)=>{const i=t.length-1,r=[];let o,l=2===s?"<svg>":3===s?"<math>":"",c=f;for(let s=0;s<i;s++){const i=t[s];let a,d,u=-1,A=0;for(;A<i.length&&(c.lastIndex=A,d=c.exec(i),null!==d);)A=c.lastIndex,c===f?"!--"===d[1]?c=v:void 0!==d[1]?c=_:void 0!==d[2]?($.test(d[2])&&(o=RegExp("</"+d[2],"g")),c=m):void 0!==d[3]&&(c=m):c===m?">"===d[0]?(c=o??f,u=-1):void 0===d[1]?u=-2:(u=c.lastIndex-d[2].length,a=d[1],c=void 0===d[3]?m:'"'===d[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,o=void 0);const b=c===m&&t[s+1].startsWith("/>")?" ":"";l+=c===f?i+n:u>=0?(r.push(a),i.slice(0,u)+e+i.slice(u)+h+b):i+h+(-2===u?s:b)}return[P(t,l+(t[i]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),r]};class N{constructor({strings:t,_$litType$:s},r){let n;this.parts=[];let c=0,a=0;const _=t.length-1,d=this.parts,[p,u]=V(t,s);if(this.el=N.createElement(p,r),C.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=C.nextNode())&&d.length<_;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(e)){const e=u[a++],s=n.getAttribute(t).split(h),i=/([.?@])?(.*)/.exec(e);d.push({type:1,index:c,name:i[2],strings:s,ctor:"."===i[1]?H:"?"===i[1]?I:"@"===i[1]?L:k}),n.removeAttribute(t)}else t.startsWith(h)&&(d.push({type:6,index:c}),n.removeAttribute(t));if($.test(n.tagName)){const e=n.textContent.split(h),t=e.length-1;if(t>0){n.textContent=i?i.emptyScript:"";for(let s=0;s<t;s++)n.append(e[s],l()),C.nextNode(),d.push({type:2,index:++c});n.append(e[t],l())}}}else if(8===n.nodeType)if(n.data===o)d.push({type:2,index:c});else{let e=-1;for(;-1!==(e=n.data.indexOf(h,e+1));)d.push({type:7,index:c}),e+=h.length-1}c++}}static createElement(e,t){const s=r.createElement("template");return s.innerHTML=e,s}}function S(e,t,s=e,i){if(t===T)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=c(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=S(e,r._$AS(e,t.values),r,i)),t}class M{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??r).importNode(t,!0);C.currentNode=i;let n=C.nextNode(),o=0,h=0,l=s[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new R(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new z(n,this,e)),this._$AV.push(t),l=s[++h]}o!==l?.index&&(n=C.nextNode(),o++)}return C.currentNode=r,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),c(e)?e===E||null==e||""===e?(this._$AH!==E&&this._$AR(),this._$AH=E):e!==this._$AH&&e!==T&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):u(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=e:this.T(r.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new M(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=A.get(e.strings);return void 0===t&&A.set(e.strings,t=new N(e)),t}k(e){a(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=E,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E}_$AI(e,t=this,s,i){const r=this.strings;let n=!1;if(void 0===r)e=S(this,e,t,0),n=!c(e)||e!==this._$AH&&e!==T,n&&(this._$AH=e);else{const i=e;let o,h;for(e=r[0],o=0;o<r.length-1;o++)h=S(this,i[s+o],t,o),h===T&&(h=this._$AH[o]),n||=!c(h)||h!==this._$AH[o],h===E?e=E:e!==E&&(e+=(h??"")+r[o+1]),this._$AH[o]=h}n&&!i&&this.j(e)}j(e){e===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class H extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===E?void 0:e}}class I extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==E)}}class L extends k{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??E)===T)return;const s=this._$AH,i=e===E&&s!==E||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==E&&(s===E||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class z{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const Z={M:e,P:h,A:o,C:1,L:V,R:M,D:u,V:S,I:R,H:k,N:I,U:L,B:H,F:z},j=t.litHtmlPolyfillSupport;j?.(N,R),(t.litHtmlVersions??=[]).push("3.3.1");const B=(e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new R(t.insertBefore(l(),e),e,void 0,s??{})}return r._$AI(e),r},directive_t_CHILD=2,directive_e=e=>(...t)=>({_$litDirective$:e,values:t});class directive_i{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:directive_helpers_t}=Z,directive_helpers_r=()=>document.createComment(""),directive_helpers_s=(e,t,s)=>{const i=e._$AA.parentNode,r=void 0===t?e._$AB:t._$AA;if(void 0===s){const t=i.insertBefore(directive_helpers_r(),r),n=i.insertBefore(directive_helpers_r(),r);s=new directive_helpers_t(t,n,e,e.options)}else{const t=s._$AB.nextSibling,n=s._$AM,o=n!==e;if(o){let t;s._$AQ?.(e),s._$AM=e,void 0!==s._$AP&&(t=e._$AU)!==n._$AU&&s._$AP(t)}if(t!==r||o){let e=s._$AA;for(;e!==t;){const t=e.nextSibling;i.insertBefore(e,r),e=t}}}return s},directive_helpers_v=(e,t,s=e)=>(e._$AI(t,s),e),directive_helpers_u={},directive_helpers_M=e=>{e._$AR(),e._$AA.remove()},repeat_u=(e,t,s)=>{const i=new Map;for(let r=t;r<=s;r++)i.set(e[r],r);return i},repeat_c=directive_e(class extends directive_i{constructor(e){if(super(e),2!==e.type)throw Error("repeat() can only be used in text expressions")}dt(e,t,s){let i;void 0===s?s=t:void 0!==t&&(i=t);const r=[],n=[];let o=0;for(const t of e)r[o]=i?i(t,o):o,n[o]=s(t,o),o++;return{values:n,keys:r}}render(e,t,s){return this.dt(e,t,s).values}update(e,[t,s,i]){const r=(e=>e._$AH)(e),{values:n,keys:o}=this.dt(t,s,i);if(!Array.isArray(r))return this.ut=o,n;const h=this.ut??=[],l=[];let c,a,_=0,d=r.length-1,p=0,u=n.length-1;for(;_<=d&&p<=u;)if(null===r[_])_++;else if(null===r[d])d--;else if(h[_]===o[p])l[p]=directive_helpers_v(r[_],n[p]),_++,p++;else if(h[d]===o[u])l[u]=directive_helpers_v(r[d],n[u]),d--,u--;else if(h[_]===o[u])l[u]=directive_helpers_v(r[_],n[u]),directive_helpers_s(e,l[u+1],r[_]),_++,u--;else if(h[d]===o[p])l[p]=directive_helpers_v(r[d],n[p]),directive_helpers_s(e,r[_],r[d]),d--,p++;else if(void 0===c&&(c=repeat_u(o,p,u),a=repeat_u(h,_,d)),c.has(h[_]))if(c.has(h[d])){const t=a.get(o[p]),s=void 0!==t?r[t]:null;if(null===s){const t=directive_helpers_s(e,r[_]);directive_helpers_v(t,n[p]),l[p]=t}else l[p]=directive_helpers_v(s,n[p]),directive_helpers_s(e,r[_],s),r[t]=null;p++}else directive_helpers_M(r[d]),d--;else directive_helpers_M(r[_]),_++;for(;p<=u;){const t=directive_helpers_s(e,l[u+1]);directive_helpers_v(t,n[p]),l[p++]=t}for(;_<=d;){const e=r[_++];null!==e&&directive_helpers_M(e)}return this.ut=o,((e,t=directive_helpers_u)=>{e._$AH=t})(e,l),T}});class unsafe_html_e extends directive_i{constructor(e){if(super(e),this.it=E,2!==e.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===E||null==e)return this._t=void 0,this.it=e;if(e===T)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}unsafe_html_e.directiveName="unsafeHTML",unsafe_html_e.resultType=1;const unsafe_html_o=directive_e(unsafe_html_e);export{unsafe_html_e as UnsafeHTMLDirective,Z as _$LH,x as html,w as mathml,T as noChange,E as nothing,B as render,repeat_c as repeat,b as svg,unsafe_html_o as unsafeHTML};let $LH=unsafe_html_e,html=x,noChange=T,nothing=A,render=B,repeat=repeat_c,svg=b,unsafeHTML=unsafe_html_o;

export const CuppaSelectType = {SINGLE:'SINGLE', MULTIPLE:"MULTIPLE"}
export let arrowImage = `data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic3ZnLWljb24iIHN0eWxlPSJ3aWR0aDogMWVtOyBoZWlnaHQ6IDFlbTt2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO2ZpbGw6IGN1cnJlbnRDb2xvcjtvdmVyZmxvdzogaGlkZGVuOyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik01MTIuMDM3OTkgMCA5MjEuNjc1OTgxIDQxMS42NDggMTAyLjQgNDExLjY0OCA1MTIuMDM3OTkgMFpNNTEyLjAzNzk5IDk5NS4zMjggMTAyLjQgNTgzLjY4IDkyMS42NzU5ODEgNTgzLjY4IDUxMi4wMzc5OSA5OTUuMzI4WiIgIC8+PC9zdmc+`;
export let selectedImage = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQzNyIgdmlld0JveD0iMCAwIDYwMCA0MzciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01ODUuODk1IDEyLjYyMDdDNTgxLjkyOSA4LjYyMTY1IDU3Ny4yMSA1LjQ0NzQ3IDU3Mi4wMTEgMy4yODEzNEM1NjYuODExIDEuMTE1MjEgNTYxLjIzNCAwIDU1NS42MDIgMEM1NDkuOTY5IDAgNTQ0LjM5MyAxLjExNTIxIDUzOS4xOTMgMy4yODEzNEM1MzMuOTk0IDUuNDQ3NDcgNTI5LjI3NSA4LjYyMTY1IDUyNS4zMDkgMTIuNjIwN0wyMDcuNDQyIDMzMC45MTRMNzMuODk1MyAxOTYuOTQxQzY5Ljc3NzEgMTkyLjk2MyA2NC45MTU2IDE4OS44MzQgNTkuNTg4NSAxODcuNzM1QzU0LjI2MTMgMTg1LjYzNiA0OC41NzI4IDE4NC42MDYgNDIuODQ3OCAxODQuNzA1QzM3LjEyMjcgMTg0LjgwNCAzMS40NzMyIDE4Ni4wMyAyNi4yMjE5IDE4OC4zMTJDMjAuOTcwNiAxOTAuNTk1IDE2LjIyMDIgMTkzLjg4OSAxMi4yNDIgMTk4LjAwN0M4LjI2Mzg0IDIwMi4xMjYgNS4xMzU3NyAyMDYuOTg3IDMuMDM2NCAyMTIuMzE0QzAuOTM3MDMyIDIxNy42NDEgLTAuMDkyNTI0NiAyMjMuMzMgMC4wMDY1MjQ1NyAyMjkuMDU1QzAuMTA1NTc0IDIzNC43OCAxLjMzMTI4IDI0MC40MjkgMy42MTM2NyAyNDUuNjgxQzUuODk2MDYgMjUwLjkzMiA5LjE5MDQzIDI1NS42ODMgMTMuMzA4NyAyNTkuNjYxTDE3Ny4xNDkgNDIzLjUwMUMxODEuMTE1IDQyNy41IDE4NS44MzQgNDMwLjY3NCAxOTEuMDMzIDQzMi44NEMxOTYuMjMzIDQzNS4wMDYgMjAxLjgxIDQzNi4xMjEgMjA3LjQ0MiA0MzYuMTIxQzIxMy4wNzUgNDM2LjEyMSAyMTguNjUxIDQzNS4wMDYgMjIzLjg1MSA0MzIuODRDMjI5LjA1IDQzMC42NzQgMjMzLjc2OSA0MjcuNSAyMzcuNzM1IDQyMy41MDFMNTg1Ljg5NSA3NS4zNDA3QzU5MC4yMjYgNzEuMzQ1MyA1OTMuNjgzIDY2LjQ5NjIgNTk2LjA0NyA2MS4wOTg4QzU5OC40MTEgNTUuNzAxNSA1OTkuNjMxIDQ5Ljg3MzEgNTk5LjYzMSA0My45ODA3QzU5OS42MzEgMzguMDg4NCA1OTguNDExIDMyLjI1OTkgNTk2LjA0NyAyNi44NjI2QzU5My42ODMgMjEuNDY1MyA1OTAuMjI2IDE2LjYxNjEgNTg1Ljg5NSAxMi42MjA3WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==`;

export class CuppaSelect extends CuppaComponent {
	static attributes = [
		'placeholder',
		'type',
		'select-class',
		'list-class',
		'name',
		'selected',
		'dropdown-style',
		'empty-option-label',
		'search-enabled',
		'show-arrow',
		'select-style',
		'auto-close',
		'value-column',
		'label-column',
		'label-separator',
		'label-auto-format',
		'multiple-label-separator',
		'search-placeholder',
		'maximum-options-showed',
		'maximum-options-exceeded-label',
		'span-style',
		'force-show',
	];
	static observables = [
		'placeholder',
		'type',
		'selectClass',
		'listClass',
		'name',
		'selected',
		'open',
		'valueColumn',
		'labelColumn',
		'labelSeparator',
		'labelAutoFormat',
		'multipleLabelSeparator',
		'name',
		'emptyOptionLabel',
		'options',
		'search',
		'dropdownStyle',
		'searchEnabled',
		'showArrow',
		'selectStyle',
		'autoClose',
		'searchPlaceholder',
		'maximumOptionsShowed',
		'maximumOptionsExceededString',
		'spanStyle',
	]
	placeholder = "Select";
	type = CuppaSelectType.SINGLE;
	callback = null;
	showCallback = null;
	closeCallback = null;
	selectClass = '';
	listClass = '';
	valueColumn = 'value';
	labelColumn = 'label';
	labelSeparator = ', ';
	labelAutoFormat = false;
	multipleLabelSeparator = ' - ';
	name = '';
	options = [];
	selected;
	searchEnabled = true;
	search = '';
	searchPlaceholder = 'Search...';
	dropdownStyle = '';
	emptyOptionLabel = 'Select...';
	showArrow = true;
	selectStyle = '';
	autoClose = true;
	maximumOptionsShowed = 3;
	maximumOptionsExceededString = '...';
	spanStyle = '';
	forceShow = false;

	mounted() {
		this.refs.dialog.addEventListener('click', (e)=>{ if (e.target === this.refs.dialog) { this.close(); } })
		if (this.forceShow) this.show();
		document.addEventListener('keyup', e => {
			if (String(e?.code).toLowerCase() === 'escape') {
				e.preventDefault();
				e.stopPropagation();
				this.close();
			}
		})
		this.addEventListener('click', e => {
			e.stopPropagation();
			e.preventDefault();
		})
		if (this.refs?.select) {
			this.refs?.select.addEventListener('keypress', e => {
				if (String(e?.code).toLowerCase() === 'space') {
					e.preventDefault();
					e.stopPropagation();
					this.show();
				}
			})
		}
		if (this.refs?.search) {
			this.refs?.search.addEventListener('keypress', e => {
				if (String(e?.code).toLowerCase() === 'enter') {
					e.preventDefault();
					e.stopPropagation();
					this.close();
					const options = (this.options || []).filter(opt => String(opt[this.labelColumn]).toLowerCase().indexOf(this.search.toLowerCase()) !== -1);
					if (!options?.length) return;
					const opt = options[0];
					let value = (typeof opt === "object") ? opt[this.valueColumn] : opt;
					this.selectValue(value);
				}
			})
		}
	}

	show() {
		this.refs.dialog.showModal();
		const btnDim = this.refs.select.getBoundingClientRect();
		const dialogDim = this.refs.dialog.getBoundingClientRect();
		const definedWidth = String(this.dropdownStyle).match(/width\s*:\s*([^;]+)/i)?.[1];
		this.refs.dialog.style.width = definedWidth || `${btnDim.width}px`;
		this.refs.dialog.style.top = `${btnDim.y + btnDim.height}px`;
		this.refs.dialog.style.left = `${btnDim.x}px`;
		this.classList.add('open');
		this.dispatchEvent(new CustomEvent("show", {detail: null}));
		if (this.showCallback) this.showCallback(this);
	}

	selectValue(value, {close = true} = {}) {
		if (this.type === CuppaSelectType.MULTIPLE) {
			const selectedArray = (this.selected) ? String(this.selected).split(',').map(v => v.trim()) : [];
			if (selectedArray.includes(String(value))) {
				const newSelectedArray = selectedArray.filter(v => v !== String(value));
				this.selected = newSelectedArray.filter(v => v).join(',');
			} else {
				selectedArray.push(String(value));
				this.selected = selectedArray.filter(v => v).join(',');
			}
		} else {
			this.selected = value;
		}
		this.dispatchEvent(new CustomEvent("change", {detail: this.selected}));
		if (this.callback) this.callback(this.selected);
		if (close && this.autoClose) {
			this.close();
		}
	}

	getSelectedLabel() {
		if (!this.selected) return '';
		const selectedValues = String(this.selected).split(',').map(v => v.trim()).filter(v => v) || [];
		const labels = [];
		for (const [index, selectedValue] of selectedValues.entries()) {
			let opt = this.options.filter(opt => opt[this.valueColumn] == selectedValue)[0];
			let label = opt;
			if (typeof opt === "object") {
				label = this.labelColumn.split(',').map(labelColumn => opt[labelColumn.trim()]);
				label = label.join(this.multipleLabelSeparator);
			}
			if (!label) continue;
			label = String(label).replaceAll("_", " ");
			labels.push(label);
			if (index + 1 >= this.maximumOptionsShowed) {
				if (selectedValues.length > this.maximumOptionsShowed) {
					labels.push(this.maximumOptionsExceededString);
				}
				break;
			}
		}
		return labels.join(this.labelSeparator);
	}

	getOptions() {
		return (this.options || []).filter(opt => {
			let label = opt;
			if (typeof opt === "object") {
				label = this.labelColumn.split(',').map(labelColumn => opt[labelColumn.trim()]);
				label = label.join(this.multipleLabelSeparator);
			}
			return String(label).toLowerCase().indexOf(this.search.toLowerCase()) !== -1;
		});
	}

	close() {
		this.refs.dialog.close();
		this.classList.remove('open');
		this.dispatchEvent(new CustomEvent("close", {detail: this.selected}));
		if (this.closeCallback) this.closeCallback(this.selected);
	}

	render() {
		const selectedArray = String(this.selected).split(',').map(v => v.trim());
		const label = this.getSelectedLabel();
		const options = this.getOptions();
		return html`
            <div
                    ref="select"
                    class="select ${this.selectClass}"
                    tabindex="0"
                    @click="${this.show}"
                    style="${this.selectStyle}"
            >
                <input type="hidden" name=${this.name} .value=${this.selected}>
                <span style="${this.spanStyle}">${label || this.placeholder}</span>
                ${!this.showArrow ? `` : html`<img class="arrow-img" src="${arrowImage}"/>`}
            </div>
            <dialog ref="dialog" class="dialog" style="${this.dropdownStyle}">
                <div class="dialog-content">
                    ${!this.searchEnabled ? `` : html`
                        <div class="controls">
                            <input
                                    ref="search"
                                    class="search"
                                    placeholder="${this.searchPlaceholder}"
                                    style="width: 100%"
                                    value="${this.search}"
                                    @input=${e => this.search = e.currentTarget.value}
                                    autofocus="true"
                            />
                        </div>
                    `}
                    <div class="list">
                        ${options.map(opt => {
                            let value = (typeof opt === "object") ? opt[this.valueColumn] : opt;
                            let label = opt;
                            if (typeof opt === "object") {
                                label = this.labelColumn.split(',').map(labelColumn => opt[labelColumn.trim()]);
                                label = label.join(this.multipleLabelSeparator);
                            }
                            label = String(label).replaceAll("_", " ");
                            const isSelected = selectedArray.includes(String(value));
                            if (this.labelAutoFormat) label = capitaliseAllWords(label);
                            return html`
                            <div
                                    class="list-item"
                                    @click=${e => {
                                this.selectValue(value);
                            }}
                            >
                                <span>${label}</span>
                                ${!isSelected ? `` : html`<img class="selected-img" src="${selectedImage}"/>`}
                            </div>`
                        })}
                    </div>
                </div>
            </dialog>
            <style>
                cuppa-select {
                    display: block;

                    & .select {
                        position: relative;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        user-select: none;
	                    padding:5px 10px;
	                    border:1px solid #ccc;
	                    box-shadow: inset 0 0.1rem 0.1rem rgba(0,0,0,.075);
	                    border-radius: 3px;
                        &:focus {
                            outline: 2px solid #2d85c1;
                            border-radius: 3px;
                        }
	                    & span{
		                    flex:1;
                            color:#444;
	                    }
                        & .arrow-img {
                            width: auto;
                            height: 10px;
                            opacity: 0.5;
                            pointer-events: none;
                        }
                    }

                    .dialog {
                        position: fixed;
                        inset: auto;
                        left: 0;
                        top: 0;
                        max-height: 200px;
                        border: 1px solid rgba(0, 0, 0, 0.2);
                        border-radius: 5px;
                        margin-top: 2px;
                        padding: 0;
                        background: #fff;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	                    overflow: auto;

                        &:focus, &:focus-visible {
                            outline: none;
                        }
                        &::backdrop {
                            background: transparent;
                        }

                        & .dialog-content {
                            & input.search {
                                width: 100%;
                                border: none;
                                border-bottom: 1px solid rgba(235, 238, 241, 1);
                                outline: none;
                                padding:5px 10px;
                                border-radius: 0;
                            }
                            & .list {
                                flex: 1;
                                overflow: auto;

                                & .list-item {
                                    padding:5px 10px;
                                    display: flex;
                                    gap: 5px;
                                    align-items: center;
                                    justify-content: space-between;
                                    color:#444;
	                                
                                    &:hover {
                                        background: #f6f8fa;
                                    }

                                    & .selected-img {
                                        width: auto;
                                        height: 8px;
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

customElements.define('cuppa-select', CuppaSelect);

function capitaliseAllWords(str){
	if(!str) str = '';
	str = str.toLocaleLowerCase();
	let pieces = str.split(" ");
	for ( let i = 0; i < pieces.length; i++ ){
		let j = pieces[i].charAt(0).toUpperCase();
		pieces[i] = j + pieces[i].substr(1);
	}
	return pieces.join(" ");
}
