import {CuppaComponent, html} from "../../../cuppa/cuppa.component.min.js";
import { Globals } from "../../controlers/Globals.js";
import { Utils } from "../../controlers/Utils.js";

export class Menu extends CuppaComponent {
    path = this.observable("path");

    mounted() {
        Globals.router.updateLinks();
        Globals.router.addListener( this.onRouter );
        Globals.router.resolve();
    }

    onRouter(path){
        this.path = path;
        if(Globals.menuMobile) Globals.menuMobile.close();
    }

    render(){
        return html`
            <h1 class="title-1" style="display:flex; justify-content:space-between; align-items:center;">
                <a class="link-clear" href="/" aria-label="Home">DOC.</a>
                <div>
                    <a class="button-alpha" href="https://www.npmjs.com/package/cuppajs" aria-label="NPM" target="_blank"><i class="fab fa-npm" style="font-size:30px"></i></a>
                    <a class="button-alpha" href="https://github.com/cloudbit-interactive/cuppajs" aria-label="Github" target="_blank"><i class="fab fa-github" style="font-size:30px"></i></a>
                </div>
            </h1>
            
            <h2 class="title-3 mt-20"><a class="menu-item-clear" href="cuppa-component">Basic</a></h2>
            <ul class="menu">
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
            </ul>
            
            <h2 class="title-3 mt-20">Cuppa Components</h2>
            <ul class="menu">
                <li class="menu-item ${ this.path == "cuppa-alert" ? "selected" : "" }" >
                    <a class="menu-item-link" href="cuppa-alert" ><i class="fas fa-puzzle-piece"></i> Cuppa Alert</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "cuppa-switch" ? "selected" : "" }" >
                    <a class="menu-item-link" href="cuppa-switch" ><i class="fas fa-puzzle-piece"></i> Cuppa Switch</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "cuppa-tabs" ? "selected" : "" }">
                    <a class="menu-item-link" href="cuppa-tabs" ><i class="fas fa-puzzle-piece"></i> Cuppa Tabs</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "cuppa-collapsible" ? "selected" : "" }">
                    <a class="menu-item-link" href="cuppa-collapsible" ><i class="fas fa-puzzle-piece"></i> Cuppa Collapsible</a>
                    <div class="menu-item-underline"></div>
                </li>
                <li class="menu-item ${ this.path == "cuppa-drawer" ? "selected" : "" }">
                    <a class="menu-item-link" href="cuppa-drawer" ><i class="fas fa-puzzle-piece"></i> Cuppa Drawer</a>
                    <div class="menu-item-underline"></div>
                </li>
            </ul>
            
            <h2 class="title-3 mt-20">More</h2>
            <ul class="menu">
                <li class="menu-item  ${ this.path == "performance" ? "selected" : "" }" >
                    <a class="menu-item-link" href="performance" ><i class="fas fa-tachometer-alt"></i> Component Performance</a>
                    <div class="menu-item-underline"></div>
                </li>
            </ul>
            
            <style>
                menu-comp{ display: block; color:var(--color-white); padding:2rem; font-size: 1.6rem;  }
                menu-comp .menu{ padding:0; list-style: none; margin:0; font-weight: 300; }
                menu-comp .menu-item{ transition: 0.3s opacity; opacity: 0.6;  border-bottom: 1px solid rgba(255,255,255,0.3); position: relative; user-select: none; }
                menu-comp .menu-item:hover{ opacity: 1; }
                menu-comp .menu-item.selected{  opacity: 1; }
                menu-comp .menu-item-link{ text-decoration: none; background: rgba(0,0,0,0); display: grid; grid-template-columns: 3rem auto; grid-template-rows: auto; grid-template-areas: "icon text";  color:var(--color-white); cursor: pointer; padding:1.3rem 0.8rem; }
                menu-comp .menu-item-underline{ transition: 0.3s width; position: absolute; left:0; bottom:-1px; width: 0%; height: 0; border-bottom: 1px solid #FFF; }
                menu-comp .menu-item.selected .menu-item-underline{ width:100%; }
                menu-comp .menu-item-clear{ color:#FFF; text-decoration: none; }
            </style>
            `
    }
}

customElements.define('menu-comp', Menu);
