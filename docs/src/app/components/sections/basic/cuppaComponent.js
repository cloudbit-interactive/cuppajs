import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controlers/Utils.js";
import {cuppa} from "../../../../cuppa/cuppa.min.js";

export class CuppaComponentDoc extends CuppaComponent {

    mounted(){
        Utils.loadPrism();
    }

    render(){
        return html `
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Counter Component</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">Create simple reactive component extending any class from CuppaComponent is simple.</div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" src="https://codepen.io/tufik2/embed/vYydQeJ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Todo Implementation</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">Lets implement something a little bit more complex using different components.</div>
                    <div class="message message_yellow m-t-10">
                        <h3 class="title4">Note:</h3>
                        <ul>
                            <li>Is possible add event listeners in render templating and dispatch those events from inside the component.</li>
                            <li>All events should follow the lit-html standard <strong>(@click, @change)</strong>.</li>
                        </ul>
                    </div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" src="https://codepen.io/tufik2/embed/XWNZOdY?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
            
            <hr class="separator1"/>
            
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Use Components on any place</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">
                        <p>An advantage to create components using standard libraries is it don't require reimplement again for each framework, it will works for all projects or frameworks</p>
                        <p>Next example import <strong>cuppa.switch</strong> component in reactjs, the component is only <strong>3kb gzipped</strong></p>
                    </div>
                    <div class="message message_yellow m-t-10">
                        The best and easy way is adding the script tag but  in the right pannel there is an example importing the component in ReactJS.
                        
                        ${Utils.prismCode({removeTabsCount:7,code:`
                            <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.switch.min.js" type="module"></script>
                            <cuppa-switch id="switch1" checked="true"></cuppa-switch>
                            <div>Output: <span id="status">true</span></div>
                            
                            <script>
                              document.getElementById("switch1").addEventListener("change", onChange);
                              function onChange(e){
                                document.getElementById("status").innerHTML = e.target.checked;
                              }
                            </script>
                        `})}
                    </div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" src="https://codepen.io/tufik2/embed/rNWZKxa?theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>             
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Component Structure</h2>
                <iframe style="grid-are:content" height="550" style="width: 100%;" src="https://codepen.io/tufik2/embed/VwmOwGj?theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>  
            </div>
        `;
    }
}

customElements.define('cuppa-component', CuppaComponentDoc);
