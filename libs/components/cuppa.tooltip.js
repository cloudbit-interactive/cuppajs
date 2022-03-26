export class CuppaComponent extends HTMLElement{refs={};shadow=null;renderedCount=0;_template;constructor(){super(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.forceRender=this.forceRender.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.observables=this.observables.bind(this),this.binAll(this)}connectedCallback(){this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(null,!1),this.mounted&&this.mounted(this),this.rendered&&this.rendered(this)}disconnectedCallback(){this.unmounted&&this.unmounted(this)}setVariables(args){Object.entries(args).map(([name,value])=>{this[`_${name}`]=value}),this.forceRender()}forceRender(callback,dispatchRender=!0){this._template||(this._template=()=>this.render()),this.shadowRoot?render(this._template(),this.shadowRoot):render(this._template(),this),this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&dispatchRender&&this.rendered(this),this.renderedCount++}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}bind(element){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));for(let i=0;i<propertyNames.length;i++)if("function"==typeof element[propertyNames[i]]){if(this[propertyNames[i]])continue;this[propertyNames[i]]=element[propertyNames[i]].bind(element)}}observables(object,callback){let target=this,firstName;if(object){if(!Array.isArray(object))return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName];object.forEach(varName=>{this.observable(varName,this[varName])})}}observable(varName,defaultValue){return setTimeout(()=>{defaultValue||(defaultValue=this[varName]),this.observables({[varName]:defaultValue})},0),defaultValue}}export function camelize(str){return(str=(str=(str=(str=(str=String(str)||"").replace(new RegExp("-","g")," ")).replace(new RegExp("_","g")," ")).toLowerCase()).replace(/[^\w\s]/gi,"")).replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,(function(match,index){return 0==+match?"":0===index?match.toLowerCase():match.toUpperCase()}))}var t,e={d:(t,i)=>{for(var s in i)e.o(i,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},i={};e.d(i,{Al:()=>D,dy:()=>y,Jb:()=>H,Ld:()=>b,sY:()=>M,rx:()=>F,YP:()=>x});const s=globalThis.trustedTypes,n=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o=`lit$${(Math.random()+"").slice(9)}$`,l="?"+o,r=`<${l}>`,h=document,$=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,A=t=>{var e;return a(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,u=/-->/g,_=/>/g,v=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,p=/'/g,f=/"/g,g=/^(?:script|style|textarea)$/i,m=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),y=m(1),x=m(2),H=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),N=new WeakMap,M=(t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let l=o._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=l=new P(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l},S=h.createTreeWalker(h,129,null,!1),C=(t,e)=>{const i=t.length-1,s=[];let l,h=2===e?"<svg>":"",$=c;for(let e=0;e<i;e++){const i=t[e];let n,d,a=-1,A=0;for(;A<i.length&&($.lastIndex=A,d=$.exec(i),null!==d);)A=$.lastIndex,$===c?"!--"===d[1]?$=u:void 0!==d[1]?$=_:void 0!==d[2]?(g.test(d[2])&&(l=RegExp("</"+d[2],"g")),$=v):void 0!==d[3]&&($=v):$===v?">"===d[0]?($=null!=l?l:c,a=-1):void 0===d[1]?a=-2:(a=$.lastIndex-d[2].length,n=d[1],$=void 0===d[3]?v:'"'===d[3]?f:p):$===f||$===p?$=v:$===u||$===_?$=c:($=v,l=void 0);const m=$===v&&t[e+1].startsWith("/>")?" ":"";h+=$===c?i+r:a>=0?(s.push(n),i.slice(0,a)+"$lit$"+i.slice(a)+o+m):i+o+(-2===a?(s.push(void 0),e):m)}const d=h+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==n?n.createHTML(d):d,s]};class T{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,h=0;const d=t.length-1,a=this.parts,[A,c]=C(t,e);if(this.el=T.createElement(A,i),S.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=S.nextNode())&&a.length<d;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(o)){const i=c[h++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split(o),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?U:"?"===e[1]?L:"@"===e[1]?k:I})}else a.push({type:6,index:r})}for(const e of t)n.removeAttribute(e)}if(g.test(n.tagName)){const t=n.textContent.split(o),e=t.length-1;if(e>0){n.textContent=s?s.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],$()),S.nextNode(),a.push({type:2,index:++r});n.append(t[e],$())}}}else if(8===n.nodeType)if(n.data===l)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(o,t+1));)a.push({type:7,index:r}),t+=o.length-1}r++}}static createElement(t,e){const i=h.createElement("template");return i.innerHTML=t,i}}function w(t,e,i=t,s){var n,o,l,r;if(e===H)return e;let h=void 0!==s?null===(n=i._$Cl)||void 0===n?void 0:n[s]:i._$Cu;const $=d(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==$&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===$?h=void 0:(h=new $(t),h._$AT(t,i,s)),void 0!==s?(null!==(l=(r=i)._$Cl)&&void 0!==l?l:r._$Cl=[])[s]=h:i._$Cu=h),void 0!==h&&(e=w(t,h._$AS(t,e.values),h,s)),e}class B{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:h).importNode(i,!0);S.currentNode=n;let o=S.nextNode(),l=0,r=0,$=s[0];for(;void 0!==$;){if(l===$.index){let e;2===$.type?e=new P(o,o.nextSibling,this,t):1===$.type?e=new $.ctor(o,$.name,$.strings,this,t):6===$.type&&(e=new R(o,this,t)),this.v.push(e),$=s[++r]}l!==(null==$?void 0:$.index)&&(o=S.nextNode(),l++)}return n}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class P{constructor(t,e,i,s){var n;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==H&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):A(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.S(h.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=T.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(i);else{const t=new B(n,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=N.get(t.strings);return void 0===e&&N.set(t.strings,e=new T(t)),e}M(t){a(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new P(this.A($()),this.A($()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class I{constructor(t,e,i,s,n){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=w(this,t,e,0),o=!d(t)||t!==this._$AH&&t!==H,o&&(this._$AH=t);else{const s=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=w(this,s[i+l],e,l),r===H&&(r=this._$AH[l]),o||(o=!d(r)||r!==this._$AH[l]),r===b?t=b:t!==b&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}o&&!s&&this.k(t)}k(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class U extends I{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===b?void 0:t}}const E=s?s.emptyScript:"";class L extends I{constructor(){super(...arguments),this.type=4}k(t){t&&t!==b?this.element.setAttribute(this.name,E):this.element.removeAttribute(this.name)}}class k extends I{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=w(this,t,e,0))&&void 0!==i?i:b)===H)return;const s=this._$AH,n=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==b&&(s===b||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class R{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const D={P:"$lit$",V:o,L:l,I:1,N:C,R:B,D:A,j:w,H:P,O:I,F:L,B:k,W:U,Z:R},O=window.litHtmlPolyfillSupport;null==O||O(T,P),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.0.2");const{H:W}=D,j=()=>document.createComment(""),Y=(t,e,i)=>{var s;const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(j(),o),s=n.insertBefore(j(),o);i=new W(e,s,t,t.options)}else{const e=i._$AB.nextSibling,l=i._$AM,r=l!==t;if(r){let e;null===(s=i._$AQ)||void 0===s||s.call(i,t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==l._$AU&&i._$AP(e)}if(e!==o||r){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},V=(t,e,i=t)=>(t._$AI(e,i),t),Z={},z=t=>{var e;null===(e=t._$AP)||void 0===e||e.call(t,!1,!0);let i=t._$AA;const s=t._$AB.nextSibling;for(;i!==s;){const t=i.nextSibling;i.remove(),i=t}},J=(t,e,i)=>{const s=new Map;for(let n=e;n<=i;n++)s.set(t[n],n);return s},F=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){if(super(t),2!==t.type)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const n=[],o=[];let l=0;for(const e of t)n[l]=s?s(e,l):l,o[l]=i(e,l),l++;return{values:o,keys:n}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){var n;const o=(t=>t._$AH)(t),{values:l,keys:r}=this.dt(e,i,s);if(!Array.isArray(o))return this.ct=r,l;const h=null!==(n=this.ct)&&void 0!==n?n:this.ct=[],$=[];let d,a,A=0,c=o.length-1,u=0,_=l.length-1;for(;A<=c&&u<=_;)if(null===o[A])A++;else if(null===o[c])c--;else if(h[A]===r[u])$[u]=V(o[A],l[u]),A++,u++;else if(h[c]===r[_])$[_]=V(o[c],l[_]),c--,_--;else if(h[A]===r[_])$[_]=V(o[A],l[_]),Y(t,$[_+1],o[A]),A++,_--;else if(h[c]===r[u])$[u]=V(o[c],l[u]),Y(t,o[A],o[c]),c--,u++;else if(void 0===d&&(d=J(r,u,_),a=J(h,A,c)),d.has(h[A]))if(d.has(h[c])){const e=a.get(r[u]),i=void 0!==e?o[e]:null;if(null===i){const e=Y(t,o[A]);V(e,l[u]),$[u]=e}else $[u]=V(i,l[u]),Y(t,o[A],i),o[e]=null;u++}else z(o[c]),c--;else z(o[A]),A++;for(;u<=_;){const e=Y(t,$[_+1]);V(e,l[u]),$[u++]=e}for(;A<=c;){const t=o[A++];null!==t&&z(t)}return this.ct=r,((t,e=Z)=>{t._$AH=e})(t,$),H}});var Q=i.Al,q=i.dy,G=i.Jb,K=i.Ld,X=i.sY,tt=i.rx,et=i.YP;export{Q as _$LH,q as html,G as noChange,K as nothing,X as render,tt as repeat,et as svg};let $LH=Q,html=q,noChange=G,nothing=K,render=X,repeat=tt,svg=et;

export class CuppaTooltip extends CuppaComponent {
    static POSITION = {CENTER:"CENTER", LEFT:"LEFT", LEFT_IN:"LEFT_IN", RIGHT:"RIGHT", RIGHT_IN:"RIGHT_IN", TOP:"TOP", TOP_IN:"TOP_IN", BOTTOM:"BOTTOM", BOTTOM_IN:"BOTTOM_IN"}
    static ARROW = {UP:"UP", LEFT:"LEFT", RIGHT:"RIGHT", DOWN:"DOWN", NONE:"NONE"}
    text = this.observable("text", "")
    posX = CuppaTooltip.POSITION.CENTER;
    posY = CuppaTooltip.POSITION.BOTTOM;
    arrow = CuppaTooltip.ARROW.UP;
    arrowStyle = ""
    target;

    static get observedAttributes() { return ['target', 'text', 'pos-x', 'pos-y', 'arrow', 'arrow-style'] }
    attributeChangedCallback(attr, oldVal, newVal) {
        if(oldVal === newVal) return;
        this[camelize(attr)] = newVal;
    }

    mounted(){
        if(this.target) this.target = document.querySelector(this.target);
        this.registerEvents(true);
    }

    registerEvents(value = true){
        if(!this.target) return;
        if(value){
            this.target.addEventListener("click", this.onMouseEnter);
            this.target.addEventListener("mouseenter", this.onMouseEnter);
            this.target.addEventListener("focus", this.onMouseEnter);
            this.target.addEventListener("mouseleave", this.onMouseLeave);
            this.target.addEventListener("blur", this.onMouseLeave);
        }else{
            this.target.removeEventListener("click", this.onMouseEnter);
            this.target.removeEventListener("mouseenter", this.onMouseEnter);
            this.target.removeEventListener("focus", this.onMouseEnter);
            this.target.removeEventListener("mouseleave", this.onMouseLeave);
            this.target.removeEventListener("blur", this.onMouseLeave);
        }
    }

    onMouseEnter(e){ this.show(); }

    show(){
        let dimTarget = this.target.getBoundingClientRect();
        let dimTooltip = this.getBoundingClientRect();


        // x
        let posX = this.posX.toUpperCase();
        if(posX === CuppaTooltip.POSITION.CENTER){
            this.style.left = `${dimTarget.x + (dimTarget.width-dimTooltip.width)*0.5}px`;
        }else if(posX === CuppaTooltip.POSITION.LEFT){
            this.style.left = `${dimTarget.x - dimTooltip.width}px`;
        }else if(posX === CuppaTooltip.POSITION.LEFT_IN){
            this.style.left = `${dimTarget.x}px`;
        }else if(posX === CuppaTooltip.POSITION.RIGHT){
            this.style.left = `${dimTarget.x + dimTarget.width}px`;
        }else if(posX === CuppaTooltip.POSITION.RIGHT_IN){
            this.style.left = `${dimTarget.x + dimTarget.width -  dimTooltip.width}px`;
        }

        // y
        let posY = this.posY.toUpperCase();
        if(posY === CuppaTooltip.POSITION.CENTER){
            this.style.top = `${dimTarget.y + (dimTarget.height-dimTooltip.height)*0.5}px`;
        }else if(posY === CuppaTooltip.POSITION.TOP){
            this.style.top = `${dimTarget.y-dimTooltip.height}px`;
        }else if(posY === CuppaTooltip.POSITION.TOP_IN){
            this.style.top = `${dimTarget.y}px`;
        }else if(posY === CuppaTooltip.POSITION.BOTTOM){
            this.style.top = `${dimTarget.y+dimTarget.height}px`;
        }else if(posY === CuppaTooltip.POSITION.BOTTOM_IN){
            this.style.top = `${dimTarget.y+dimTarget.height-dimTooltip.height}px`;
        }

        this.classList.add("show");
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
                <svg class="cuppa-tooltip_arrow ${this.arrow.toLowerCase()}" width="10" height="5" viewBox="0 0 18 9" preserveAspectRatio="none" style="${this.arrowStyle}" >
                    <path data-name="Icon ionic-md-arrow-dropup" d="M9,22.5l9-9,9,9Z" transform="translate(-9 -13.5)"/>
                </svg>
            `}
            ${this.text ? html`${this.text}` : ``}
            <style>
                cuppa-tooltip{ transition: 0.3s opacity; opacity: 0; position: fixed; top:0; left: 0; background: #000; color:#FFF; padding:5px 8px; font-size: 14px; border-radius: 3px; pointer-events: none; }
                cuppa-tooltip.show{ transition: 0.3s opacity; opacity: 1 !important; visibility: visible; }
                cuppa-tooltip .cuppa-tooltip_arrow{ position: absolute; }
                cuppa-tooltip .cuppa-tooltip_arrow.up{ top:-4px; left:calc(50% - 5px); }
                cuppa-tooltip .cuppa-tooltip_arrow.left{ transform: rotate(-90deg); top:calc(50% - 3px); left:-7px; }
                cuppa-tooltip .cuppa-tooltip_arrow.right{ transform: rotate(90deg); top:calc(50% - 3px); right:-7px; }
                cuppa-tooltip .cuppa-tooltip_arrow.down{ transform: rotate(180deg); bottom: -4px; left:calc(50% - 5px); }
            </style>
		`
    }
}

customElements.define('cuppa-tooltip', CuppaTooltip);
