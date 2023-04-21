import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaAlert} from "../../../../cuppa/components/cuppa.alert.min.js";
import {Utils} from "../../../controllers/Utils.js";
import { AceModes, CuppaPreviewCode } from "../../../../cuppa/components/cuppa-preview-code.min.js";
import { CuppaTheme } from "../../../../cuppa/cuppa.theme.min.js";
import {cuppa} from "../../../../cuppa/cuppa.min.js";

export class CuppaAlertDoc extends CuppaComponent {
	alertResult = this.observable("alertResult");

	showAlert(){
		let alert = cuppa.newElement(`
			<cuppa-alert
        data-title="Message"
        message="Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
        cancel-text="Cancel"
        input-text=""
        placeholder="Type your message here"
        theme="${CuppaTheme.getTheme()}"
      />`
		);
		alert.onclose = (e)=>{  this.alertResult = e.detail }
		document.body.append(alert);
	}

	onCloseModal(){
		console.log("--")
	}

	showAlertPersonalized(){
		let alert = cuppa.newElement(`
			<cuppa-alert
				backdrop-enabled="true"
        accept-text=""
        theme="${CuppaTheme.getTheme()}"
        style-modal="width:95vw; max-width:none; height:95vh"
      >
      	<cuppa-alert-content class="flex" style="height: 100%">
      		<div class="modal-header">
      			<div>PDF Preview</div>
      			<button 
	             class="button-alpha bg-error b-none b-radius-5 close-alert" 
	             style="height:2.8rem; width: 3rem;"
      			 >
      				<i class="fas fa-times color-white"></i>
						</button>
					</div>
      		<iframe src="media/docs/pdf.pdf" style="height:100%; border:0;" ></iframe>
				</cuppa-alert-content>
			</cuppa-alert>`
		);
		document.body.append(alert);
	}

	render(){
		return html`
      <section>
        <h1 class="title-2">Cuppa Alert</h1>
        <div class="m-t-20" style="display: flex; align-items: center;">
          <button class="button-1" @click="${this.showAlert}" >Show Alert</button>
          <div class="separator-v"></div>
          <div><strong>Result:</strong> ${JSON.stringify(this.alertResult)}</div>
        </div>
      </section>
      
      <hr />
      
      <section>
        <h2 class="title-3 mb-10">Code Example</h2>
        <cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="33rem"
					preview-height="25rem"
					mode=${AceModes.html}
					remove-tabs=${6}
          preview=${true}
          expandable=${false}
          preview-css="${Utils.getPreviewCSS()}"
				>
          <code>
            <!--[        
            <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.alert.min.js" type="module"></script>
						<cuppa-alert 
							title="Message" 
							message="What is your name?" 
							input-text="" 
							cancel-text="Cancel" 
							placeholder="Type your name..."
							theme="light"
							onclose="console.log(this.value, this.inputText)" 
						>
						</cuppa-alert>
            ]-->
          </code>
        </cuppa-preview-code>
      </section>
      
      <hr />
      
      <section>
        <h2 class="title-3">Show Personalized Alert</h2>
        <button class="button-1 m-t-20" @click="${this.showAlertPersonalized}" >Preview PDF</button>
	      <cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="33rem"
					preview-height="25rem"
					mode=${AceModes.html}
					remove-tabs=${6}
          preview=${false}
          expandable=${true}
          preview-css="${Utils.getPreviewCSS()}"
	      >
		      <code>
            <!--[
						<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.alert.min.js" type="module"></script>
						<cuppa-alert
							title="PDF Preview"
							accept-text=""
							class="modal-1"
							top-bar="true"
						>
							<cuppa-alert-content>
								<iframe src="media/docs/pdf.pdf"></iframe>
							</cuppa-alert-content>
						</cuppa-alert>
						
						<style>
							.modal-1{ padding: calc(env(safe-area-inset-top) + 2rem) 2rem 2rem; }
							.modal-1 .cuppa-alert_modal{ max-width: none; padding: 0rem; height: 100%; display: flex; flex-direction: column; }
							.modal-1 .cuppa-alert_message{ overflow: auto; flex:1; }
							.modal-1 cuppa-alert-content{ height:100%; overflow:hidden; }
							.modal-1 .cuppa-alert_message iframe{ width:100%; height:100%; border:0; }
						</style>
            ]-->
		      </code>
	      </cuppa-preview-code>
      </section>
      
      <hr />
      
      <section>
        <h2 class="title-3 ">Properties</h2>
        <div class="o-auto b-radius-10 m-t-20" >
          <table class="table-1 min-width" >
	          ${Utils.tableHeaderDoc()}
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
                <div class="tag-1">classes</div>
              </td>
              <td>array of strings</td>
              <td></td>
              <td>Aditional classes of the alert.</td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">topBar</div>
                <div class="tag-1 tag-1-white">top-bar</div>
              </td>
              <td>boolean</td>
              <td>false</td>
              <td>If true the alert will show a top bar with the title.</td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">closeImage</div>
                <div class="tag-1 tag-1-white">close-image</div>
              </td>
              <td>string</td>
              <td></td>
              <td>Image of the close button.</td>
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
            <tr>
              <td>
                <div class="tag-1 tag-1-green">cuppa-alert-content</div>
              </td>
              <td>Component</td>
              <td></td>
              <td>
                Use this tag to add HTML content to the alert
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
      <style>
	      .modal-header{ display: flex; justify-content: space-between; align-items: center; width: 100%; height: 4rem; padding: 0 1rem; }
        
      </style>
		`
	}
}

customElements.define('cuppa-alert-doc', CuppaAlertDoc);
