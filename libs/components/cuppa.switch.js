import {CuppaComponent} from "../cuppa.component.min.js";

export default class CuppaSwitch extends CuppaComponent {
    constructor(){
        super();
        this.state = {checked:false}
    }

    static get observedAttributes() { return ['checked'] }
    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr == "checked"){
            newVal = (newVal == "true" || newVal == "1") ? true : false;
            this.setState({[attr]:newVal}) 
        }
    }

    onChange(e){
        let checked = e.currentTarget.checked;
        this.setAttribute("checked", checked);
        this.setState({checked});
        this.dispatchEvent(new Event('change'));
        let onChangeAttr = this.getAttribute("onChange");
        if(onChangeAttr){ 
            try{ eval(`${onChangeAttr}('${checked}')`) }catch(err) { }
        }
    }

    render(){
        return /*html*/`
            <style>
                .cuppa-switch{ cursor: pointer; overflow: hidden; user-select: none; display:inline-flex; position:relative; }
                .cuppa-switch input{ position: absolute; top:0; left:0; opacity: 0; }
                .cuppa-switch .background{ transition: 0.3s; border:2px solid #BBB; width: 50px; height: 30px; border-radius: 30px; background: #DDD; overflow: hidden;  }
                .cuppa-switch input:checked + .background{ background: #2196F3; border:1px solid #0b76ca;  }
                .cuppa-switch .ball{ transition: 0.3s; border-radius: 30px; border:2px solid #EEE; background: #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.3); position: absolute; top:3px; height: 24px; left: 2px; width: 24px;  }
                .cuppa-switch input:checked + .background + .ball{ left:calc(100% - 24px - 2px); }
            </style>
            <label class="cuppa-switch" >
                <input type="checkbox" 
                    onChange="this.onChange"
                    ${ this.state.checked ? `checked="true"` : '' } 
                />
                <div class="background"></div>
                <div class="ball"></div>
            </label>
        `
    }
}

customElements.define('cuppa-switch', CuppaSwitch);
document.defaultView.CuppaSwitch = CuppaSwitch;
