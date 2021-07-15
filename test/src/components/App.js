import {CuppaComponent} from "../../../libs/cuppa.component.js";
import CuppaNotification from "../../../libs/components/cuppa.notification.js";
import {cuppa} from "../../../libs/cuppa.js";

export default class App extends CuppaComponent {

    connected(){
        let notification = new CuppaNotification({title: "Download", message:"Test Message"});
        document.body.append(notification);
    }

    render(){

        return /*html*/`
            
        `
    }
}

customElements.define('app-comp', App);