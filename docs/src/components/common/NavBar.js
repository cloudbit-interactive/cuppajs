import {CuppaComponent} from "../../../../libs/cuppa.component.js";
import { cuppa } from "../../../../libs/cuppa.js";
import { router } from "../App.js";

export default class NavBar extends CuppaComponent {
    path; 
    
    connected() {
        router.updateLinks();
        router.addListener( path=>this.path = path );
        router.resolve();
    }

    render(){
        console.log("render", this.path)
        return /*html*/`
            <h1 class="title1">
                <a class="link-clear" href="/">DOC.</a>
            </h1>
            <ul class="menu">
                <h3 class="title3"><a class="menu-item-clear" href="basic-components">Basic</a></h3>
                <li class="menu-item ${ this.path == "basic-components" ? "selected" : "" }" >
                    <a class="menu-item-link" href="basic-components" >Components</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "simple-todo" ? "selected" : "" }" >
                    <a class="menu-item-link" href="simple-todo" >Simple Todo</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "todo" ? "selected" : "" }" >
                    <a class="menu-item-link" href="todo" >Todo Persistent</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item  ${ this.path == "performance" ? "selected" : "" }" >
                    <a class="menu-item-link" href="performance" >Performance</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "shopping-cart" ? "selected" : "" }" >
                    <a class="menu-item-link" href="shopping-cart" >Shopping Cart</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "use-components" ? "selected" : "" }" >
                    <a class="menu-item-link" href="use-components" >Use Components</a>
                    <div class="menu-item-underline"></div>
                </li>
                <h3 class="title3 m-t-20">More</h3>
                <li class="menu-item ${ this.path == "component-cicle" ? "selected" : "" }" >
                    <a class="menu-item-link" href="component-cicle" >Component Cicle</a>
                    <div class="menu-item-underline"></div>
                </li>
            </ul>
            `
    }
}

customElements.define('navbar-comp', NavBar);
