/**
 * v0.0.1
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/cloudbit-interactive/cuppajs/blob/main/LICENSE)
 */

export class CuppaComponent extends HTMLElement{cuppa=null;cuppaStorage=null;pure=!1;shadow=!1;state={};refs={};updatedCallback=null;autoAddChilds=!0;autoDefineObservables=!0;_getStorageDictionary={};_parser=new DOMParser;constructor(){super(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.setState=this.setState.bind(this),this.forceRender=this.forceRender.bind(this),this.draw=this.draw.bind(this),this.createRealNode=this.createRealNode.bind(this),this.setAttributes=this.setAttributes.bind(this),this.setData=this.setData.bind(this),this.setStorage=this.setStorage.bind(this),this.getData=this.getData.bind(this),this.getStorage=this.getStorage.bind(this),this.removeStorage=this.removeStorage.bind(this),this.destroy=this.destroy.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.processRefs=this.processRefs.bind(this),this.autoSetObservables=this.autoSetObservables.bind(this),this.observables=this.observables.bind(this),this.binAll(this),this.autoSetObservables()}connectedCallback(){setTimeout(()=>{!0===this.shadow&&(this.shadow="open"),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(),this.connected&&this.connected(this)},0)}setState(state,callback){let newState={...this.state,...state};JSON.stringify(newState)!=JSON.stringify(this.state)&&(this.state=newState,this.forceRender(callback))}forceRender(callback){if(this.pure)this.shadow?this.shadowRoot.innerHTML="shadow not supported in pure component":(this.innerHTML="",this.insertAdjacentHTML("afterbegin",this.render()));else{let html=this.render();this.autoAddChilds&&this.childs&&(html+=this.childs),html=html.trim(),html=html.replace(/\s+/gi," "),html=html.replace(/<!--(.*?)-->/g,""),html=html.replace(new RegExp("> <","g"),"><");let headNodes,bodyNodes,rootNodes=[...this._parser.parseFromString(html,"text/html").head.childNodes,...this._parser.parseFromString(html,"text/html").body.childNodes];this.shadow?(this.shadowRoot.append(""),rootNodes.map(node=>this.draw(node,0,null,this))):rootNodes.map((node,index)=>this.draw(node,index,null,this))}this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&this.rendered(this)}draw(newNode,newNodeIndex,newNodeParent,realParentNode){let realNode=realParentNode.childNodes[newNodeIndex],isComponent=newNode&&-1!=newNode.nodeName.indexOf("-");if(realNode){if(newNode&&realNode.nodeName.toUpperCase()==newNode.nodeName.toUpperCase()){if(3==newNode.nodeType&&realNode.nodeValue!=newNode.nodeValue)return void(realNode.nodeValue=newNode.nodeValue);if(1==newNode.nodeType){let realKey=realNode.getAttribute("key"),newKey=newNode.getAttribute("key");if(newKey&&realKey!=newKey)if(realParentNode.childNodes.length<newNodeParent.childNodes.length){let newRealNode=this.createRealNode(newNode,isComponent);realNode.insertAdjacentElement("beforebegin",newRealNode),realNode=newRealNode}else if(realParentNode.childNodes.length>newNodeParent.childNodes.length){let nextNode=realNode.nextSibling;realParentNode.removeChild(realNode),realNode=nextNode}}}else if(newNode&&realNode.nodeName!=newNode.nodeName.toUpperCase()){if(3==newNode.nodeType)return void realParentNode.insertBefore(newNode,realNode);if(1==newNode.nodeType){let newRealNode=this.createRealNode(newNode,isComponent);realParentNode.insertBefore(newRealNode,realNode),realNode=newRealNode}}}else{if(newNode&&3==newNode.nodeType)return void realParentNode.insertAdjacentText("beforeend",newNode.nodeValue);newNode&&(realNode=this.createRealNode(newNode,isComponent),realParentNode.insertAdjacentElement("beforeend",realNode))}if(this.setAttributes(realNode,newNode),newNode&&isComponent)return;let i=0,length=newNode?newNode.childNodes.length:0;for(;i<length;)this.draw(newNode.childNodes[i],i,newNode,realNode),i++;if(newNode)for(;realNode.childNodes.length>length;)realNode.removeChild(realNode.childNodes[newNode.childNodes.length])}createRealNode(newNode,isComponent){let realNode=document.createElement(newNode.nodeName);return isComponent&&(realNode.childs=newNode.innerHTML),realNode}setAttributes(element,newDomMap){if(element&&1==element.nodeType&&newDomMap&&null!=newDomMap.attributes){let i=0,length=newDomMap.attributes.length;for(;i<length;){let name=newDomMap.attributes[i].nodeName,value=newDomMap.attributes[i].nodeValue,oldValue=element.getAttribute(name);if("value"==name&&element.value)element.value=value;else if(value){if(oldValue!=value&&element[`__old_event_${name}`]!=value)if(0===name.indexOf("on")&&name.length>2){element[`__old_event_${name}`]=value;let eventName=name.replace("on","");if(-1!=value.indexOf("=>"))element.removeEventListener(eventName,eval(value)),element.addEventListener(eventName,eval(value));else{let functionName=value.replace("this.",""),paramsStartAt=functionName.indexOf("(");if(-1==paramsStartAt)element.removeEventListener(eventName,this[functionName]),element.addEventListener(eventName,this[functionName]);else{let params=functionName.slice(paramsStartAt+1,functionName.indexOf(")"));params=params.split(","),params=params.map(param=>param.trim()),functionName=functionName.slice(0,paramsStartAt),element.removeEventListener(eventName,()=>this[functionName](...params)),element.addEventListener(eventName,()=>this[functionName](...params))}}}else element.setAttribute(name,value)}else element.removeAttribute(name);i++}}}setData(name,opts){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&this.cuppa.setData(name,opts)}setStorage(name,opts){this.setData(name,opts)}getData(name,opts){if(!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa)return opts&&opts.callback?(this.cuppa.getData(name,opts),void(this._getStorageDictionary[name]=opts)):this.cuppa.getData(name,opts)}getStorage(name,opts){return this.getData(name,opts)}removeStorage(){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&Object.entries(this._getStorageDictionary).map(([key,value])=>{value&&value.callback&&this.cuppa.removeListener(key,value.callback),delete this._getStorageDictionary[key]})}destroy(){this.removeStorage()}disconnectedCallback(){this.destroy&&this.destroy(),this.disconnected&&this.disconnected(this)}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}autoSetObservables(){let baseParamsMap={};Object.keys(this).map(key=>baseParamsMap[key]=1),setTimeout(()=>{this.autoDefineObservables&&Object.keys(this).map(key=>{baseParamsMap[key]||this.observables({[key]:this[key]})})},0)}observables(object,callback){let target=this,firstName;if(object)return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName]}}

export default class CuppaCountDown extends CuppaComponent {
	countDown;
	time;                           // 2099:01:01 18:30:40, 18:30:40
	type = 'default';               //  default, inline
	callback;
	["show-days"] = true;
	["show-hours"] = true;
	["show-minutes"] = true;
	["show-seconds"] = true;
	["auto-remove"] = false;

	constructor(){ super(); }

	connected(){
		this.updateCountdown();
	}

	static get observedAttributes() { return ['time', 'show-days', 'show-hours', 'show-minutes', 'show-seconds', 'type', 'auto-remove'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		this[attr] = newVal;
		if(attr == "time"){ this.updateCountdown(); }
	}

	updateCountdown(){
		if(this.countDown) this.countDown.destroy();
		if(!this.time) return;
		let date = (this.time.length <= 8) ? timeToDate(this.time) : new Date(this.time);
		this.countDown = new countdown(date, ()=>{
			if(!this.countDown) return;
			this.forceRender();
		}, this.onComplete);
	}

	onComplete(){
		this.dispatchEvent(new Event('complete'));
		if(this.callback) this.callback(this);
	}

	disconnected() {
		if(this.countDown) this.countDown.destroy();
	}

	render(){
		return /*html*/`
            <style>
                cuppa-countdown{ display: inline-flex; }
                cuppa-countdown, cuppa-countdown *{ box-sizing: border-box; }
                cuppa-countdown .box{ position:relative; margin:0 10px 0 0; border-radius: 5px; background: #29303D;  box-shadow: 0 3px 6px rgba(0,0,0,0.2); display: inline-flex; width: 46px; height: 46px; justify-content: center; align-items: center; }
                cuppa-countdown .box:last-of-type{ margin:0; }
                cuppa-countdown .overline{ display: block; width: 100%; position: absolute; height: 1px; background:#29303D; top:50%; }
                cuppa-countdown .number{ color:#FFF; font-size: 31px; }
                cuppa-countdown .text{ top:calc(100% + 5px); font-size: 11px; position: absolute; display: block; color:#444; font-weight: 700; }

                cuppa-countdown .inline-box{ display:inline-flex; align-items:baseline; margin:0 15px 0 0; }
                cuppa-countdown .inline-box:last-of-type{ margin:0;}
                cuppa-countdown .inline-number{ font-size: 40px;}
                cuppa-countdown .inline-text{ font-size:18px; }
            </style>
            <div class="${this.type}">
                ${ this.type == 'inline' ? /*html*/`
                    ${ !boolean(this["show-days"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="inline-box days">
                            <span class="inline-number">${( this.countDown ? this.countDown.days : 0 )}</span>
                            <span class="inline-text">d</span>
                        </div>
                    `}
    
                    ${ !boolean(this["show-hours"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'hours') && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="inline-box hours">
                            <span class="inline-number">${( this.countDown ? this.countDown.hours : 0 )}</span>
                            <span class="inline-text">h</span>
                        </div>
                    `}
    
                    ${ !boolean(this["show-minutes"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'minutes') && !val(this.countDown, 'hours') && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="inline-box minutes">
                            <span class="inline-number">${( this.countDown ? this.countDown.minutes : 0 )}</span>
                            <span class="inline-text">m</span>
                        </div>
                    `}
    
                    ${ !boolean(this["show-seconds"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'seconds') &&  !val(this.countDown, 'minutes') && !val(this.countDown, 'hours') && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="inline-box seconds">
                            <span class="inline-number">${( this.countDown ? this.countDown.seconds : 0 )}</span>
                            <span class="inline-text">s</span>
                        </div>
                    `}
                ` : /*html*/`
                    ${ !boolean(this["show-days"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="box days" >
                            <span class="number">${left0( this.countDown ? this.countDown.days : 0 )}</span>
                            <div class="overline"></div>
                            <span class="text">Days</span>
                        </div>
                    ` }
                    
                    ${ !boolean(this["show-hours"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'hours') && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="box hours" >
                            <span class="number">${left0( this.countDown ? this.countDown.hours : 0 )}</span>
                            <div class="overline"></div>
                            <span class="text">Hours</span>
                        </div>
                    `}
    
                    ${ !boolean(this["show-minutes"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'minutes') && !val(this.countDown, 'hours') && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="box minutes" >
                            <span class="number">${left0( this.countDown ? this.countDown.minutes :  0 )}</span>
                            <div class="overline"></div>
                            <span class="text">Minutes</span>
                        </div>
                    `}
    
                    ${ !boolean(this["show-seconds"]) || (boolean(this["auto-remove"]) && !val(this.countDown, 'seconds') &&  !val(this.countDown, 'minutes') && !val(this.countDown, 'hours') && !val(this.countDown, 'days')) ? '' : /*html*/`
                        <div class="box seconds" >
                            <span class="number">${left0( this.countDown ? this.countDown.seconds :  0 )}</span>
                            <div class="overline"></div>
                            <span class="text">Seconds</span>
                        </div>
                    `}
                `}
            </div>
            
        `
	}
}

customElements.define('cuppa-countdown', CuppaCountDown);

let left0 = function(value){
	if(!value) value = 0;
	value = parseFloat(value);
	if(value < 10) value = "0"+ value;
	return value;
};

let countdown = function(dateTarget, callback, callbackComplete, updateInterval){
	this.days = 0;
	this.hours = 0;
	this.minutes = 0;
	this.seconds = 0;
	this.timeout = null;
	this.status = "running";

	this.constructor = function(){
		bindAll(this, true);
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
			this.status = "end";
			if(callbackComplete) callbackComplete(this);
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

let bindAll = function(element, isFunction){
	let propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(element));
	if(isFunction)  propertyNames = Object.keys(element);
	for(let i = 0; i < propertyNames.length; i++){
		if(typeof element[propertyNames[i]] == "function"){
			element[propertyNames[i]]= element[propertyNames[i]].bind(element);
		};
	};
};

let timeToDate = function(value){
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

let boolean = function(value){
	let result = value;
	if(result === "false" || result === false || result === 0 || result === "0" || result === undefined || result === null || result === "") result = false;
	else result = true;
	return result;
}

let val = function(data, path, defaultValue){
	if(!data) return defaultValue;
	if(data && !path) return data;
	path = trim(path).split(".");
	let element = data;
	for(let i = 0; i < path.length; i++){
		try{ element = element[path[i]]; }catch(err){ element = ""; break; }
	}
	if(element){ let tmp = JSON.stringify(element); if(tmp == "{}" || tmp == "[]" || tmp == undefined || tmp == null) element = ""; }
	if((element === "" || element === null || element === undefined) && defaultValue != undefined) element = defaultValue;
	return element;
};

let trim = function(string){
	if(string) return string.replace(/^\s+|\s+$/g, '');
	else return "";
};
