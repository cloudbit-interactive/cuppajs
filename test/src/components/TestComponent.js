import { CuppaComponent } from "../../../libs/cuppa.component.js";

export default class TestComponent extends CuppaComponent {
    flag = this.observable('flag', false);

    onclick(e){
        console.log(e);
    }

    render(){
        return /*html*/`
            <div>
                <button onclick="() => this.flag = !this.flag">Swtich Flag: ${this.flag}</button>
                <input type="checkbox" ${ this.flag ? 'checked' : '' } onchange="(e)=>this.flag = e.target.checked" />
                
                ${ this.flag ? /*html*/`
                    <div data-name="data" >
                        <span>Flag is ${this.flag}</span>
                    </div>
                ` : /*html*/`<div data-name="data" onclick=this.onclick>Flag is ${this.flag}</div>` }
            </div>
        `
    }
}

customElements.define('test-comp', TestComponent);
