var log = function(values){ try{ let args = arguments; for(let i = 0; i < args.length; i++){ console.log(args[i]); } }catch(err){ }; };
var cuppa = (typeof cuppa != "undefined") ? cuppa : { debug:false };

// ready
    cuppa.ready = function(callback){
        if(document.readyState === 'complete') callback();
        else document.addEventListener('DOMContentLoaded', callback);
    };

    cuppa.loaded = function(callback){
        if(document.readyState === 'complete') callback();
        document.onreadystatechange = function () { if (document.readyState === 'complete') { callback(); } };
    };
/* return element
    ref = string
    parent = string or html node
    opts = {
        parent, target: string or element
        returnType: first, last, all
        query: true // force to use querySelector
        reverse: false // invert the element order
        invert: false // invert the element order
        not:ELements
    }
*/
    cuppa.element = function(ref, opts){
        if(!ref) return;
        opts = opts || {}
        opts.returnType = opts.returnType || "all";
        opts.query = opts.query || true;
        if(opts.target) opts.parent = opts.target;
        if(ref === "body"){
            if(opts.returnType === "first") return document.body;
            else if(opts.returnType === "last") return document.body;
            else return [document.body];
        }else if(Array.isArray(ref)){
            if(opts.returnType === "first") return ref.shift();
            else if(opts.returnType === "last") return ref.pop();
            else return ref;
        }else if(ref.toString() === "[object NodeList]" || ref.toString() === "[object HTMLCollection]"){
            ref = Array.from(ref);
            if(opts.returnType === "first") return ref.shift();
            else if(opts.returnType === "last") return ref.pop();
            else return ref;
        }else if(typeof(ref) === "object"){
            if(opts.returnType === "first") return ref;
            else if(opts.returnType === "last") return ref;
            else return [ref];
        };

        if(!opts.parent || opts.parent === "body") opts.parent = [document.body];
        if(typeof(opts.parent) === "string") opts.parent = cuppa.element(opts.parent);
        if(!Array.isArray(opts.parent)) opts.parent = [opts.parent];

        let nodes = []; if(!opts.parent) return nodes;
        for(let i = 0; i < opts.parent.length; i++){
            let t = opts.parent[i];
            let n = null;
            if(cuppa.search("#", ref) && !opts.query){
                let e = cuppa.replace(ref, "#", "");
                try{ n = t.getElementById(e); }catch(err){  }
                if(n) nodes.push(n);
            }else if(cuppa.search(".", ref) && !opts.query){
                ref = cuppa.replace(ref, "\\.", "");
                try{ n = Array.from(t.getElementsByClassName(ref)); }catch(err){  }
                if(n && n.length) nodes= nodes.concat(n);
            }else{
                try{ n = Array.from(t.querySelectorAll(ref)); }catch(err){  }
                if(n && n.length) nodes= nodes.concat(n);
            };
        };
        if(opts.not) nodes = nodes.filter(function(item){ if(item !== opts.not){ return item; }else{ return null; } });
        if(opts.reverse || opts.invert) nodes.reverse();
        if(opts.returnType === "first") return nodes.shift();
        else if(opts.returnType === "last") return nodes.pop();
        else return nodes;
    };
    cuppa.elements = function(ref, opts){
        return cuppa.element(ref, opts);
    };

// elementIndex
    cuppa.elementIndex = function(element){
        let childrens = cuppa.childrens(cuppa.parent(element));
        return childrens.indexOf(element);
    };

// new element
    cuppa.newElement = function(str){
        let parent;
        let substr = str.substr(0,3);
        if(substr === "<tr") parent = document.createElement('tbody');
        else if(substr === "<td" || substr === "<th") parent = document.createElement('tr');
        else parent = document.createElement('div');
            parent.innerHTML = str;
        return parent.firstChild;
    };

// childrens
    cuppa.childrens = function(element) {
        if(!element) return null;
        let tmp = element.childNodes;
        let childrens = [];
        for(let i = 0; i < tmp.length; i++){
            if(tmp[i].nodeType === 1) childrens.push(tmp[i]);
        };
        return childrens;
    }

// remove element
    cuppa.remove = function(ref){
        let elements = cuppa.element(ref);
        if(!elements) return;
        for(let i = 0; i < elements.length; i++){
            try{
                elements[i].parentNode.removeChild(elements[i]);
            }catch(err){
                //log("Can't remove node",elements[i]);
            };
        };
    };

// clean
    cuppa.clean = function(ref){
        ref.innerHTML = "";
    };

/* removeClass */
    cuppa.removeClass = function(elements, classes){
        elements = cuppa.element(elements);
        classes = classes.split(" ");
        for(let i = 0; i < elements.length; i++){
            for(let j = 0; j < classes.length; j++){
                elements[i].classList.remove(classes[j]);
            };
        };
    };

/* addClass */
    cuppa.addClass = function(elements, classes){
        if(!elements) return;
        if(!classes) return;
        elements = cuppa.element(elements);
        if(!Array.isArray(classes)) classes = classes.split(" ");
        for(let i = 0; i < elements.length; i++){
            for(let j = 0; j < classes.length; j++){
                if(cuppa.trim(classes[j])){
                    elements[i].classList.add(classes[j]);
                };
            };
        };
    };

/* toggleClass */
    cuppa.toggleClass = function(elements, classes){
        elements = cuppa.element(elements);
        classes = classes.split(" ");
        for(let i = 0; i < elements.length; i++){
            for(let j = 0; j < classes.length; j++){
                elements[i].classList.toggle(classes[j]);
            };
        };
    };

/* hasClass */
    cuppa.hasClass = function(element, className){
        element = cuppa.element(element)[0];
        return element.classList.contains(className);
    };

/* replaceClass */
    cuppa.replaceClass = function(elements, search, replace){
        elements = cuppa.element(elements);
        for(let i = 0; i < elements.length; i++){
            elements[i].classList.remove(search);
            elements[i].classList.add(replace);
        };
    };

/* attribute */
    cuppa.attribute = function(elements, name, value, remove){
        if(!elements || !name) return;
        elements = cuppa.element(elements);
        let i;
        let element;
        if(remove){
            for(i = 0; i < elements.length; i++){
                element = elements[i];
                element.removeAttribute(name);
            };
            return;
        };
        if(value !== undefined && value !== null){
            for(i = 0; i < elements.length; i++){
                element = elements[i];
                element.setAttribute(name, value);
            };
        }else{
            try{ value = elements[0].getAttribute(name); }catch(err){}
            return value;
        };
    }; cuppa.attr = function(elements, name, value, remove){ return cuppa.attribute(elements, name, value, remove); };

/* clone element
    ref: string, element
*/
    cuppa.clone = function(ref){
        let element = cuppa.element(ref, {returnType:"first"});
        let clone = element.cloneNode(true);
        return clone;
    };

// parent / parents
    cuppa.parent = function(ref){
        if(!ref) return;
        let element = cuppa.element(ref)[0];
        if(!element) return;
        return element.parentElement;
    };
    cuppa.parents = function(ref, opts){
        opts = cuppa.mergeObjects([{reverse:false, type:""}, opts]);
        let element = cuppa.element(ref)[0];
        if(!element) return;
        let parents = [];
        if(cuppa.elementType(element) === "body") return parents;
        while (element) {
            if(element.toString() !== "[object HTMLDocument]" && element.toString() !== "[object HTMLHtmlElement]"){
                if(opts.type){
                    if(cuppa.elementType(element) === opts.type){
                        parents.push(element);
                    }
                }else{
                    parents.push(element);
                }
            };
            element = element.parentNode;
        };
        parents.shift();
        if(opts.reverse) parents = parents.reverse();
        return parents;
    };

// parentDocument
    cuppa.parentDocument = function(){
        let ref = window.parent.document;
        if(!ref) ref = document;
        return ref;
    }

// addElement, addChild
    /*  opts = {
            prepend, start, init, target:target     // insert element inside target (first position)
            append, add, end:target              // insert element inside target (last position)
            before:target                   // insert element befor target
            after:target                    // insert element after target
        }
    */
    cuppa.addChild = function(element, opts){
        if(!element) return;
        opts = opts || {}
        let target;
        if(opts.prepend){
            target = cuppa.element(opts.prepend, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.start){
            target = cuppa.element(opts.start, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.init){
            target = cuppa.element(opts.init, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.first){
            target = cuppa.element(opts.first, {query:true, returnType:"first"} );
            cuppa.prepend(element, target);
        }else if(opts.before){
            target = cuppa.element(opts.before, {query:true, returnType:"first"} );
            cuppa.before(element, target);
        }else if(opts.after){
            target = cuppa.element(opts.after, {query:true, returnType:"first"} );
            cuppa.after(element, target);
        }else if(opts.append){
            target = cuppa.element(opts.append, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.add){
            target = cuppa.element(opts.add, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.target){
            target = cuppa.element(opts.target, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.end){
            target = cuppa.element(opts.end, {query:true, returnType:"first"} );
            cuppa.append(element, target);
        }else if(opts.replace){
            target = cuppa.element(opts.replace, {query:true, returnType:"first"} );
            cuppa.replaceElement(element, target);
        }else if(opts.update){
            target = cuppa.element(opts.update, {query:true, returnType:"first"} );
            cuppa.update(element, target);
        };
    };
    cuppa.addElement = function(element, opts){ cuppa.addChild(element, opts); };
    cuppa.addChildren = function(element, opts){ cuppa.addChild(element, opts); };

    cuppa.append = function(element, addToElement){
        addToElement = cuppa.element(addToElement)[0];
        if(typeof element != "object") addToElement.innerHTML = element;
        else addToElement.appendChild(element);
        cuppa.executeJS(element);
    };
    cuppa.add = function(element, addToElement){ cuppa.append(element, addToElement); };
    cuppa.prepend = function(element, addToElement){
        addToElement = cuppa.element(addToElement, {returnType:"first"});
        if(addToElement.prepend) addToElement.prepend(element);
        else addToElement.insertBefore(element, addToElement.firstChild);
        cuppa.executeJS(element);
    };
    cuppa.before = function(element, addToElement){
        addToElement.parentNode.insertBefore(element, addToElement);
        cuppa.executeJS(element);
    };
    cuppa.after = function(element, addToElement){
        addToElement.parentNode.insertBefore(element, addToElement.nextSibling);
        cuppa.executeJS(element);
    };
    cuppa.previou = function(element){
        return element.previousElementSibling;
    };
    cuppa.next = function(element){
        return element.nextElementSibling;
    };
    cuppa.replaceElement = function(element, elementToReplace){
        elementToReplace.parentNode.replaceChild(element, elementToReplace);
        cuppa.executeJS(element);
    };
    cuppa.update = function(element, updateElement){
        updateElement = cuppa.element(updateElement);
        for(let i = 0; i < updateElement.length; i++){
            let el = updateElement[i];
            el.innerHTML = "";
            cuppa.append(element, el);
        };
    };
    cuppa.executeJS = function(element){
        let scripts;
        try{ scripts = Array.from(element.querySelectorAll("script")); }catch(err){ };
        if(!scripts) return;
        for(let i = 0; i < scripts.length; i++){
            try{ eval(scripts[i].innerHTML); }catch(err){ };
        };
    };
    cuppa.show = function(elements, opts){
        elements = cuppa.element(elements);
        if(!elements) return;
        for(let i = 0; i < elements.length; i++){
            let element = elements[i];
            opts = cuppa.mergeObjects([{ duration:0.3, display:"block", delay:0, ease:null, height:false, callback:null, gsap:null}, opts]);
            let {gsap} = opts;
            gsap.killTweensOf(element);
            if(opts.height === true){
                let dim = cuppa.dim(element);
                let tl = new window.TimelineMax({onComplete:opts.callback});
                    tl.to(element, opts.duration, { height:dim.scrollHeight, ease:opts.ease});
                    tl.set(element, {height:"auto"});
            }else{
                gsap.to(element, {duration:opts.duration, alpha:1, delay:opts.delay, display:opts.display, ease:opts.ease, onComplete:opts.callback});
            }
        }
    };
    cuppa.hide = function(element, opts){
        element = cuppa.element(element);
        if(!element) return;
        opts = cuppa.mergeObjects([{ duration:0.3, delay:0, ease:null, height:false, callback:null, gsap:null}, opts]);
        let {gsap} = opts;
        gsap.killTweensOf(element);
        if(opts.height === true){
            gsap.to(element, {duration:opts.duration, height:0, delay:opts.delay, ease:opts.ease, onComplete:opts.callback });
        }else{
            gsap.to(element, {duration:opts.duration, alpha:0, display:"none", delay:opts.delay, ease:opts.ease, onComplete:opts.callback });
        }
    };

/* nodeName  */
    cuppa.nodeType = function(element){ return  element.nodeName.toLowerCase(); };
    cuppa.elementType = function(element){ return cuppa.nodeType(element); };

    // get iframe
    cuppa.getIframe = function(){
        return window.frameElement;
    };

// noscroll
    cuppa.noscroll = function(value, all){
        if(value === undefined) value = true;
        if(all === undefined) all = false;
        if(value){
            if(all) document.body.classList.add("noscroll-all");
            else document.body.classList.add("noscroll");
        }else{
            document.body.classList.remove("noscroll");
            document.body.classList.remove("noscroll-all");
        };
    };

// text
    cuppa.text = function(elements, value){
        if(!elements) return;
        elements = cuppa.element(elements);
        if(value === undefined && elements[0]){
            return elements[0].innerHTML;
        }
        for(let i = 0; i < elements.length; i++){
            elements[i].innerHTML = value;
        };
    };

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

// requiereCSS / IncludeCSS / loadCCS
    cuppa.requireCSSDirectory = {};
    cuppa.loadedCSS = 0;
    cuppa.requiereCSS = function(paths, callback, progress, opts){
        if( typeof(paths) == "string") paths = [paths];
        opts = cuppa.mergeObjects([{target:document.head}, opts]);
        cuppa.loadedCSS = 0;
        for(let i = 0; i < paths.length; i++){
            let path = paths[i];
            if(cuppa.requireCSSDirectory[path]){
                onComplete();
            }else{
                cuppa.requireCSSDirectory[path] = true;
                let element = document.createElement('link');
                    element.rel = "stylesheet";
                    element.type = "text/css";
                    element.href = path;
                    element.onload = onComplete;
                    opts.target.appendChild(element);
            };
        };
        function onComplete(e){
            cuppa.loadedCSS++;
            if(cuppa.loadedCSS >= paths.length && callback){
                callback(cuppa.loadedCSS, paths.length);
            }else if(progress){
                progress(cuppa.loadedCSS, paths.length);
            };
        };
    };
    cuppa.includeCSS = function(paths, callback, progress){ cuppa.requiereCSS(paths, callback, progress); };
    cuppa.loadCSS = function(paths, callback, progress){ cuppa.requiereCSS(paths, callback, progress); };

// requireComponent / IncludeComponent / loadComponents
    cuppa.requireComponentDirectory = {};
    cuppa.loadedComponents = 0;
    cuppa.requireComponent = function(paths, opts){
        if( typeof(paths) == "string") paths = [paths];
        opts = cuppa.mergeObjects([{callback:null, progress:null, plainComponent:true, reload:false, target:document},opts])
        cuppa.loadedComponents = 0;
        for(let i = 0; i < paths.length; i++){
            let path = paths[i];
            if(cuppa.requireComponentDirectory[path] && !opts.reload){
                onComplete();
            }else{
                cuppa.requireComponentDirectory[path] = true;
                cuppa.processComponent(path, {callback:onComplete, plainComponent:opts.plainComponent, target:opts.target});
            };
        };
        function onComplete(e){
            cuppa.loadedComponents++;
            if(opts.progress){
                opts.progress(cuppa.loadedComponents, paths.length);
            };
            if(cuppa.loadedComponents >= paths.length && opts.callback){
                opts.callback(cuppa.loadedComponents, paths.length);
            };
        };
    };
    cuppa.includeComponent = function(paths, opts){ cuppa.requireComponent(paths, opts); };
    cuppa.loadComponent = function(paths, opts){ cuppa.requireComponent(paths, opts); };
    cuppa.component = function(paths, opts){ cuppa.requireComponent(paths, opts); };
    cuppa.components = function(paths, opts){ cuppa.requireComponent(paths, opts); };

// load Component
    cuppa.processComponent = function(url, opts){
        opts = cuppa.mergeObjects([{callback:null, plainComponent:true, target:document},opts])
        cuppa.ajax(url,{method:"GET"}, function(result){
            let oldElement = opts.target.getElementById("component_"+url);
            if(oldElement) cuppa.remove(oldElement);
            if(!result) {
                if(opts.callback) opts.callback(url);
                return;
            };
            if(opts.plainComponent){
                if(!cuppa.componentListContainer){
                    cuppa.componentListContainer = opts.target.createElement('div');
                    cuppa.componentListContainer.id = "component_list_container";
                    cuppa.componentListContainer.style.display = "none";
                    cuppa.append(cuppa.componentListContainer, opts.target.body);
                }
                let div = opts.target.createElement('div');
                    div.id = "component_"+url;
                    div.innerHTML = result;
                    div.style.display = "none";
                cuppa.append(div, cuppa.componentListContainer);
                if(opts.callback) opts.callback(url);
                return;
            };
            let template = result.split("<template>")[1];
                template = template.split("</template>")[0];
                template = cuppa.replace(template,"\n","");
                template = cuppa.trim(template);
            let script = result.split("<script>")[1];
                script = script.split("</script>")[0];
                script = cuppa.trim(script);
                script = "window.Class = "+script;
                script = script.replace("super();", "super(); this.processComponent();");
                try{ script = eval(script); }catch(err){ };
                if(typeof script === "string") return;
                script.prototype.template = cuppa.newElement(template);
                script.prototype.processComponent = function(){
                    let temp = this.template.cloneNode(true);
                    this.appendChild(temp);
                    cuppa.nodes(this, this);
                };
            let fileDesc = cuppa.fileDescription(url);
            customElements.define(fileDesc.name, script);
            if(opts.callback) opts.callback(url);
        });
    };

/* setNodes
        html: html to extract the nodes
        addTo: Object where we want to add the nodes
*/
    cuppa.nodes = function(html, addTo, tagAttr){
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

/* bindAll */
    cuppa.bindAll = function(element, isFunction){
        let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
        if(isFunction)  propertyNames = Object.keys(element);
        for(let i = 0; i < propertyNames.length; i++){
            if(typeof element[propertyNames[i]] == "function"){
                element[propertyNames[i]]= element[propertyNames[i]].bind(element);
            };
        };
    };

/* cuppa.componentAdjust */
    cuppa.componentAdjust = function(element, templateID, tagAttr){
        if(!tagAttr) tagAttr = "id";
        const currentDocument = (document.currentScript) ? document.currentScript.ownerDocument : document;
        let templateRef = currentDocument.getElementById(templateID);
        let template = templateRef.content.cloneNode(true);
        cuppa.attr(element, "style", cuppa.attr(templateRef, "style"));
        cuppa.attr(element, "class", cuppa.attr(templateRef, "class"));
        element.appendChild(template);
        cuppa.nodes(element, element, tagAttr);
        cuppa.bindAll(element);
    };

/* cuppa.componentAdjustString */
    cuppa.componentAdjustString = function(element, opts){
        opts = {...{shadow:false, tagAttr:"ref", templateString:null},...opts};
        if(!opts.templateString) opts.templateString = element.render();
        if(opts.shadow){
            if(opts.shadow === true) opts.shadow = "open";
            let template = cuppa.newElement(opts.templateString);
            element.attachShadow({mode: opts.shadow});
            element.shadowRoot.appendChild(template);
            cuppa.nodes(template, element, opts.tagAttr);
        }else{
            element.insertAdjacentHTML("beforeend", opts.templateString);
            cuppa.nodes(element, element, opts.tagAttr);
        }
        cuppa.bindAll(element);
    };
 // Dispache Events (Objects)
function EventDispatcher() {};
if(Object.assign){
    Object.assign( EventDispatcher.prototype, {
        addEventListener: function ( type, listener ) {
            if ( this._listeners === undefined ) this._listeners = {};
            let listeners = this._listeners;
            if ( listeners[ type ] === undefined ) {
                listeners[ type ] = [];
            }
            if ( listeners[ type ].indexOf( listener ) === - 1 ) {
                listeners[ type ].push( listener );
            }
        },
        hasEventListener: function ( type, listener ) {
            if ( this._listeners === undefined ) return false;
            let listeners = this._listeners;
            return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;
        },
        removeEventListener: function ( type, listener ) {
            if ( this._listeners === undefined ) return;
            let listeners = this._listeners;
            let listenerArray = listeners[ type ];
            if ( listenerArray !== undefined ) {
                let index = listenerArray.indexOf( listener );
                if ( index !== - 1 ) {
                    listenerArray.splice( index, 1 );
                }
            }
        },
        dispatchEvent: function ( event ) {
            if ( this._listeners === undefined ) return;
            let listeners = this._listeners;
            let listenerArray = listeners[ event.type ];
            if ( listenerArray !== undefined ) {
                event.target = this;
                let array = listenerArray.slice( 0 );
                for ( let i = 0, l = array.length; i < l; i ++ ) {
                    array[ i ].call( this, event );
                }
            }
        }
    } );
};

// CustomEvent
    (function () {
        if(typeof window == "undefined") return;
        if ( typeof window.CustomEvent === "function" ) return false;
        function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        let evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })();

// Base64
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(input) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function(input) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9+/=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64._utf8_decode(output);
        return output;
    },
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    _utf8_decode: function(utftext) {
        let string = "";
        let i = 0;
        let c, c2, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
 /* replace in range
    opts = {
        first: false,
        range: [init_string, end_string],
        first_range: false
        split: false;
    }
*/
    cuppa.replace = function(string, search, replace, opts){
        if(!string) return "";
        opts = opts || {};
        if(opts.range){
            let c_temp1 = string.split(opts.range[0]);
            if(c_temp1.length <= 1 ) return string;
            for(let i = 0; i < c_temp1.length; i++){
                let c_temp2 = c_temp1[i].split(opts.range[1]);
                if(c_temp2.length > 1){
                    if(opts.first){
                        if(opts.split) c_temp2[0] = cuppa.replaceSplit(c_temp2[0], search, replace);
                        else c_temp2[0] = c_temp2[0].replace(search, replace);
                    }else{
                        if(opts.split) c_temp2[0] = cuppa.replaceSplit(c_temp2[0], search, replace);
                        else c_temp2[0] = c_temp2[0].replace(new RegExp(search, 'g'), replace);
                    }
                    c_temp1[i] = c_temp2.join(opts.range[1]);
                    if(opts.first_range) break;
                }
            }
            string = c_temp1.join(opts.range[0]);
        }else{
            if(opts.first){
                if(opts.split) string = cuppa.replaceSplit(string, search, replace);
                else string = string.replace(search, replace);
            }else{
                if(opts.split) string = cuppa.replaceSplit(string, search, replace);
                else string = string.replace(new RegExp(search, 'g'), replace);
            }
        };
        return string;
    };
    cuppa.replaceSplit = function(string, search, replace){
        return string.split(search).join(replace);
    };
/* Unique value */
    cuppa.unique = function(addToInit, dateFormat){
        let value = "";
        if(dateFormat){
            value =  new Date().toISOString() + "-" + Math.round(Math.random()*9999);
            value = cuppa.replace(value,":","-");
            value = cuppa.replace(value,"\\.","-");
        }else{
            value = new Date().valueOf()+Math.round(Math.random()*9999);
        }
        if(addToInit) value = addToInit + value;
        return value;
    };
/* Method Trim() */
	cuppa.trim = function(string){
	   if(string) return string.replace(/^\s+|\s+$/g, '');
       else return "";
	};
/* Validate if a string is email, Return true of false */
	cuppa.email = function(value){
	   let emailExpression = /^[a-z 0-9][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
	   return emailExpression.test(cuppa.trim(value));
	};
/* Validate if a string is a url, Return true of false */
    cuppa.url = function(str) {
        let regexp = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
        return regexp.test(str);
    }

/* Delete more of two spaces */
	cuppa.deleteDoubleSpaces = function(value){
		let valueExpression = /\s+/gi;
		return value.replace(valueExpression, " ");
    };

// Delete more of two repetitive character, example: tuffik or api//data/data2
    cuppa.deleteDoubleCharacters = function(str, character) {
        let array = str.split(character);
        array = array.filter(item => item);
        return array.join(character)
    };

/* remove not printable characters */
    cuppa.removeNotPrintableCharacters = function(string){ return string.replace(/[^\x20-\x7E]+/g, ''); }

/* Remove break lines*/
    cuppa.removeBreakLines = function(value){
        if(!value) return value;
        return value.replace(/(\r\n|\n|\r)/gm, "");
    };

/* Search a word inside of a string. Return true or false */
	cuppa.searchWord = function(word, string) {
        if(!string) return false;
		word = word.toLowerCase();
		string = string.toLowerCase();
		let result = string.indexOf(word);
		if (result === -1) return false;
		else return true;
	};
    cuppa.search = function(word, string) { return cuppa.searchWord(word, string); };

/* String like, similar to LIKE in MySQL */
    cuppa.stringLike = function(string, like){
        if(!string) return false;
        if(string.indexOf(like) >= 0) return true;
        else return false;
    };
    cuppa.likeString = function(string, like){ return cuppa.stringLike(string, like); }

/* Capitalize */
    cuppa.capitalize = function(string, firstWord) {
        if(firstWord) return cuppa.capitaliseFirstLetter(string);
        else return cuppa.capitaliseAllWords(string);
    }
    cuppa.capitaliseFirstLetter = function(string){
        if(!string) string = '';
        string = string.toLocaleLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    cuppa.capitaliseAllWords = function(str){
        if(!str) str = '';
        str = str.toLocaleLowerCase();
        let pieces = str.split(" ");
        for ( let i = 0; i < pieces.length; i++ ){
            let j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    };

// Camelize
    cuppa.camelize = function(str) {
        str = String(str) || "";
        str = cuppa.replace(str, "-", " ");
        str = cuppa.replace(str, "_", " ");
        str = str.toLowerCase();
        str = str.replace(/[^\w\s]/gi, '');
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    };

/* Convert number a money format: 100,000.15 */
    cuppa.numberToMoney = function(value, decimals, decimalSeparator) {
        if(decimals === undefined) decimals = 0;
        value = parseFloat(value).toFixed(decimals);
        value = String(value);
        if (Number(value) === 0 || isNaN(value) || value === "") return "0";
        if (decimalSeparator === undefined) decimalSeparator = ".";
        let moneyFormat = "";
        let result;
        let arrayData;
        let floatData;
        let i;
        if(decimalSeparator === "."){
    		arrayData = value.split(".");
            floatData = ""; if (arrayData.length > 1) floatData = "." + arrayData[arrayData.length - 1];
            arrayData = arrayData[0].split("");
            arrayData.reverse();
    		for (i = arrayData.length - 1; i >= 0; i--) {
    			moneyFormat += arrayData[i];
    			if (i > 0) {
    				result = (i / 3);
    				result = result - Math.floor(i / 3);
    				if (Number(result) === 0 && arrayData[i] !== "-") {
    					moneyFormat += ",";
    				}
    			}
    		}
        }else if(decimalSeparator === ","){
            arrayData = value.split(",");
    		floatData = ""; if (arrayData.length > 1) floatData = "," + arrayData[arrayData.length - 1];
            arrayData = arrayData[0].split("");
            arrayData.reverse();
    		for (i = arrayData.length - 1; i >= 0; i--) {
    			moneyFormat += arrayData[i];
    			if (i > 0) {
    				result = (i / 3);
    				result = result - Math.floor(i / 3);
    				if (Number(result) === 0 && arrayData[i] !== "-") {
    					moneyFormat += ".";
    				}
    			}
    		}
        }
        moneyFormat += floatData;
        if(moneyFormat == 0) return "";
		return  moneyFormat;
    };

/* Convert money format to number: 100000.15 */
    cuppa.moneyToNumber = function(value, decimalSeparator){
        value = String(value);
        if (decimalSeparator === undefined) decimalSeparator = ".";
        if(decimalSeparator === "."){
            value = cuppa.replace(value, ",", "")
        }else{
            value = cuppa.replace(value, ".", "");
            value = cuppa.replace(value, ",", ".");
        }
        value = parseFloat(value);
        if (value === 0 || isNaN(value) || value === "") return "";
        return value;
    };

/* Convert URL string to object */
    cuppa.urlToObject = function(string, urlDecode){
        if(urlDecode === undefined) urlDecode = true;
        if(!string) string = cuppa.getPath();
        if(string.indexOf("?") !== -1) string = string.substr(string.indexOf("?")+1);
        if(string.indexOf("#") !== -1) string = string.substr(string.indexOf("#")+1);
        let data = string.split("&");
        let object = {};
        if(data.length < 1) return null;
        for(let i = 0; i < data.length; i++){
            let item =  data[i].split("=");
            try{
                if(urlDecode) item[1] = cuppa.urlEncode(item[1]);
                if(item[0]) object[item[0]] = item[1];
            }catch(err){}
        }
        if(!Object.keys(object).length) return null;
        return object;
    };

/* Get UrlFriendly
        Example: news/article-news-1
    */
    cuppa.urlFriendly = function(str, max, spaceChar) {
        if(spaceChar == undefined) spaceChar = "-";
        if(!str) return;
        if (!max) max = 500;
        let a_chars = [];
            a_chars.push(["a",/[áàâãªÁÀÂÃ]/g]);
            a_chars.push(["e",/[éèêÉÈÊ]/g]);
            a_chars.push(["i",/[íìîÍÌÎ]/g]);
            a_chars.push(["o",/[òóôõÓÒÔÕ]/g]);
            a_chars.push(["u",/[úùûÚÙÛ]/g]);
            a_chars.push(["c",/[çÇ]/g]);
            a_chars.push(["n",/[Ññ]/g]);
            a_chars.push(["-",/[.]/g]);
            a_chars.push(["",/['"\\()[\]/*++¿?#:;@$º&*^·’,.!¡%=+|]/g]);
        for(let i=0; i < a_chars.length; i++){
            str = str.replace(a_chars[i][1], a_chars[i][0]);
        }
        str = str.replace(/\s+/g,spaceChar).replace(/_+/g,spaceChar).toLowerCase().replace(/-{2,}/g,spaceChar).replace(/(^\s*)|(\s*$)/g, '').substr(0,max);
        str = str.replace(/[^a-zA-Z0-9_ -]/g, "");
        str = str.replace(/[\-]/g, spaceChar);
        return str;
    };
    cuppa.cleanString = function(str, max, spaces){ return cuppa.urlFriendly(str, max, spaces); };
    cuppa.removeSpecialCharacters = function(str, max, spaces){ return cuppa.urlFriendly(str, max, spaces); };

/* Get Path vars Vars
    Exampe: news/article-news-1
            Return: Array('news','article-news-1')
*/
    cuppa.pathVars =  function(str, number_return){
        if(number_return === undefined) number_return = false;
        str = str.split("/");
        let array = [];
        for(let i = 0; i < str.length; i++){
            if(str[i]){
                str[i] = cuppa.trim(str[i]);
                if(number_return){
                    let number = parseInt(str[i]);
                    if(number) str[i] = number;
                }
                array.push(str[i]);
            }
        }
        return array;
    };

/* Get UTF8 Encode */
    cuppa.utf8Encode = function(string) {
		string = string.replace(/\r\n/g,"\n");
		let utftext = "";
		for (let n = 0; n < string.length; n++) {
			let c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
    };

/* Get UTF8 Decode */
    cuppa.utf8Decode = function(utftext) {
		let string = "";
		let i = 0;
		let c, c2, c3 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
    };

/* Remove html tags */
    cuppa.removeTags = function(input, allowed) {
        allowed = (((allowed || '') + '')
          .toLowerCase()
          .match(/<[a-z][a-z0-9]*>/g) || [])
          .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
        let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
          commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '')
          .replace(tags, function($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
          });
      };

/* Cut text */
    cuppa.cutText = function(delimiter, text, lenght, string_to_end, delimiter_forced, remove_tags){
        if(text === undefined) text = "";
        if(delimiter === undefined) delimiter = " ";
        if(lenght === undefined) lenght = 200;
        if(string_to_end === undefined) string_to_end = "";
        if(delimiter_forced === undefined) delimiter_forced = false;
        if(remove_tags === undefined) remove_tags = false;
        if(remove_tags) text = cuppa.removeTags(text);

        if(delimiter_forced){
            text = text.substr(0, lenght);
            if(cuppa.strrpos(text, delimiter) !== false) text = cuppa.trim(text.substr(0, cuppa.strrpos(text, delimiter)));
            text += string_to_end;
        }else if(text.length > lenght ){
            text = text.substr(0, lenght);
            if(cuppa.strrpos(text, delimiter) !== false) text = cuppa.trim(text.substr(0, cuppa.strrpos(text, delimiter)));
            text += string_to_end;
        }
        return text;
    };

/* Strpost*/
    cuppa.strpos = function(haystack, needle, offset) {
      let i = (haystack + '')
        .indexOf(needle, (offset || 0));
      return i === -1 ? false : i;
    };

/* Strrpost */
    cuppa.strrpos = function(haystack, needle, offset) {
      let i = -1;
      if (offset) {
        i = (haystack + '')
          .slice(offset)
          .lastIndexOf(needle);
        if (i !== -1) {
          i += offset;
        }
      } else {
        i = (haystack + '')
          .lastIndexOf(needle);
      }
      return i >= 0 ? i : false;
    };

/* get Filename
    ex: dir/dir/name.txt, return {name:name, ext:txt, type:txt}
*/
    cuppa.getFileDescription = function(file, forced){
        if (!file) return null;
        if(Array.isArray(file)) file = file[0];
		let separator = "/";
        file =  cuppa.replace(file, "\\\\", "/");
        let array = file.split(separator);
		if (cuppa.trim(array[array.length - 1]) === "") array.pop();
        let obj = {};
            obj.name_complete = array.pop();
            obj.path = array.join(separator) + separator;
            obj.file = obj.path + obj.name_complete;
		let array2 = obj.name_complete.split(".");
        if (array2.length > 1 || forced === "file" ) {
			obj.type = "file";
			if (array2.length > 1) obj.extension = array2.pop().toLowerCase();
			else obj.extension = "";
			obj.name = array2.join(".");
		}else{
			obj.type = "folder";
		}
		return obj;
    };
    cuppa.fileDescription = function(filePath){ return cuppa.getFileDescription(filePath); }

/* Convert the \n to <br /> */
    cuppa.nl2br = function(value){
        return value.replace(/\r?\n/g, '<br />');
    };

 /* Convert the <br /> to  \n */
    cuppa.br2nl = function(value){
        return value.replace(/<br\s*[/]?>/gi, "\n");
    };

// JSON Decode
    cuppa.jsonDecode = function(value, base64_decode, opts){
        opts = cuppa.mergeObjects([{removeBreakLines:true, deleteDoubleSpaces:false},opts]);
        if(value === undefined || value === null) return "";
        if(base64_decode === undefined) base64_decode = true;
        if(base64_decode && cuppa.isBase64(value)) value = cuppa.base64Decode(value);
        if(opts.removeBreakLines) value = cuppa.removeBreakLines(value);
        if(opts.deleteDoubleSpaces) value = cuppa.deleteDoubleSpaces(value);
        try{ value = JSON.parse(value); }catch(err){};
        return value;
    };

// JSON Encode
    cuppa.jsonEncode = function(value, base64_encode){
        if(value === undefined || value === null) return "";
        if(base64_encode === undefined) base64_encode = true;
        try{ value = JSON.stringify(value); }catch(err){}
        if(base64_encode) value = cuppa.base64Encode(value);
        return value;
    };

// Base64 Decode
    cuppa.base64Decode = function(value){ if(!value) return ''; return Base64.decode(value); };

//  Base64 Encode
    cuppa.base64Encode = function(value){ if(!value) return ''; return Base64.encode(value); };

// URL Encode
    cuppa.urlEncode = function(string){ return encodeURIComponent(string); };

// URL Decode
    cuppa.urlDecode = function(string){ string = cuppa.replace(string, " ", "+"); return decodeURIComponent(string); };

/* Number format */
    cuppa.numberFormat = function(number, decimals, dec_point, thousands_sep) {
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
          let k = Math.pow(10, prec);
          return '' + (Math.round(n * k) / k)
            .toFixed(prec);
        };
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
          s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
          if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
          }
          if ((s[1] || '')
            .length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1)
              .join('0');
          }
          return s.join(dec);
    };

// left0
    cuppa.left0 = function(value){
        value = parseFloat(value);
        if(value < 10) value = "0"+ value;
        return value;
    };

// getUUid
    cuppa.uuid = function(){
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    cuppa.getUuid = function(){ return cuppa.uuid(); };

// isUuid
    cuppa.isUuid = function(value){
        if(!value) return false;
        let s = value;
            s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
        if (s === null) { return false; }
        return true;
    };

// htmlEntitiesEncode / htmlEntitiesDecode
    cuppa.htmlEntitiesMap = {
        "'": "&apos;",
        "<": "&lt;",
        ">": "&gt;",
        " ": "&nbsp;",
        "¡": "&iexcl;",
        "¢": "&cent;",
        "£": "&pound;",
        "¤": "&curren;",
        "¥": "&yen;",
        "¦": "&brvbar;",
        "§": "&sect;",
        "¨": "&uml;",
        "©": "&copy;",
        "ª": "&ordf;",
        "«": "&laquo;",
        "¬": "&not;",
        "®": "&reg;",
        "¯": "&macr;",
        "°": "&deg;",
        "±": "&plusmn;",
        "²": "&sup2;",
        "³": "&sup3;",
        "´": "&acute;",
        "µ": "&micro;",
        "¶": "&para;",
        "·": "&middot;",
        "¸": "&cedil;",
        "¹": "&sup1;",
        "º": "&ordm;",
        "»": "&raquo;",
        "¼": "&frac14;",
        "½": "&frac12;",
        "¾": "&frac34;",
        "¿": "&iquest;",
        "À": "&Agrave;",
        "Á": "&Aacute;",
        "Â": "&Acirc;",
        "Ã": "&Atilde;",
        "Ä": "&Auml;",
        "Å": "&Aring;",
        "Æ": "&AElig;",
        "Ç": "&Ccedil;",
        "È": "&Egrave;",
        "É": "&Eacute;",
        "Ê": "&Ecirc;",
        "Ë": "&Euml;",
        "Ì": "&Igrave;",
        "Í": "&Iacute;",
        "Î": "&Icirc;",
        "Ï": "&Iuml;",
        "Ð": "&ETH;",
        "Ñ": "&Ntilde;",
        "Ò": "&Ograve;",
        "Ó": "&Oacute;",
        "Ô": "&Ocirc;",
        "Õ": "&Otilde;",
        "Ö": "&Ouml;",
        "×": "&times;",
        "Ø": "&Oslash;",
        "Ù": "&Ugrave;",
        "Ú": "&Uacute;",
        "Û": "&Ucirc;",
        "Ü": "&Uuml;",
        "Ý": "&Yacute;",
        "Þ": "&THORN;",
        "ß": "&szlig;",
        "à": "&agrave;",
        "á": "&aacute;",
        "â": "&acirc;",
        "ã": "&atilde;",
        "ä": "&auml;",
        "å": "&aring;",
        "æ": "&aelig;",
        "ç": "&ccedil;",
        "è": "&egrave;",
        "é": "&eacute;",
        "ê": "&ecirc;",
        "ë": "&euml;",
        "ì": "&igrave;",
        "í": "&iacute;",
        "î": "&icirc;",
        "ï": "&iuml;",
        "ð": "&eth;",
        "ñ": "&ntilde;",
        "ò": "&ograve;",
        "ó": "&oacute;",
        "ô": "&ocirc;",
        "õ": "&otilde;",
        "ö": "&ouml;",
        "÷": "&divide;",
        "ø": "&oslash;",
        "ù": "&ugrave;",
        "ú": "&uacute;",
        "û": "&ucirc;",
        "ü": "&uuml;",
        "ý": "&yacute;",
        "þ": "&thorn;",
        "ÿ": "&yuml;",
        "Œ": "&OElig;",
        "œ": "&oelig;",
        "Š": "&Scaron;",
        "š": "&scaron;",
        "Ÿ": "&Yuml;",
        "ƒ": "&fnof;",
        "ˆ": "&circ;",
        "˜": "&tilde;",
        "Α": "&Alpha;",
        "Β": "&Beta;",
        "Γ": "&Gamma;",
        "Δ": "&Delta;",
        "Ε": "&Epsilon;",
        "Ζ": "&Zeta;",
        "Η": "&Eta;",
        "Θ": "&Theta;",
        "Ι": "&Iota;",
        "Κ": "&Kappa;",
        "Λ": "&Lambda;",
        "Μ": "&Mu;",
        "Ν": "&Nu;",
        "Ξ": "&Xi;",
        "Ο": "&Omicron;",
        "Π": "&Pi;",
        "Ρ": "&Rho;",
        "Σ": "&Sigma;",
        "Τ": "&Tau;",
        "Υ": "&Upsilon;",
        "Φ": "&Phi;",
        "Χ": "&Chi;",
        "Ψ": "&Psi;",
        "Ω": "&Omega;",
        "α": "&alpha;",
        "β": "&beta;",
        "γ": "&gamma;",
        "δ": "&delta;",
        "ε": "&epsilon;",
        "ζ": "&zeta;",
        "η": "&eta;",
        "θ": "&theta;",
        "ι": "&iota;",
        "κ": "&kappa;",
        "λ": "&lambda;",
        "μ": "&mu;",
        "ν": "&nu;",
        "ξ": "&xi;",
        "ο": "&omicron;",
        "π": "&pi;",
        "ρ": "&rho;",
        "ς": "&sigmaf;",
        "σ": "&sigma;",
        "τ": "&tau;",
        "υ": "&upsilon;",
        "φ": "&phi;",
        "χ": "&chi;",
        "ψ": "&psi;",
        "ω": "&omega;",
        "ϑ": "&thetasym;",
        "ϒ": "&Upsih;",
        "ϖ": "&piv;",
        "–": "&ndash;",
        "—": "&mdash;",
        "‘": "&lsquo;",
        "’": "&rsquo;",
        "‚": "&sbquo;",
        "“": "&ldquo;",
        "”": "&rdquo;",
        "„": "&bdquo;",
        "†": "&dagger;",
        "‡": "&Dagger;",
        "•": "&bull;",
        "…": "&hellip;",
        "‰": "&permil;",
        "′": "&prime;",
        "″": "&Prime;",
        "‹": "&lsaquo;",
        "›": "&rsaquo;",
        "‾": "&oline;",
        "⁄": "&frasl;",
        "€": "&euro;",
        "ℑ": "&image;",
        "℘": "&weierp;",
        "ℜ": "&real;",
        "™": "&trade;",
        "ℵ": "&alefsym;",
        "←": "&larr;",
        "↑": "&uarr;",
        "→": "&rarr;",
        "↓": "&darr;",
        "↔": "&harr;",
        "↵": "&crarr;",
        "⇐": "&lArr;",
        "⇑": "&UArr;",
        "⇒": "&rArr;",
        "⇓": "&dArr;",
        "⇔": "&hArr;",
        "∀": "&forall;",
        "∂": "&part;",
        "∃": "&exist;",
        "∅": "&empty;",
        "∇": "&nabla;",
        "∈": "&isin;",
        "∉": "&notin;",
        "∋": "&ni;",
        "∏": "&prod;",
        "∑": "&sum;",
        "−": "&minus;",
        "∗": "&lowast;",
        "√": "&radic;",
        "∝": "&prop;",
        "∞": "&infin;",
        "∠": "&ang;",
        "∧": "&and;",
        "∨": "&or;",
        "∩": "&cap;",
        "∪": "&cup;",
        "∫": "&int;",
        "∴": "&there4;",
        "∼": "&sim;",
        "≅": "&cong;",
        "≈": "&asymp;",
        "≠": "&ne;",
        "≡": "&equiv;",
        "≤": "&le;",
        "≥": "&ge;",
        "⊂": "&sub;",
        "⊃": "&sup;",
        "⊄": "&nsub;",
        "⊆": "&sube;",
        "⊇": "&supe;",
        "⊕": "&oplus;",
        "⊗": "&otimes;",
        "⊥": "&perp;",
        "⋅": "&sdot;",
        "⌈": "&lceil;",
        "⌉": "&rceil;",
        "⌊": "&lfloor;",
        "⌋": "&rfloor;",
        "⟨": "&lang;",
        "⟩": "&rang;",
        "◊": "&loz;",
        "♠": "&spades;",
        "♣": "&clubs;",
        "♥": "&hearts;",
        "♦": "&diams;"
    };


    cuppa.htmlEntitiesDecode = function(string) {
        let entityMap = cuppa.htmlEntitiesMap;
        for (let key in entityMap) {
            let entity = entityMap[key];
            let regex = new RegExp(entity, 'g');
            string = string.replace(regex, key);
        }
        string = string.replace(/&quot;/g, '"');
        string = string.replace(/&amp;/g, '&');
        return string;
    }

    cuppa.htmlEntitiesEncode = function(string, encodeSpaces = false, trim = false) {
        let entityMap = cuppa.htmlEntitiesMap;
        if(encodeSpaces === false) delete entityMap[" "];
        string = string.replace(/&/g, '&amp;');
        string = string.replace(/"/g, '&quot;');
        for (let key in entityMap) {
            let entity = entityMap[key];
            let regex = new RegExp(key, 'g');
            string = string.replace(regex, entity);
        }
        if(trim) string = cuppa.trim(string);
        return string;
    }
 // global
    cuppa.global = {};

/*  dataCenter
    add and remove data in one place
    Examples:
    cuppa.setData('NEW_CLIENT', {data:{name:"Tufik", age":18}})
    cuppa.getData('NEW_CLIENT', {callback:listener});
*/
    cuppa.dataDefault = {};
    cuppa.data = {};
    cuppa.setData = function(name, opts){
        opts = cuppa.mergeObjects([{storage:'', silence:false, data:null}, opts]);
        if(opts.store != undefined) opts.storage = opts.store;

        if(opts["default"] !== undefined && opts["default"] !== null){
            cuppa.dataDefault[name] = opts["default"];
            opts["default"] = null;
            let current = cuppa.getData(name, opts);
            if(current == null || current == undefined) current = cuppa.dataDefault[name];
            opts.data = current;
            cuppa.setData(name, opts).then();
            return;
        }

        cuppa.data[name] = opts.data;
        if(opts.storage === "local"){
            cuppa.localStorage(name, cuppa.jsonEncode(opts.data, false));
        }else if(opts.storage === "session"){
            cuppa.sessionStorage(name, cuppa.jsonEncode(opts.data, false));
        }else if(opts.storage === "cookie"){
            cuppa.setCookie(name, cuppa.jsonEncode(opts.data, false));
        };

        if(!opts.silence) cuppa.executeListener(name, opts.data);
    };

    cuppa.getData = function(name, opts){
        opts = cuppa.mergeObjects([{storage:'', callback:null, "default":null}, opts]);
        if(opts.store != undefined) opts.storage = opts.store;

        let data = cuppa.data[name];
        if(opts.storage === "local"){
            let ls = cuppa.localStorage(name);
            if(ls) data = cuppa.jsonDecode(ls, false);
        }else if(opts.storage === "session"){
            let st = cuppa.sessionStorage(name);
            if(st) data = cuppa.jsonDecode(st, false);
        }else if(opts.storage === "cookie"){
            let st = cuppa.getCookie(name);
            if(st) data = cuppa.jsonDecode(st, false);
        }

        if(data === undefined){ data = opts["default"]; }

        if(data != undefined && opts.callback){ opts.callback(data); };
        if(opts.callback){ cuppa.addListener(name, opts.callback); };
        return data;
    };

    cuppa.getDataSync = function(name, opts){
        opts = cuppa.mergeObjects([{"default":null}, opts]);
        let data = cuppa.data[name];
        if(data === undefined) data = opts["default"];
        return data;
    };

    cuppa.deleteData = function(name, opts){
        opts = cuppa.mergeObjects([{storage:''}, opts]);
        if(opts.store != undefined) opts.storage = opts.store;
        cuppa.data[name] = null;

        if(opts.storage === "local"){
            localStorage.removeItem(name);
        }else if(opts.storage === "session"){
            sessionStorage.removeItem(name);
        }else if(opts.storage === "cookie"){
            cuppa.deleteCookie(name);
        };
    };

// add / remove / execute global listeners
    cuppa.listeners = {};
    cuppa.addListener = function(name, callback){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        cuppa.listeners[name].push(callback);
    };
    cuppa.removeListener = function(name, callback, toString){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        let array = cuppa.listeners[name];
        for(let i = 0 ; i < array.length; i++ ){
            if(toString){
                if(array[i].toString() === callback.toString()){
                    array.splice(i, 1);
                };
            }else{
                if(array[i] === callback){
                    array.splice(i, 1);
                };
            }
        };
    };
    cuppa.removeListenerGroup = function(name){
        delete cuppa.listeners[name];
    };
    cuppa.executeListener = function(name, data){
        if(!cuppa.listeners[name]) cuppa.listeners[name] = [];
        let array = cuppa.listeners[name];
        for(let i = 0 ; i < array.length; i++ ){
            array[i](data);
        };
    };

/* Make Object Available to Dispach Event
    cuppa.dispatchEvents(element); // add methods to manage the dispachers.
    // dispache an event
        element.dispatchEvent({ type: "MY_EVENT", message: "My Message" });
*/
    cuppa.dispatchEvents = function(element){
        if(element && !element.dispatchEvent){ Object.assign(element, EventDispatcher.prototype); };
    }; cuppa.dispatchEvents(cuppa);

/* on / off
    EventManager, Estructure
    cuppa.eventGroups =	{ 'groupName':  Map<Element>:[{event:String, callback:Function}, {event:String, callback:Function}, ]
                                        Map<Element>:[{event:String, callback:Function}, {event:String, callback:Function}, ]
*/
    cuppa.eventGroups = [];

    // Add Event listener
        cuppa.on = function(elements, event, callback, groupName, useCapture) {
            if(!elements) return;
            if(event === "removed") event = "DOMNodeRemoved";
            elements = cuppa.element(elements);
            cuppa.off(elements, event, callback, groupName); // prevent duplicate events
            if(!groupName) groupName = "default";
            if(useCapture === undefined) useCapture = false;

            if(!cuppa.eventGroups[groupName]) cuppa.eventGroups[groupName] = new Map();
            for(let i = 0; i < elements.length; i++){
                let element = elements[i];
                if(!element) continue;
                if(element.addEventListener) element.addEventListener(event, callback, useCapture);
                let events = cuppa.eventGroups[groupName].get(element);
                if(!events) events = [];
                events.push({event:event, callback:callback});
                cuppa.eventGroups[groupName].set(element, events);
            }
        };

    // Remove a single event
        cuppa.off = function(elements, event, callback, groupName){
            elements = cuppa.element(elements);
            if(!groupName) groupName = "default";
            if(!cuppa.eventGroups[groupName]) return;
            if(!elements) return;
            if(event === "removed") event = "DOMNodeRemoved";
            for(let i = 0; i < elements.length; i++){
                let events = cuppa.eventGroups[groupName].get(elements[i]);
                if(!events) break;
                for(let j = events.length-1; j >= 0; j--){
                    if(callback){
                        if(events[j].event === event && events[j].callback === callback ){
                            elements[i].removeEventListener(events[j].event, events[j].callback);
                            events.splice(j, 1);
                            break;
                        };
                    }else{
                        if(events[j].event === event ){
                            elements[i].removeEventListener(events[j].event, events[j].callback);
                            events.splice(j, 1);
                        };
                    };
                };
                cuppa.eventGroups[groupName].set(elements[i], events);
            };
        };

    // Remove event by Group
        cuppa.offGroup = function(groupName){
            if(!groupName) groupName = "default";
            let map = cuppa.eventGroups[groupName];
            if(!map) return;
            map.forEach(function(events, element) {
                for(let i = 0; i < events.length; i++){
                    element.removeEventListener(events[i].event, events[i].callback);
                };
            });
            map["delete"](groupName);
        };

/* Add to array and remove duplicate
* */
    cuppa.addToArray = function(array, value, removeDuplicates){
        if(!array) return;
        if(value == undefined || value == null) return;
        if(removeDuplicates == undefined) removeDuplicates = true;
        array.push(value);
        if(removeDuplicates) array = cuppa.removeDuplicate(array);
        return array;
    }

/* Remove in array
* */
    cuppa.removeInArray = function(array, value){
        if(!array) return;
        if(value == undefined || value == null) return;
        while (array.indexOf(value) > -1) {
            array.splice(array.indexOf(value), 1);
        }
        return array;
    }

/*  Remove duplicate in Array
    array: cuppa.removeDuplicate(array)
*/
    cuppa.removeDuplicate = function(array, key, useSet){
        if(useSet){
            let setData = new Set(array);
            array = [...setData];
        }else if(!key){
            array = array.filter((thing, index) => {
                return index === array.findIndex(obj => {
                    return JSON.stringify(obj) === JSON.stringify(thing);
                });
            });
        }else{
            let map = cuppa.arrayToMap(array, key);
            array = cuppa.mapToArray(map);
        }
        return array;
    }

/* Clone object */
    cuppa.cloneObject = function(object, useJSON){
        if(useJSON === undefined) useJSON = true;
        let object2;
        if(useJSON) object2 = JSON.parse(JSON.stringify(object));
        else object2 = Object.assign({}, object);
        return object2;
    };

/* Update Object Deep
    this method update automatically any value in the state no mather how deep is it. so instead do something like this
        let form = this.state.form;
            form.path1.path2 = 'Data';
        this.setState({form});
     You can do it
        cuppa.setState(this, `form.path1.path2`, 'Data');
*/
    cuppa.updateObject = function(ref, path, value){
        if(!ref) ref = {};
        if(!path) return null;
        path = cuppa.trim(path).split(".");
        let i;
        let obj = ref;
        for (i = 0; i < path.length - 1; i++){
            if(!obj[path[i]]) obj[path[i]] = { };
            obj = obj[path[i]];
        }
        try{ obj[path[i]] = value; }catch(err){ }
        return ref;
    };

// ObjectToURL
    cuppa.objectToURL = function(object, encode){
        if(encode === undefined) encode = true;
        let str = "";
        for(let key in object) {
            str += "&";
            if(object[key]){
                if(encode) str += key + "=" + encodeURIComponent(object[key]);
                else str += key + "=" + object[key];
            }else{
                str += key;
            }
        };
        return str;
    };

// object Length
    cuppa.objectLength = function(object){
        return Object.keys(object).length;
    };

// clone Array
    cuppa.cloneArray = function(array){
        return array.slice(0);
    };
    cuppa.arrayClone = function(array){ return cuppa.cloneArray(array); };

// arrayToMap
    cuppa.arrayToMap = function(array, value, opts){
        if(!array) return {};
        opts = cuppa.mergeObjects([{lowerCase:false}, opts]);
        let map = {};
        for(let i = 0; i < array.length; i++){
            if(!value){
                map[array[i]] = array[i];
            }else{
                let key = array[i][value];
                if(opts.lowerCase) key = key.toLowerCase();
                map[key] = array[i];
            }
        }
        return map;
    };

// mapToArray
    cuppa.mapToArray = function(map){
        let array = [];
        Object.keys(map).map(key=>{ array.push(map[key]); })
        return array;
    }

/* Get value of string with URLFormat
    Example: &var1=mi_var1&var2=mi_var2&var3=mi_var3
            cuppa.urlValue('var2')
            return mi_var2
*/
	cuppa.urlValue = function(name, url){
        if(!url) url = cuppa.getPath();
        /* new way
            let url = new URL(url);
            let value = url.searchParams.get(name);
            return value;
        */
		let regexS = "[\\?&]"+name+"=([^&#]*)";
		let regex = new RegExp(regexS,"i");
		let tmpURL = url;
        let result = regex.exec(tmpURL);
        if(result == null) return "";
            result = result[1];
            result = cuppa.replace(result, "%20", " ");
            result = cuppa.replace(result, "\\+", " ");
		return result;
    };

/* Sort Object ASC or DESC */
    cuppa.sortObject = function(object, reverse){
        let keys = Object.keys(object);
        keys.sort();
        if(reverse) keys.reverse();
        let tmpObject = {}
        for(let i = 0; i < keys.length; i++){
            tmpObject[keys[i]] = object[keys[i]];
        };
       return tmpObject;
    };

/* is Mobile */
    cuppa.isMobile = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

// Touch support
    cuppa.isTouch = cuppa.touchSupport = function() {
        if ('ontouchstart' in document.documentElement) { return true; }else{ return false; }
    };

/* flash support */
    cuppa.flashSupport = function(){
        let hasFlash = false;
        try {
            let fo = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
            if (fo) { hasFlash = true; }
        } catch (e) {
            if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                hasFlash = true;
            };
        };
        return hasFlash;
    };

/* join an array / object in a string */
    cuppa.join = function(item, glue){
        if(glue == undefined) glue = ",";
        let string = "";
        let arr = Object.keys(item).map(function (key) { return item[key]; });
            arr.forEach(function(item, index){
                if(index) string += glue;
                string += item;
            });
        return string;
    };

/* parseString */
    cuppa.parseString = function(value){
        if(!value) return "";
        else return String(value);
    };

/* parseInt */
    cuppa.parseInt = function(string){
        if(isNaN(string) || !string) return 0;
        else if(string === true || string === "true") return 1;
        else if(string === false || string === "false") return 0;
        else return parseInt(string);
    };

/* parseFloat */
    cuppa.toNumber = function(string){
        if(isNaN(string) || !string) return 0;
        else if(string === true || string === "true") return 1;
        else if(string === false || string === "false") return 0;
        else return parseFloat(string);
    };
    cuppa.parseFloat = function(string){ return cuppa.toNumber(string); }

/* isNumber */
    cuppa.isNaN = function(value){
        return isNaN(parseFloat(value));
    };

// tooptip
    cuppa.tooltip = function(elements, opts){
        this.opts = cuppa.mergeObjects([{class:"a-r-t", style:""}, opts]);
        this.elements = elements || ".cu-tooltip";
        this.elements = cuppa.element(this.elements);

        // mouseenter
        this.mouseenter = function(e){
            let element = e.currentTarget;
            let tooltip = cuppa.newElement(`<div class='tooltip-message'></div>`);
                tooltip.innerHTML = cuppa.attr(element, "tooltip");
                let classes = cuppa.attr(element,"tooltip-class") || this.opts.class;
                    cuppa.addClass(tooltip, classes);
                let style = cuppa.attr(element,"tooltip-style") || this.opts.style;
                    cuppa.attr(tooltip, "style", style);
                element.tooltipElement = tooltip;
            cuppa.append(tooltip, element);
        }.bind(this);

        // mouseleave
        this.mouseleave = function(e){
            let element = e.currentTarget;
            cuppa.remove(element.tooltipElement);
        }.bind(this);

        for(let i = 0; i < this.elements.length; i++){
            let element = this.elements[i];
            if(element.cuTooltip) continue;
            element.cuTooltip = this;
            cuppa.on(element, "mouseenter", this.mouseenter);
            cuppa.on(element, "mouseleave", this.mouseleave);
        };
    };

// css
    /* Set / Get
        set
            element = element || array of elements
        get
            element = element
            opts = {}
            opts.number = false; // true: force to return number
    */
    cuppa.css = function(elements, property, opts){
        if(!elements) return;
        elements = cuppa.element(elements);
        for(let k = 0; k < elements.length; k++){
            let element = elements[k];
            if(typeof(property) == "object"){
                if(!Array.isArray(element)) element = [element];
                for(let i = 0; i < element.length; i++){
                    for (let css in property) {
                        let value = property[css];
                        let priority = "";
                        if(value){
                            value = String(value);
                            if(value.indexOf("!important") != -1){
                                priority = "important";
                                value = value.replace("!important", "");
                            };
                            element[i].style.setProperty( cuppa.trim(css), cuppa.trim(value), priority);
                        };
                    };
                };
            }else{
                // opts default
                    opts = opts || {};
                    opts.number = opts.number || false;
                // get value
                    let value;
                    try{
                        let style = window.getComputedStyle(element);
                        value = style.getPropertyValue(property);
                        if(opts.number) value = parseFloat(value) || 0;
                    }catch(err){ value = null; };
                return value;
            };
        };
    };

/* sumCss */
    cuppa.cssSum = function(elements, property, includeMargin){
        if(includeMargin == undefined) includeMargin = true;
        elements = cuppa.element(elements);
        let result = 0;
        for(let i = 0; i < elements.length; i++){
            let element = elements[i];
            if(property == "height" || property == "width"){
                let dim = cuppa.dim(element);
                if(includeMargin) result += dim[property+"4"];
                else result += dim[property];
            }else{
                result += cuppa.css(element, property, {number:true});
            }
        };
        return result;
    };

/* maxIndex */
    cuppa.maxZIndex = function(allElements){
        let zIndex = 1;
        let childs;
        if(allElements == undefined) allElements = true;
        if(allElements) childs = cuppa.element("*");
        for(let i = 0; i <  childs.length; i++){
            let child = childs[i];
            let style = getComputedStyle(child);
            let zIndexTemp = cuppa.parseFloat(style.zIndex);
            if(zIndexTemp > zIndex) zIndex = zIndexTemp;
        }
        return zIndex;
    };

/* blur */
    cuppa.blur = function(){
        if (document.activeElement != document.body) document.activeElement.blur();
        cuppa.unselect();
    };

// focus
    cuppa.focus = function(element){ element.focus(); };

/* unselect */
    cuppa.unselect = function(){
        if (document.selection) {
            document.selection.empty();
        }else if( window.getSelection) {
            window.getSelection().removeAllRanges();
        };
    };

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

// mergeArray, create a new array with the values all array passed.
    cuppa.mergeArrays = function(arrays){
        let result = [];
        for(let i = 0; i < arrays.length; i++){
            if(arrays[i]){
                result = result.concat(arrays[i]);
            };
        };
        return result;
    }; cuppa.joinArrays = function(arrays){ return cuppa.mergeArrays(arrays); };

// objectArrayToArray
    cuppa.objectArrayToArray = function(object){
        if(!object) object = {};
        let array = [];
        let keys = Object.keys(object);
        for(let i = 0; i < keys.length; i++){
            array.push(object[keys[i]]);
        }
        return array;
    }

// arrayObjectSort
cuppa.arrayObjectSort = function(data, key, orderBy, type){
    if(!data) return [];
    if(!orderBy) orderBy = "ASC";
    let result = data.sort((a, b)=>{
        if(!a[key]) return 1;
        else if(orderBy.toUpperCase() == "ASC" ){
            if(type == "string") return ( a[key].toLowerCase() > b[key].toLowerCase() ) ? 1 : -1;
            if(type == "date") return ( new Date(a[key]) > new Date(b[key]) ) ? 1 : -1;
            return (a[key] > b[key]) ? 1 : -1;
        }else{
            if(type == "string") return (a[key].toLowerCase() < b[key].toLowerCase()) ? 1 : -1;
            if(type == "date") return ( new Date(a[key]) < new Date(b[key]) ) ? 1 : -1;
            return (a[key] < b[key]) ? 1 : -1
        };
    } );
    return result;
};

// arrayObjectSortPriority
    cuppa.arrayObjectSortPriority = function(data, key, priorityArray, caseSensitive){
        if(!data) return [];
        if(!priorityArray) return data;
        if(!caseSensitive) caseSensitive = true;
        let result = [];
        priorityArray.map(priority=>{
            result = [ ...result,...data.filter(item=>{
                let value = item[key] || "";
                if(caseSensitive && typeof value == "string" && typeof priority == "string") return value.toUpperCase() == priority.toUpperCase();
                return value == priority;
            })]
        })

        result = [...result, ...data.filter(item=>{
            return priorityArray.findIndex(priority=>{
                let value = item[key] || "";
                if(caseSensitive && typeof value == "string" && typeof priority == "string") return value.toUpperCase() == priority.toUpperCase();
                return value == priority;
            }) == -1
        })]

        return result;
    };

/* Set Cookie, By default, the cookie is deleted when the browser is closed */
	cuppa.setCookie = function(name, value, exdays) {
	   if(exdays){
            let exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
            let value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
            document.cookie = name + "=" + value + ";path=/";
        }else{
            document.cookie = name + "=" + value + ";path=/";
        }
    };

/* Get Cookie */
    cuppa.getCookie = function(name, documentRef) {
        if(documentRef == undefined) documentRef = document;
        let results = documentRef.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
        if ( results ) return ( unescape ( results[2] ) );
        else return null;
    };

/* Delete Cookie*/
    cuppa.deleteCookie = function(name){
        document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

 // local / session storage
    cuppa.sessionStorage = function(name, value, cookie){
        if(cookie == undefined) cookie = false;
        if(value == undefined){
            return sessionStorage.getItem(name);
        }else{
            sessionStorage.setItem(name, value);
            if(cookie) cuppa.setCookie(name, value);
        };
    };

    cuppa.localStorage = function(name, value, cookie){
        if(cookie == undefined) cookie = false;
        if(value == undefined){
            return localStorage.getItem(name);
        }else{
            localStorage.setItem(name, value);
            if(cookie) cuppa.setCookie(name, value);
        };
    };

/* getValue
    Example: cuppa.getValue(this.data, `categories.10.name`)
* */
    cuppa.getValue = function(data, path, defaultValue){
        if(!data) return defaultValue;
        if(data && !path) return data;
        path = cuppa.trim(path).split(".");
        let element = data;
        for(let i = 0; i < path.length; i++){
            try{ element = element[path[i]]; }catch(err){ element = ""; break; }
        }
        if(element){ let tmp = JSON.stringify(element); if(tmp == "{}" || tmp == "[]" || tmp == undefined || tmp == null) element = ""; }
        if((element === "" || element === null || element === undefined) && defaultValue != undefined) element = defaultValue;
        return element;
    };
    cuppa.value = function(data, path, defaultValue){ return cuppa.getValue(data, path, defaultValue); };
    var val = function(data, path, defaultValue){ return cuppa.getValue(data, path, defaultValue); };

/* Config URL Friendly HTML5
    setParams params: { path:string, title:string, data:object }
 */
    cuppa.URLHash = '';
    cuppa.URLBase = '';
    cuppa.getPath = function(returnArray, opts){
        opts = cuppa.mergeObjects([{removeBase:true}, opts]);
        if(typeof document == "undefined") return;
        let basePath = document.querySelector("base");
        let path = window.location.href;
        if(basePath && basePath.getAttribute("href") != "/" && opts.removeBase) path = cuppa.replace(path, basePath.getAttribute("href"), "");
        if(cuppa.URLBase) path = cuppa.replace(path, cuppa.URLBase, "");
        path = cuppa.replace(path,"//","");
        path = cuppa.replace(path,"https:","");
        path = cuppa.replace(path,"http:","");
        if(!basePath && !cuppa.URLBase){
            try{ path = path.substr(path.indexOf("/")+1); }catch(err){ }
        }
        if(returnArray) path = path.split("/");
        return path;
    };

    cuppa.setPath = function(path, title, callback){
        if(title == undefined) title = "";
        if(path == undefined || path == "") path = " ";
        else path = cuppa.URLHash+path;
        window.history.pushState(path, title, path);
        if(callback) callback();
    };

    cuppa.back = function(){
        window.history.back();
    };

    cuppa.forward = function(){
        window.history.forward();
    };

    cuppa.getPathData = function(path, opts){
        if(!path) path = cuppa.getPath();
        path = cuppa.replace(path, cuppa.URLHash, "");
        opts = cuppa.mergeObjects([{removeFirst:false}, opts]);
        let obj = {url:path};
        // get base
            let base = path;
                base = cuppa.replace(base, "#/", ""); base = cuppa.replace(base, "#", "");
            if(base.indexOf("?") != -1) base = base.substr(0, base.indexOf("?"));
            obj.base = base;
            obj.baseArray = base.split("/");
            obj.baseArray = obj.baseArray.filter(item=>item);
            // remove first
                if(opts.removeFirst){
                    obj.baseArray.shift();
                    obj.base = obj.baseArray.join("/");
                }
        // domain
            obj.domain = cuppa.replace(obj.base,"https://","");
            obj.domain = cuppa.replace(obj.domain,"http://","");
            obj.domain = obj.domain.substr(0, obj.domain.indexOf("/"));
        // protocol
            obj.protocol = "http";
            if(path.indexOf("https://") != -1) obj.protocol = "https";
        // get data
            let dataStr = path;
            if(dataStr.indexOf("?") != -1 || dataStr.indexOf("#") != -1){
                if(dataStr.indexOf("?") != -1) dataStr = dataStr.substr(path.indexOf("?")+1);
                if(dataStr.indexOf("#") != -1) dataStr = dataStr.substr(path.indexOf("#")+1);
                let dataArray = dataStr.split("&");
                let data = {};
                for(let i = 0; i < dataArray.length; i++){
                    let parts = dataArray[i].split("=");
                    if(parts[0]) data[parts[0]] = parts[1] || '';
                };
                obj.data = data;
            }else{ obj.data = {}; };
        return obj;
    };
    cuppa.pathData = function(path, opts){ return cuppa.getPathData(path, opts); };

/* extractArray
    opts:{
        noValueBehaviour:end, remove
    }
*/
    cuppa.extractArray = function(arrayData, column, opts){
        opts = cuppa.mergeObjects([{removeDuplicates:true, orderBy:"ASC", noValueBehaviour:'end'}, opts]);
        let result = arrayData.map(row=>row[column]);
        if(opts.removeDuplicates) result = Array.from(new Set(result));
        if(opts.orderBy.toLowerCase() == "asc") result = result.sort();
        if(opts.orderBy.toLowerCase() == "desc"){ result = result.sort(); result = result.reverse(); }
        if(opts.noValueBehaviour){
            let index = result.indexOf("");
            if(index != -1 && opts.noValueBehaviour == "end"){
                result.splice(index,1);
                result.push("");
            }else if(index != -1 && opts.noValueBehaviour == "remove"){
                result.splice(index,1);
            }
        }
        return result;
    }

/* sumArray */
    cuppa.sumArray = function(data){
        let total = 0;
        for(let i = 0; i < data.length; i++){ total += parseFloat(data[i]); }
        return total;
    };

// part of Number
    cuppa.numberParts = function(number){
        let parts = String(number).split(".");
        parts[0] = (parts[0]) ? parseFloat(parts[0]): 0;
        parts[1] = (parts[1]) ? parseFloat("."+parts[1]): 0;
        return parts;
    };

/* cuppa filter
    Examples:
        let filter = cuppa.filterArray(users, {condArray:[`name LIKE Foo`, `name LIKE Bar`]);
        let filter = cuppa.filterArray(users, {condArray:[`name LIKE Foo`, `name LIKE Bar`], type:"OR", caseSensitive:false});
        let filter = cuppa.filterArray(users, {condArray:[`name LIKE Foo`, `age == 18`], type:"AND", caseSensitive:false});
 */
    cuppa.filterArray = function(array, opts){
        opts = cuppa.mergeObjects([{condArray:null, type:"OR"}, opts]);
        if(!array) array = [];
        let result = [];
        for(let i = 0; i < array.length; i++){
            let row = array[i];
            let valid = false;
            if(opts.condArray){
                for(let j = 0; j < opts.condArray.length; j++) {
                    valid = cuppa.filterArrayValidate(row, opts.condArray[j]);
                    if(valid) break;
                }
            }
            if(valid) result.push(row);
        }
        return result;
    };

        cuppa.filterArrayValidate = function(row, condStr, opts){
            opts = cuppa.mergeObjects([{caseSensitive:true}, opts]);
            let condParts;
            let cond = {};

            if(condStr.indexOf(">=") != -1){ condParts = condStr.split(">="); cond.condition = ">="; }
            else if(condStr.indexOf("<=") != -1){ condParts = condStr.split("<="); cond.condition = "<="; }
            else if(condStr.indexOf("==") != -1){ condParts = condStr.split("=="); cond.condition = "=="; }
            else if(condStr.indexOf("like") != -1){ condParts = condStr.split("like"); cond.condition = "like"; }
            else if(condStr.indexOf("LIKE") != -1){ condParts = condStr.split("LIKE"); cond.condition = "LIKE"; }

            cond.column = cuppa.trim(condParts[0]);
            cond.value = row[cond.column] || "";
            cond.compareWith = cuppa.trim(condParts[1]);

            if(opts.caseSensitive){ cond.value = cond.value.toLowerCase(); cond.compareWith = cond.compareWith.toLowerCase(); }

            if(cond.condition == ">="){
                if(cond.value >= cond.compareWith) return true;
            }else if(cond.condition == "<="){
                if(cond.value  <= cond.compareWith) return true;
            }else if(cond.condition == "=="){
                if(cond.value == cond.compareWith) return true;
            }else if(cond.condition.toLowerCase() == "like"){
                if(cuppa.likeString(cond.value, cond.compareWith)) return true;
            }
            return false;
        }

/* timer
    timer = new timer(opts);
    opts = { hours:0, minutes:0, seconds:0, callback:function(timer){} }
*/
    cuppa.timer = function(opts){
        this.opts = opts || {};
        this.hours = opts.hours || 0;
        this.minutes = opts.minutes || 0;
        this.seconds = opts.seconds || 0;
        this.running = false;
        this.interval = null;
        this.calculate = function(){
            this.seconds += 1;
            if(this.seconds == 60){
                this.seconds = 0;
                this.minutes +=1;
            }
            if (this.minutes == 60) {
                this.seconds = 0;
                this.minutes = 0;
                this.hours += 1;
            }
            if(this.opts.callback) this.opts.callback(this);
        }.bind(this);

        this.start = function(reset){
            this.destroy();
            if(reset) this.reset();
            this.interval = setInterval(this.calculate, 1000);
            this.running = true;
            if(this.opts.callback) this.opts.callback(this);
        }.bind(this);

        this.stop = function(reset){
            this.destroy();
            if(reset) this.reset();
            this.running = false;
        }.bind(this);

        this.reset = function(){
            this.hours = 0; this.minutes = 0; this.seconds = 0;
        }.bind(this);

        this.getSeconds = function(){
            return ((this.hours*60*60)+(this.minutes*60)+this.seconds);
        }.bind(this);

        this.destroy = function(){
            if(this.interval){ clearInterval(this.interval); this.interval = null; };
        }.bind(this);
    };

/* sizeFormat */
    cuppa.sizeFormat = function(bytes, si){
        if(si === undefined) si = true;
        let thresh = si ? 1000 : 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        let units = si
            ? ['KB','MB','GB','TB','PB','EB','ZB','YB']
            : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
        let u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1)+' '+units[u];
    }

/* copy
    element = html node, input, textarea
*/
    cuppa.copy = function(element, opts){
        opts = cuppa.mergeObjects([{success:null, error:null, alert:false, innerHTML:false}, opts]);
        if(opts.callback) opts.success = opts.callback;
        element = cuppa.element(element)[0];
        if(cuppa.elementType(element) != "textarea" && cuppa.elementType(element) != "input"){
            let textArea;
            if(opts.innerHTML) textArea = cuppa.newElement("<textarea style='position:absolute; top:0; left:0; width:0; height:0; opacity:0'>"+element.innerHTML+"</textarea>");
            else  textArea = cuppa.newElement("<textarea style='position:absolute; top:0; left:0; width:0; height:0; opacity:0'>"+element.outerHTML+"</textarea>");
                cuppa.append(textArea, document.body);
                textArea.select();
                try { document.execCommand('copy'); if(opts.success) opts.success(); }catch(err){ if(opts.error) opts.error(); }
                cuppa.remove(textArea);
        }else{
            let textArea = cuppa.newElement("<textarea style='position:absolute; top:0; left:0; width:0; height:0; opacity:0'>"+element.value+"</textarea>");
                cuppa.append(textArea, document.body);
                textArea.select();
                try { document.execCommand('copy'); if(opts.success) opts.success(); }catch(err){ if(opts.error) opts.error(); }
                cuppa.remove(textArea);
        };
        if(opts.alert) alert(opts.alert);
    }.bind(this);

// selectText
    cuppa.selectText = function(element, start, end){
        start = start || 0;
        end = end || element.value.length;
        element.setSelectionRange(start, end);
    };

/* tabs
    <div id="tab1" class="tab" tab-content="#tabContent1" >Tab1</div>
    <div id="tab2" class="tab" tab-content="#tabContent2" >Tab2</div>
    new cuppa.tabs(this.html.querySelectorAll(".tab"), {height:true});
* */
    cuppa.tabs = function(elements, opts){
        this.elements = cuppa.element(elements);
        this.elementContents = [];
        this.opts = cuppa.mergeObjects([{display:"block", height:false}, opts]);

        this.hide = function(elements){
            if(!elements) elements = this.elementContents;

            if(this.opts.height) cuppa.css(elements, {height:"0px"});
            else cuppa.hide(elements, {duration:0});
        }.bind(this);

        this.show = function(e){
            if(e.currentTarget) e = e.currentTarget;
            this.hide();
            cuppa.removeClass(this.elements, "selected");
            cuppa.addClass(e, "selected");
            if(this.opts.height) cuppa.css(e.tabContent, {height:"auto"});
            else cuppa.show(e.tabContent, {duration:0});
        }.bind(this);

        // process
            this.elements.forEach(function(item, index){
                // get tab content
                    let tabContent = cuppa.attr(item, "tab-content");
                        tabContent = cuppa.element(tabContent)[0];
                    this.elementContents.push(tabContent);
                    item.tabContent = tabContent;
                // hide tab
                    this.hide();
            }.bind(this));
        // init
            this.show(this.elements[0]);
            cuppa.on(this.elements, "click", this.show);
    };

/* language */
    cuppa.lang = function(){ return (document.documentElement.lang || "").toLowerCase(); };
    cuppa.language = function(){ return cuppa.lang(); }
    cuppa.currentLanguage = function(){ return cuppa.lang(); }

/* accordion
    example: new cuppa.accordion('.content', '.btn', {ease:Cubic.easeInOut})
*/
    cuppa.accordion = function(element, btn , opts){
        this.element = cuppa.element(element)[0];
        this.btn = cuppa.element(btn)[0];
        this.opts = cuppa.mergeObjects([{init:"collapsed", callback:null, ease:null}, opts]);
        this.childContent = cuppa.childrens(this.element)[0];
        if(this.opts.init == "collapsed") cuppa.css(this.element, {height:"0px"});
        this.element.accordion = this.btn.accordion = this;
        this.open = function(value){
            let dim = cuppa.dim(this.element);
            if(value.currentTarget || value == undefined){
                if(!dim.height) value = true;
                else value = false;
            };
            let dim2 = cuppa.dim(this.childContent );
            window.TweenMax.killTweensOf([this.element, this.btn]);
            if(value){
                let tl = new window.TimelineMax();
                    tl.add(function(){ cuppa.addClass([this.element, this.btn], "open") }.bind(this));
                    tl.to(this.element, 0.4, {height:dim2.height, ease:this.opts.ease});
                    tl.set(this.element, {height:"auto"});
            }else{
                let tl = new window.TimelineMax();
                    tl.set(this.element, {height:dim2.height});
                    tl.to(this.element, 0.4, {height:0, ease:this.opts.ease});
                    tl.add(function(){ cuppa.removeClass([this.element, this.btn], "open") }.bind(this));
            };
            if(this.opts.callback) this.opts.callback(this.btn);
        }.bind(this);
        this.isOpen = function(){
            return cuppa.hasClass(this.btn, "open");
        }.bind(this);
        cuppa.on(this.btn, "click", this.open);
    };

/* cuppa.ip */
    cuppa.ip = async function(){
        let result = "";
        try{
            let data = await fetch(`//www.cloudflare.com/cdn-cgi/trace`);
                data = await data.text();
            result = data.match(new RegExp('ip=.*'))[0];
            result = cuppa.replace(result,"ip=", "").trim()
        }catch(err){ log(err) }
        return result;
    }

/* browser
     cuppa.browser() // return edge
*/
    cuppa.browser = function() {
        return cuppa.OS();
    };

// cuppa OS
    cuppa.OS = function(){
        let unknown = '-';

        // screen
        let screen = document.defaultView.screen;
        let screenSize = {};
        if (screen.width) {
            screenSize.width = (screen.width) ? screen.width : '';
            screenSize.height = (screen.height) ? screen.height : '';
        }

        // browser
        let nVer = navigator.appVersion;
        let nAgt = navigator.userAgent;
        let browser = navigator.appName;
        let version = '' + parseFloat(navigator.appVersion);
        let majorVersion = parseInt(navigator.appVersion, 10);
        let nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Legacy Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Legacy Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // Edge (Chromium)
        else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        let mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        let cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        let os = unknown;
        let clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Chrome OS', r:/CrOS/},
            {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (let id in clientStrings) {
            let cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        let osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS':
            case 'Mac OS X':
            case 'Android':
                osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        return {
            screenSize: screenSize,
            browserSize: {width:cuppa.width(), height:cuppa.height()},
            browser: browser,
            browserVersion: version,
            browserMajorVersion: majorVersion,
            mobile: mobile,
            os: os,
            osVersion: osVersion,
            cookies: cookieEnabled
        };
    };

// Shake
    cuppa.shake = function(element, gsap){
        gsap.to(element, {duration:0.1, x:10});
        gsap.to(element, {duration:0.1, delay:0.1, x:-10});
        gsap.to(element, {duration:0.1, delay:0.2, x:0});
    };

// isJson
    cuppa.isJson = function(item) {
        try { item = JSON.parse(item); } catch (e) { item = null; }
        if(item !== null) return true;
        return false;
    };
// isBase64
    cuppa.isBase64 = function(string){
        if(!string || string == "true" || string == true) return false;
        let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        return base64regex.test(string);
    }

/* isImage */
    cuppa.isImage = function(fileName, extensionsAllowed){
        if(!extensionsAllowed) extensionsAllowed = ['jpeg', 'jpg', 'png', 'bmp', 'gif', 'tif', 'heic', 'raw', 'webp', 'exif', 'svg', 'cgm', 'ppm', 'pgm', 'pbm','pnm','bat', 'ico'];
        let fileDesc = cuppa.fileDescription(fileName);
        if(extensionsAllowed.indexOf(fileDesc.extension.toLowerCase()) != -1) return true;
        return false;
    }

/* Boolean */
    cuppa.boolean = function(value){
        let result = value;
        if(value === "true") result = true;
        else if(result === "false" || result === 0 || result === "0" || result === undefined) result = false;
        return result;
    }

/* ajax
    opts{
        data:Object
        method:"POST" // GET
        async: true // true,false
        header:{key:value, key:value}
        onError:callback
    }
*/
    cuppa.ajax = function(url, opts, callback){
        // opts
        opts = opts || { };
        opts.method = (opts.method) ? opts.method.toUpperCase() : "POST";
        if(opts.async == undefined) opts.async = true;
        let request = new XMLHttpRequest();
        request.open(opts.method, url, opts.async);
        //++ add header
            if(opts.headers) opts.header = opts.headers;
            if(!opts.header) opts.header = {};
            if(!opts.header["Content-Type"]) request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            if(opts.header){
                for (let key in opts.header) {
                    request.setRequestHeader(key, opts.header[key]);
                };
            };
        //--
        request.addEventListener("load", onComplete);
        request.addEventListener("error", onError);
        if(opts.data && opts.header["Content-Type"] == "application/json") request.send(JSON.stringify(opts.data));
        else if(opts.data) request.send(cuppa.objectToURL(opts.data));
        else request.send();
        // onComplete
        function onComplete () {
            let result = this.responseText;
            if(opts.callback) opts.callback(result, this);
            if(callback) callback(result, this);
        };
        // onError
        function onError(e){
            if(opts.onError) opts.onError(e);
        };
        return request;
    };

/* cuppa.sticky
    Example: cuppa.sticky(".sticky", {fixedElements:".breakout-header, .fixed-white"});
*/
    cuppa.sticky = function(container, opts){
        cuppa.loaded( (e) => {
            container = document.querySelector(container);
            opts = {...{className:"sticky-on", scrollOffset:1, fixedElements:null}, ...opts}
            if(opts.fixedElements) opts.fixedElements = document.querySelectorAll(opts.fixedElements);
            cuppa.scroll(()=>{
                let pos = cuppa.scrollPosition(container);
                if(pos.y >= opts.scrollOffset){
                    cuppa.addClass(container, opts.className);
                    if(opts.fixedElements) cuppa.css(opts.fixedElements, {top:`${pos.y}px`});
                }else{
                    cuppa.removeClass(container, opts.className);
                    if(opts.fixedElements) cuppa.css(opts.fixedElements, {top:`0px`});
                }

            }, container);
        })
    }

/* wait */
    cuppa.wait = async function(time){
        if(time === undefined || time === null) time = 1000;
        let result = await new Promise((resolve)=>{ setTimeout(()=>{ resolve(true) }, time); });
        return result;
    };
    var wait = function(time){ return cuppa.wait(time); };


// scrollPosition
    cuppa.scrollPosition = function(element){
        let pos = {x:0, y:0}
        if(!element || element == "body" || cuppa.elementType(element) == "body" || element == window){
            pos.x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
            pos.y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        }else{
            pos.x = element.scrollLeft;
            pos.y = element.scrollTop;
        };
        return pos;
    };

/* scroll */
    cuppa.scroll = function(callback, element){
        if(!element || element == "body") element = window;
        if(document && element == document.body) element = window;
        element.addEventListener('scroll', callback);
    };
 /* Get percent betwen 2 range */
    cuppa.percent = function(n, min, max, invert){
        let percent = (n-min)/(max-min);
        if(percent < 0) percent = 0;
        else if(percent > 1) percent = 1;
        if(invert) percent = 1-percent;
        return percent
    };

/* random */
    cuppa.random = function(min, max, percent) {
        let rand = percent || Math.random();
        return Math.floor(rand * (max - min)) + min;
    };

/* randomString */
    cuppa.randomString = function(length, characters){
        length = length || 5;
        characters = characters ||  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let text = "";
        for( let i=0; i < length; i++ ){
            text += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return text;
    };

/* random color
        alpha: 'random', number (0-1)
*/
    cuppa.randomColor = function(alpha){
        if(alpha == undefined) alpha = Math.random();
        let color =  "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+alpha+")";
        return color;
    };

/* Get new dimensions
    force:width,height
*/
    cuppa.newDim = function(width, height, new_width, new_height, invert, force){ return cuppa.newDimensions(width, height, new_width, new_height, invert, force); }
	cuppa.newDimensions = function(width, height, new_width, new_height, invert, force) {
		if(!invert) invert = false;
        width = parseFloat(width); height = parseFloat(height); new_width = parseFloat(new_width); new_height = parseFloat(new_height);
		let porcent = 1 + ((new_width - width) / width);
        if(force == "width"){
            let porcent = 1 + ((new_width - width) / width);
                new_width = width*porcent;
				new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }else if(force == "height"){
            let porcent = 1 + ((new_height - height) / height);
                new_width = width*porcent;
                new_height = height*porcent;
                return {width:new_width, height:new_height, scale:porcent}
        }

		if(!invert){
			if(height*porcent >= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}else{
			if(height*porcent <= new_height){
				new_width = width*porcent;
				new_height = height*porcent;
			}else{
				porcent = 1 + ((new_height - height)/height);
				new_width = width*porcent;
				new_height = height*porcent;
			}
		}
		return {width:new_width, height:new_height, scale:porcent}
    };

  /* Get real dimentions
   *  Recomendable add all inner element inside the container without scroll "wrapper"
   */
    cuppa.dim = function(element, opts){ return cuppa.dimentions(element, opts); }
    cuppa.dimentions = function(element, opts){
        if(!opts) opts = {}
        if(element == undefined || element == "body" ) element = document.body;
        let value = {width:0, height:0, x:0, y:0 };
        // change parents elements
            let parents = cuppa.parents(element);
            let tmpParents = new Array();
            for(let i = 0; i < parents.length; i++){ if( cuppa.css(parents[i], "display") == "none" ) tmpParents.push(parents[i]); }
            if(cuppa.css(element, "display") == "none") tmpParents.push(element);
            cuppa.css(tmpParents, {display:"block", visibility:"hidden"});

            let clientRect = element.getBoundingClientRect();
            let scrollPos = cuppa.scrollPosition(opts.scrollRef);
            let style = getComputedStyle(element);
        // x,y (position from init of document) - not work
            value.x = (window.scrollX) ? clientRect.left + window.scrollX :  clientRect.left + window.pageXOffset;
            value.y = (window.scrollY) ? clientRect.top + window.scrollY : clientRect.top + window.pageYOffset;
        // x2,y2 (position from parent element) - work
            value.x2 = element.offsetLeft;
            value.y2 = element.offsetTop;
        // x3,y3 (fixed position on window) - work
            value.x3 = clientRect.left;
            value.y3 =  clientRect.top;
        // x4,y4 (position from parent element + scroll position) - work
            value.x4 = value.x + scrollPos.x;
            value.y4 =  value.y + scrollPos.x;
        // dimentions, + border, + padding
            value.width = element.offsetWidth;
            value.height = element.offsetHeight;
        // dimentions, - border, - padding
            value.width2 = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
            value.height2 = element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
        // dimentions, - border
            value.width3 = element.clientWidth;
            value.height3 = element.clientHeight;
        // dimentions, + border, + padding, + margin
            value.width4 = element.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            value.height4 = element.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        // scroll dimensions
            value.scrollWidth = element.scrollWidth;
            value.scrollHeight = element.scrollHeight;
        // client dimentions
            value.clientWidth = element.clientWidth;
            value.clientHeight = element.clientHeight;
        // return parents to default
            cuppa.css(tmpParents, {display:"none", visibility:"visible"});
        return value;
    };

// width / height
    cuppa.width = function(outer){
        if(outer) return window.innerWidth;
        else return document.documentElement.clientWidth;
    }

    cuppa.height = function(outer){
        if(outer) return window.innerHeight;
        else return document.documentElement.clientHeight;
    }

// Get arc params
    cuppa.arcParams = function(x, y, radius, startAngle, endAngle){
        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };
        let start = polarToCartesian(x, y, radius, endAngle);
        let end = polarToCartesian(x, y, radius, startAngle);
        let arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
        let d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
            "L", x,y,
            "L", start.x, start.y
        ].join(" ");
        return d;
    };

// Get the oposite dimention of a triangle rectangle
    cuppa.getOpositeDimention = function(longitude, angle){
        angle = (angle/180)*Math.PI;
        let A = angle;
        let b = longitude;
        let a =b*Math.tan(A);
        return a;
    };

/* countDown
    Example:
        let date = new Date();
            date.setSeconds(date.getSeconds()+seconds);
        let countdown = new cuppa.countdown(date);
 */
    cuppa.countdown = function(dateTarget, callback, updateInterval){
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.timeout = null;

        this.constructor = function(){
            cuppa.bindAll(this, true);
            if(updateInterval == undefined) updateInterval = 1000;
            this.update();
        };

        this.update = function(){
            let timeLeft = dateTarget.getTime() - new Date().getTime();
            this.seconds = Math.floor(timeLeft / 1000);
            this.minutes = Math.floor(this.seconds / 60);
            this.hours = Math.floor(this.minutes / 60);
            this.days = Math.floor(this.hours / 24);
            this.seconds %= 60;
            this.minutes %= 60;
            this.hours %= 24;
            if (this.days <= 0 && this.hours <= 0 && this.minutes <= 0 && this.seconds <= 0) {
                this.days = 0; this.hours = 0; this.minutes = 0; this.seconds = 0;
            }else {
                if(this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(this.update, updateInterval);
            }
            if(callback) callback(this);
        };

        this.destroy = function(){
            if(this.timeout) clearTimeout(this.timeout);
        }

        this.constructor();
    }
 /* ValidateFormObject
    let result = cuppa.validateFormObject(this.state.form, {email:{required:true, type:"email"}, password:{required: true, minLength:6}, password2:{require:true, equalTo:"password"}, acceptTerm:{checked:true}})
* */
    cuppa.validateFormObject = function(object, opts){
        let result = {valid:true, desc:{}};
        if(!opts) return result;
            result.desc = {};
            result.message = "";
            result.field = "";
        Object.keys(opts).map(key=>{
            let value = object[key];
            let opt = opts[key];
            let desc = {};

            if(opt.type == "email" && !cuppa.email(value)){
                desc.type = false;
                desc.message = opt.message || `field must be an email`;
                if(opt["typeMessage"]) desc.message = opt["typeMessage"];
            }
            if(opt.type == "number" && isNaN(parseFloat(value)) ){
                desc.type = false;
                desc.message = opt.message || `field should be a number`;
                if(opt["typeMessage"]) desc.message = opt["typeMessage"];
            }
            if(opt.regExp && !new RegExp(opt.regExp).test(value)){
                desc.regExp = false;
                desc.message = opt.message || `regExp failed`;
                if(opt["regExpMessage"]) desc.message = opt["regExpMessage"];
            }
            if(opt.min && parseFloat(value) < opt.min){
                desc.min = false;
                desc.message = opt.message || `field must be greater than ${opt.min}`;
                if(opt["minMessage"]) desc.message = opt["minMessage"];
            }
            if(opt.max && parseFloat(value) > opt.max){
                desc.max = false;
                desc.message = opt.message || `field must be lower than ${opt.max}`;
                if(opt["maxMessage"]) desc.message = opt["maxMessage"];
            }
            if(opt.minLength && cuppa.value(value, null, '').length < opt.minLength){
                desc.minLength = false;
                desc.message = opt.message || `field must be more than ${opt.minLength} characters`;
                if(opt["minLengthMessage"]) desc.message = opt["minLengthMessage"];
            }
            if(opt.maxLength && cuppa.value(value, null, '').length > opt.maxLength){
                desc.maxLength = false;
                desc.message = opt.message || `field must be less than ${opt.maxLength} characters`;
                if(opt["maxLengthMessage"]) desc.message = opt["maxLengthMessage"];
            }
            if(opt.equalTo && value != object[opt.equalTo]){
                desc.equalTo = false;
                desc.message = opt.message || `field must be equal to ${opt.equalTo} field`;
                if(opt["equalToMessage"]) desc.message = opt["equalToMessage"];
            }
            if(opt.checked === true && value !== opt.checked){
                desc.checked = false;
                desc.message = opt.message || `field must be checked`;
                if(opt["checkedMessage"]) desc.message = opt["checkedMessage"];
            }
            if(opt.checked === false && value !== opt.checked){
                desc.checked = false;
                desc.message = opt.message || `field must be unchecked`;
                if(opt["checkedMessage"]) desc.message = opt["checkedMessage"];
            }
            if(opt.noEmptyArray && (!value || !value.length)){
                desc.type = false;
                desc.message = opt.message || `field must contain elements`;
                if(opt["typeMessage"]) desc.message = opt["typeMessage"];
            }
            if(opt.required && (!value || (typeof value == "string" && !cuppa.trim(value))) ){
                desc.required = false;
                desc.message = opt.message || `field is required`;
                if(opt["requiredMessage"]) desc.message = opt["requiredMessage"];
            }

            if(Object.keys(desc).length){
                desc.valid = false;
                result.valid = false;
                if(!result.message) result.message = desc.message;
                if(!result.field) result.field = key;
                if(!result.label) result.label = opt["label"] || result.field;
            }else{
                desc.valid = true;
            }
            result.desc[key] = desc;
        });
        if(result.field && opts[result.field] &&opts[result.field]["label"] != undefined) result.label = opts[result.field]["label"];
        return result;
    };

/* Dropdown */
    cuppa.dropdown = function(element, buttonElement, opts){
        this.element = cuppa.element(element)[0];
        this.buttonElement = cuppa.element(buttonElement)[0];
        this.opts = cuppa.mergeObjects([{ scrollClose:true, stopProgation:false, mouseActionOpen:"click", toogle:true, mouseActionClose:"click", display:"block", open:null, close:null, gsap:null }, opts]);
        cuppa.css(this.element, {display:"none", opacity:0});
        // open Dropbox
            this.open = function(e){
                if(cuppa.hasClass(this.buttonElement, "cu-drop-open") && this.opts.toogle ){ this.close(); return; }
                cuppa.addClass(this.buttonElement, "cu-drop-open");
                cuppa.addClass(this.element, "cu-drop-open");
                this.opts.gsap.to(this.element, 0.2, {alpha:1, display:this.opts.display});
                cuppa.off(window, this.opts.mouseActionClose, this.close);
                this.opts.gsap.delayedCall(0.1, function(){cuppa.on(window, this.opts.mouseActionClose, this.close); }.bind(this));
                if(this.opts.scrollClose){ cuppa.off(window, "scroll", this.close); cuppa.on(window, "scroll", this.close); };
                if(this.opts.stopProgation) cuppa.on(element, "click", function(e){ e.stopPropagation(); });
                if(this.opts.open) this.opts.open();
            }.bind(this);
            if(this.opts.mouseActionOpen == "longPress"){
                cuppa.longPress(this.buttonElement, function(){
                    this.preventFirstClickClose = true;
                    this.open();
                }.bind(this));
            }else{
                cuppa.on(this.buttonElement, this.opts.mouseActionOpen, this.open);
            }
        // close Dropbox
            this.close = function(){
                if(this.preventFirstClickClose){
                    this.preventFirstClickClose = false; return;
                }
                cuppa.removeClass(this.buttonElement, "cu-drop-open");
                cuppa.off(window, this.opts.mouseActionClose, this.close);
                cuppa.off(window, "scroll", this.close);
                this.opts.gsap.killTweensOf(this.element);
                this.opts.gsap.to(this.element, {duration:0.2, alpha:0, display:"none"});
                if(this.opts.close) this.opts.close();
            }.bind(this);

        this.element.dropdown = this.element.buttonElement = this;
        return this;
    };

/* Serialize forms
    Cuppa serialize, return the input values on a Object, name:value
*/
    cuppa.serialize = function(element, json_encode, base64_encode){
        if(json_encode == undefined) json_encode = false;
        if(base64_encode == undefined) base64_encode = true;
        element = cuppa.element(element,{query:true})[0];
        let formItems = element.querySelectorAll("input, textarea, select");
        let object = {}
        for(let i = 0; i < formItems.length; i++){
            let field = formItems[i];
            let name = field.getAttribute("name");
            if(name){
                if(field.getAttribute("type") == "checkbox" ){
                    object[name] = field.checked;
                }else if(field.getAttribute("type") == "radio"){
                    object[name] =  field.value;
                }else if(cuppa.elementType(field) == "select" && field.hasAttribute("multiple") ){
                    object[name] =  cuppa.selectedValues(field);
                }else{
                    object[name] = field.value;
                }
                if(typeof object[name] === "string") object[name] = cuppa.trim(object[name]);
            };
        };
        if(json_encode && object) object = cuppa.jsonEncode(object, base64_encode);
        return object;
    };

/* get selected values */
    cuppa.selectedValues = function(element, opts){
        opts = cuppa.mergeObjects([{returnFirst:false, returnLast:false, returnText:false}, opts]);
        let values = Array.prototype.slice.call(element.querySelectorAll('option:checked'),0).map(function(v,i,a) {
            if(opts.returnText) return v.innerHTML;
            return v.value;
        });
        if(opts.returnFirst && values.length) return values[0];
        if(opts.returnLast && values.length) return values[values.length-1];
        return values;
    };

/* Input filter.
    Example: new cuppa.inputFilter(element, '0-9');
*/
    cuppa.inputFilter = function(element, values){
        this.values = values || "0-9";
        this.values = "["+values+"]";
        this.validate = function(event){
            let string, regex;
            if (event.type =='keypress'){
                // 8 = backspace, 9 = tab, 13 = enter, 35 = end, 36 = home, 37 = left, 39 = right, 46 = delete
                let key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                if(key == 8 || key == 9 || key == 13 || key == 35 || key == 36|| key == 37 || key == 39 || key == 46){
                    // if charCode = key & keyCode = 0
                    // 35 = #, 36 = $, 37 = %, 39 = ', 46 = .
                    if (event.charCode == 0 && event.keyCode == key){
                        return true;
                    };
                };

                if((key == 99|| key == 120 ) && event.ctrlKey){  // copy / cut
                    return;
                }else if(key == 118 && event.ctrlKey){ // paste
                    string = event.clipboardData.getData('text/plain');
                    regex = new RegExp('^('+this.values+')+$');
                }else{
                    string = String.fromCharCode(key);
                    regex = new RegExp(this.values);
                }
            }else if (event.type =='paste'){
                string = event.clipboardData.getData('text/plain');
                regex = new RegExp('^('+this.values+')+$');
            }else{ return; };

            if(!regex.test(string)){
                event.preventDefault();
            }
            return true;
        }.bind(this);
        cuppa.on(element, "keypress", this.validate, "cuppaInputFilter");
        cuppa.on(element, "paste", this.validate, "cuppaInputFilter");
    };
    cuppa.inputFilterRemove = function(element){
        cuppa.off(element, "keypress", "", "cuppaInputFilter");
        //cuppa.on(element, "keyup", this.validate, "cuppaInputFilter");
        cuppa.off(element, "paste", "", "cuppaInputFilter");
    };

/* try to auto ajust timezoneOffset in dates */
    cuppa.dateTimezoneOffsetAuto = function(date, remove){
        if(remove) date.setMinutes( date.getMinutes() - date.getTimezoneOffset() );
        else date.setMinutes( date.getMinutes() + date.getTimezoneOffset() );
        return date;
    };
    cuppa.dateAddTimezone = function(date){
        return cuppa.dateTimezoneOffsetAuto(date);
    };
    cuppa.dateRemoveTimezone = function(date){
        return cuppa.dateTimezoneOffsetAuto(date, true);
    };

/* timestamp to date*/
    cuppa.dateFromTimestamp = function(value){
        return new Date(value*1000);
    };

/* time to date
    string formats:  12:35:26 PM or  18:35:26
* */
    cuppa.timeToDate = function(value){
        if(!value) value = "00:00:00";
        value = value.toUpperCase();
        let hours = parseInt(value.substr(0,2));
        if(value.indexOf("AM") != -1 && hours == 12) hours = 0;
        if(value.indexOf("PM") != -1 && hours != 12){ hours = hours+12; }
        let minutes = parseInt(value.substr(3,2));
        let seconds = parseInt(value.substr(6,2));
        let date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(seconds);
        return date;
    }

// dateFormat
    cuppa.dateFormat = function(date, format){
        if (!format) format = "mm-dd-yyyy H:M:S";
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        format = cuppa.replace(format,"mm", ("0"+(date.getMonth() + 1)).slice(-2));
        format = cuppa.replace(format,"yyyy", date.getFullYear());
        format = cuppa.replace(format,"dd", ("0"+date.getDate()).slice(-2));
        format = cuppa.replace(format,"I", (minutes < 10) ? "0"+minutes : minutes );
        format = cuppa.replace(format,"M", (minutes < 10) ? "0"+minutes : minutes );
        format = cuppa.replace(format,"S", (seconds < 10) ? "0"+seconds : seconds );
        if(format.indexOf("A") != -1){
            if(hours < 12){
                format = cuppa.replace(format,"A", "AM");
                if(hours == 0) hours = 12;
            }else{
                format = cuppa.replace(format,"A", "PM");
                if(hours != 12) hours = hours - 12;
            }
        }
        format = cuppa.replace(format,"H", (hours < 10) ? "0"+hours : hours);
        return format;
    };

/* Get Ages from date (YYYY/MM/DD) ) */
    cuppa.getAge = function(dateString) {
        let today = new Date();
        let birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
        return age;
    };

/* Get Diferent of dates (YYYY/MM/DD) */
    cuppa.dateDiff = function(date1, date2, opts){
        if(!opts) opts = {}
        if(opts.addCero == undefined) opts.addCero = false;
        if(typeof date1 =="string"){
            date1 = cuppa.replace(date1, "-", "/");
            date1 = new Date(date1);
        }
        if(date2 == undefined){
            date2 = new Date();
        }else if(typeof date2 =="string"){
            date2 = cuppa.replace(date2, "-", "/");
            date2 = new Date(date2);
        }
        let diff;
        if(date2.getTime() > date1.getTime()) diff = new Date(date2.getTime() - date1.getTime());
        else diff = new Date(date1.getTime() - date2.getTime());

        let data = {}
            data.date = diff;
            data.time = diff.getTime(); // miliseconds
            data.years = diff.getUTCFullYear() - 1970; if(data.years < 0 ) data.years = 0;
            data.months = diff.getUTCMonth(); if(data.months < 0 ) data.months = 0;
            data.days = parseInt((diff) / (1000 * 60 * 60 * 24));
            data.hours = parseInt(Math.abs(diff) / (1000 * 60 * 60) % 24);
            data.minutes =  parseInt(Math.abs(diff) / (1000 * 60) % 60);
            data.seconds = parseInt(Math.abs(diff) / (1000) % 60);

            data.years = cuppa.parseFloat(data.years);
            data.months = cuppa.parseFloat(data.months);
            data.days = cuppa.parseFloat(data.days);
            data.hours = cuppa.parseFloat(data.hours);
            data.minutes = cuppa.parseFloat(data.minutes);
            data.seconds = cuppa.parseFloat(data.seconds);
        if(opts.addCero){
            data.years = (data.years > 9) ? data.years : "0"+data.years;
            data.months = (data.months > 9) ? data.months : "0"+data.months;
            data.days = (data.days > 9) ? data.days : "0"+data.days;
            data.hours = (data.hours > 9) ? data.hours : "0"+data.hours;
            data.minutes = (data.minutes > 9) ? data.minutes : "0"+data.minutes;
            data.seconds = (data.seconds > 9) ? data.seconds : "0"+data.seconds;
        }
        return data;
    };

/* secondsToTime conver 150 > 00:02:30
* */
    cuppa.secondsToTime = function (theSeconds){
        let hours  = parseInt(theSeconds / 3600);
            hours  = hours > 9 ? hours  : "0" + hours;
        let minutes  = parseInt((theSeconds  - (hours * 3600)) / 60);
            minutes  = minutes > 9 ? minutes : "0" + minutes ;
        let seconds  = parseInt(theSeconds  - ((hours * 3600) + (minutes * 60)));
            seconds  = seconds > 9 ? seconds  : "0" + seconds;
        return hours + ":" + minutes + ":" + seconds;
    };
    cuppa.seconds2Time = function(theSeconds){ return cuppa.secondsToTime(theSeconds); };

/* month diff */
    cuppa.monthDiff = function(d1, d2){
        if(d2 == undefined) d2 = new Date();
        let months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    };
    cuppa.dateMonthDiff = function(d1, d2){ return cuppa.monthDiff(d1,d2); };

// enter_key
    cuppa.enterKey = function(element, callBack, data){
        element.addEventListener("keyup", function(e){
            if(e.which == 13) {
                cuppa.blur();
                callBack(data);
            };
        });
    };
    cuppa.keyEnter = function(element, callBack, data){ cuppa.enterKey(element, callBack, data); };

// backspace_key and delete_key
    cuppa.deleteKey = function(element, callBack, data){
        element.addEventListener("keyup", function(e){
            if(e.which == 8 || e.which == 46) {
                cuppa.blur();
                callBack(data);
            };
        });
    };
    cuppa.keyDelete = function(element, callBack, data){ cuppa.deleteKey(element, callBack, data); };

// exit key
    cuppa.exitKey = function(element, callBack, data){
        element.addEventListener("keyup", function(e){
            if(e.which == 27) {
                cuppa.blur();
                callBack(data);
            };
        });
    };
    cuppa.keyExit = function(element, callBack, data){ cuppa.exitKey(element, callBack, data); };

// long click press
    cuppa.longPress = function(element, callback, data, delay){
        element.timer = null;
        element.delay = delay || 300;
        element.callback = callback;
        element.data = data;
        element.addEventListener("mousedown", function(e){
            let item = e.currentTarget;
                item.timer = setTimeout(function(){
                    clearTimeout(item.timer)
                    if(item.callback) item.callback(item, item.data);
                }, item.delay);
        });

        element.addEventListener("mouseup", function(e){
            let item = e.currentTarget;
            clearTimeout(item.timer)

        });
    };

/* optionSelector
    This method receive a array of elements and add selected class to the element clicked similar to Input.Radio
        options.toggle = false|true
        options.multiple = false|true
        options.callback = options.change = function(item, data);
        options.default = element

*/
    cuppa.optionSelector = function(elements, options){
        this.options = cuppa.mergeObjects([{ toggle:true, multiple:false, callback:null, 'default':null }, options]);
        this.elements = cuppa.element(elements);
        this.change = function(element){
            if(element.currentTarget) element = element.currentTarget;
            let select = true;
            if(!this.options.multiple){
                if(this.options.toggle && cuppa.hasClass(element, "selected") ) select = false;
                cuppa.removeClass(this.elements, "selected");
                if(select) cuppa.addClass(element, "selected")
            }else{
                if(this.options.toggle && cuppa.hasClass(element, "selected") ) select = false;
                if(select) cuppa.addClass(element, "selected");
                else cuppa.removeClass(element, "selected");
            }
            if(this.options.callback) this.options.callback(element, this);
        }.bind(this);
        cuppa.on(this.elements, "click", this.change);
        if(this.options["default"]) this.change(this.options["default"])
    };

// validate - use the vanilla javascript validation
    cuppa.validateForm = function(form, opts){
        opts = cuppa.mergeObjects([{showError:true, errorMessage:"This field is required."}, opts]);
        let elements = cuppa.element("input,select,textarea", {parent:form});
        cuppa.removeClass(elements,"error");
        cuppa.remove(".form-error-meesage");
        let valid = true;
        for(let i = 0; i < elements.length; i++){
            let element = elements[i];
                element.errorElementId = "error-message-element"+i;
            if(!element.checkValidity()){
                cuppa.addClass(element,"error");
                valid = false;
                if(opts.showError){
                    let message = cuppa.attr(element,"error") || opts.errorMessage;
                    let errorElement = cuppa.newElement("<div class='form-error-message' id='"+element.errorElementId+"'>"+message+"</div>");
                    cuppa.after(errorElement, element);
                    cuppa.on(element, "input", function(e){
                        if(e.target.checkValidity()) cuppa.remove("#"+e.target.errorElementId);
                    });
                    cuppa.on(element, "change", function(e){
                        if(e.target.checkValidity()) cuppa.remove("#"+e.target.errorElementId);
                    });
                }
            }
        }
        return valid;
    };

/* toggle
    new cuppa.toggle(element, {callback:this.toggleColumn});
    element.selected = return true/false

    Structure:
    <div class="toggle"> toggle option
        <input type="hidden" name="enabled_rphone" value="0,1"> // if an input[type=hidden] is includded the toggle will automatically change the value inside that input
    </div>
* */
    cuppa.toggle = function(elements, opts){
        this.opts = cuppa.mergeObjects([{ callback:null, selected:undefined, initCallback:true }, opts]);
        this.elements = cuppa.element(elements);
        // onClick
            this.onClick = function(element, selected){
                if(element.currentTarget) element = element.currentTarget;

                if(element.selected) {
                    element.selected = false;
                    cuppa.removeClass(element, "selected");
                    if(element.input) element.input.value = element.selected;
                }else{
                    element.selected = true;
                    cuppa.addClass(element, "selected");
                    if(element.input) element.input.value = element.selected;
                }
                if(this.opts.callback) this.opts.callback( element, element.selected );
            }.bind(this);
        // init value
            cuppa.on(this.elements, "click", this.onClick);
            cuppa.addClass(this.elements, "cu-toggle");
            this.elements.forEach(function(element){
                element.input = element.querySelector("input");
                if(element.input) element.selected = parseInt(element.input.value);
                if(this.opts.selected != undefined) element.selected = this.opts.selected;
                if(element.selected == undefined) element.selected = cuppa.hasClass(element, "selected");
                if(element.selected) cuppa.addClass(element, "selected");
                if(this.opts.initCallback && this.opts.callback) this.opts.callback( element, element.selected );
            }.bind(this));
        return this;
    };

// download file
    cuppa.downloadFile = function(filePath, fileName, mimeType, opts){
        opts = cuppa.mergeObjects([{callback:null, preload:false, returnData:false, header:null, data:null, method:"GET", responseType:'blob'}, opts]);
        if(opts.preload){
            const xhttp = new XMLHttpRequest();
                xhttp.open(opts.method, filePath, true);
                if(opts.header){ for (let key in opts.header) { xhttp.setRequestHeader(key, opts.header[key]); }; };
                xhttp.responseType = opts.responseType;
                if(opts.data) xhttp.send(opts.data);
                else xhttp.send();
                xhttp.onload = function(){
                    if (xhttp.readyState === 4 && xhttp.status === 200) {
                        let data = new Blob([xhttp.response], {type: mimeType});
                        if(opts.callback && opts.returnData){ opts.callback(data); return; }
                        let link = document.createElement('a');
                            link.href = window.URL.createObjectURL(data);
                            link.download = fileName;
                        document.body.appendChild(link);
                            link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
                            link.remove();
                        window.URL.revokeObjectURL(link.href);
                        if(opts.callback){ opts.callback(link.href); }
                    }else{
                        if(opts.callback){ opts.callback(null); }
                    }
                };
                xhttp.onerror = function(){
                    log('onerror', xhttp)
                    if(opts.callback){ opts.callback(null); }
                }
        }else{
            let link = document.createElement('a');
                link.setAttribute("download", fileName);
                link.setAttribute("href", filePath);
                document.body.appendChild(link);
                link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
                link.remove();
                if(opts.callback) opts.callback(true);
        }
    };

 export { log, cuppa, val, wait};
try{ module.exports = { log, cuppa, val, wait}; }catch(err){ }
