import {CuppaComponent} from "../cuppa.component.min.js";

export default class CuppaSwitch extends CuppaComponent {

    constructor(name, checked = false){
        super();
        this.state = {name, checked};
    }

    static get observedAttributes() { return ['checked', 'name', 'disabled'] }
    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr == "checked" || attr=="disabled"){
            newVal = (newVal == "true" || newVal == "1") ? true : false;
            this.setState({[attr]:newVal}) 
        }else{
            this.setState({[attr]:newVal})
        }
    }

    onChange(e){
        let checked = e.currentTarget.checked;
        this.setAttribute("checked", checked);
        this.setState({checked});
        let onChangeAttr = this.getAttribute("onChange");
        if(onChangeAttr){ 
            try{ eval(`${onChangeAttr}('${this.state.name}', '${checked}')`) }catch(err) { }
        }
    }

    render(){
        return /*html*/`
            <style>
                cuppa-switch, cuppa-switch *{ box-sizing: border-box; }
                cuppa-switch{ cursor: pointer; overflow: hidden; user-select: none; display:inline-flex; position:relative; }
                cuppa-switch input{ position: absolute; top:0; left:0; opacity: 0; }
                cuppa-switch .background{ transition: 0.3s; border:2px solid #BBB; width: 50px; height: 30px; border-radius: 30px; background: #DDD; overflow: hidden;  }
                    cuppa-switch input:checked + .background{ background: #2196F3; border:1px solid #0b76ca;  }
                cuppa-switch .ball{ transition: 0.3s; border-radius: 30px; border:2px solid #EEE; background: #FFF; box-shadow: 0 2px 5px rgba(0,0,0,0.3); position: absolute; top:3px; height: 24px; left: 2px; width: 24px;  }
                    cuppa-switch input:checked + .background + .ball{ left:calc(100% - 24px - 2px); }
                cuppa-switch[disabled=true]{ opacity:0.3; pointer-events:none; }
            </style>
            <label>
                <input type="checkbox" 
                    name="${this.state.name}"
                    onChange="this.onChange"
                    ${ this.state.checked ? `checked="checked"` : '' } 
                />
                <div class="background"></div>
                <div class="ball"></div>
            </label>
        `
    }
}

customElements.define('cuppa-switch', CuppaSwitch);
document.defaultView.CuppaSwitch = CuppaSwitch;
