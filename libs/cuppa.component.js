/**
    CuppaComponent

    class fields
        pure = false;                   // false, true 'will render only 1 time'
        shadow = null;                  // null, open, close
        refs = {};
        childrenList =                  // children components

    import CuppaComponent from "cuppa.component.js";
    import "cuppa.component.js"
    <script src="cuppa.component.js" type="module"></script>
**/

export class CuppaComponent extends HTMLElement {
    pure = false;
    shadow = null;
    refs = {};
    _parser = new DOMParser();
    renderedCount = 0;
    childrenList = null;

    constructor() {
        super();
        this.binAll = this.binAll.bind(this);
        this.connectedCallback = this.connectedCallback.bind(this);
        this.forceRender = this.forceRender.bind(this);
        this.draw = this.draw.bind(this);
        this.createRealNode = this.createRealNode.bind(this);
        this.setAttributes = this.setAttributes.bind(this);
        this.disconnectedCallback = this.disconnectedCallback.bind(this);
        this.processRefs = this.processRefs.bind(this);
        this.observables = this.observables.bind(this);
        this.binAll(this);
    }

    connectedCallback() {
        setTimeout(()=>{
            if(this.shadow) this.attachShadow({mode: this.shadow});
            this.forceRender();
            if(this.mounted) this.mounted(this);
        }, 0);
    }

    setVariables(args){
        Object.entries(args).map(([name, value])=>{
            this[`_${name}`] = value;
        });
        this.forceRender();
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
                html = html.trim();
                html = html.replace(/>\s+|\s+</g, function(m) { return m.trim(); });
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

        // render children
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
        if(isComponent){ realNode.childrenList = newNode.innerHTML; }
        return realNode;
    }

    setAttributes(element, newDomMap){
        if(!element || element.nodeType != 1) return;
        if(newDomMap && newDomMap.attributes != null){
            let attrProcessedMap = {};
            for(let i = 0; i < newDomMap.attributes.length; i++){
                let name = newDomMap.attributes[i].nodeName;
                let value = newDomMap.attributes[i].nodeValue;
                let oldValue = element.getAttribute(name);
                attrProcessedMap[name] = value;
                
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
            }

            let attrs = Array.from(element.attributes);
            for(let i = 0; i < attrs.length; i++) {
                if(attrProcessedMap[attrs[i].nodeName] === undefined){
                    element.removeAttribute(attrs[i].nodeName);
                }
            }
        }
    }

    disconnectedCallback() {
        if(this.unmounted) this.unmounted(this);
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

    observables(object, callback) {
        let target = this;
        if(!object) return;
        if(Array.isArray(object)){
            object.forEach(varName => {
                this.observable(varName, this[varName]);
            });
            return;
        }
        
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

    observable(varName, defaultValue){
        setTimeout(()=>{
            if(!defaultValue) defaultValue = this[varName];
            this.observables( {[varName]:defaultValue} );
        }, 0)
        return defaultValue;
    }
};