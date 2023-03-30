import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {CuppaTooltip} from "../../../../cuppa/components/cuppa.tooltip.min.js";
import {AceModes, CuppaPreviewCode} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import {CuppaTheme} from "../../../../cuppa/cuppa.theme.min.js";

export class CuppaTooltipDoc extends CuppaComponent {

	render(){
		return html`
			<section>
        <h1 class="title-2">Cuppa Tooltip</h1>
				<div class="flex j-start a-center m-t-20" >
          <button class="button-1 btn-default" >Default/Bottom</button>
          <cuppa-tooltip target=".btn-default" theme="${CuppaTheme.getTheme()}" text="Default position" style="margin-top:8px"></cuppa-tooltip>
					
					<button class="button-1 btn-left" >Left</button>
          <cuppa-tooltip target=".btn-left" text="Left position" pos-x="${CuppaTooltip.POSITION.LEFT}" pos-y="${CuppaTooltip.POSITION.CENTER}" arrow="${CuppaTooltip.ARROW.RIGHT}" style="margin-left:-8px"></cuppa-tooltip>

          <button class="button-1 btn-right" >Right</button>
          <cuppa-tooltip target=".btn-right" text="Right position" pos-x="${CuppaTooltip.POSITION.RIGHT}" pos-y="${CuppaTooltip.POSITION.CENTER}" arrow="${CuppaTooltip.ARROW.LEFT}" style="margin-left:8px"></cuppa-tooltip>

          <button class="button-1 btn-top" >Top</button>
          <cuppa-tooltip target=".btn-top" text="Top position" pos-x="${CuppaTooltip.POSITION.CENTER}" pos-y="${CuppaTooltip.POSITION.TOP}" arrow="${CuppaTooltip.ARROW.DOWN}" style="margin-top:-8px"></cuppa-tooltip>

          <button class="button-1 btn-personal" >Personal Content</button>
          <cuppa-tooltip target=".btn-personal" pos-x="${CuppaTooltip.POSITION.RIGHT}" pos-y="${CuppaTooltip.POSITION.TOP_IN}" arrow="${CuppaTooltip.ARROW.LEFT}"  style="margin-left:8px" style-arrow="top:10px">
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
			</section>
			
			<hr />
			
			<section>
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
						<script src="http://127.0.0.1:5500/docs/src/cuppa/components/cuppa.tooltip.min.js" type="module"></script>
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

      <hr class="separator-1" />
			
			<section>
        <h2 class="title-3 mb-10">Properties</h2>
        <div class="o-auto b-radius-10 m-t-20" >
					<table class="table-1 min-width" >
						<thead>
						<tr>
							<th style="width: 30rem">
								<div class="tag-1">Property</div>
								<div class="tag-1 tag-1-white">attribute</div>
								<div class="tag-1 tag-1-yellow">event</div>
							</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div class="tag-1">title</div>
									<div class="tag-1 tag-1-white">title</div>
								</td>
								<td>string</td>
								<td></td>
								<td>Title of the alert.</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		`
	}
}

customElements.define('cuppa-tooltip-doc', CuppaTooltipDoc);
