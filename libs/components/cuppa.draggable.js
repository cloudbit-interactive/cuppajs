/*! v0.0.4 */
/**
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/cloudbit-interactive/cuppajs/blob/main/LICENSE)
 */
import {cuppa} from "../cuppa.js";

export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.applyObservables=this.applyObservables.bind(this),this.applyObservables(),this.binAll(this)}static get observedAttributes(){return this.attributes||[]}attributeChangedCallback(t,e,s){e!==s&&("false"===s&&(s=!1),"true"===s&&(s=!0),this[camelize(t)]=s)}applyObservables(){this.constructor.observables&&setTimeout((()=>{let t={};for(let e=0;e<this.constructor.observables.length;e++){let s=this.constructor.observables[e];t[s]=this[s]}this.observables(t),this.forceRender()}),0)}getPropertiesCallbacks(){let t=Object.entries(this);for(let e=0;e<t.length;e++){let[s,i]=t[e];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(s)&&this._callbacks.push({key:s,value:i})}}reSetPropertiesCallbacks(){for(let t=0;t<this._callbacks.length;t++){let{key:e,value:s}=this._callbacks[t];this[e]=s}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),this.rendered&&this.rendered(this.renderedCount,this),setTimeout((()=>{this.applyStylesAfterRender(),this.mounted&&this.mounted(this)}),0)}applyStylesAfterRender(){const t=this.getAttribute("style-after-render");if(t)for(const e of t.split(";")){const[t,s]=e.split(":");t&&s&&(this.style[t.trim()]=s.trim())}}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(t){Object.entries(t).map((([t,e])=>{this[`${t}`]=e})),this.forceRender()}forceRender(t=null,e=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),t&&t(),this.renderedCount++,this.firstRendered&&1===this.renderedCount&&this.firstRendered(this.renderedCount,this),this.rendered&&e&&this.rendered(this.renderedCount,this)}processRefs(t,e,s){s||(s="id");let i={},n=Array.from(t.querySelectorAll(`[${s}]`));for(let t=0;t<n.length;t++)e?e[n[t].getAttribute(s)]=n[t]:i[n[t].getAttribute(s)]=n[t];return e?e.rootHtml=t:i.rootHtml=t,i}binAll(t,e){let s=Object.getOwnPropertyNames(Object.getPrototypeOf(t));e&&(s=Object.keys(t));for(let e=0;e<s.length;e++)"constructor"!==s[e]&&"function"==typeof t[s[e]]&&(t[s[e]]=t[s[e]].bind(t))}bind(t){let e=Object.getOwnPropertyNames(Object.getPrototypeOf(t));for(let s=0;s<e.length;s++)if("function"==typeof t[e[s]]){if(this[e[s]])continue;this[e[s]]=t[e[s]].bind(t)}}observables(t,e){let s,i=this;if(t){if(!Array.isArray(t))return Object.keys(t).map(((n,r)=>{r||(s=n);let o=t[n],l="_"+n;i[l]=o,Object.defineProperty(i,n,{set:t=>{i[l]=t,i.forceRender&&i.forceRender(),e&&e()},get:()=>i[l],configurable:!0})})),i[s];t.forEach((t=>{this.observable(t,this[t])}))}}observable(t,e){return setTimeout((()=>{e&&void 0===this[t]||(e=this[t]),this.observables({[t]:e})}),0),e}}export function camelize(t){return(t=(t=(t=(t=(t=String(t)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(t,e){return 0==+t?"":0===e?t.toLowerCase():t.toUpperCase()}))}var t,e={d:(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{BJ:()=>tt,Al:()=>O,dy:()=>b,Jb:()=>M,Ld:()=>w,sY:()=>W,rx:()=>X,YP:()=>N,Au:()=>et});const s=window,n=s.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,h="?"+l,a=`<${h}>`,d=document,$=()=>d.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,A=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),_="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,f=/>/g,g=RegExp(`>|${_}(?:([^\\s"'>=/]+)(${_}*=${_}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,y=/"/g,x=/^(?:script|style|textarea|title)$/i,H=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),b=H(1),N=H(2),M=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,C=d.createTreeWalker(d,129,null,!1),S=(t,e)=>{const s=t.length-1,i=[];let n,h=2===e?"<svg>":"",d=v;for(let e=0;e<s;e++){const s=t[e];let o,c,u=-1,$=0;for(;$<s.length&&(d.lastIndex=$,c=d.exec(s),null!==c);)$=d.lastIndex,d===v?"!--"===c[1]?d=p:void 0!==c[1]?d=f:void 0!==c[2]?(x.test(c[2])&&(n=RegExp("</"+c[2],"g")),d=g):void 0!==c[3]&&(d=g):d===g?">"===c[0]?(d=null!=n?n:v,u=-1):void 0===c[1]?u=-2:(u=d.lastIndex-c[2].length,o=c[1],d=void 0===c[3]?g:'"'===c[3]?y:m):d===y||d===m?d=g:d===p||d===f?d=v:(d=g,n=void 0);const A=d===g&&t[e+1].startsWith("/>")?" ":"";h+=d===v?s+a:u>=0?(i.push(o),s.slice(0,u)+r+s.slice(u)+l+A):s+l+(-2===u?(i.push(void 0),e):A)}const c=h+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==o?o.createHTML(c):c,i]};class B{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,a=0;const d=t.length-1,c=this.parts,[u,p]=S(t,e);if(this.el=B.createElement(u,s),C.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=C.nextNode())&&c.length<d;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const s=p[a++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(s);c.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?j:U})}else c.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(x.test(i.tagName)){const t=i.textContent.split(l),e=t.length-1;if(e>0){i.textContent=n?n.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],$()),C.nextNode(),c.push({type:2,index:++o});i.append(t[e],$())}}}else if(8===i.nodeType)if(i.data===h)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(l,t+1));)c.push({type:7,index:o}),t+=l.length-1}o++}}static createElement(t,e){const s=d.createElement("template");return s.innerHTML=t,s}}function P(t,e,s=t,i){var n,r,o,l;if(e===M)return e;let h=void 0!==i?null===(n=s._$Co)||void 0===n?void 0:n[i]:s._$Cl;const a=c(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(r=null==h?void 0:h._$AO)||void 0===r||r.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,i)),void 0!==i?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[i]=h:s._$Cl=h),void 0!==h&&(e=P(t,h._$AS(t,e.values),h,i)),e}class E{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:d).importNode(s,!0);C.currentNode=n;let r=C.nextNode(),o=0,l=0,h=i[0];for(;void 0!==h;){if(o===h.index){let e;2===h.type?e=new I(r,r.nextSibling,this,t):1===h.type?e=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(e=new D(r,this,t)),this._$AV.push(e),h=i[++l]}o!==(null==h?void 0:h.index)&&(r=C.nextNode(),o++)}return n}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class I{constructor(t,e,s,i){var n;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),c(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==M&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):A(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==w&&c(this._$AH)?this._$AA.nextSibling.data=t:this.$(d.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=B.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(s);else{const t=new E(n,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=T.get(t.strings);return void 0===e&&T.set(t.strings,e=new B(t)),e}T(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new I(this.k($()),this.k($()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class U{constructor(t,e,s,i,n){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=P(this,t,e,0),r=!c(t)||t!==this._$AH&&t!==M,r&&(this._$AH=t);else{const i=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=P(this,i[s+o],e,o),l===M&&(l=this._$AH[o]),r||(r=!c(l)||l!==this._$AH[o]),l===w?t=w:t!==w&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!i&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}}const k=n?n.emptyScript:"";class R extends U{constructor(){super(...arguments),this.type=4}j(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class j extends U{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=P(this,t,e,0))&&void 0!==s?s:w)===M)return;const i=this._$AH,n=t===w&&i!==w||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==w&&(i===w||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class D{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const O={O:r,P:l,A:h,C:1,M:S,L:E,D:A,R:P,I:I,V:U,H:R,N:j,U:L,F:D},V=s.litHtmlPolyfillSupport;null==V||V(B,I),(null!==(t=s.litHtmlVersions)&&void 0!==t?t:s.litHtmlVersions=[]).push("2.7.2");const W=(t,e,s)=>{var i,n;const r=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new I(e.insertBefore($(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o},J=t=>(...e)=>({_$litDirective$:t,values:e});class Y{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const{I:z}=O,Z=()=>document.createComment(""),F=(t,e,s)=>{var i;const n=t._$AA.parentNode,r=void 0===e?t._$AB:e._$AA;if(void 0===s){const e=n.insertBefore(Z(),r),i=n.insertBefore(Z(),r);s=new z(e,i,t,t.options)}else{const e=s._$AB.nextSibling,o=s._$AM,l=o!==t;if(l){let e;null===(i=s._$AQ)||void 0===i||i.call(s,t),s._$AM=t,void 0!==s._$AP&&(e=t._$AU)!==o._$AU&&s._$AP(e)}if(e!==r||l){let t=s._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,r),t=e}}}return s},Q=(t,e,s=t)=>(t._$AI(e,s),t),q={},G=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let s=t._$AA;const i=t._$AB.nextSibling;for(;s!==i;){const t=s.nextSibling;s.remove(),s=t}},K=(t,e,s)=>{const i=new Map;for(let n=e;n<=s;n++)i.set(t[n],n);return i},X=J(class extends Y{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,s){let i;void 0===s?s=e:void 0!==e&&(i=e);const n=[],r=[];let o=0;for(const e of t)n[o]=i?i(e,o):o,r[o]=s(e,o),o++;return{values:r,keys:n}}render(t,e,s){return this.dt(t,e,s).values}update(t,[e,s,i]){var n;const r=(t=>t._$AH)(t),{values:o,keys:l}=this.dt(e,s,i);if(!Array.isArray(r))return this.ht=l,o;const h=null!==(n=this.ht)&&void 0!==n?n:this.ht=[],a=[];let d,c,u=0,$=r.length-1,p=0,A=o.length-1;for(;u<=$&&p<=A;)if(null===r[u])u++;else if(null===r[$])$--;else if(h[u]===l[p])a[p]=Q(r[u],o[p]),u++,p++;else if(h[$]===l[A])a[A]=Q(r[$],o[A]),$--,A--;else if(h[u]===l[A])a[A]=Q(r[u],o[A]),F(t,a[A+1],r[u]),u++,A--;else if(h[$]===l[p])a[p]=Q(r[$],o[p]),F(t,r[u],r[$]),$--,p++;else if(void 0===d&&(d=K(l,p,A),c=K(h,u,$)),d.has(h[u]))if(d.has(h[$])){const e=c.get(l[p]),s=void 0!==e?r[e]:null;if(null===s){const e=F(t,r[u]);Q(e,o[p]),a[p]=e}else a[p]=Q(s,o[p]),F(t,r[u],s),r[e]=null;p++}else G(r[$]),$--;else G(r[u]),u++;for(;p<=A;){const e=F(t,a[A+1]);Q(e,o[p]),a[p++]=e}for(;u<=$;){const t=r[u++];null!==t&&G(t)}return this.ht=l,((t,e=q)=>{t._$AH=e})(t,a),M}});class tt extends Y{constructor(t){if(super(t),this.et=w,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||null==t)return this.ft=void 0,this.et=t;if(t===M)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}tt.directiveName="unsafeHTML",tt.resultType=1;const et=J(tt);var it=i.BJ,st=i.Al,nt=i.dy,ot=i.Jb,rt=i.Ld,lt=i.sY,ht=i.rx,at=i.YP,dt=i.Au;export{it as UnsafeHTMLDirective,st as _$LH,nt as html,ot as noChange,rt as nothing,lt as render,ht as repeat,at as svg,dt as unsafeHTML};let $LH=st,html=nt,noChange=ot,nothing=rt,render=lt,repeat=ht,svg=at,unsafeHTML=dt;

export class CuppaDraggable extends CuppaComponent{
  static attributes = ['move-element', 'move-x', 'move-y'];
  initial = {};
  position = {x:0, y:0, gapX:0, gapY:0};
  moveElement = true;
  moveX = true;
  moveY = true;
  dim = {};
  mouseDownTimestamp;

  constructor() {
    super();
    this.addEventListener('mousedown', this.mouseDown);
  }

  mouseDown(e){
    this.mouseDownTimestamp = Date.now();
    this.dim = cuppa.dim(this);
    this.initial = e;
    this.position.x = e.pageX;
    this.position.y = e.pageY;
    this.position.gapX = 0;
    this.position.gapY = 0;
    this.dispatchEvent(new CustomEvent("start", {detail:this.position}));
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
    document.body.style.pointerEvents = "none";
  }

  mouseMove(e){
    this.position.x = e.pageX;
    this.position.y = e.pageY;
    this.position.gapX = e.screenX - this.initial.screenX;
    this.position.gapY = e.screenY - this.initial.screenY;
    this.dispatchEvent(new CustomEvent("move", {detail:this.position}));
    this.move();
  }

  mouseUp(e){
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
    this.move();
    document.body.style.pointerEvents = "auto";

    if(this.position.gapX === 0 && this.position.gapY === 0){
      this.dispatchEvent(new CustomEvent("click", {detail:this.position}));
    }else{
      this.dispatchEvent(new CustomEvent("end", {detail:this.position}));
    }
  }

  move(){
    if(!this.moveElement) return;
    if(this.moveX){
      this.style.left = `${this.dim.x2 + this.position.gapX}px`;
    }
    if(this.moveY) {
      this.style.top = `${this.dim.y2 + this.position.gapY}px`;
    }
  }

  render(){
    return html`
      <style>
        cuppa-draggable{
          position:absolute;
          top:0;
          left:0;
          width: 50px;
          height:50px;
          background: #f00;
          user-select: none;
        }
      </style>
    `
  }
};

customElements.define('cuppa-draggable', CuppaDraggable);
document.defaultView.CuppaDraggable = CuppaDraggable;
