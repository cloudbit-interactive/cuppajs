import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";

export class CuppaStorageBase extends CuppaComponent {

    render(){
        return html`
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Basic Usage</h2>
                <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/poRWKPE?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
            <hr class="separator1"/>
            <div class="grid_title_1_column">
                <h2 class="title2" style="grid-area:title;">Storage And React</h2>
                <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/abpLjOQ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
            </div>
        `
    }
}

customElements.define('cuppa-storage-base', CuppaStorageBase);
