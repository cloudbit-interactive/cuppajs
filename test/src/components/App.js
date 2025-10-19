import {CuppaComponent, html} from "../../../libs/cuppa.component.js";
import {cuppa, log} from "../../../libs/cuppa.js";
import CuppaStorageTest from "./cuppaStorage/CuppaStorageTest.js";
import "./TestComponent.js";
import {CuppaMenu} from "./cuppa.menu.js";
//import {LitComponent} from "./lit/LitComponent.js";


export default class App extends CuppaComponent {

	render(){
		return html`
      <div style="display:flex; gap:5px; align-items: center;">
				<button class="btnContextual">Contextual Menu</button>
        <cuppa-menu
          target=".btnContextual"
          pos-y="${CuppaMenu.POSITION.BOTTOM}"
          pos-x="${CuppaMenu.POSITION.LEFT_IN}"
          contextual-menu="true"
          show-on-mouse-over="true"
        >
          <button>1</button>
          <button class="contextualMenu2">2</button>
          <cuppa-menu
            target=".contextualMenu2"
            pos-y="${CuppaMenu.POSITION.TOP_IN}"
            pos-x="${CuppaMenu.POSITION.RIGHT}"
          >
            <button>1 1</button>
          </cuppa-menu>
          <button class="contextualMenu3">3</button>
          <cuppa-menu
            target=".contextualMenu3"
            pos-y="${CuppaMenu.POSITION.TOP_IN}"
            pos-x="${CuppaMenu.POSITION.RIGHT}"
          >
            <button class="m31">3 1</button>
            <cuppa-menu
              target=".m31"
              pos-y="${CuppaMenu.POSITION.TOP_IN}"
              pos-x="${CuppaMenu.POSITION.RIGHT}"
            >
              <button >3 1 1</button>
              <button class="m312" >3 1 2</button>
              <cuppa-menu
                target=".m312"
                pos-y="${CuppaMenu.POSITION.TOP_IN}"
                pos-x="${CuppaMenu.POSITION.RIGHT}"
              >
                <button >3 1 2 1</button>
                <button >3 1 2 2</button>

              </cuppa-menu>
            </cuppa-menu>
          </cuppa-menu>
        </cuppa-menu>
	      
	      
        <button class="btnContextual2">Contextual Menu2</button>
        <cuppa-menu
          target=".btnContextual2"
          pos-y="${CuppaMenu.POSITION.BOTTOM}"
          pos-x="${CuppaMenu.POSITION.LEFT_IN}"
          contextual-menu="true"
        >
          <button class="btnContextual21" >2 1</button>
          <cuppa-menu
            target=".btnContextual21"
            pos-y="${CuppaMenu.POSITION.TOP_IN}"
            pos-x="${CuppaMenu.POSITION.RIGHT}"
          >
            <button>2 1 1</button>
            <button>2 1 2</button>
          </cuppa-menu>

          <button class="btnContextual22" >2 2</button>
        </cuppa-menu>
	      
        <button class="menu1">Menu1</button>
        <cuppa-menu
          target=".menu1"
          pos-y="${CuppaMenu.POSITION.BOTTOM}"
          pos-x="${CuppaMenu.POSITION.LEFT_IN}"
          show-on-mouse-over="true"
        >
          <button>menu 1 1</button>
          <button class="menu12">menu 1 2</button>
          <cuppa-menu
            target=".menu12"
            pos-y="${CuppaMenu.POSITION.TOP_IN}"
            pos-x="${CuppaMenu.POSITION.RIGHT}"
          >
            <button>menu 1 2 1</button>
          </cuppa-menu>

        </cuppa-menu>
	      
        <button class="menu2">Menu2</button>
        <cuppa-menu
          target=".menu2"
          pos-y="${CuppaMenu.POSITION.BOTTOM}"
          pos-x="${CuppaMenu.POSITION.LEFT_IN}"
          show-on-mouse-over="true"
        >
          <button>menu 2 1</button>
        </cuppa-menu>
	      
	      <div style="background: #F00; height:10px; width:1px; "></div>
	      
        <button class="menu3">Menu3</button>
        <cuppa-menu
          target=".menu3"
          pos-y="${CuppaMenu.POSITION.BOTTOM}"
          pos-x="${CuppaMenu.POSITION.LEFT_IN}"
        >
          <button>menu 3 1</button>
        </cuppa-menu>
	      
        <button class="menu4">Menu4</button>
        <cuppa-menu
          target=".menu4"
          pos-y="${CuppaMenu.POSITION.BOTTOM}"
          pos-x="${CuppaMenu.POSITION.LEFT_IN}"
        >
          <button>menu 4 1</button>
          <button>menu 4 2</button>
          <button class="menu43">menu 4 3</button>
          <cuppa-menu
            target=".menu43"
            pos-y="${CuppaMenu.POSITION.TOP_IN}"
            pos-x="${CuppaMenu.POSITION.RIGHT}"
          >
            <button>menu 4 3 1</button>
            <button class="menu432">menu 4 3 2</button>
            <cuppa-menu
              target=".menu432"
              pos-y="${CuppaMenu.POSITION.TOP_IN}"
              pos-x="${CuppaMenu.POSITION.RIGHT}"
            >
              <button>menu 4 3 2 1</button>
              <button>menu 4 3 2 2</button>
            </cuppa-menu>
	          
	          
          </cuppa-menu>
	        
          <button>menu 4 4</button>
        </cuppa-menu>
       
      </div>
		`
	}
}

customElements.define('app-comp', App);
