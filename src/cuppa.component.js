/**
 * CuppaComponent
 * 
 *  shadow = false, true or open
 * 
 */

const eventAttr =  {
    onclick:1, ondblclick:1, onmousedown:1, onmousemove:1, onmouseout:1, onmouseover:1, onmouseup:1, onwheel:1,
    onblur:1, onchange:1, oncontextmenu:1, onfocus:1, oninput:1, oninvalid:1, onreset:1, onsearch:1, onselect:1, onsubmit:1,
    onkeydown:1, onkeypress:1, onkeyup:1,
    ondrag:1, ondragend:1, ondragenter:1, ondragleave:1, ondragover:1, ondragstart:1, ondrop:1, onscroll:1,
    oncopy:1, oncut:1, onpaste:1,
}

export class CuppaComponent extends HTMLElement {
    cuppa;
    pure = false;
    shadow = false;
    getDataDictionary = {};
    state = {};
    refs = {};
    parser = new DOMParser();

    constructor() {
        super();
    }

    connectedCallback() {
        if(this.shadow === true) this.shadow = "open";
        if(this.shadow) this.attachShadow({mode: this.shadow});
        this.forceRender();
        if(this.connected) this.connected(this);
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
            if(this.shadow){
                this.shadowRoot.innerHTML = "shadow not supported in pure component";
            }else{
                this.innerHTML = "";
                this.insertAdjacentHTML("afterbegin", this.render());
            }
        }else{
            let html = this.render().trim();
                html = html.replace(/\s+/gi, " ");
                html = html.replace(/<!--(.*?)-->/g, "");
                html = html.replace(new RegExp("&", 'g'), "&amp");
                html = html.replace(new RegExp("> <", 'g'), "><");
            let newNode = this.parser.parseFromString(html, "text/xml").firstChild;
            if(this.shadow){
                this.shadowRoot.append("");
                this.draw(newNode, 0, null, this.shadowRoot);
            }else{
                this.draw(newNode, 0, null, this);
            }
        }
        this.processRefs(this, this.refs, "ref");
        this.binAll(this);
        if(callback) callback();
    }

    draw(newNode, newNodeIndex, newNodeParent, realParentNode){
        let realNode = realParentNode.childNodes[newNodeIndex];
        if(!realNode){
            if(newNode && newNode.nodeType == 3){
                realParentNode.insertAdjacentText('beforeend', newNode.nodeValue);
                return;
            }else if(newNode){
                realNode = document.createElement(newNode.nodeName);
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
                        let newRealNode = document.createElement(newNode.nodeName);
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
                let newRealNode = document.createElement(newNode.nodeName);
                realParentNode.insertBefore(newRealNode, realNode)
                realNode = newRealNode;
            }
        }

        // apply attribute changes to node
        this.setAttributes(realNode, newNode);

        // render childs
        if(newNode.nodeName.indexOf("-") != -1){ return; }

        let i = 0; let length = newNode.childNodes.length;
        while (i < length) {
            this.draw(newNode.childNodes[i], i, newNode, realNode);
            i++;
        }
        
        // delete extra nodes
        while(realNode.childNodes.length > length){
            realNode.removeChild(realNode.childNodes[newNode.childNodes.length]);
        }
    }

    setAttributes(element, newDomMap){
        if(!element || element.nodeType != 1) return;
        if(newDomMap.attributes != null){
            let i = 0; let length = newDomMap.attributes.length;
            while (i < length) {
                let name = newDomMap.attributes[i].nodeName;
                let value = newDomMap.attributes[i].nodeValue;
                let oldValue = element.attributes[name];
                if(!value){
                    element.removeAttribute(name);
                }else if(oldValue != value){
                    if(eventAttr[name]){
                        if(value.indexOf("=>") != -1){
                            element[name] = eval(value);
                        }else{
                            let functionName = value.replace("this.", "");
                            let paramsStartAt = functionName.indexOf("(");
                            if(paramsStartAt == -1){
                                element[name] = this[functionName].bind(this);
                            }else{
                                let params = functionName.slice(paramsStartAt+1, functionName.indexOf(")"));
                                    params = params.split(",");
                                    params = params.map(param => param.trim());
                                functionName = functionName.slice(0, paramsStartAt);
                                element[name] = ()=>this[functionName](...params);
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
        if(!this.cuppa) return;
        this.cuppa.setData(name, opts);
    }

    getData(name, opts){
        if(!this.cuppa) return;
        if(opts && opts.callback){
            this.cuppa.getData(name, opts);
            this.getDataDictionary[name] = opts;
        }else{
            return this.cuppa.getData(name, opts);
        }
    }

    removeData(){
        if(!this.cuppa) return;
        Object.entries(this.getDataDictionary).map(([key, value])=>{
            if(value && value.callback) this.cuppa.removeListener(key, value.callback);
            delete this.getDataDictionary[key];
        });
    }

    destroy(){
        this.removeData();
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
}