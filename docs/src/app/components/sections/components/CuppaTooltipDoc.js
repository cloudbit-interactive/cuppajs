import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaAlert} from "../../../../cuppa/components/cuppa.alert.min.js";
import {Utils} from "../../../controllers/Utils.js";

export class CuppaTooltipDoc extends CuppaComponent {
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

	showAlertPersonalized(){
		let alert = new CuppaAlert({
			message: html`<iframe src="media/docs/pdf.pdf"></iframe>`,
			backdropEnabled:false,
			acceptText:"",
			title:"PDF Preview",
			topBar:true,
			classes:["modal-1"],
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

				
		`
	}
}

customElements.define('cuppa-tooltip-doc', CuppaTooltipDoc);
