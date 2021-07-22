export class CuppaComponent extends HTMLElement{cuppa=null;cuppaStorage=null;pure=!1;shadow=!1;state={};refs={};updatedCallback=null;autoAddChilds=!0;autoDefineObservables=!0;_getStorageDictionary={};_parser=new DOMParser;renderedCount=0;constructor(){super(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.setState=this.setState.bind(this),this.forceRender=this.forceRender.bind(this),this.draw=this.draw.bind(this),this.createRealNode=this.createRealNode.bind(this),this.setAttributes=this.setAttributes.bind(this),this.setData=this.setData.bind(this),this.setStorage=this.setStorage.bind(this),this.getData=this.getData.bind(this),this.getStorage=this.getStorage.bind(this),this.removeStorage=this.removeStorage.bind(this),this.destroy=this.destroy.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.processRefs=this.processRefs.bind(this),this.autoSetObservables=this.autoSetObservables.bind(this),this.observables=this.observables.bind(this),this.binAll(this),this.autoSetObservables()}connectedCallback(){setTimeout(()=>{!0===this.shadow&&(this.shadow="open"),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(),this.connected&&this.connected(this)},0)}setState(state,callback){let newState={...this.state,...state};JSON.stringify(newState)!=JSON.stringify(this.state)&&(this.state=newState,this.forceRender(callback))}forceRender(callback){if(this.pure){if(this.renderedCount)return;this.shadow?this.shadowRoot.innerHTML="shadow not supported in pure component":(this.innerHTML="",this.insertAdjacentHTML("afterbegin",this.render()))}else{let html=this.render();this.autoAddChilds&&this.childs&&(html+=this.childs),html=html.trim(),html=html.replace(/\s+/gi," "),html=html.replace(/<!--(.*?)-->/g,""),html=html.replace(new RegExp("> <","g"),"><");let headNodes,bodyNodes,rootNodes=[...this._parser.parseFromString(html,"text/html").head.childNodes,...this._parser.parseFromString(html,"text/html").body.childNodes];this.shadow?(this.shadowRoot.append(""),rootNodes.map(node=>this.draw(node,0,null,this))):rootNodes.map((node,index)=>this.draw(node,index,null,this))}this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&this.rendered(this),this.renderedCount++}draw(newNode,newNodeIndex,newNodeParent,realParentNode){let realNode=realParentNode.childNodes[newNodeIndex],isComponent=newNode&&-1!=newNode.nodeName.indexOf("-");if(realNode){if(newNode&&realNode.nodeName.toUpperCase()==newNode.nodeName.toUpperCase()){if(3==newNode.nodeType&&realNode.nodeValue!=newNode.nodeValue)return void(realNode.nodeValue=newNode.nodeValue);if(1==newNode.nodeType){let realKey=realNode.getAttribute("key"),newKey=newNode.getAttribute("key");if(newKey&&realKey!=newKey)if(realParentNode.childNodes.length<newNodeParent.childNodes.length){let newRealNode=this.createRealNode(newNode,isComponent);realNode.insertAdjacentElement("beforebegin",newRealNode),realNode=newRealNode}else if(realParentNode.childNodes.length>newNodeParent.childNodes.length){let nextNode=realNode.nextSibling;realParentNode.removeChild(realNode),realNode=nextNode}}}else if(newNode&&realNode.nodeName!=newNode.nodeName.toUpperCase()){if(3==newNode.nodeType)return void realParentNode.insertBefore(newNode,realNode);if(1==newNode.nodeType){let newRealNode=this.createRealNode(newNode,isComponent);realParentNode.insertBefore(newRealNode,realNode),realNode=newRealNode}}}else{if(newNode&&3==newNode.nodeType)return void realParentNode.insertAdjacentText("beforeend",newNode.nodeValue);newNode&&(realNode=this.createRealNode(newNode,isComponent),realParentNode.insertAdjacentElement("beforeend",realNode))}if(this.setAttributes(realNode,newNode),newNode&&isComponent)return;let i=0,length=newNode?newNode.childNodes.length:0;for(;i<length;)this.draw(newNode.childNodes[i],i,newNode,realNode),i++;if(newNode)for(;realNode.childNodes.length>length;)realNode.removeChild(realNode.childNodes[newNode.childNodes.length])}createRealNode(newNode,isComponent){let realNode=document.createElement(newNode.nodeName);return isComponent&&(realNode.childs=newNode.innerHTML),realNode}setAttributes(element,newDomMap){if(element&&1==element.nodeType&&newDomMap&&null!=newDomMap.attributes){let i=0,length=newDomMap.attributes.length;for(;i<length;){let name=newDomMap.attributes[i].nodeName,value=newDomMap.attributes[i].nodeValue,oldValue=element.getAttribute(name);if("value"==name&&element.value)element.value=value;else if(value){if(oldValue!=value&&element[`__old_event_${name}`]!=value)if(0===name.indexOf("on")&&name.length>2){element[`__old_event_${name}`]=value;let eventName=name.replace("on","");if(-1!=value.indexOf("=>"))element.removeEventListener(eventName,eval(value)),element.addEventListener(eventName,eval(value));else{let functionName=value.replace("this.",""),paramsStartAt=functionName.indexOf("(");if(-1==paramsStartAt)element.removeEventListener(eventName,this[functionName]),element.addEventListener(eventName,this[functionName]);else{let params=functionName.slice(paramsStartAt+1,functionName.indexOf(")"));params=params.split(","),params=params.map(param=>param.trim()),functionName=functionName.slice(0,paramsStartAt),element.removeEventListener(eventName,()=>this[functionName](...params)),element.addEventListener(eventName,()=>this[functionName](...params))}}}else element.setAttribute(name,value)}else element.removeAttribute(name);i++}}}setData(name,opts){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&this.cuppa.setData(name,opts)}setStorage(name,opts){this.setData(name,opts)}getData(name,opts){if(!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa)return opts&&opts.callback?(this.cuppa.getData(name,opts),void(this._getStorageDictionary[name]=opts)):this.cuppa.getData(name,opts)}getStorage(name,opts){return this.getData(name,opts)}removeStorage(){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&Object.entries(this._getStorageDictionary).map(([key,value])=>{value&&value.callback&&this.cuppa.removeListener(key,value.callback),delete this._getStorageDictionary[key]})}destroy(){this.removeStorage()}disconnectedCallback(){this.destroy&&this.destroy(),this.disconnected&&this.disconnected(this)}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}autoSetObservables(){let baseParamsMap={};Object.keys(this).map(key=>baseParamsMap[key]=1),setTimeout(()=>{this.autoDefineObservables&&Object.keys(this).map(key=>{baseParamsMap[key]||this.observables({[key]:this[key]})})},0)}observables(object,callback){let target=this,firstName;if(object)return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName]}};

export default class CuppaAccordion extends CuppaComponent{
    static OPEN = "OPEN";
    static CLOSE = "CLOSE";
    pure = true;
    header;
    content;
    callback;
    currentState;
    imageArrowURL;
    ease;

    constructor({header, headerRight, content, callback, currentState, imageArrowURL, ease} = {}){
        super();
        this.header = header;
        this.content = content;
        this.headerRight = headerRight;
        this.callback = callback;
        this.currentState = (currentState) ? currentState : CuppaAccordion.CLOSE;
        this.imageArrowURL = (imageArrowURL == undefined) ? "https://img.icons8.com/material-rounded/64/000000/expand-arrow--v1.png" : imageArrowURL;
        this.ease = ease;
    }

    change(currentState, animate = true){
        if(!this.content) return;
        if(!currentState){ currentState = (this.currentState == CuppaAccordion.CLOSE) ? CuppaAccordion.OPEN : CuppaAccordion.CLOSE; }
        this.currentState = currentState;
        if(!animate){
            if(this.currentState == CuppaAccordion.OPEN){
                this.refs.content.style.height = "auto";
            }else{
                this.refs.content.style.height = 0;
            }
            if(this.callback) this.callback(this);
        }else{
            let height = this.content.offsetHeight;
            if(this.currentState == CuppaAccordion.OPEN){
                let tl = gsap.timeline({onComplete:()=>{ if(this.callback) this.callback(); }});
                    tl.to(this.refs.content, {height:height, duration: 0.4, ease:this.ease});
                    tl.set(this.refs.content, {height:"auto"});
                    if(this.refs.arrow){ tl.to(this.refs.arrow, {rotate:180, duration:0.2}, 0); }
            }else{
                let tl = gsap.timeline({onComplete:()=>{ if(this.callback) this.callback(); }});
                    tl.set(this.refs.content, {height:height});
                    tl.to(this.refs.content, {height:0, duration: 0.4, ease:this.ease});
                    if(this.refs.arrow){  tl.to(this.refs.arrow, {rotate:0, duration:0.2}, 0); }
            }
        }
        this.classList.remove(CuppaAccordion.OPEN.toLowerCase());
        this.classList.remove(CuppaAccordion.CLOSE.toLowerCase());
        this.classList.add(this.currentState.toLowerCase());
    }

    connected(){
        if(this.header) this.refs.headerLeft.append(this.header);
        if(this.headerRight) this.refs.headerRight.prepend(this.headerRight);
        if(this.content) this.refs.content.append(this.content);
        this.refs.header.addEventListener("click", ()=>this.change(null, true));
        cuppa.requiereJS("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js", ()=>{ this.change(this.currentState, false) })
    }

    render(){
        return /*html*/`
            <style>
                cuppa-accordion{ display: block; }
                .cuppa-accordion_wrap{ border: 1px solid #EEE; border-radius: 5px; overflow: hidden; }
                .cuppa-accordion_header{ display: flex; justify-content: space-between; border-bottom: 1px solid #EEE; }
                .cuppa-accordion_header-left{ display: flex; flex:1; }
                .cuppa-accordion_header-right{ display: flex; justify-content: flex-end; align-items: center; padding:0 10px; }
                .cuppa-accordion_header-right_arrow{ width: auto; height: 20px; }
                .cuppa-accordion_content{ overflow: hidden; height: 0; }
            </style>
            <div class="cuppa-accordion_wrap ${this.currentState.toLowerCase()}">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js"></script>
                <div ref="header" class="cuppa-accordion_header">
                    <div ref="headerLeft" class="cuppa-accordion_header-left"></div>
                    <div ref="headerRight" class="cuppa-accordion_header-right">
                        ${ (this.imageArrowURL) ? `<img ref="arrow" class="cuppa-accordion_header-right_arrow" src="${this.imageArrowURL}" />` : '' }
                    </div>
                </div>
                <div ref="content" class="cuppa-accordion_content ${this.state == CuppaAccordion.CLOSE ? 'closed' : ''}"></div>
            </div>
        `
    }
}

customElements.define('cuppa-accordion', CuppaAccordion);

let cuppa = {};
// requiereJS / IncludeJS / loadJS
cuppa.requireJSDirectory = {};
cuppa.loadedJS = 0;
cuppa.requiereJS = function(paths, callback, progress, type, opts){
    if( typeof(paths) == "string") paths = [paths];
    if(!type) type = 'text/javascript';
    opts = cuppa.mergeObjects([{target:document.head}, opts]);
    cuppa.loadedJS = 0;
    let head = document.getElementsByTagName('head')[0];
    for(let i = 0; i < paths.length; i++){
        let path = paths[i];
        if(cuppa.requireJSDirectory[path]){
            onComplete();
        }else{
            cuppa.requireJSDirectory[path] = true;
            let element = document.createElement('script');
            element.src = path;
            element.type = type;
            element.onload = onComplete;
            opts.target.appendChild(element);
        };
    };
    function onComplete(e){
        cuppa.loadedJS++;
        if(cuppa.loadedJS >= paths.length && callback){
            callback(cuppa.loadedJS, paths.length);
        }else if(progress){
            progress(cuppa.loadedJS, paths.length);
        };
    };
};
cuppa.includeJS = function(paths, callback, progress){ cuppa.requiereJS(paths, callback, progress); };
cuppa.loadJS = function(paths, callback, progress){ cuppa.requiereJS(paths, callback, progress); };

/* mergeObjects, create a new obj with the values of objs in Array.
    If create_new_object = true, create a new Oject an Add all element to it, else join to the first object all elements
    create_new_object = false
*/
cuppa.mergeObjects = function(array_objs, create_new_object){
    if(!create_new_object){
        let obj1 = array_objs.shift();
        for(let i = 0; i < array_objs.length; i++){
            let obj = array_objs[i];
            if(obj){ for (let attrname in obj) { obj1[attrname] =  obj[attrname]; } }
        };
        return obj1;
    }else{
        let tmp_obj = {};
        for(let i = 0; i < array_objs.length; i++){
            let obj = array_objs[i];
            if(obj){ for (let attrname in obj) { tmp_obj[attrname] = obj[attrname]; } }
        };
        return tmp_obj;
    };
};
cuppa.joinObjects = function(array_objs, create_new_object){ return cuppa.mergeObjects(array_objs, create_new_object); };
