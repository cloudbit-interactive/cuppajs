export class CuppaComponent extends HTMLElement{cuppa=null;pure=!1;shadow=!1;state={};refs={};updatedCallback=null;autoAddChilds=!0;autoDefineObservables=!0;_getStorageDictionary={};_parser=new DOMParser;constructor(){super(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.setState=this.setState.bind(this),this.forceRender=this.forceRender.bind(this),this.draw=this.draw.bind(this),this.createRealNode=this.createRealNode.bind(this),this.setAttributes=this.setAttributes.bind(this),this.setData=this.setData.bind(this),this.setStorage=this.setStorage.bind(this),this.getData=this.getData.bind(this),this.getStorage=this.getStorage.bind(this),this.removeStorage=this.removeStorage.bind(this),this.destroy=this.destroy.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.processRefs=this.processRefs.bind(this),this.autoSetObservables=this.autoSetObservables.bind(this),this.observables=this.observables.bind(this),this.binAll(this),this.autoSetObservables()}connectedCallback(){setTimeout(()=>{!0===this.shadow&&(this.shadow="open"),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(),this.connected&&this.connected(this)},0)}setState(state,callback){let newState={...this.state,...state};JSON.stringify(newState)!=JSON.stringify(this.state)&&(this.state=newState,this.forceRender(callback))}forceRender(callback){if(this.pure)this.shadow?this.shadowRoot.innerHTML="shadow not supported in pure component":(this.innerHTML="",this.insertAdjacentHTML("afterbegin",this.render()));else{let html=this.render();this.autoAddChilds&&this.childs&&(html+=this.childs),html=html.trim(),html=html.replace(/\s+/gi," "),html=html.replace(/<!--(.*?)-->/g,""),html=html.replace(new RegExp("> <","g"),"><");let headNodes,bodyNodes,rootNodes=[...this._parser.parseFromString(html,"text/html").head.childNodes,...this._parser.parseFromString(html,"text/html").body.childNodes];this.shadow?(this.shadowRoot.append(""),rootNodes.map(node=>this.draw(node,0,null,this))):rootNodes.map((node,index)=>this.draw(node,index,null,this))}this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&this.rendered(this)}draw(newNode,newNodeIndex,newNodeParent,realParentNode){let realNode=realParentNode.childNodes[newNodeIndex],isComponent=newNode&&-1!=newNode.nodeName.indexOf("-");if(realNode){if(newNode&&realNode.nodeName.toUpperCase()==newNode.nodeName.toUpperCase()){if(3==newNode.nodeType&&realNode.nodeValue!=newNode.nodeValue)return void(realNode.nodeValue=newNode.nodeValue);if(1==newNode.nodeType){let realKey=realNode.getAttribute("key"),newKey=newNode.getAttribute("key");if(newKey&&realKey!=newKey)if(realParentNode.childNodes.length<newNodeParent.childNodes.length){let newRealNode=this.createRealNode(newNode,isComponent);realNode.insertAdjacentElement("beforebegin",newRealNode),realNode=newRealNode}else if(realParentNode.childNodes.length>newNodeParent.childNodes.length){let nextNode=realNode.nextSibling;realParentNode.removeChild(realNode),realNode=nextNode}}}else if(newNode&&realNode.nodeName!=newNode.nodeName.toUpperCase()){if(3==newNode.nodeType)return void realParentNode.insertBefore(newNode,realNode);if(1==newNode.nodeType){let newRealNode=this.createRealNode(newNode,isComponent);realParentNode.insertBefore(newRealNode,realNode),realNode=newRealNode}}}else{if(newNode&&3==newNode.nodeType)return void realParentNode.insertAdjacentText("beforeend",newNode.nodeValue);newNode&&(realNode=this.createRealNode(newNode,isComponent),realParentNode.insertAdjacentElement("beforeend",realNode))}if(this.setAttributes(realNode,newNode),newNode&&isComponent)return;let i=0,length=newNode?newNode.childNodes.length:0;for(;i<length;)this.draw(newNode.childNodes[i],i,newNode,realNode),i++;if(newNode)for(;realNode.childNodes.length>length;)realNode.removeChild(realNode.childNodes[newNode.childNodes.length])}createRealNode(newNode,isComponent){let realNode=document.createElement(newNode.nodeName);return isComponent&&(realNode.childs=newNode.innerHTML),realNode}setAttributes(element,newDomMap){if(element&&1==element.nodeType&&newDomMap&&null!=newDomMap.attributes){let i=0,length=newDomMap.attributes.length;for(;i<length;){let name=newDomMap.attributes[i].nodeName,value=newDomMap.attributes[i].nodeValue,oldValue=element.getAttribute(name);if("value"==name&&element.value)element.value=value;else if(value){if(oldValue!=value&&element[`__old_event_${name}`]!=value)if(0===name.indexOf("on")&&name.length>2){element[`__old_event_${name}`]=value;let eventName=name.replace("on","");if(-1!=value.indexOf("=>"))element.removeEventListener(eventName,eval(value)),element.addEventListener(eventName,eval(value));else{let functionName=value.replace("this.",""),paramsStartAt=functionName.indexOf("(");if(-1==paramsStartAt)element.removeEventListener(eventName,this[functionName]),element.addEventListener(eventName,this[functionName]);else{let params=functionName.slice(paramsStartAt+1,functionName.indexOf(")"));params=params.split(","),params=params.map(param=>param.trim()),functionName=functionName.slice(0,paramsStartAt),element.removeEventListener(eventName,()=>this[functionName](...params)),element.addEventListener(eventName,()=>this[functionName](...params))}}}else element.setAttribute(name,value)}else element.removeAttribute(name);i++}}}setData(name,opts){this.cuppa&&this.cuppa.setData(name,opts)}setStorage(name,opts){this.setData(name,opts)}getData(name,opts){if(this.cuppa)return opts&&opts.callback?(this.cuppa.getData(name,opts),void(this._getStorageDictionary[name]=opts)):this.cuppa.getData(name,opts)}getStorage(name,opts){return this.getData(name,opts)}removeStorage(){this.cuppa&&Object.entries(this._getStorageDictionary).map(([key,value])=>{value&&value.callback&&this.cuppa.removeListener(key,value.callback),delete this._getStorageDictionary[key]})}destroy(){this.removeStorage()}disconnectedCallback(){this.destroy&&this.destroy(),this.disconnected&&this.disconnected(this)}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}autoSetObservables(){let baseParamsMap={};Object.keys(this).map(key=>baseParamsMap[key]=1),setTimeout(()=>{this.autoDefineObservables&&Object.keys(this).map(key=>{baseParamsMap[key]||this.observables({[key]:this[key]})})},0)}observables(object,callback){let target=this,firstName;if(object)return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName]}}

export default class CuppaAlert extends CuppaComponent {
    state = {title:"", message:"", htmlContent:"", acceptText:"Accept", cancelText:"", backdropEnabled:true, inputText:null, placeholder:"", callback:null}

    constructor(opts = {title:"", message:"", htmlContent:null, acceptText:"Accept", cancelText:"", backdropEnabled:true, inputText:null, placeholder:"", callback:null}){
        super();
        this.state = {...this.state, ...opts};
    }

    static get observedAttributes() { return ['title', 'message', 'accept-text', 'cancel-text', 'backdrop-enabled', 'input-text', 'placeholder'] }
    attributeChangedCallback(attr, oldVal, newVal) {
        this.setState({[this.camelize(attr)]:newVal});
     }

    connected(){
        if(this.state.htmlContent){
            this.querySelector(".cuppa_alert_html_content").append(this.state.htmlContent);
        }
    }

    onClick(value){
        if(this.state.callback) this.state.callback(value, this.state.inputText, this);
        this.close();
    }

    onChangeInput(e){
        this.setState({inputText:e.currentTarget.value})
    }

    close(){
        this.parentNode.removeChild(this);
    }

    camelize(str) {
        str = String(str) || "";
        str = str.replace(new RegExp("-", 'g'), " ");
        str = str.replace(new RegExp("_", 'g'), " ");
        str = str.toLowerCase();
        str = str.replace(/[^\w\s]/gi, '');
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    };

    render(){
        return /*html*/`
            <style>
                html, body{ overflow:hidden; }
                cuppa-alert{ animation-name: cuppa_alert_animation; animation-duration: 0.2s; position:fixed; left:0; right:0; top:0; bottom:0; display:flex; justify-content:center; align-items:center; padding:20px; overflow:auto; }
                .cuppa_alert_blockade{ background:rgba(0,0,0,0.5); position:fixed; left:0; right:0; top:0; bottom:0; }
                .cuppa_alert_modal{ position:relative; background: #FFF; width:100%; max-width:500px; padding:30px 40px; overflow: hidden; border-radius: 5px; box-shadow: 0px 3px 10px rgba(0,0,0,0.3); }
                .cuppa_alert_title{ font-size: 22px; font-weight: 700; margin:0 0 10px; }
                .cuppa_alert_input{ width:100%; height:32px; width: 100%; margin:10px 0 0; background: #FFF; color: #333; border-radius: 3px; border: 1px solid #CCC; box-shadow:inset 0 1px 1px rgba(0,0,0,.075); padding:0 10px;  font-weight: 500;  }
                .cuppa_alert_buttons{ margin:10px 0 0; display:flex; justify-content:flex-end; }
                .cuppa_alert_button{ transition: 0.3s background-color; border: none; cursor:pointer; background: #2F80EC; color:#FFF; height: 42px; padding:0 15px; margin:0 3px; border-radius: 3px; }
                .cuppa_alert_button:hover{ background: #1a62c1; }
                .cuppa_alert_button_cancel{ background:#CCC; color:#333;  }
                .cuppa_alert_button_cancel:hover{ background:#A0A0A0; }
                @keyframes cuppa_alert_animation { 0% { opacity: 0; } 100% { opacity: 1; } }

            </style>
            <div ${!this.state.backdropEnabled ? '' : `onclick="this.onClick(false)"`} class="cuppa_alert_blockade"></div>
            <div class="cuppa_alert_modal">
                ${this.state.title ? /*html*/`<div class="cuppa_alert_title">${this.state.title}</div>` : ''}
                <div class="cuppa_alert_message">${this.state.message}</div>
                ${this.state.htmlContent ? /*html*/`<div class="cuppa_alert_html_content"></div>` : '' }
                ${this.state.inputText == undefined ? '' : /*html*/`<input class="cuppa_alert_input" value="${this.state.inputText}" oninput="this.onChangeInput" placeholder="${this.state.placeholder}" />`}
                ${ this.state.canceText || this.state.acceptText ? /*html*/`
                    <div class="cuppa_alert_buttons">
                        ${ !this.state.cancelText ? '' : /*html*/`<button onclick="this.onClick(false)" class="cuppa_alert_button cuppa_alert_button_cancel">${this.state.cancelText}</button>`}
                        ${ !this.state.acceptText ? '' : /*html*/`<button onclick="this.onClick(true)" class="cuppa_alert_button cuppa_alert_button_accept">${this.state.acceptText}</button>`}
                    </div>
                ` : '' }
            </div>
            `
    }
}

customElements.define('cuppa-alert', CuppaAlert);
document.defaultView.CuppaAlert = CuppaAlert;
