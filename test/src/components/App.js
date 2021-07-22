import {CuppaComponent} from "../../../libs/cuppa.component.js";
import CuppaNotification from "../../../libs/components/cuppa.notification.js";
import CuppaAccordion from "../../../libs/components/cuppa.accordion.js";
import {cuppa} from "../../../libs/cuppa.js";

export default class App extends CuppaComponent {

    connected(){
        let header = cuppa.newElement(`<div style="padding: 10px 20px;">Example Question Displayed</div>`);
        let content = cuppa.newElement(`<div style="padding:20px;">CONTENT</div>`);
        let accordion = new CuppaAccordion({header, content});
             accordion.style.margin = "0 0 10px";

        let notification = new CuppaNotification({content:accordion, title:"", message:"", iconURL:""});
            notification.style.width = "100%";
            notification.style.maxWidth = "500px";
        document.body.append(notification);
    }

    render(){
        return /*html*/`
           
        `
    }
}

customElements.define('app-comp', App);