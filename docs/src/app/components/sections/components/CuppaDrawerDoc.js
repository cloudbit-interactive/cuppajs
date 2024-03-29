import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controllers/Utils.js";
import "../../../../cuppa/components/cuppa.drawer.min.js";
import {AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import {CuppaTheme} from "../../../../cuppa/cuppa.theme.min.js";
import {Storages} from "../../../controllers/Storages.js";

export class CuppaDrawerDoc extends CuppaComponent {

	openNavBar(){
		this.refs.drawer.open();
	}

	render(){
		let data = []; for(let i = 1; i <= 40; i++){ data.push(i); }
		return html`
      <get-storage name=${Storages.theme.name} @change=${()=>this.forceRender()}></get-storage>
      <section>
        <h1 class="title-2">Cuppa Drawer</h1>
        <div class="flex a-center j-start m-t-20">
          <button class="button-1" @click="${this.openNavBar}" >Open NavBar</button>
        </div>
        <cuppa-drawer 
	        ref="drawer" 
	        disable-content=".nav-top, .nav-main, .main-section"  
	        disable-scroll=".scroll-1"
	        theme="${CuppaTheme.getTheme()}"
        >
          <cuppa-drawer-content style="display:flex; height: 100%; flex-direction: column;">
            <h2 class="title-2" style="padding:calc(env(safe-area-inset-top) + 2rem) 1rem 1rem;">Menu</h2>
            <div class="scroll-1" style="overflow: auto; padding: 0 1rem 1rem; flex:1;">
              <a class="button-1"
                 style="display: block; width: 100%; margin:2px 0; text-align: center;"
                 @click="${()=>{
                   alert(`Clicked item`);
                 }}"
              >Item a Tag</a>
              <a 
	              class="button-1"
								style="display: block; width: 100%; margin:2px 0; text-align: center; text-decoration: none;"
								href="https://www.google.com"
								target="_blank"
              >
                <span style="pointer-events: none;">Item external link</span>
              </a>
              ${ data.map(item=>{
                return html`
                  <button 
	                  class="button-1"
	                  style="display: block; width: 100%; margin:2px 0;"
	                  @click="${()=>{
                      alert(`Clicked item ${item}`);
                    }}"
                  >
                    Item ${item}
                  </button>
                `
              }) }
            </div>
          </cuppa-drawer-content>
        </cuppa-drawer>
      </section>
      
      <hr />
      
      <section>
        <h2 class="title-3 mb-10">Code Example</h2>
       	<cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="42rem"
					preview-height="28rem"
					mode=${AceModes.html}
					remove-tabs=${7}
          preview=${true}
          expandable=${false}
          preview-css="${Utils.getPreviewCSS()}"
	      >
           <code>
							<!--[
							<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.drawer.min.js" type="module"></script>
							<cuppa-drawer 
								status="open" 
								position="right" 
								disable-content=".nav-top, .nav-main, .main-section" disable-scroll=".scroll-1, body" 
								theme="dark"
							>
								<cuppa-drawer-content style="display:flex; height: 100%; flex-direction: column; padding:10px;">
									<h1 style="margin:0">Menu</h1>
									<ul>
										<li>Item 1</li>
										<li>Item 2</li>
									</ul>
								</cuppa-drawer-content>
							</cuppa-drawer>
							]-->
           </code>
       	</cuppa-preview-code>
      </section>

      <hr />
      
      <section>
        <h2 class="title-3">Properties</h2>
        <div class="o-auto b-radius-10 m-t-20" >
          <table class="table-1 min-width" >
            ${Utils.tableHeaderDoc()}
            <tbody>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">status</div>
              </td>
              <td>string</td>
              <td>closed</td>
              <td>
                Status of the drawer, can be: <div class="tag-1">open</div> <div class="tag-1">close</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">width</div>
              </td>
              <td>number</td>
              <td>300</td>
              <td>Width of the drawer.</td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">drag-enabled</div>
              </td>
              <td>boolean</td>
              <td>true</td>
              <td>Enable drag of the drawer.</td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">position</div>
              </td>
              <td>string</td>
              <td>left</td>
              <td>Position of the drawer, can be: <div class="tag-1">left</div> <div class="tag-1">right</div>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">backdrop-enabled</div>
              </td>
              <td>boolean</td>
              <td>true</td>
              <td>Enable backdrop of the drawer.</td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">disable-content</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                <p style="margin-top:0">Reference of elements that will be blockade when drawer is active, example:</p>
                <div class="tag-1 tag-1-white">.nav-top, .nav-main, .main-section</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">ease-open</div>
              </td>
              <td>string</td>
              <td>Expo.easeOut</td>
              <td>
                <p style="margin-top:0">Ease of the drawer open animation.</p>
                <p>This component use GSAP library, so you can use any easing function of the library.</p>
                <a style="color:var(--color-blue-1)" target="_blank" href="https://greensock.com/docs/v2/Easing">
                  Click here to see all easing functions.
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">ease-close</div>
              </td>
              <td>string</td>
              <td>Expo.easeOut</td>
              <td>
                <p style="margin-top:0">Ease of the drawer close animation.</p>
                <p>This component use GSAP library, so you can use any easing function of the library.</p>
                <a style="color:var(--color-blue-1)" target="_blank" href="https://greensock.com/docs/v2/Easing">
                  Click here to see all easing functions.
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">duration-open</div>
              </td>
              <td>number</td>
              <td>0.45</td>
              <td>Duration in seconds of the drawer open animation.</td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-white">duration-close</div>
              </td>
              <td>number</td>
              <td>0.3</td>
              <td>Duration in seconds of the drawer close animation.</td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">callback</div>
              </td>
              <td>function</td>
              <td></td>
              <td>
                <p style="margin-top:0">Callback function when the drawer is open or close.</p>
                <p>The callback function return the status of the drawer.</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">updateCallback</div>
              </td>
              <td>function</td>
              <td></td>
              <td>
                <p style="margin-top:0">Callback function when the drawer position is updated.</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-yellow">change</div>
              </td>
              <td>event</td>
              <td></td>
              <td>
                <p style="margin-top:0">Event when the drawer is open or close.</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-yellow">update</div>
              </td>
              <td>event</td>
              <td></td>
              <td>
                <p style="margin-top:0">Event when the drawer position is updated.</p>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-green">cuppa-drawer-content</div>
              </td>
              <td>component</td>
              <td></td>
              <td>
                <p style="margin-top:0">Use this tag to add HTML content to the drawer.</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
		`
	}
}

customElements.define('cuppa-drawer-doc', CuppaDrawerDoc);
