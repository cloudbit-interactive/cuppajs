import {CuppaComponent} from "//cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.component.min.js";
import { router } from "../App.js";

export default class NavBar extends CuppaComponent {
    constructor(){
        super();
        this.state = { path:null }
    }
    
    connected() { 
        router.updateLinks();
        router.addListener((path)=>this.setState({path}))
        router.resolve();
    }

    render(){
        return /*html*/`
            <h1 class="title1">
                <a class="link-clear" href="/">DOC.</a>
            </h1>
            <ul class="menu">
                <li class="menu-item ${ this.state.path == "simple-components" ? "selected" : "" }" >
                    <a class="menu-item-link" href="simple-components" >Simple Componets</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.state.path == "simple-todo" ? "selected" : "" }" >
                    <a class="menu-item-link" href="simple-todo" >Simple Todo</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.state.path == "todo" ? "selected" : "" }" >
                    <a class="menu-item-link" href="todo" >Todo Persistent</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item  ${ this.state.path == "performance" ? "selected" : "" }" >
                    <a class="menu-item-link" href="performance" >Performance</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.state.path == "shopping-cart" ? "selected" : "" }" >
                    <a class="menu-item-link" href="shopping-cart" >Shopping Cart</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.state.path == "cuppa-components" ? "selected" : "" }" >
                    <a class="menu-item-link" href="cuppa-components" >Cuppa Components</a>
                    <div class="menu-item-underline"></div>
                </li>
            </ul>
            `
    }
}

customElements.define('navbar-comp', NavBar);
