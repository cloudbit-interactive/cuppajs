import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaAlert} from "../../../../cuppa/components/cuppa.alert.js";
import {Utils} from "../../../controlers/Utils.js";

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
            callback:(res)=>{
                this.alertResult = res;
            }
        });
        document.body.append(alert);
    }

    mounted(){
        Utils.loadPrism();
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
                <h2 class="title-3 mb-20">Code Example</h2>
                ${Utils.prismCode({removeTabsCount:5, code:`
                    <!-- IMPORTING COMPONENT -->
                    <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.alert.min.js" type="module"></script>
                    <!-- USING WITH HTML TAG -->
                    <cuppa-alert title="Message" message="Hello There!" @close="${(e)=>console.log(e.detail)}" ></cuppa-alert>
                    <!-- USING WHIT JS -->
                    <script type="module">
                        let alert = new CuppaAlert({
                            title: 'Message',
                            message: 'My message',
                            callback:(res)=>{ console.log(res); }
                        });
                        document.body.append(alert);
                    </script>
                `})}
                
                <hr class="separator-1" />
                <table class="table-1 mt-20" >
                    <thead>
                        <tr>
                            <th>
                                <div class="tag-1">Property</div> <div class="tag-1 tag-1-white">attribute</div>
                            </th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="tag-1">title</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Title of the alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">message</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Message of the alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">acceptText</div> <div class="tag-1 tag-1-white">accept-text</div>
                            </td>
                            <td>string</td>
                            <td>accept</td>
                            <td>Text of the accept button.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">cancelText</div> <div class="tag-1 tag-1-white">cancel-text</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Text of the cancel button, if it is empty the alert don't show the button.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">backdropEnabled</div> <div class="tag-1 tag-1-white">backdrop-enabled</div>
                            </td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>If true the alert will close when user click outside alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">inputText</div> <div class="tag-1 tag-1-white">input-text</div>
                            </td>
                            <td>string</td>
                            <td>null</td>
                            <td>If is '' or any text, the alert show an input-text.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">placeholder</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Placeholder of the input-text.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">callback</div>
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
                        <tr>
                            <td>
                                <div class="tag-1">@close</div>
                            </td>
                            <td>Event</td>
                            <td></td>
                            <td>Fires when alert closed.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
    }
}

customElements.define('cuppa-alert-doc', CuppaAlertDoc);
