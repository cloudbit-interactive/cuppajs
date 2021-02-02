import {CuppaComponent} from "../../libs/cuppa.component.js"
import {CuppaRouter} from "../../libs/cuppa.router.js";
import NavBar from "./common/NavBar.js"

export const router = new CuppaRouter({root:"/examples/", hash:"#/", titlesMap:{"/":"Shopping Cart"}});

export default class AppComp extends CuppaComponent {

    constructor(){
        super();
        router.on('*',(params)=>this.forceRender() );
        router.resolve();
    }

    render(){
        let pathData = router.getPathData();
        return /*html*/`
            <main class="wire">
                <navbar-comp></navbar-comp>
            </main>`
    }
}

customElements.define('app-comp', AppComp);