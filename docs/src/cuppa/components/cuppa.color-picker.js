/**
* v0.0.1
* Authors (https://github.com/cloudbit-interactive/cuppajs)
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
*/
export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;_callbacks=[];constructor(){super(),this.getPropertiesCallbacks(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.binAll(this)}getPropertiesCallbacks(){let t=Object.entries(this);for(let e=0;e<t.length;e++){let[s,i]=t[e];-1===["refs","shadow","renderedCount","_template","_callbacks"].indexOf(s)&&this._callbacks.push({key:s,value:i})}}reSetPropertiesCallbacks(){for(let t=0;t<this._callbacks.length;t++){let{key:e,value:s}=this._callbacks[t];this[e]=s}}connectedCallback(){this.reSetPropertiesCallbacks(),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),setTimeout((()=>{this.mounted&&this.mounted(this),this.rendered&&this.rendered(this)}),0)}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(t){Object.entries(t).map((([t,e])=>{this[`${t}`]=e})),this.forceRender()}forceRender(t,e=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),t&&t(),this.rendered&&e&&this.rendered(this),this.renderedCount++}processRefs(t,e,s){s||(s="id");let i={},n=Array.from(t.querySelectorAll(`[${s}]`));for(let t=0;t<n.length;t++)e?e[n[t].getAttribute(s)]=n[t]:i[n[t].getAttribute(s)]=n[t];return e?e.rootHtml=t:i.rootHtml=t,i}binAll(t,e){let s=Object.getOwnPropertyNames(Object.getPrototypeOf(t));e&&(s=Object.keys(t));for(let e=0;e<s.length;e++)"function"==typeof t[s[e]]&&(t[s[e]]=t[s[e]].bind(t))}bind(t){let e=Object.getOwnPropertyNames(Object.getPrototypeOf(t));for(let s=0;s<e.length;s++)if("function"==typeof t[e[s]]){if(this[e[s]])continue;this[e[s]]=t[e[s]].bind(t)}}observables(t,e){let s,i=this;if(t){if(!Array.isArray(t))return Object.keys(t).map(((n,r)=>{r||(s=n);let o=t[n],l="_"+n;i[l]=o,Object.defineProperty(i,n,{set:t=>{i[l]=t,i.forceRender&&i.forceRender(),e&&e()},get:()=>i[l],configurable:!0})})),i[s];t.forEach((t=>{this.observable(t,this[t])}))}}observable(t,e){return setTimeout((()=>{e&&void 0===this[t]||(e=this[t]),this.observables({[t]:e})}),0),e}}export function camelize(t){return(t=(t=(t=(t=(t=String(t)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(t,e){return 0==+t?"":0===e?t.toLowerCase():t.toUpperCase()}))}var t,e={d:(t,s)=>{for(var i in s)e.o(s,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:s[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{BJ:()=>tt,Al:()=>O,dy:()=>b,Jb:()=>M,Ld:()=>w,sY:()=>W,rx:()=>X,YP:()=>N,Au:()=>et});const s=window,n=s.trustedTypes,o=n?n.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,h="?"+l,a=`<${h}>`,d=document,$=()=>d.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,A=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),_="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,f=/>/g,g=RegExp(`>|${_}(?:([^\\s"'>=/]+)(${_}*=${_}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),m=/'/g,y=/"/g,x=/^(?:script|style|textarea|title)$/i,H=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),b=H(1),N=H(2),M=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,C=d.createTreeWalker(d,129,null,!1),S=(t,e)=>{const s=t.length-1,i=[];let n,h=2===e?"<svg>":"",d=v;for(let e=0;e<s;e++){const s=t[e];let o,c,u=-1,$=0;for(;$<s.length&&(d.lastIndex=$,c=d.exec(s),null!==c);)$=d.lastIndex,d===v?"!--"===c[1]?d=p:void 0!==c[1]?d=f:void 0!==c[2]?(x.test(c[2])&&(n=RegExp("</"+c[2],"g")),d=g):void 0!==c[3]&&(d=g):d===g?">"===c[0]?(d=null!=n?n:v,u=-1):void 0===c[1]?u=-2:(u=d.lastIndex-c[2].length,o=c[1],d=void 0===c[3]?g:'"'===c[3]?y:m):d===y||d===m?d=g:d===p||d===f?d=v:(d=g,n=void 0);const A=d===g&&t[e+1].startsWith("/>")?" ":"";h+=d===v?s+a:u>=0?(i.push(o),s.slice(0,u)+r+s.slice(u)+l+A):s+l+(-2===u?(i.push(void 0),e):A)}const c=h+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==o?o.createHTML(c):c,i]};class B{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,a=0;const d=t.length-1,c=this.parts,[u,A]=S(t,e);if(this.el=B.createElement(u,s),C.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=C.nextNode())&&c.length<d;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const s=A[a++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(s);c.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?j:U})}else c.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(x.test(i.tagName)){const t=i.textContent.split(l),e=t.length-1;if(e>0){i.textContent=n?n.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],$()),C.nextNode(),c.push({type:2,index:++o});i.append(t[e],$())}}}else if(8===i.nodeType)if(i.data===h)c.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(l,t+1));)c.push({type:7,index:o}),t+=l.length-1}o++}}static createElement(t,e){const s=d.createElement("template");return s.innerHTML=t,s}}function P(t,e,s=t,i){var n,r,o,l;if(e===M)return e;let h=void 0!==i?null===(n=s._$Co)||void 0===n?void 0:n[i]:s._$Cl;const a=c(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(r=null==h?void 0:h._$AO)||void 0===r||r.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,i)),void 0!==i?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[i]=h:s._$Cl=h),void 0!==h&&(e=P(t,h._$AS(t,e.values),h,i)),e}class E{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:d).importNode(s,!0);C.currentNode=n;let r=C.nextNode(),o=0,l=0,h=i[0];for(;void 0!==h;){if(o===h.index){let e;2===h.type?e=new I(r,r.nextSibling,this,t):1===h.type?e=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(e=new D(r,this,t)),this._$AV.push(e),h=i[++l]}o!==(null==h?void 0:h.index)&&(r=C.nextNode(),o++)}return n}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class I{constructor(t,e,s,i){var n;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),c(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==M&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):A(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==w&&c(this._$AH)?this._$AA.nextSibling.data=t:this.$(d.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=B.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(s);else{const t=new E(n,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=T.get(t.strings);return void 0===e&&T.set(t.strings,e=new B(t)),e}T(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new I(this.k($()),this.k($()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class U{constructor(t,e,s,i,n){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(void 0===n)t=P(this,t,e,0),r=!c(t)||t!==this._$AH&&t!==M,r&&(this._$AH=t);else{const i=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=P(this,i[s+o],e,o),l===M&&(l=this._$AH[o]),r||(r=!c(l)||l!==this._$AH[o]),l===w?t=w:t!==w&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!i&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}}const k=n?n.emptyScript:"";class R extends U{constructor(){super(...arguments),this.type=4}j(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name)}}class j extends U{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=P(this,t,e,0))&&void 0!==s?s:w)===M)return;const i=this._$AH,n=t===w&&i!==w||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==w&&(i===w||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class D{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const O={O:r,P:l,A:h,C:1,M:S,L:E,D:A,R:P,I:I,V:U,H:R,N:j,U:L,F:D},V=s.litHtmlPolyfillSupport;null==V||V(B,I),(null!==(t=s.litHtmlVersions)&&void 0!==t?t:s.litHtmlVersions=[]).push("2.7.2");const W=(t,e,s)=>{var i,n;const r=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new I(e.insertBefore($(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o},J=t=>(...e)=>({_$litDirective$:t,values:e});class Y{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const{I:z}=O,Z=()=>document.createComment(""),F=(t,e,s)=>{var i;const n=t._$AA.parentNode,r=void 0===e?t._$AB:e._$AA;if(void 0===s){const e=n.insertBefore(Z(),r),i=n.insertBefore(Z(),r);s=new z(e,i,t,t.options)}else{const e=s._$AB.nextSibling,o=s._$AM,l=o!==t;if(l){let e;null===(i=s._$AQ)||void 0===i||i.call(s,t),s._$AM=t,void 0!==s._$AP&&(e=t._$AU)!==o._$AU&&s._$AP(e)}if(e!==r||l){let t=s._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,r),t=e}}}return s},Q=(t,e,s=t)=>(t._$AI(e,s),t),q={},G=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let s=t._$AA;const i=t._$AB.nextSibling;for(;s!==i;){const t=s.nextSibling;s.remove(),s=t}},K=(t,e,s)=>{const i=new Map;for(let n=e;n<=s;n++)i.set(t[n],n);return i},X=J(class extends Y{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,s){let i;void 0===s?s=e:void 0!==e&&(i=e);const n=[],r=[];let o=0;for(const e of t)n[o]=i?i(e,o):o,r[o]=s(e,o),o++;return{values:r,keys:n}}render(t,e,s){return this.dt(t,e,s).values}update(t,[e,s,i]){var n;const r=(t=>t._$AH)(t),{values:o,keys:l}=this.dt(e,s,i);if(!Array.isArray(r))return this.ht=l,o;const h=null!==(n=this.ht)&&void 0!==n?n:this.ht=[],a=[];let d,c,u=0,$=r.length-1,A=0,_=o.length-1;for(;u<=$&&A<=_;)if(null===r[u])u++;else if(null===r[$])$--;else if(h[u]===l[A])a[A]=Q(r[u],o[A]),u++,A++;else if(h[$]===l[_])a[_]=Q(r[$],o[_]),$--,_--;else if(h[u]===l[_])a[_]=Q(r[u],o[_]),F(t,a[_+1],r[u]),u++,_--;else if(h[$]===l[A])a[A]=Q(r[$],o[A]),F(t,r[u],r[$]),$--,A++;else if(void 0===d&&(d=K(l,A,_),c=K(h,u,$)),d.has(h[u]))if(d.has(h[$])){const e=c.get(l[A]),s=void 0!==e?r[e]:null;if(null===s){const e=F(t,r[u]);Q(e,o[A]),a[A]=e}else a[A]=Q(s,o[A]),F(t,r[u],s),r[e]=null;A++}else G(r[$]),$--;else G(r[u]),u++;for(;A<=_;){const e=F(t,a[_+1]);Q(e,o[A]),a[A++]=e}for(;u<=$;){const t=r[u++];null!==t&&G(t)}return this.ht=l,((t,e=q)=>{t._$AH=e})(t,a),M}});class tt extends Y{constructor(t){if(super(t),this.et=w,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||null==t)return this.ft=void 0,this.et=t;if(t===M)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}tt.directiveName="unsafeHTML",tt.resultType=1;const et=J(tt);var it=i.BJ,st=i.Al,nt=i.dy,ot=i.Jb,rt=i.Ld,lt=i.sY,ht=i.rx,at=i.YP,dt=i.Au;export{it as UnsafeHTMLDirective,st as _$LH,nt as html,ot as noChange,rt as nothing,lt as render,ht as repeat,at as svg,dt as unsafeHTML};let $LH=st,html=nt,noChange=ot,nothing=rt,render=lt,repeat=ht,svg=at,unsafeHTML=dt;
export class CuppaStorage{static LOCAL="LOCAL";static SESSION="SESSION";static COOKIE="COOKIE";static INDEXED_DB="INDEXED_DB";static db;static data={};static callbacks={};static async setData({name:e="default",data:t=null,store:a="",silence:o=!1}){"function"==typeof a?a({name:e,data:t,silence:o,type:"set"}):String(a).toUpperCase()===CuppaStorage.LOCAL?localStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.SESSION?sessionStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.INDEXED_DB?await CuppaStorage.db.add(e,t):String(a).toUpperCase()===CuppaStorage.COOKIE?CuppaStorage.setCookie(e,JSON.stringify(t)):CuppaStorage.data[e]=t,o||CuppaStorage.executeCallbacks({name:e,data:t})}static setDataSync({name:e="default",data:t=null,store:a="",silence:o=!1}){"function"==typeof a?a({name:e,data:t,silence:o,type:"setSync"}):String(a).toUpperCase()===CuppaStorage.LOCAL?localStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.SESSION?sessionStorage.setItem(e,JSON.stringify(t)):String(a).toUpperCase()===CuppaStorage.COOKIE?CuppaStorage.setCookie(e,JSON.stringify(t)):CuppaStorage.data[e]=t,o||CuppaStorage.executeCallbacks({name:e,data:t})}static async getData({name:e="default",callback:t=null,store:a="",defaultValue:o=null}){let r;if("function"==typeof a)r=await a({name:e,callback:t,defaultValue:o,type:"get"});else if(String(a).toUpperCase()===CuppaStorage.LOCAL){let t=localStorage.getItem(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else if(String(a).toUpperCase()===CuppaStorage.SESSION){let t=sessionStorage.getItem(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else if(String(a).toUpperCase()===CuppaStorage.INDEXED_DB)r=await CuppaStorage.db.get(e);else if(String(a).toUpperCase()===CuppaStorage.COOKIE){let t=CuppaStorage.getCookie(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else r=CuppaStorage.data[e];return void 0===r&&(r=o),null!=r&&t&&t(r),t&&CuppaStorage.addCallback({name:e,callback:t}),r}static getDataSync({name:e="default",callback:t=null,store:a="",defaultValue:o=null}){let r;if("function"==typeof a)r=a({name:e,callback:t,defaultValue:o,type:"getSync"});else if(String(a).toUpperCase()===CuppaStorage.LOCAL){let t=localStorage.getItem(e);t&&(r=JSON.parse(t))}else if(String(a).toUpperCase()===CuppaStorage.SESSION){let t=sessionStorage.getItem(e);t&&(r=JSON.parse(t))}else if(String(a).toUpperCase()===CuppaStorage.COOKIE){let t=CuppaStorage.getCookie(e);if(t)try{r=JSON.parse(t)}catch(e){r=void 0}}else r=CuppaStorage.data[e];return void 0===r&&(r=o),null!=r&&t&&t(r),t&&CuppaStorage.addCallback({name:e,callback:t}),r}static removeCallback({name:e,callback:t,likeString:a=!1}){if(!CuppaStorage.callbacks[e])return;let o=CuppaStorage.callbacks[e];for(let e=0;e<o.length;e++)a?o[e].toString()===t.toString()&&o.splice(e,1):o[e]===t&&o.splice(e,1)}static removeAllCallbacks({name:e}){delete CuppaStorage.callbacks[e]}static executeCallbacks({name:e,data:t}){if(!CuppaStorage.callbacks[e])return;let a=CuppaStorage.callbacks[e];for(let e=0;e<a.length;e++)a[e](t)}static addCallback=function({name:e,callback:t}){CuppaStorage.callbacks[e]||(CuppaStorage.callbacks[e]=[]),CuppaStorage.callbacks[e].push(t)}}document.defaultView.CuppaStorage||(document.defaultView.CuppaStorage=CuppaStorage);export class GetStorage extends HTMLElement{name;store;defaultValue;data;constructor(){super(),bindAll(this),this.style.display="none"}connectedCallback(){setTimeout((()=>{this.name=this.getAttribute("name"),this.store=this.getAttribute("store"),this.defaultValue=this.getAttribute("default-value"),CuppaStorage.getData({name:this.name,callback:this.onUpdateStorage,defaultValue:this.defaultValue,store:this.store}).then()}),0)}onUpdateStorage(e){this.data=e,this.dispatchEvent(new CustomEvent("change",{detail:this.data}))}disconnectedCallback(){CuppaStorage.removeCallback({name:this.name,callback:this.onUpdateStorage})}}document.defaultView.GetStorage||(customElements.define("get-storage",GetStorage),document.defaultView.GetStorage=GetStorage);class CuppaStorageInnoDB{config={db:"cuppa_db",storage:"cuppa_storage",version:1,update:!1};db;constructor(e){this.config={...this.config,...e},bindAll(this)}async connect(){let e=this.config;if(indexedDB.databases){let t=await indexedDB.databases();t=t.filter((t=>t.name==e.db))[0],e.version=t&&e.update?t.version+1:t?t.version:e.version}else e.version=e.version;const t=indexedDB.open(e.db,e.version);return t.onupgradeneeded=this.onUpdateDB,await new Promise((e=>{t.onsuccess=t=>{this.db=t.target.result,e(this)}}))}async onUpdateDB(e){this.db=e.target.result;let{db:t,config:a}=this;t.objectStoreNames.contains(a.storage)||t.createObjectStore(a.storage,{keyPath:"name"})}async add(e,t,a){this.db||await this.connect();let{db:o,config:r}=this,s=o.transaction(r.storage,"readwrite").objectStore(r.storage),n={name:e,value:t};return await new Promise((e=>{let t=s.put(n);t.onsuccess=()=>{e(t.result)},t.onerror=t=>{e(null,t.target.error)}})),await this.get(e,a)}async get(e,t){null==t&&(t=!0),this.db||await this.connect();let{db:a,config:o}=this,r=a.transaction(o.storage,"readwrite").objectStore(o.storage);return await new Promise((a=>{let o=r.get(e);o.onsuccess=()=>{a(t&&o.result?o.result.value:o.result)},o.onerror=e=>{a(null)}}))}async delete(e){this.db||await this.connect();let{db:t,config:a}=this;t.transaction(a.storage,"readwrite").objectStore(a.storage).delete(e)}}function bindAll(e,t){let a=Object.getOwnPropertyNames(Object.getPrototypeOf(e));t&&(a=Object.keys(e));for(let t=0;t<a.length;t++)"function"==typeof e[a[t]]&&(e[a[t]]=e[a[t]].bind(e))}CuppaStorage.db=new CuppaStorageInnoDB,CuppaStorage.setCookie=function(e,t="",a){if(a){let o=new Date;o.setDate(o.getDate()+a),t=encodeURIComponent(t)+"; expires="+o.toUTCString(),document.cookie=e+"="+t+";path=/; SameSite=Strict;"}else document.cookie=e+"="+t+";path=/; SameSite=Strict;"},CuppaStorage.getCookie=function(e,t){null==t&&(t=document);let a=t.cookie.match("(^|;) ?"+e+"=([^;]*)(;|$)");return a?decodeURIComponent(a[2]):null},CuppaStorage.deleteCookie=function(e){document.cookie=e+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"};

export const iconX = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`
export class CuppaColorPicker extends CuppaComponent{
	storageName = this.observable('storageName', 'CuppaColorPicker');
	storeType = this.observable('storeType', CuppaStorage.LOCAL);
	colors = this.observable('colors', []);
	maxColors = this.observable('maxColors', 10);
	value = this.observable('value', '');
	showReset = this.observable('showReset', true);
	open = this.observable('open', false);
	callback;
	naviveColorPickerFocus = false;

	static get observedAttributes() { return ['value', 'label', 'show-reset', 'storage-name', 'max-colors', 'store-type', 'open'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(oldVal === newVal) return;
		if(newVal === 'true') newVal = true;
		if(newVal === 'false') newVal = false;
		this[camelize(attr)] = newVal;
	}

	onChange(value){
		this.value = value;
		if(this.callback) this.callback(this.value);
		this.dispatchEvent(new CustomEvent("change",{detail:{color:this.value}}));
		this.storeColor(value);
	}

	storeColor(color){
		if(!this.storageName || !color) return;
		let colors = CuppaStorage.getDataSync({name:this.storageName,store:this.storeType}) || [];
		if(colors.includes(color)) return;
		colors.unshift(color);
		if(colors.length > this.maxColors) colors.pop();
		CuppaStorage.setDataSync({name:this.storageName,data:colors,store:this.storeType});
		this.forceRender();
	}

	onDocumentClick(e){
		if(this.naviveColorPickerFocus) return;
		this.removeEvents();
		if(this.open){
			this.close();
		}
	}

	onKeyDown(e){
		if(e.key === 'Escape'){
			this.close();
		}
	}

	removeEvents(){
		document.removeEventListener('click', this.onDocumentClick);
		document.removeEventListener('keydown', this.onKeyDown);
	}

	close(){
		this.open = false;
		this.removeEvents();
	}

	render(){
		let colors = this.colors?.length || CuppaStorage.getDataSync({name:this.storageName,store:this.storeType}) || [];
		return html`
			<div
        class="picker-button"
        style="background-color: ${this.value}"
        @click=${e=>{
          this.open = !this.open;
          if(this.open){
						setTimeout(e=>{
              document.addEventListener('click', this.onDocumentClick);
							document.addEventListener('keydown', this.onKeyDown);
						}, 0)
          }
        }}
			></div>
			<div 
				class="picker-modal" 
			  style="display:${this.open ? 'flex' : 'none'}"
				@click=${e=>{
					e.stopPropagation(); 
				}}
			>
				<div class="picker-area">
	        <div class="color-picker">
	          <input
		          title="Select Color"
	            type="color"
	            .value="${this.value || '#FFFFFF'}"
	            @change=${(e)=>{
	              e.preventDefault(); e.stopPropagation();
	              this.onChange(e.target.value);
								this.close();
	            }}
	            @click=${e=>{
								if(!this.naviveColorPickerFocus){
									this.naviveColorPickerFocus = true;
								}else{
                  e.stopPropagation(); e.preventDefault();
                  this.naviveColorPickerFocus = false;
									e.target.blur();
								}
	            }}
	            @blur=${e=>{
		            setTimeout(e=>{
                  this.naviveColorPickerFocus = false;
		            }, 300)
	            }}
	          >
	        </div>
	        ${!this.showReset ? `` : html`
		        <div
		          class="btn-clear"
		          title="Clear"
		          @click=${e=>{
		            e.preventDefault(); e.stopPropagation();
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
          ${ colors.map(color=>{
            return html`
						<div 
							class="btn-color ${color === this.value ? 'selected' : ''}"
							style="background: ${color}"
							@click=${(e)=>this.onChange(color)}
						></div>
					`
          })}
        </div>
				`}
      </div>
      <style>
        cuppa-color-picker{
	        .picker-button{
		        width: 20px;
		        height: 20px;
		        border-radius: 5px;
		        border:1px solid rgba(0,0,0,0.2);
		        cursor: pointer;
	        }
	        .picker-modal{
		        position: absolute;
            display: flex;
            flex-direction: column;
            border:1px solid rgba(0,0,0,0.2);
            border-radius: 5px;
            padding:10px;
            gap:5px;
		        z-index: 1;
		        width: 200px;
		        transform:translateX(-50%);
		        margin-top: 2px;
		        background: #fff;
		        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            .picker-area{
              display:flex;
              flex-direction: row;
              gap:5px;
              & .color-picker{
                grid-area: color-picker;
                height: 20px;
                place-self: end;
                width: 100%;
                overflow: hidden;
                border: 1px solid rgba(0,0,0,0.2);
                border-radius: 3px;
                & input{
                  position: absolute;
                  top:-10px; left:-10px;
                  width: calc(100% + 20px); height: calc(100% + 20px);
                }
              }
              & .btn-clear{
                grid-area: btn-clear;
                width: 30px;
                height: 20px;
                cursor: pointer;
                border-radius: 5px;
                border:1px solid rgba(0,0,0,0.1);
                display: flex;
                justify-content: center;
                align-items: center;
                & svg{
                  width: 12px; height: 12px;
                }
              }
            }
            & .color-list{
              grid-area: color-list;
              border-top:1px solid rgba(0,0,0,0.1);
              padding-top: 5px;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: start;
              align-items: flex-start;
              gap:5px;
              & .btn-color{
                cursor: pointer;
                width: 16px;
                height: 16px;
                border-radius: 5px;
                border:1px solid rgba(0,0,0,0.1);
                display: flex;
                justify-content: center;
                align-items: center;
                & svg{
                  width: 12px; height: 12px;
                }
                &.selected{
                  border:1px solid rgba(0,0,0,0.2);
                  border-bottom:1px solid rgba(0,0,0,0.3);
                  box-shadow: 0 1px 2px rgba(0,0,0,0.4);
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
