import { CuppaComponent } from "../../../libs/cuppa.component.js";

export default class TestComponent extends CuppaComponent {
    flag = this.observable('flag', false);

    render(){
        return /*html*/`
            <div>
                <button onclick="() => this.flag = !this.flag">Swtich Flag: ${this.flag}</button>
                <input type="checkbox" ${ this.flag ? 'checked' : '' } onchange="(e)=>this.flag = e.target.checked" />
                
                ${ this.flag ? /*html*/`
                    <div>
                        <span>Flag is ${this.flag}</span>
                    </div>
                ` : /*html*/`<div>Flag is ${this.flag}</div>` }
            </div>
        `
    }
}

customElements.define('test-comp', TestComponent);
