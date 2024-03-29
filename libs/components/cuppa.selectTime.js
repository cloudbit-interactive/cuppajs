/**
 * v0.0.1
 * Authors (https://github.com/cloudbit-interactive/cuppajs)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */

export class CuppaComponent extends HTMLElement{cuppa=null;cuppaStorage=null;pure=!1;shadow=!1;state={};refs={};updatedCallback=null;autoAddChilds=!0;autoDefineObservables=!0;_getStorageDictionary={};_parser=new DOMParser;constructor(){super(),this.binAll=this.binAll.bind(this),this.connectedCallback=this.connectedCallback.bind(this),this.setState=this.setState.bind(this),this.forceRender=this.forceRender.bind(this),this.draw=this.draw.bind(this),this.createRealNode=this.createRealNode.bind(this),this.setAttributes=this.setAttributes.bind(this),this.setData=this.setData.bind(this),this.setStorage=this.setStorage.bind(this),this.getData=this.getData.bind(this),this.getStorage=this.getStorage.bind(this),this.removeStorage=this.removeStorage.bind(this),this.destroy=this.destroy.bind(this),this.disconnectedCallback=this.disconnectedCallback.bind(this),this.processRefs=this.processRefs.bind(this),this.autoSetObservables=this.autoSetObservables.bind(this),this.observables=this.observables.bind(this),this.binAll(this),this.autoSetObservables()}connectedCallback(){setTimeout(()=>{!0===this.shadow&&(this.shadow="open"),this.shadow&&this.attachShadow({mode:this.shadow}),this.forceRender(),this.connected&&this.connected(this)},0)}setState(state,callback){let newState={...this.state,...state};JSON.stringify(newState)!=JSON.stringify(this.state)&&(this.state=newState,this.forceRender(callback))}forceRender(callback){if(this.pure)this.shadow?this.shadowRoot.innerHTML="shadow not supported in pure component":(this.innerHTML="",this.insertAdjacentHTML("afterbegin",this.render()));else{let html=this.render();this.autoAddChilds&&this.childs&&(html+=this.childs),html=html.trim(),html=html.replace(/\s+/gi," "),html=html.replace(/<!--(.*?)-->/g,""),html=html.replace(new RegExp("> <","g"),"><");let headNodes,bodyNodes,rootNodes=[...this._parser.parseFromString(html,"text/html").head.childNodes,...this._parser.parseFromString(html,"text/html").body.childNodes];this.shadow?(this.shadowRoot.append(""),rootNodes.map(node=>this.draw(node,0,null,this))):rootNodes.map((node,index)=>this.draw(node,index,null,this))}this.processRefs(this,this.refs,"ref"),callback&&callback(),this.rendered&&this.rendered(this)}draw(newNode,newNodeIndex,newNodeParent,realParentNode){let realNode=realParentNode.childNodes[newNodeIndex],isComponent=newNode&&-1!=newNode.nodeName.indexOf("-");if(realNode){if(newNode&&realNode.nodeName.toUpperCase()==newNode.nodeName.toUpperCase()){if(3==newNode.nodeType&&realNode.nodeValue!=newNode.nodeValue)return void(realNode.nodeValue=newNode.nodeValue);if(1==newNode.nodeType){let realKey=realNode.getAttribute("key"),newKey=newNode.getAttribute("key");if(newKey&&realKey!=newKey)if(realParentNode.childNodes.length<newNodeParent.childNodes.length){let newRealNode=this.createRealNode(newNode,isComponent);realNode.insertAdjacentElement("beforebegin",newRealNode),realNode=newRealNode}else if(realParentNode.childNodes.length>newNodeParent.childNodes.length){let nextNode=realNode.nextSibling;realParentNode.removeChild(realNode),realNode=nextNode}}}else if(newNode&&realNode.nodeName!=newNode.nodeName.toUpperCase()){if(3==newNode.nodeType)return void realParentNode.insertBefore(newNode,realNode);if(1==newNode.nodeType){let newRealNode=this.createRealNode(newNode,isComponent);realParentNode.insertBefore(newRealNode,realNode),realNode=newRealNode}}}else{if(newNode&&3==newNode.nodeType)return void realParentNode.insertAdjacentText("beforeend",newNode.nodeValue);newNode&&(realNode=this.createRealNode(newNode,isComponent),realParentNode.insertAdjacentElement("beforeend",realNode))}if(this.setAttributes(realNode,newNode),newNode&&isComponent)return;let i=0,length=newNode?newNode.childNodes.length:0;for(;i<length;)this.draw(newNode.childNodes[i],i,newNode,realNode),i++;if(newNode)for(;realNode.childNodes.length>length;)realNode.removeChild(realNode.childNodes[newNode.childNodes.length])}createRealNode(newNode,isComponent){let realNode=document.createElement(newNode.nodeName);return isComponent&&(realNode.childs=newNode.innerHTML),realNode}setAttributes(element,newDomMap){if(element&&1==element.nodeType&&newDomMap&&null!=newDomMap.attributes){let i=0,length=newDomMap.attributes.length;for(;i<length;){let name=newDomMap.attributes[i].nodeName,value=newDomMap.attributes[i].nodeValue,oldValue=element.getAttribute(name);if("value"==name&&element.value)element.value=value;else if(value){if(oldValue!=value&&element[`__old_event_${name}`]!=value)if(0===name.indexOf("on")&&name.length>2){element[`__old_event_${name}`]=value;let eventName=name.replace("on","");if(-1!=value.indexOf("=>"))element.removeEventListener(eventName,eval(value)),element.addEventListener(eventName,eval(value));else{let functionName=value.replace("this.",""),paramsStartAt=functionName.indexOf("(");if(-1==paramsStartAt)element.removeEventListener(eventName,this[functionName]),element.addEventListener(eventName,this[functionName]);else{let params=functionName.slice(paramsStartAt+1,functionName.indexOf(")"));params=params.split(","),params=params.map(param=>param.trim()),functionName=functionName.slice(0,paramsStartAt),element.removeEventListener(eventName,()=>this[functionName](...params)),element.addEventListener(eventName,()=>this[functionName](...params))}}}else element.setAttribute(name,value)}else element.removeAttribute(name);i++}}}setData(name,opts){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&this.cuppa.setData(name,opts)}setStorage(name,opts){this.setData(name,opts)}getData(name,opts){if(!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa)return opts&&opts.callback?(this.cuppa.getData(name,opts),void(this._getStorageDictionary[name]=opts)):this.cuppa.getData(name,opts)}getStorage(name,opts){return this.getData(name,opts)}removeStorage(){!this.cuppa&&this.cuppaStorage&&(this.cuppa=this.cuppaStorage),this.cuppa&&Object.entries(this._getStorageDictionary).map(([key,value])=>{value&&value.callback&&this.cuppa.removeListener(key,value.callback),delete this._getStorageDictionary[key]})}destroy(){this.removeStorage()}disconnectedCallback(){this.destroy&&this.destroy(),this.disconnected&&this.disconnected(this)}processRefs(html,addTo,tagAttr){tagAttr||(tagAttr="id");let nodes={},elements=Array.from(html.querySelectorAll(`[${tagAttr}]`));for(let i=0;i<elements.length;i++)addTo?addTo[elements[i].getAttribute(tagAttr)]=elements[i]:nodes[elements[i].getAttribute(tagAttr)]=elements[i];return addTo?addTo.rootHtml=html:nodes.rootHtml=html,nodes}binAll(element,isFunction){let propertyNames=Object.getOwnPropertyNames(Object.getPrototypeOf(element));isFunction&&(propertyNames=Object.keys(element));for(let i=0;i<propertyNames.length;i++)"function"==typeof element[propertyNames[i]]&&(element[propertyNames[i]]=element[propertyNames[i]].bind(element))}autoSetObservables(){let baseParamsMap={};Object.keys(this).map(key=>baseParamsMap[key]=1),setTimeout(()=>{this.autoDefineObservables&&Object.keys(this).map(key=>{baseParamsMap[key]||this.observables({[key]:this[key]})})},0)}observables(object,callback){let target=this,firstName;if(object)return Object.keys(object).map((name,index)=>{index||(firstName=name);let value=object[name],privateVar="_"+name;target[privateVar]=value,Object.defineProperty(target,name,{set:value=>{target[privateVar]=value,target.forceRender&&target.forceRender(),callback&&callback()},get:()=>target[privateVar],configurable:!0})}),target[firstName]}}

export default class CuppaSelectTime extends CuppaComponent {
	disabled = false;
	militaryTime = false;
	showHours = true;
	showMinutes = true;
	showSeconds = true;
	value = "";
	callback = null;
	hours = 12;
	minutes = 0;
	seconds = 0;
	meridiem = "AM";

	constructor(name, checked = false){
		super();
		this.name = name;
		this.checked = checked;
	}

	static get observedAttributes() { return ['value', 'disabled', 'military-time', 'select-class', 'show-hours', 'show-minutes', 'show-seconds'] }
	attributeChangedCallback(attr, oldVal, newVal) {
		if(attr == "military-time") attr = "militaryTime";
		if(attr == "show-hours") attr = "showHours";
		if(attr == "show-minutes") attr = "showMinutes";
		if(attr == "show-seconds") attr = "showSeconds";
		if(['disabled', 'militaryTime', 'showHours', 'showMinutes', 'showSeconds'].includes(attr)){ newVal = (newVal == "true" || newVal == "1") ? true : false; }
		this[attr] = newVal;
		if(attr=="value"){ this.processTime(); }
	}

	arrayFromTo(from, to){
		if(from == undefined || to === undefined) return [];
		let array = [];
		for(let i = from; i <= to; i++){ array.push(i); }
		return array;
	}

	processTime(){
		let parts = this.value.split(":");
		this.hours = (parts[0]) ? parseInt(parts[0]) : 12;
		this.minutes = (parts[1]) ? parseInt(parts[1]) : 0;
		this.seconds = (parts[2]) ? parseInt(parts[2]) : 0;
		this.meridiem = this.hours >= 12 ? "PM" : "AM";
		this.hours = !this.militaryTime && this.hours > 12 ? this.hours - 12 : this.hours;
	}

	onChanged(){
		this.dispatchEvent(new Event('change'));
		if(this.callback) this.callback(this);
	}

	getTime(){
		let hours = (this.meridiem == "PM") ? this.hours+12 : this.hours;
		let time = `${("0" + hours).slice(-2)}:${("0" + this.minutes).slice(-2)}:${("0" + this.seconds).slice(-2)}`;
		return time;
	}

	render(){
		return /*html*/`
            <style>
                cuppa-select-time{ display:inline-flex; }
                cuppa-select-time, cuppa-select-time *{ box-sizing: border-box; }
                cuppa-select-time[disabled=true] *{ opacity:0.5; pointer-events:none; }
                cuppa-select-time select{ margin:0 0 0 3px; border-radius: 3px; }
                cuppa-select-time select:first-of-type{ margin:0; }
            </style>

            <select onchange="e=>{ this.hours = parseInt(e.target.value); this.onChanged(); }" class="cuppa-hours ${ this["select-class"] || '' }" >
                ${ this.militaryTime ? (
			this.arrayFromTo(0,24).map(number=>{
				let numberStr = ('0' + number).slice(-2);
				return `<option value="${number}" ${ (number == this.hours) ? 'selected="selected"' : '' } >${numberStr}</option>`
			}).join(",")
		) : (
			this.arrayFromTo(1,12).map(number=>{
				let numberStr = ('0' + number).slice(-2);
				return `<option value="${number}" ${ (number == this.hours) ? 'selected="selected"' : '' } >${numberStr}</option>`
			}).join(",")
		)}
            </select>
            
            <select onchange="e=>{ this.minutes = parseInt(e.target.value); this.onChanged(); }" class="cuppa-minutes ${ this["select-class"] || ''}" >
                ${ this.arrayFromTo(0,59).map(number=>{
			let numberStr = ('0' + number).slice(-2);
			return `<option value="${number}" ${ (number == this.minutes) ? 'selected="selected"' : '' } >${numberStr}</option>`
		}).join(",") }
            </select>
            
            ${ !this.showSeconds ? '' : `
                <select onchange="e=>{ this.seconds = parseInt(e.target.value); this.onChanged(); }" class="cuppa-seconds ${ this["select-class"] || ''}" >
                    ${ this.arrayFromTo(0,59).map(number=>{
			let numberStr = ('0' + number).slice(-2);
			return `<option value="${number}" ${ (number == this.seconds) ? 'selected="selected"' : '' } >${numberStr}</option>`
		}).join(",") }
                </select>
            ` }
            
            ${this.militaryTime ? '' : `
                <select onchange="e=>{ this.meridiem = e.target.value; this.onChanged(); }" class="cuppa-meridiem ${ this["select-class"] || '' }" >
                   <option value="AM" ${ (this.meridiem == "AM") ? 'selected="selected"' : '' } >AM</option>
                   <option value="PM" ${ (this.meridiem == "PM") ? 'selected="selected"' : '' } >PM</option>
                </select>
            `}
        `
	}
}

customElements.define('cuppa-select-time', CuppaSelectTime);
document.defaultView.CuppaTimeSelector = CuppaSelectTime;
