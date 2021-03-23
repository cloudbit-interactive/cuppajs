import {CuppaComponent} from "../../../../libs/cuppa/cuppa.component.js"

const CodeMirror = document.defaultView["CodeMirror"];

export default class BasicComponent extends CuppaComponent {
    pure = true;

    render(){
        return /*html*/ `
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Counter Component</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">Create simple reactive component extending any class from CuppaComponent is simplle and pure vanilla javascript.</div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/vYydQeJ?&theme-id=dark&default-tab=js" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_2_columns">
                <h2 class="title2" style="grid-area:title;">Todo Implementation</h2>
                <div style="grid-area:left;">
                    <div class="message message_blue">Lets implement something a little bit more complex using different components.</div>
                    <div class="message message_yellow m-t-10">
                        <h3 class="title4">Note:</h3>
                        <ul>
                            <li>Is possible add event listeners in render templating and dispach those events from inside the compoent.</li>
                            <li>All events should follow the standard declaration adding a <strong>"on"</strong> at beginning of the attribute name <strong>"ondelete"</strong>, <strong>"onremove"</strong>.</li>
                        </ul>
                    </div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/XWNZOdY?&theme-id=dark&default-tab=js" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
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
                        <iframe style="grid-are:right; margin-top:10px;" height="380" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/gOLJbNq?theme-id=dark&default-tab=html" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe> 
                        
                    </div>
                </div>
                <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/rNWZKxa?theme-id=dark&default-tab=js" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>             
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Component Structure</h2>
                <div style="grid-area:content;">
                    <iframe style="grid-are:right" height="550" style="width: 100%;" scrolling="no" title="vYydQeJ" src="https://codepen.io/tufik2/embed/VwmOwGj?theme-id=dark&default-tab=js" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>  
                </div>
            </div>
        `;
    }
}

customElements.define('basic-component', BasicComponent);
