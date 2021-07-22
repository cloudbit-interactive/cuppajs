/**
    CuppaComponent
 
    class fields
        cuppaStorage = null;
        pure = false;                   // false, true 'will render only 1 time'
        shadow = false;                 // false, true
        refs = {};
        updatedCallback = null;
        autoDefineObservables = true    // true, false 'will avoid auto create set / get for class declaration variables'
        autoAddChilds = true;
        [Others]
        state = {};                     // also is possible work with state object and use this.setState({}) to update the object

    import CuppaComponent from "cuppa.component.js";
    import "cuppa.component.js"
    <script src="cuppa.component.js" type="module"></script>
**/

export class CuppaComponent extends HTMLElement {
    cuppa = null;
    cuppaStorage = null;
    pure = false;
    shadow = false;
    state = {};
    refs = {};
    updatedCallback = null;
    autoAddChilds = true;
    autoDefineObservables = true;
    _getStorageDictionary = {};
    _parser = new DOMParser();
    renderedCount = 0;

    constructor() {
        super();
        this.binAll = this.binAll.bind(this);
        this.connectedCallback = this.connectedCallback.bind(this);
        this.setState = this.setState.bind(this);
        this.forceRender = this.forceRender.bind(this);
        this.draw = this.draw.bind(this);
        this.createRealNode = this.createRealNode.bind(this);
        this.setAttributes = this.setAttributes.bind(this);
        this.setData = this.setData.bind(this);
        this.setStorage =this.setStorage.bind(this);
        this.getData = this.getData.bind(this);
        this.getStorage = this.getStorage.bind(this);
        this.removeStorage = this.removeStorage.bind(this);
        this.destroy = this.destroy.bind(this);
        this.disconnectedCallback = this.disconnectedCallback.bind(this);
        this.processRefs = this.processRefs.bind(this);
        this.autoSetObservables = this.autoSetObservables.bind(this);
        this.observables = this.observables.bind(this);
        this.binAll(this);
        this.autoSetObservables();
    }

    connectedCallback() {
        setTimeout(()=>{
            if(this.shadow === true) this.shadow = "open";
            if(this.shadow) this.attachShadow({mode: this.shadow});
            this.forceRender();
            if(this.connected) this.connected(this);
        }, 0);
    }

    setState(state, callback){
        let newState = {...this.state, ...state};
        if(JSON.stringify(newState) != JSON.stringify(this.state)){
            this.state = newState;
            this.forceRender(callback);
        }
    }

    forceRender(callback) {
        if(this.pure){
            if(this.renderedCount) return;
            if(this.shadow){
                this.shadowRoot.innerHTML = "shadow not supported in pure component";
            }else{
                this.innerHTML = "";
                this.insertAdjacentHTML("afterbegin", this.render());
            }
        }else{
            let html = this.render();
                if(this.autoAddChilds && this.childs) html += this.childs;
                html = html.trim();
                html = html.replace(/\s+/gi, " ");
                html = html.replace(/<!--(.*?)-->/g, "");
                html = html.replace(new RegExp("> <", 'g'), "><");
            let headNodes = this._parser.parseFromString(html, "text/html").head.childNodes;
            let bodyNodes = this._parser.parseFromString(html, "text/html").body.childNodes;
            let rootNodes = [...headNodes, ...bodyNodes]
            if(this.shadow){
                this.shadowRoot.append("");
                rootNodes.map(node=>this.draw(node, 0, null, this));
            }else{
                rootNodes.map((node, index)=>this.draw(node, index, null, this));
            }
        }
        this.processRefs(this, this.refs, "ref");
        if(callback) callback();
        if(this.rendered) this.rendered(this);
        this.renderedCount++;
    }

    draw(newNode, newNodeIndex, newNodeParent, realParentNode){
        let realNode = realParentNode.childNodes[newNodeIndex];
        let isComponent = (newNode && newNode.nodeName.indexOf("-") != -1);
        if(!realNode){
            if(newNode && newNode.nodeType == 3){
                realParentNode.insertAdjacentText('beforeend', newNode.nodeValue);
                return;
            }else if(newNode){
                realNode = this.createRealNode(newNode, isComponent);
                realParentNode.insertAdjacentElement("beforeend", realNode);
            }
        }else if(newNode && realNode.nodeName.toUpperCase() == newNode.nodeName.toUpperCase()){
            if(newNode.nodeType == 3 && realNode.nodeValue != newNode.nodeValue) {
                realNode.nodeValue = newNode.nodeValue;
                return;
            }else if(newNode.nodeType == 1){
                let realKey = realNode.getAttribute("key");
                let newKey = newNode.getAttribute("key");
                if(newKey && realKey != newKey){
                    if(realParentNode.childNodes.length < newNodeParent.childNodes.length){
                        let newRealNode = this.createRealNode(newNode, isComponent);
                        realNode.insertAdjacentElement("beforebegin", newRealNode);
                        realNode = newRealNode;
                    }else if(realParentNode.childNodes.length > newNodeParent.childNodes.length){
                        let nextNode = realNode.nextSibling;
                        realParentNode.removeChild(realNode);
                        realNode = nextNode;
                    }
                }
            }
        }else if(newNode && realNode.nodeName != newNode.nodeName.toUpperCase()){
            if(newNode.nodeType == 3) {
                realParentNode.insertBefore(newNode, realNode);
                return;
            }else if(newNode.nodeType == 1){
                let newRealNode = this.createRealNode(newNode, isComponent);
                realParentNode.insertBefore(newRealNode, realNode)
                realNode = newRealNode;
            }
        }

        // apply attribute changes to node
        this.setAttributes(realNode, newNode);

        // render childs
        if(newNode && isComponent){ return; }

        let i = 0; let length = (newNode) ? newNode.childNodes.length : 0;
        while (i < length) {
            this.draw(newNode.childNodes[i], i, newNode, realNode);
            i++;
        }
        
        // delete extra nodes
        if(newNode){
            while(realNode.childNodes.length > length){
                realNode.removeChild(realNode.childNodes[newNode.childNodes.length]);
            }
        }
    }

    createRealNode(newNode, isComponent){
        let realNode = document.createElement(newNode.nodeName);
        if(isComponent){ realNode.childs = newNode.innerHTML; }
        return realNode;
    }

    setAttributes(element, newDomMap){
        if(!element || element.nodeType != 1) return;
        if(newDomMap && newDomMap.attributes != null){
            let i = 0; let length = newDomMap.attributes.length;
            while (i < length) {
                let name = newDomMap.attributes[i].nodeName;
                let value = newDomMap.attributes[i].nodeValue;
                let oldValue = element.getAttribute(name);
                
                if(name == "value" && element.value){
                    element.value = value;
                }else if(!value){
                    element.removeAttribute(name);
                }else if(oldValue != value && element[`__old_event_${name}`] != value){
                    if(name.indexOf("on") === 0 && name.length > 2){
                        element[`__old_event_${name}`] = value;
                        let eventName = name.replace("on","");
                        if(value.indexOf("=>") != -1){
                            element.removeEventListener(eventName, eval(value));
                            element.addEventListener(eventName, eval(value));
                        }else{
                            let functionName = value.replace("this.", "");
                            let paramsStartAt = functionName.indexOf("(");
                            if(paramsStartAt == -1){
                                element.removeEventListener(eventName, this[functionName]);
                                element.addEventListener(eventName, this[functionName]);
                            }else{
                                let params = functionName.slice(paramsStartAt+1, functionName.indexOf(")"));
                                    params = params.split(",");
                                    params = params.map(param => param.trim());
                                functionName = functionName.slice(0, paramsStartAt);
                                element.removeEventListener(eventName, ()=>this[functionName](...params));
                                element.addEventListener(eventName, ()=>this[functionName](...params));
                            }
                        }
                    }else{
                        element.setAttribute(name, value);
                    }
                }
                i++;
            }
        }
    }

    setData(name, opts){
        if(!this.cuppa && this.cuppaStorage) this.cuppa = this.cuppaStorage;
        if(!this.cuppa) return;
        this.cuppa.setData(name, opts);
    }

    setStorage(name, opts){ this.setData(name, opts) }

    getData(name, opts){
        if(!this.cuppa && this.cuppaStorage) this.cuppa = this.cuppaStorage;
        if(!this.cuppa) return;
        if(opts && opts.callback){
            this.cuppa.getData(name, opts);
            this._getStorageDictionary[name] = opts;
        }else{
            return this.cuppa.getData(name, opts);
        }
    }
    
    getStorage(name, opts){ return this.getData(name, opts) }

    removeStorage(){
        if(!this.cuppa && this.cuppaStorage) this.cuppa = this.cuppaStorage;
        if(!this.cuppa) return;
        Object.entries(this._getStorageDictionary).map(([key, value])=>{
            if(value && value.callback) this.cuppa.removeListener(key, value.callback);
            delete this._getStorageDictionary[key];
        });
    }

    destroy(){
        this.removeStorage();
    }

    disconnectedCallback() {
        if(this.destroy) this.destroy();
        if(this.disconnected) this.disconnected(this);
    }

    processRefs(html, addTo, tagAttr){
        if(!tagAttr) tagAttr = "id";
        let nodes = {}
        let elements = Array.from(html.querySelectorAll(`[${tagAttr}]`));
        for(let i = 0; i < elements.length; i++){
            if(addTo) addTo[elements[i].getAttribute(tagAttr)] = elements[i];
            else nodes[elements[i].getAttribute(tagAttr)] = elements[i];
        }
        if(addTo) addTo["rootHtml"] = html;
        else nodes["rootHtml"] = html;
        return nodes;
    };

    binAll(element, isFunction){
        let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
        if(isFunction)  propertyNames = Object.keys(element);
        for(let i = 0; i < propertyNames.length; i++){
            if(typeof element[propertyNames[i]] == "function"){
                element[propertyNames[i]]= element[propertyNames[i]].bind(element);
            };
        };
    };

    bind(element){
        let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
        for(let i = 0; i < propertyNames.length; i++){
            if(typeof element[propertyNames[i]] == "function"){
                if(this[propertyNames[i]]) continue;
                this[propertyNames[i]] = element[propertyNames[i]].bind(element);
            };
        };
    }

    autoSetObservables(){
        let baseParamsMap = {}; 
        Object.keys(this).map(key=>baseParamsMap[key] = 1);
        setTimeout(()=>{ 
            if(!this.autoDefineObservables) return;
            Object.keys(this).map(key=>{
                if(baseParamsMap[key]) return;
                this.observables( {[key]:this[key]} );
            });
        }, 0);
    }

    observables(object, callback) {
        let target = this;
        if(!object) return;
        let firstName;
        Object.keys(object).map((name, index)=>{
            if(!index) firstName = name;
            let value = object[name];
            let privateVar = "_" + name;
            target[privateVar] = value;
            Object.defineProperty(target, name, {
                set: value => {
                    target[privateVar] = value;
                    if(target["forceRender"]) target.forceRender();
                    if(callback) callback();
                },
                get: () => { return target[privateVar]; },
                configurable:true,
            });
        })
        return target[firstName];
    }
};