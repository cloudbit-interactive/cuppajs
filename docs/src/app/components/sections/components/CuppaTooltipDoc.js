import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {CuppaTooltip} from "../../../../cuppa/components/cuppa.tooltip.min.js";
import {CuppaPreviewCodeMin} from "../../../../cuppa/components/cuppa-preview-code.min.js";

export class CuppaTooltipDoc extends CuppaComponent {

	render(){
		return html`
			<div>
				<h1 class="title-2 mb-10">Cuppa Tooltip</h1>
				<div class="message" style="display: flex; align-items: center;">
          <button class="button-1 btn-left" >Left</button>
          <cuppa-tooltip target=".btn-left" text="Left position" pos-x="${CuppaTooltip.POSITION.LEFT}" pos-y="${CuppaTooltip.POSITION.CENTER}" arrow="${CuppaTooltip.ARROW.RIGHT}" style="margin-left:-8px"></cuppa-tooltip>

          <button class="button-1 btn-default" >Default/Bottom</button>
          <cuppa-tooltip target=".btn-default" text="Default position" style="margin-top:8px"></cuppa-tooltip>
					
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
        <hr />
				<cuppa-preview-code
					class="box-shadow-1"
					height="26rem"
					preview-height="15rem"
          preview-width="40%"
					expandable="false"
					.content="${Utils.removeTabs(`
						<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.tooltip.min.js" type="module"></script>
						
						<button id="btn-default" class="button-1" >Default Tooltip</button>
						<cuppa-tooltip 
							target="#btn-default" 
							text="Default position"
							style="margin-top:8px; opacity: 0;"
						></cuppa-tooltip>	
					`, {tabsCount:6})}"
				></cuppa-preview-code>
			</div>
		`
	}
}

customElements.define('cuppa-tooltip-doc', CuppaTooltipDoc);
