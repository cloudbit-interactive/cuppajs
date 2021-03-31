import {CuppaComponent} from "../../../libs/cuppa/cuppa.component.js";
import { Utils } from "../../controlers/Utils.js";
import { router } from "../App.js";

export default class NavBar extends CuppaComponent {
    path; 
    
    connected() {
        router.updateLinks();
        router.addListener( this.onRouter );
        router.resolve();
    }

    onRouter(path){
        this.path = path;
        Utils.openMenu(false);
    }

    render(){
        return /*html*/`
            <h1 class="title1" style="display:flex; justify-content:space-between; align-items:center;">
                <a class="link-clear" href="/">DOC.</a>
                <a class="button-alpha" href="https://github.com/cloudbit-interactive/cuppajs" target="_blank"><i class="fab fa-github" style="font-size:30px"></i></a>
            </h1>
            <ul class="menu">
                <h3 class="title3"><a class="menu-item-clear" href="cuppa-component">Basic</a></h3>
                <li class="menu-item ${ this.path == "cuppa-component" ? "selected" : "" }" >
                    <a class="menu-item-link" href="cuppa-component" ><i class="fas fa-puzzle-piece" ></i> Component</a>
                    <div class="menu-item-underline"></div>
                </li>

                <li class="menu-item ${ this.path == "cuppa-router" ? "selected" : "" }" >
                    <a class="menu-item-link" href="cuppa-router" ><i class="fas fa-map-signs"></i> Router</a>
                    <div class="menu-item-underline"></div>
                </li>
                
                <li class="menu-item ${ this.path == "cuppa-storage" ? "selected" : "" }" >
                    <a class="menu-item-link" href="cuppa-storage" ><i class="fas fa-database"></i> Storage</a>
                    <div class="menu-item-underline"></div>
                </li>
                
                <h3 class="title3 m-t-20">More</h3>
                <li class="menu-item  ${ this.path == "performance" ? "selected" : "" }" >
                    <a class="menu-item-link" href="performance" ><i class="fas fa-tachometer-alt"></i> Component Performance</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item disabled ${ this.path == "shopping-list" ? "selected" : "" }" >
                    <a class="menu-item-link no-router" href="shopping-list" ><i class="fab fa-medapps"></i> Shipping List</a>
                    <div class="menu-item-underline"></div>
                </li>
            </ul>
            `
    }
}

customElements.define('navbar-comp', NavBar);
