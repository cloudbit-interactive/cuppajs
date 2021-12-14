import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaAlert} from "../../../../cuppa/components/cuppa.alert.js";

export class CuppaAlertDoc extends CuppaComponent {

    constructor(){ super(); }

    showAlert(){
        let alert = new CuppaAlert({
            title: "Message",
            message: "This is a test message",
            acceptText: "Ok",
            cancelText: "Cancel",
        });
        document.body.append(alert);
    }

    render(){
        document.body.append(new CuppaAlert({message:"This is a test message"}));
        return html`
            <div>
                <h1 class="title2">Cuppa Alert Component</h1>
                <div>
                    <button @click="${this.showAlert}" >Show Alert</button>
                </div>
            </div>
        `
    }
}

customElements.define('cuppa-alert-doc', CuppaAlertDoc);
