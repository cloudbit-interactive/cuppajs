import {CuppaComponent} from "../../../libs/cuppa.component.js";
import CuppaNotification from "../../../libs/components/cuppa.notification.js";
import CuppaCollapsible from "../../../libs/components/cuppa.collapsible.js";
import {cuppa} from "../../../libs/cuppa.js";
import IncreaseDecreaseNumber from "./IncreaseDecreaseNumber.js";
import { CuppaTabs, CuppaTab } from "../../../libs/components/cuppa.tabs.js";

export default class App extends CuppaComponent {
    form = this.observable("form", {tab:"tab2"});

    onclickButton(e){
        e.preventDefault(); e.stopPropagation();
        console.log("onclickButton", e.currentTarget)
    }

    connected(){
        let header = `<div style="padding: 10px 20px;">Example Question Displayed</div>`;
        let headerRight = `<div style="padding: 10px 20px;"><button onclick="this.onclickButton">CLICk</button></div>`;
        let content = `<div style="padding:20px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quae cum ita sint, effectum est nihil esse malum, quod turpe non sit. Sed eum qui audiebant, quoad poterant, defendebant sententiam suam. Transfer idem ad modestiam vel temperantiam, quae est moderatio cupiditatum rationi oboediens. Nummus in Croesi divitiis obscuratur, pars est tamen divitiarum. Deinde qui fit, ut ego nesciam, sciant omnes, quicumque Epicurei esse voluerunt?</div>`;
        let accordion = new CuppaCollapsible({header, content, headerRight});
            accordion.bind(this);
            accordion.style.margin = "0 0 10px";

        let notification = new CuppaNotification({content:accordion, title:"", message:"", iconURL:""});
            notification.style.width = "100%";
            notification.style.maxWidth = "500px";
        document.body.append(notification);
    }

    render(){
        console.log(this.form)
        return /*html*/`
            <increase-decrease-number></increase-decrease-number>
            <cuppa-tabs selected="${this.form.tab}" onchange="(e)=>{ this.form.tab = e.target.selected; this.forceRender(); }">
                <cuppa-tab value="tab1">Tab1</cuppa-tab>
                <cuppa-tab value="tab2">Tab2</cuppa-tab>
            </cuppa-tabs>
            <button onclick="()=>{ this.form.tab = 'tab1'; this.forceRender(); }">Reset Cuppa Tabs</button>
        `
    }
}

customElements.define('app-comp', App);