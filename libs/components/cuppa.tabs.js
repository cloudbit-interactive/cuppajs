export class CuppaComponent extends HTMLElement{cuppa=null;cuppaStorage=null;pure=!1;shadow=!1;state={};refs={};updatedCallback=null;autoAddChildren=!1;autoDefineObservables=!0;_getStorageDictionary={};_parser=new DOMParser;renderedCount=0;constructor(){super(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.setState=this.setState.bind(this),this.forceRender=this.forceRender.bind(this),this.draw=this.draw.bind(this),this.createRealNode=this.createRealNode.bind(this),this.setAttributes=this.setAttributes.bind(this),this.setData=this.setData.bind(this),this.setStorage=this.setStorage.bind(this),this.getData=this.getData.bind(this),this.getStorage=this.getStorage.bind(this),this.removeStorage=this.removeStorage.bind(this),this.destroy=this.destroy.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.processRefs=this.processRefs.bind(this),this.autoSetObservables=this.autoSetObservables.bind(this),this.observables=this.observables.bind(this),this.binAll(this),this.autoSetObservables()}connectedCallback(){setTimeout(()=>{!0===this.shadow&&(this.shadow="open"),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(),this.connected&&this.connected(this),this.mounted&&this.mounted(this)},0)}setState(state,callback){let newState={...this.state,...state};JSON.stringify(newState)!=JSON.stringify(this.state)&&(this.state=newState,this.forceRender(callback))}forceRender(callback){if(this.pure){if(this.renderedCount)return;this.shadow?this.shadowRoot.innerHTML="shadow not supported in pure component":(this.innerHTML="",this.insertAdjacentHTML("afterbegin",this.render()))}else{let html=this.render();this.autoAddChildren&&this.childrenList&&(html+=this.childrenList),html=html.trim(),html=html.replace(/\s+/gi," "),html=html.replace(/<!--(.*?)-->/g,""),html=html.replace(new RegExp("> <","g"),"><");let headNodes,bodyNodes,rootNodes=[...this._parser.parseFromString(html,"text/html").head.childNodes,...this._parser.parseFromString(html,"text/html").body.childNodes];this.shadow?(this.shadowRoot.append(""),rootNodes.map(node=>this.draw(node,0,null,this))):rootNodes.map((node,index)=>this.draw(node,index,null,this))}this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&this.rendered(this),this.renderedCount++}draw(newNode,newNodeIndex,newNodeParent,realParentNode){let realNode=realParentNode.childNodes[newNodeIndex],isComponent=newNode&&-1!=newNode.nodeName.indexOf("-");if(realNode){if(newNode&&realNode.nodeName.toUpperCase()==newNode.nodeName.toUpperCase()){if(3==newNode.nodeType&&realNode.nodeValue!=newNode.nodeValue)return void(realNode.nodeValue=newNode.nodeValue);if(1==newNode.nodeType){let realKey=realNode.getAttribute("key"),newKey=newNode.getAttribute("key");if(newKey&&realKey!=newKey)if(realParentNode.childNodes.length<newNodeParent.childNodes.length){let newRealNode=this.createRealNode(newNode,isComponent);realNode.insertAdjacentElement("beforebegin",newRealNode),realNode=newRealNode}else if(realParentNode.childNodes.length>newNodeParent.childNodes.length){let nextNode=realNode.nextSibling;realParentNode.removeChild(realNode),realNode=nextNode}}}else if(newNode&&realNode.nodeName!=newNode.nodeName.toUpperCase()){if(3==newNode.nodeType)return void realParentNode.insertBefore(newNode,realNode);if(1==newNode.nodeType){let newRealNode=this.createRealNode(newNode,isComponent);realParentNode.insertBefore(newRealNode,realNode),realNode=newRealNode}}}else{if(newNode&&3==newNode.nodeType)return void realParentNode.insertAdjacentText("beforeend",newNode.nodeValue);newNode&&(realNode=this.createRealNode(newNode,isComponent),realParentNode.insertAdjacentElement("beforeend",realNode))}if(this.setAttributes(realNode,newNode),newNode&&isComponent)return;let i=0,length=newNode?newNode.childNodes.length:0;for(;i<length;)this.draw(newNode.childNodes[i],i,newNode,realNode),i++;if(newNode)for(;realNode.childNodes.length>length;)realNode.removeChild(realNode.childNodes[newNode.childNodes.length])}createRealNode(newNode,isComponent){let realNode=document.createElement(newNode.nodeName);return isComponent&&(realNode.childrenList=newNode.innerHTML),realNode}setAttributes(element,newDomMap){if(element&&1==element.nodeType&&newDomMap&&null!=newDomMap.attributes){let i=0,length=newDomMap.attributes.length;for(;i<length;){let name=newDomMap.attributes[i].nodeName,value=newDomMap.attributes[i].nodeValue,oldValue=element.getAttribute(name);if("value"==name&&element.value)element.value=value;else if(value){if(oldValue!=value&&element[`__old_event_${name}`]!=value)if(0===name.indexOf("on")&&name.length>2){element[`__old_event_${name}`]=value;let eventName=name.replace("on","");if(-1!=value.indexOf("=>"))element.removeEventListener(eventName,eval(value)),element.addEventListener(eventName,eval(value));else{let functionName=value.replace("this.",""),paramsStartAt=functionName.indexOf("(");if(-1==paramsStartAt)element.removeEventListener(eventName,this[functionName]),element.addEventListener(eventName,this[functionName]);else{let params=functionName.slice(paramsStartAt+1,functionName.indexOf(")"));params=params.split(","),params=params.map(param=>param.trim()),functionName=functionName.slice(0,paramsStartAt),element.removeEventListener(eventName,()=>this[functionName](...params)),element.addEventListener(eventName,()=>this[functionName](...params))}}}else element.setAttribute(name,value)}else element.removeAttribute(name);i++}}}setData(name,opts){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&this.cuppa.setData(name,opts)}setStorage(name,opts){this.setData(name,opts)}getData(name,opts){if(!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa)return opts&&opts.callback?(this.cuppa.getData(name,opts),void(this._getStorageDictionary[name]=opts)):this.cuppa.getData(name,opts)}getStorage(name,opts){return this.getData(name,opts)}removeStorage(){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&Object.entries(this._getStorageDictionary).map(([key,value])=>{value&&value.callback&&this.cuppa.removeListener(key,value.callback),delete this._getStorageDictionary[key]})}destroy(){this.removeStorage()}disconnectedCallback(){this.destroy&&this.destroy(),this.disconnected&&this.disconnected(this),this.unmounted&&this.unmounted(this)}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}bind(element){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));for(let i=0;i<propertyNames.length;i++)if("function"==typeof element[propertyNames[i]]){if(this[propertyNames[i]])continue;this[propertyNames[i]]=element[propertyNames[i]].bind(element)}}autoSetObservables(){let baseParamsMap={};Object.keys(this).map(key=>baseParamsMap[key]=1),setTimeout(()=>{this.autoDefineObservables&&Object.keys(this).map(key=>{baseParamsMap[key]||this.observables({[key]:this[key]})})},0)}observables(object,callback){let target=this,firstName;if(object){if(!Array.isArray(object))return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName];object.forEach(varName=>{this.observable(varName,this[varName])})}}observable(varName,defaultValue){return setTimeout(()=>{defaultValue||(defaultValue=this[varName]),this.observables({[varName]:defaultValue})},0),defaultValue}}


export class CuppaTabs extends CuppaComponent {
    selected =  this.observable("selected");

    static get observedAttributes() { return ['selected'] }
    attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal; }

    rendered(){
        let tabs = this.querySelectorAll("cuppa-tab");
        tabs.forEach(tab=>tab.removeAttribute("selected"));
        
        let selectedNode = this.querySelector(`cuppa-tab[value=${this.selected}]`);
        if(selectedNode) selectedNode.setAttribute("selected", "");
        tabs.forEach(tab=>tab.onclick = this.onClick);
    }

    onClick(e){
        let value = e.currentTarget.getAttribute("value");
        if(!value) return;
        this.setAttribute("selected",value);
        this.dispatchEvent(new Event('change'));
    }

    render(){
        return /*html*/`
            <style>
                cuppa-tabs, cuppa-tabs *{ box-sizing: border-box; }
                cuppa-tabs{ display:inline-flex; background:#40495A; border-radius:5px; user-select: none; }
            </style>
            ${ (this.childrenList) ? this.childrenList : '' }
        `
    }
}

customElements.define('cuppa-tabs', CuppaTabs);
document.defaultView.CuppaTabs = CuppaTabs;

export class CuppaTab extends CuppaComponent {
    render(){
        return /*html*/`
            <style>
                cuppa-tab, cuppa-tab *{ box-sizing: border-box; }
                cuppa-tab{ transition:0.3s; transition-property:background-color, color, opacity; display:flex; justify-content:center; align-items:center; color:#B1B1B1; padding:10px 10px; font-size:11px; cursor:pointer; }
                cuppa-tab[selected]{ background:#2296F3; color:#FFF; cursor:default; pointer-events: none; box-shadow:0 1px 3px rgba(0,0,0,0.2) }
                cuppa-tab:first-of-type{ border-radius:5px 0 0 5px; }
                cuppa-tab:last-of-type{ border-radius:0 5px 5px 0; }
                cuppa-tab:hover{ opacity:0.6; }
            </style>
            ${ (this.childrenList) ? this.childrenList : '' }
            `
    }
}

customElements.define('cuppa-tab', CuppaTab);
document.defaultView.CuppaTab = CuppaTab;