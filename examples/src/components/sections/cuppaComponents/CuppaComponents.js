import CuppaSwitch from "../../../../../libs/components/cuppa.switch.js";
import {CuppaComponent} from "../../../../../libs/cuppa.component.js";
import("../../../../../libs/components/cuppa.switch.js");
import("../../../../../libs/components/cuppa.alert.js");

export default class CuppaComponents extends CuppaComponent {
    
    constructor(){
        super();
    }

    onChange(e){
        console.log(e.currentTarget.state)
    }

    onAlert(){
        document.body.append(new CuppaAlert({title:"Hi,", message:"Please specify your name", inputText:"", cancelText:"Cancel", callback:(value, input)=>console.log(value, input)} ));
    }

    render(){
        return /*html*/`
            <div>
                <h2 class="title2">How use a component created in any framework</h2>
                <p>There are tons of way to load a components depending of each case. Bellow is showed the simples and fast way to import it.</p>
                
                <h3 class="title3">CuppaSwitch</h3>
                <cuppa-switch name="switch1" onChange="this.onChange" ></cuppa-switch>
                <!--
                <iframe style="height:600px;" src="https://stackblitz.com/edit/cuppa-component-import1?embed=1&file=index.html&hideExplorer=1&hideNavigation=1"></iframe>
                -->

                <h3 class="title3">Cuppa Alert</h3>
                <button onclick="this.onAlert">Show Alert</button>
            </div>`
    }
}

customElements.define('cuppa-components', CuppaComponents);
