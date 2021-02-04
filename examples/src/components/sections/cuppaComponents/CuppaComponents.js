import {CuppaComponent} from "../../../../../libs/cuppa.component.js";

import("../../../../../libs/components/cuppa.switch.js");

export default class CuppaComponents extends CuppaComponent {
    constructor(){
        super();
        this.state = {attr1:null, attr2:false}
    }

    onChange(e){
        console.log(e.currentTarget.state)
    }

    render(){
        return /*html*/`
            <div>
                <h2 class="title2">How use a component created in any framework</h2>
                <p>There are tons of way to load a components depending of each case. Bellow is showed the simples and fast way to import it.</p>
                <cuppa-switch name="switch1" onChange="this.onChange" ></cuppa-switch>
                
                <iframe style="height:600px;" src="https://stackblitz.com/edit/cuppa-component-import1?embed=1&file=index.html&hideExplorer=1&hideNavigation=1"
                        
                ></iframe>
            </div>`
    }
}

customElements.define('cuppa-components', CuppaComponents);
