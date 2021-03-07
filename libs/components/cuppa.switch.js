export class CuppaComponent extends HTMLElement{cuppa=null;pure=!1;shadow=!1;state={};refs={};updatedCallback=null;autoAddChilds=!0;autoDefineObservables=!0;_getStorageDictionary={};_parser=new DOMParser;_eventAttr={onclick:1,ondblclick:1,onmousedown:1,onmousemove:1,onmouseout:1,onmouseover:1,onmouseup:1,onwheel:1,onmouseenter:1,onmouseleave:1,onblur:1,onchange:1,oncontextmenu:1,onfocus:1,oninput:1,oninvalid:1,onreset:1,onsearch:1,onselect:1,onsubmit:1,onkeydown:1,onkeypress:1,onkeyup:1,ondrag:1,ondragend:1,ondragenter:1,ondragleave:1,ondragover:1,ondragstart:1,ondrop:1,onscroll:1,oncopy:1,oncut:1,onpaste:1};constructor(){super(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.setState=this.setState.bind(this),this.forceRender=this.forceRender.bind(this),this.draw=this.draw.bind(this),this.createRealNode=this.createRealNode.bind(this),this.setAttributes=this.setAttributes.bind(this),this.setData=this.setData.bind(this),this.setStorage=this.setStorage.bind(this),this.getData=this.getData.bind(this),this.getStorage=this.getStorage.bind(this),this.removeStorage=this.removeStorage.bind(this),this.destroy=this.destroy.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.processRefs=this.processRefs.bind(this),this.autoSetObservables=this.autoSetObservables.bind(this),this.observables=this.observables.bind(this),this.binAll(this),this.autoSetObservables()}connectedCallback(){setTimeout(()=>{!0===this.shadow&&(this.shadow="open"),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(),this.connected&&this.connected(this)},0)}setState(state,callback){let newState={...this.state,...state};JSON.stringify(newState)!=JSON.stringify(this.state)&&(this.state=newState,this.forceRender(callback))}forceRender(callback){if(this.pure)this.shadow?this.shadowRoot.innerHTML="shadow not supported in pure component":(this.innerHTML="",this.insertAdjacentHTML("afterbegin",this.render()));else{let html=this.render();this.autoAddChilds&&this.childs&&(html+=this.childs),html=html.trim(),html=html.replace(/\s+/gi," "),html=html.replace(/<!--(.*?)-->/g,""),html=html.replace(new RegExp("> <","g"),"><");let headNodes,bodyNodes,rootNodes=[...this._parser.parseFromString(html,"text/html").head.childNodes,...this._parser.parseFromString(html,"text/html").body.childNodes];this.shadow?(this.shadowRoot.append(""),rootNodes.map(node=>this.draw(node,0,null,this))):rootNodes.map((node,index)=>this.draw(node,index,null,this))}this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&this.rendered(this)}draw(newNode,newNodeIndex,newNodeParent,realParentNode){let realNode=realParentNode.childNodes[newNodeIndex],isComponent=-1!=newNode.nodeName.indexOf("-");if(realNode){if(newNode&&realNode.nodeName.toUpperCase()==newNode.nodeName.toUpperCase()){if(3==newNode.nodeType&&realNode.nodeValue!=newNode.nodeValue)return void(realNode.nodeValue=newNode.nodeValue);if(1==newNode.nodeType){let realKey=realNode.getAttribute("key"),newKey=newNode.getAttribute("key");if(newKey&&realKey!=newKey)if(realParentNode.childNodes.length<newNodeParent.childNodes.length){let newRealNode=this.createRealNode(newNode,isComponent);realNode.insertAdjacentElement("beforebegin",newRealNode),realNode=newRealNode}else if(realParentNode.childNodes.length>newNodeParent.childNodes.length){let nextNode=realNode.nextSibling;realParentNode.removeChild(realNode),realNode=nextNode}}}else if(newNode&&realNode.nodeName!=newNode.nodeName.toUpperCase()){if(3==newNode.nodeType)return void realParentNode.insertBefore(newNode,realNode);if(1==newNode.nodeType){let newRealNode=this.createRealNode(newNode,isComponent);realParentNode.insertBefore(newRealNode,realNode),realNode=newRealNode}}}else{if(newNode&&3==newNode.nodeType)return void realParentNode.insertAdjacentText("beforeend",newNode.nodeValue);newNode&&(realNode=this.createRealNode(newNode,isComponent),realParentNode.insertAdjacentElement("beforeend",realNode))}if(this.setAttributes(realNode,newNode),newNode&&isComponent)return;let i=0,length=newNode?newNode.childNodes.length:0;for(;i<length;)this.draw(newNode.childNodes[i],i,newNode,realNode),i++;if(newNode)for(;realNode.childNodes.length>length;)realNode.removeChild(realNode.childNodes[newNode.childNodes.length])}createRealNode(newNode,isComponent){let realNode=document.createElement(newNode.nodeName);return isComponent&&(realNode.childs=newNode.innerHTML),realNode}setAttributes(element,newDomMap){if(element&&1==element.nodeType&&newDomMap&&null!=newDomMap.attributes){let i=0,length=newDomMap.attributes.length;for(;i<length;){let name=newDomMap.attributes[i].nodeName,value=newDomMap.attributes[i].nodeValue,oldValue=element.getAttribute(name);if("value"==name&&element.value)element.value=value;else if(value){if(oldValue!=value)if(this._eventAttr[name])if(-1!=value.indexOf("=>"))element[name]=eval(value);else{let functionName=value.replace("this.",""),paramsStartAt=functionName.indexOf("(");if(-1==paramsStartAt)element[name]=this[functionName].bind(this);else{let params=functionName.slice(paramsStartAt+1,functionName.indexOf(")"));params=params.split(","),params=params.map(param=>param.trim()),functionName=functionName.slice(0,paramsStartAt),element[name]=()=>this[functionName](...params)}}else element.setAttribute(name,value)}else element.removeAttribute(name);i++}}}setData(name,opts){this.cuppa&&this.cuppa.setData(name,opts)}setStorage(name,opts){this.setData(name,opts)}getData(name,opts){if(this.cuppa)return opts&&opts.callback?(this.cuppa.getData(name,opts),void(this._getStorageDictionary[name]=opts)):this.cuppa.getData(name,opts)}getStorage(name,opts){return this.getData(name,opts)}removeStorage(){this.cuppa&&Object.entries(this._getStorageDictionary).map(([key,value])=>{value&&value.callback&&this.cuppa.removeListener(key,value.callback),delete this._getStorageDictionary[key]})}destroy(){this.removeStorage()}disconnectedCallback(){this.destroy&&this.destroy(),this.disconnected&&this.disconnected(this)}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}autoSetObservables(){let baseParamsMap={};Object.keys(this).map(key=>baseParamsMap[key]=1),setTimeout(()=>{this.autoDefineObservables&&Object.keys(this).map(key=>{baseParamsMap[key]||Observable(this,{[key]:this[key]})})},0)}observables(object,callback){return Observable(this,object,callback)}}export function Observable(target,object,callback){if(!object)return;let firstName;return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName]}

export default class CuppaSwitch extends CuppaComponent {
    name = false;
    checked = false;

    constructor(name, checked = false){
        super();
        this.name = name;
        this.checked = checked;
    }

    static get observedAttributes() { return ['checked', 'name', 'disabled'] }
    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr == "checked" || attr=="disabled"){ 
            newVal = (newVal == "true" || newVal == "1") ? true : false;
        }
        this[attr] = newVal;
    }

    onChange(e){
        this.checked = e.currentTarget.checked;
        this.setAttribute("checked", this.checked);
        this.dispatchEvent(new Event('onchange'));
    }

    render(){
        return /*html*/`
            <style>
                cuppa-switch, cuppa-switch *{ box-sizing: border-box; }
                cuppa-switch{ cursor: pointer; overflow: hidden; user-select: none; display:inline-flex; position:relative; }
                cuppa-switch input{ position: absolute; top:0; left:0; opacity: 0; }
                cuppa-switch .background{ transition: 0.3s; border:2px solid #BBB; width: 50px; height: 30px; border-radius: 30px; background: #DDD; overflow: hidden;  }
                    cuppa-switch input:checked + .background{ background: #2196F3; border:1px solid #0b76ca;  }
                cuppa-switch .ball{ transition: 0.3s; border-radius: 30px; border:2px solid #EEE; background: #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.3); position: absolute; top:3px; height: 24px; left: 2px; width: 24px;  }
                    cuppa-switch input:checked + .background + .ball{ left:calc(100% - 24px - 2px); }
                cuppa-switch[disabled=true]{ opacity:0.3; pointer-events:none; }
            </style>
            <label>
                <input type="checkbox" 
                    name="${this.name}"
                    onchange="this.onChange"
                    ${ this.checked ? `checked="checked"` : '' } 
                />
                <div class="background"></div>
                <div class="ball"></div>
            </label>
        `
    }
}

customElements.define('cuppa-switch', CuppaSwitch);
document.defaultView.CuppaSwitch = CuppaSwitch;