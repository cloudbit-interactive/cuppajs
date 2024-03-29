import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import "../../../../cuppa/components/cuppa.collapsible.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import {CuppaTheme} from "../../../../cuppa/cuppa.theme.min.js";
import {Storages} from "../../../controllers/Storages.js";

export class CuppaCollapsibleDoc extends CuppaComponent {
	collapsibleStatus = this.observable("collapsibleStatus", {});

	onChange(e){
		let data = e.detail;
		this.collapsibleStatus[data.name] = data.status;
		this.collapsibleStatus = this.collapsibleStatus;
		this.resizeTextArea();
		window.onresize = this.resizeTextArea;
	}

	resizeTextArea(){
		this.refs.textarea.style.minHeight = 0;
		this.refs.textarea.style.minHeight = `${this.refs.textarea.scrollHeight}px`;
	}

	render(){
		return html`
      <get-storage name=${Storages.theme.name} @change=${()=>this.forceRender()}></get-storage>
      <style>
        cuppa-collapsible{ border-radius: 0 !important; }
        cuppa-collapsible:first-of-type{ border-radius: 0.5rem 0.5rem 0 0 !important; }
        cuppa-collapsible:last-of-type{ border-radius: 0 0 0.5rem 0.5rem !important; }
      </style>
      <section>
        <h1 class="title-2">Cuppa Collapsible</h1>
        <div class="m-t-20 flex j-between" style="gap:2rem">
          <div class="left m-w-400">
            <cuppa-collapsible 
	            header="Collapsible Title 1"
	            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
							@change=${ this.onChange }
							group="collapsible-group-1"
							name="collapsible-1"
	            theme="${CuppaTheme.getTheme()}"
            ></cuppa-collapsible>
            <cuppa-collapsible 
	            @change=${ this.onChange }
             	group="collapsible-group-1"
             	name="collapsible-2"
              theme="${CuppaTheme.getTheme()}"
            >
              <cuppa-collapsible-header>Collapsible Title 2</cuppa-collapsible-header>
              <cuppa-collapsible-content>
                <h3 class="title-3">My Title Content</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
              </cuppa-collapsible-content>
            </cuppa-collapsible>
            <cuppa-collapsible 
	            @change=${ this.onChange }
							group="collapsible-group-1"
							name="collapsible-3"
              theme="${CuppaTheme.getTheme()}"
            >
              <cuppa-collapsible-header>Collapsible Title 3</cuppa-collapsible-header>
              <cuppa-collapsible-content>
                <img width="100%" height="auto" src="https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg" />
              </cuppa-collapsible-content>
            </cuppa-collapsible>
          </div>
          <div class="right" style="flex:1; position: relative">
            <div class="tag-1" style="position: absolute; right:2px; top:2px;">Output</div>
            <textarea ref="textarea" class="code" >${JSON.stringify(this.collapsibleStatus, null, 2)}</textarea>
          </div>
        </div>
      </section>

      <hr />
      
      <section>
        <h2 class="title-3 mb-10">Code Example</h2>
	      <cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="30rem"
					preview-height="28rem"
					mode=${AceModes.html}
					remove-tabs=${6}
          preview=${true}
          expandable=${false}
          preview-css="${Utils.getPreviewCSS()}"
	      >
		      <code>
          	<!--[
          	<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.collapsible.min.js" type="module"></script>
						<cuppa-collapsible theme="dark">
							<cuppa-collapsible-header>Collapsible Title</cuppa-collapsible-header>
								<cuppa-collapsible-content>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
								</cuppa-collapsible-content>
						</cuppa-collapsible>
          	]-->
		      </code>
	      </cuppa-preview-code>
      </section>
      
      <hr />
      
      <section>
        <h2 class="title-3">Properties</h2>
        <div class="m-t-20 o-auto b-radius-10" >
          <table class="table-1 min-width" >
            ${Utils.tableHeaderDoc()}
            <tbody>
            <tr>
              <td class="td-1">
                <div class="tag-1">name</div>
                <div class="tag-1 tag-1-white">string</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                The name of the collapsible.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">header</div>
                <div class="tag-1 tag-1-white">header</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                The header text of the collapsible.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">content</div>
                <div class="tag-1 tag-1-white">content</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                The content text of the collapsible.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">status</div>
                <div class="tag-1 tag-1-white">status</div>
              </td>
              <td>string</td>
              <td>close</td>
              <td>
                The status of the collapsible (open, close).
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">arrowURL</div>
                <div class="tag-1 tag-1-white">arrow-url</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                The url of the arrow image.
              </td>
            </tr>

            <tr>
              <td>
                <div class="tag-1">group</div>
                <div class="tag-1 tag-1-white">group</div>
              </td>
              <td>string</td>
              <td></td>
              <td>
                The group name of the collapsible. This is also used to keep open only one collapsible and close all others collapsible with the same group name.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">duration</div>
                <div class="tag-1 tag-1-white">duration</div>
              </td>
              <td>number</td>
              <td>0.5</td>
              <td>
                The duration of the animation in seconds.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">ease</div>
                <div class="tag-1 tag-1-white">ease</div>
              </td>
              <td>string</td>
              <td>Power2.easeInOut</td>
              <td>
                <p style="margin-top:0">The easing function of the animation.</p>
                <p>This component use GSAP library, so you can use any easing function of the library.</p>
                <a style="color:var(--color-blue-1)" target="_blank" href="https://greensock.com/docs/v2/Easing">
                  Click here to see all easing functions.
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1">callback</div>
              </td>
              <td>function</td>
              <td></td>
              <td>
                The callback function that will be called when the collapsible is opened or closed.
                <br />
                return {status:string, name:string, group:string, ref:HTMLElement}
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-yellow">onchange</div>
              </td>
              <td>event</td>
              <td></td>
              <td>
                The event that will be triggered when the collapsible is opened or closed.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-yellow">onended</div>
              </td>
              <td>event</td>
              <td></td>
              <td>
                The event that will be triggered when the animation is ended.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-green">cuppa-collapsible-header</div>
              </td>
              <td>sub-tag</td>
              <td></td>
              <td>
                Use this tag to add html header to the collapsible.
              </td>
            </tr>
            <tr>
              <td>
                <div class="tag-1 tag-1-green">cuppa-collapsible-content</div>
              </td>
              <td>sub-tag</td>
              <td></td>
              <td>
                Use this tag to add HTML content to the collapsible.
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
		`
	}
}

customElements.define('cuppa-collapsible-doc', CuppaCollapsibleDoc);
