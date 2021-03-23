import {CuppaComponent} from "../../../libs/cuppa/cuppa.component.js";
import { router } from "../App.js";

export default class NavBar extends CuppaComponent {
    path; 
    
    connected() {
        router.updateLinks();
        router.addListener( path=>this.path = path );
        router.resolve();
    }

    render(){
        return /*html*/`
            <h1 class="title1">
                <a class="link-clear" href="/">DOC.</a>
            </h1>
            <ul class="menu">
                <h3 class="title3"><a class="menu-item-clear" href="basic-component">Basic</a></h3>
                <li class="menu-item ${ this.path == "basic-component" ? "selected" : "" }" >
                    <a class="menu-item-link" href="basic-component" >Component</a>
                    <div class="menu-item-underline"></div>
                </li>
                
                <h3 class="title3 m-t-20">More</h3>
                <li class="menu-item  ${ this.path == "performance" ? "selected" : "" }" >
                    <a class="menu-item-link" href="performance" >Component Performance</a>
                    <div class="menu-item-underline"></div>
                </li>
            </ul>
            `
    }
}

customElements.define('navbar-comp', NavBar);
