import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaAlert} from "../../../../cuppa/components/cuppa.alert.min.js";
import {Utils} from "../../../controlers/Utils.js";

export class CuppaAlertDoc extends CuppaComponent {
    alertResult = this.observable("alertResult");

    mounted(){
        Utils.loadPrism();
    }

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

    render(){
        return html`
            <div>
                <h1 class="title-2 mb-10">Cuppa Alert</h1>
                <div class="message" style="display: flex; align-items: center;">
                    <button class="button-1" @click="${this.showAlert}" >Show Alert</button>
                    <div class="separator-v"></div>
                    <div><strong>Result:</strong> ${JSON.stringify(this.alertResult)}</div>
                </div>
                <hr class="separator-1" />
                <h2 class="title-3 mb-10">Code Example</h2>
                ${Utils.prismCode({removeTabsCount:5, code:`
                    <!-- Import component -->
                    <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.alert.min.js" type="module"></script>
                    
                    <!-- Use with HTML Tag -->
                    <cuppa-alert 
                        title="Message" 
                        message="What is your name?" 
                        input-text="dd" 
                        cancel-text="Cancel" 
                        onclose="console.log(this.value, this.inputText)" >
                    </cuppa-alert>
                    
                    <!-- Use with JS -->
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
                <h2 class="title-3 mb-10">Properties</h2>
                <table class="table-1" >
                    <thead>
                        <tr>
                            <th>
                                <div class="tag-1">Property</div> 
                                <div class="tag-1 tag-1-white">attribute</div>
                                <div class="tag-1 tag-1-yellow">event</div>
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
                                <div class="tag-1 tag-1-white">title</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Title of the alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">message</div>
                                <div class="tag-1 tag-1-white">message</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Message of the alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">acceptText</div>
                                <div class="tag-1 tag-1-white">accept-text</div>
                            </td>
                            <td>string</td>
                            <td>accept</td>
                            <td>Text of the accept button.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">cancelText</div>
                                <div class="tag-1 tag-1-white">cancel-text</div>
                            </td>
                            <td>string</td>
                            <td></td>
                            <td>Text of the cancel button, if it is empty the alert don't show the button.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">backdropEnabled</div>
                                <div class="tag-1 tag-1-white">backdrop-enabled</div>
                            </td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>If true the alert will close when user click outside alert.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">inputText</div>
                                <div class="tag-1 tag-1-white">input-text</div>
                            </td>
                            <td>string</td>
                            <td>null</td>
                            <td>If is '' or any text, the alert show an input-text.</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1">placeholder</div>
                                <div class="tag-1 tag-1-white">placeholder</div>
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
                                Callback function when the user click on accept, cancel or close button.
                                <br />
                                return {value: boolean, inputText: string}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="tag-1 tag-1-yellow">onclose</div>
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
