import {CuppaComponent} from "../cuppa.component.min.js";
import {cuppa} from "../cuppa.min.js";

export class CuppaTabs extends CuppaComponent {
    constructor(){
        super();
        this.state = {selected:null}
        this.group = cuppa.unique("cuppa-tab-");
    }

    static get observedAttributes() { return ['selected'] }
    attributeChangedCallback(attr, oldVal, newVal) { this.setState({[attr]:newVal}) }

    rendered(){
        let tabs = this.querySelectorAll("cuppa-tab");
        cuppa.attr(tabs, "selected", "", true)
        let selectedNode = this.querySelector(`cuppa-tab[value=${this.state.selected}]`);
        if(selectedNode) selectedNode.setAttribute("selected", "");
        cuppa.offGroup(this.group);
        cuppa.on(tabs, "click", this.onClick, this.group);
    }

    onClick(e){
        let value = e.currentTarget.getAttribute("value");
        if(!value) return;
        this.setAttribute("selected",value);
    }

    render(){
        return /*html*/`
            <style>
                cuppa-tabs{ display:inline-flex; background:#40495A; border-radius:5px; user-select: none; }
            </style>
            `
    }
}
customElements.define('cuppa-tabs', CuppaTabs);
document.defaultView.CuppaTabs = CuppaTabs;

export class CuppaTab extends CuppaComponent {
    constructor(){
        super();
        this.state = {attr1:null, attr2:false}
    }

    render(){
        return /*html*/`
            <style>
                cuppa-tab{ transition:0.3s; transition-property:background-color, color, opacity; display:flex; justify-content:center; align-items:center; color:#B1B1B1; padding:10px 10px; font-size:11px; cursor:pointer; }
                cuppa-tab[selected]{ background:#2296F3; color:#FFF; cursor:default; pointer-events: none; box-shadow:0 1px 3px rgba(0,0,0,0.2) }
                cuppa-tab:first-of-type{ border-radius:5px 0 0 5px; }
                cuppa-tab:last-of-type{ border-radius:0 5px 5px 0; }
                cuppa-tab:hover{ opacity:0.6; }
            </style>
            `
    }
}
customElements.define('cuppa-tab', CuppaTab);
document.defaultView.CuppaTab = CuppaTab;