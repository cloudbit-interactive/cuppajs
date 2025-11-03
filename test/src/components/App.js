import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./TestComponent.js";
import {CuppaSelect, CuppaSelectType} from "./cuppa.select.js";
//import {LitComponent} from "./lit/LitComponent.js";


export default class App extends CuppaComponent {
  select = [
    {id: 'option1', name: 'Option1', email:'option1@mail.com'},
    {id: 'option2', name: 'Option2', email:'option2@mail.com'},
    {id: 'option3', name: 'Option3', email:'option3@mail.com'},
    {id: 'option4', name: 'Option4', email:'option4@mail.com'},
  ];
  selected = 'option1,option4';

	render(){
		return html`
      <div>
				<cuppa-select
          label-column="name,email"
          selected="${this.selected}"
          style="width:400px;"
          select-style="border:1px solid #ccc; padding:5px;"
          dropdown-style="max-width:400px;"
          type="${CuppaSelectType.MULTIPLE}"
          auto-close="false"
          .options=${this.select}
          .callback=${(selected)=>{
            this.selected = selected;
          }}
        ></cuppa-select>
      </div>
		`
	}
}

customElements.define('app-comp', App);
