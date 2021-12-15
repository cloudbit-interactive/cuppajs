import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaAlert} from "../../../../cuppa/components/cuppa.alert.js";

export class CuppaAlertDoc extends CuppaComponent {
    alertResult = this.observable("alertResult");

    constructor(){ super(); }

    showAlert(){
        let alert = new CuppaAlert({
            title: "Message",
            message: html`This is a <strong>html</strong> text message`,
            backdropEnabled:true,
            cancelText: "Cancel",
            inputText: "",
            placeholder: "Type your message here",
            callback:(value, text)=>{
                this.alertResult = {value, text};
            }
        });
        document.body.append(alert);
    }

    render(){
        return html`
            <div>
                <h1 class="title-2">Cuppa Alert Component</h1>
                <div class="message mt-20" style="display: flex; align-items: center;">
                    <button class="button-1" @click="${this.showAlert}" >Show Alert</button>
                    <div class="separator-v"></div>
                    ${ !this.alertResult ? '' : html`
                        <div>Result: ${JSON.stringify(this.alertResult)}</div>
                    `}
                </div>
                <hr class="separator-1" />
                <table class="table-1 mt-20" >
                    <thead>
                        <tr>
                            <th>
                                <div class="tag">Property</div> <div class="tag tag-white">attribute</div>
                            </th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="tag">title</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Title of the alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag">message</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Message of the alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag">acceptText</div> <div class="tag tag-white">accept-text</div>
                            </td>
                            <td>string</td>
                            <td>accept</td>
                            <td>Text of the accept button.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag">cancelText</div> <div class="tag tag-white">cancel-text</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Text of the cancel button, if it is empty the alert don't show the button.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag">backdropEnabled</div> <div class="tag tag-white">backdrop-enabled</div>
                            </td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>If true the alert will close when user click outside alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag">inputText</div> <div class="tag tag-white">input-text</div>
                            </td>
                            <td>string</td>
                            <td>null</td>
                            <td>If is '' or any text, the alert show an input-text.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag">placeholder</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Placeholder of the input-text.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag">callback</div>
                            </td>
                            <td>function</td>
                            <td></td>
                            <td>
                                Callback function when the user click accept/cancel/close button.
                                <br />
                                return {
                                    value: boolean,
                                    inputText: string
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }
}

customElements.define('cuppa-alert-doc', CuppaAlertDoc);
