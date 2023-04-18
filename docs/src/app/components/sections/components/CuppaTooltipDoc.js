import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {CuppaTooltip} from "../../../../cuppa/components/cuppa.tooltip.min.js";
import {AceModes, CuppaPreviewCode} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import {CuppaTheme} from "../../../../cuppa/cuppa.theme.min.js";
import {Storages} from "../../../controllers/Storages.js";

export class CuppaTooltipDoc extends CuppaComponent {

	render(){
		return html`
      <get-storage name=${Storages.theme.name} @change=${()=>this.forceRender()}></get-storage>
			<section class="d-none">
        <h1 class="title-2">Cuppa Tooltip</h1>
				<div class="flex j-start a-center m-t-20" style="gap:5px" >
          <button class="button-1 btn-default" >Default</button>
          <cuppa-tooltip theme="${CuppaTheme.getTheme()}" target=".btn-default" text="Default position" ></cuppa-tooltip>
					
          <button class="button-1 btn-right" >Right</button>
          <cuppa-tooltip theme="${CuppaTheme.getTheme()}" target=".btn-right" text="Right position" pos-x="${CuppaTooltip.POSITION.RIGHT}" pos-y="${CuppaTooltip.POSITION.CENTER}" arrow="${CuppaTooltip.ARROW.LEFT}" ></cuppa-tooltip>

          <button class="button-1 btn-left" >Left</button>
          <cuppa-tooltip theme="${CuppaTheme.getTheme()}" target=".btn-left" text="Left position" pos-x="${CuppaTooltip.POSITION.LEFT}" pos-y="${CuppaTooltip.POSITION.CENTER}" arrow="${CuppaTooltip.ARROW.RIGHT}" ></cuppa-tooltip>
					
          <button class="button-1 btn-top" >Top</button>
          <cuppa-tooltip theme="${CuppaTheme.getTheme()}" target=".btn-top" text="Top position" pos-x="${CuppaTooltip.POSITION.CENTER}" pos-y="${CuppaTooltip.POSITION.TOP}" arrow="${CuppaTooltip.ARROW.DOWN}" ></cuppa-tooltip>

          <button class="button-1 btn-personal" >Personal Content</button>
          <cuppa-tooltip target=".btn-personal" pos-x="${CuppaTooltip.POSITION.RIGHT}" pos-y="${CuppaTooltip.POSITION.TOP_IN}" arrow="${CuppaTooltip.ARROW.LEFT}" style-arrow="top:10px">
	          <div style="width:300px; padding:10px">
		          <h2 class="title-2">UEFA Euro 2020 final</h2>
		          <div style="margin-top:10px">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et quidem, inquit, vehementer errat; Murenam
                  te accusante defenderem. Duo Reges: constructio interrete. Cur deinde Metrodori liberos commendas?</p>
                <ul>
                  <li>Quo minus animus a se ipse dissidens secumque discordans gustare partem ullam liquidae voluptatis
                    et liberae potest.
                  </li>
                  <li>Sed eum qui audiebant, quoad poterant, defendebant sententiam suam.</li>
                  <li>Habes, inquam, Cato, formam eorum, de quibus loquor, philosophorum.</li>
                  <li>Ita fit beatae vitae domina fortuna, quam Epicurus ait exiguam intervenire sapienti.</li>
                  <li>Eiuro, inquit adridens, iniquum, hac quidem de re;</li>
                </ul>
              </div>
	          </div>
          </cuppa-tooltip>
        </div>
        <div class="flex j-start a-center m-t-5" style="gap:5px" >
          <button class="button-1 btn-dark" >Dark Color</button>
          <cuppa-tooltip target=".btn-dark" text="Dask" theme="dark"  ></cuppa-tooltip>

          <button class="button-1 btn-light" >Light Color</button>
          <cuppa-tooltip target=".btn-light" text="Light" theme="light" ></cuppa-tooltip>

          <button class="button-1 warning btn-warning" >Warning Color</button>
          <cuppa-tooltip target=".btn-warning" text="Warning color" class="warning" ></cuppa-tooltip>

          <button class="button-1 error btn-error" >Error Color</button>
          <cuppa-tooltip target=".btn-error" text="Error color" class="error" ></cuppa-tooltip>

          <button class="button-1 progress btn-progress" >Progress Color</button>
          <cuppa-tooltip target=".btn-progress" text="Progress color" class="progress" ></cuppa-tooltip>

          <button class="button-1 success btn-success" >Success Color</button>
          <cuppa-tooltip target=".btn-success" text="Success color" class="success" ></cuppa-tooltip>
        </div>
			</section>
			
			<hr />
			
			<section class="d-none">
				<h2 class="title-3 mb-10">Code Example</h2>
       	<cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="42rem"
					preview-height="28rem"
					mode=${AceModes.html}
					remove-tabs=${6}
          preview=${true}
          expandable=${false}
          preview-css="${Utils.getPreviewCSS()}"
					theme="dark"
	      >
					<code>
						<!--[
						<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.tooltip.min.js" type="module"></script>
						<button id="btn-default" >Default Tooltip</button>
						<cuppa-tooltip 
							target="#btn-default" 
							text="Default position"
							theme="dark"
						></cuppa-tooltip>	
						]-->
					</code>
       	</cuppa-preview-code>
			</section>

      <hr />

      <section>
        <h2 class="title-3 ">Properties</h2>
        <div class="o-auto b-radius-10 m-t-20" >
          <table class="table-1 min-width" >
            ${Utils.tableHeaderDoc()}
            <tbody>
            <tr>
              <td>
                <div class="tag-1">target</div>
                <div class="tag-1 tag-1-white">target</div>
              </td>
	            <td>string</td>
	            <td></td>
	            <td></td>

            </tr>
            </tbody>
          </table>
        </div>
      </section>
		`
	}
}

customElements.define('cuppa-tooltip-doc', CuppaTooltipDoc);
