import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {CuppaNotification} from "../../../../cuppa/components/cuppa.notification.min.js";
import {AceModes, CuppaPreviewCode} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import {CuppaTheme} from "../../../../cuppa/cuppa.theme.min.js";
import {Storages} from "../../../controllers/Storages.js";

export class CuppaNotificationDoc extends CuppaComponent {

	render(){
		return html`
      <get-storage name=${Storages.theme.name} @update=${()=>this.forceRender()}></get-storage>
			<section>
        <h1 class="title-2">Cuppa Notification</h1>
        <div class="flex a-center j-start m-t-20">
	        <cuppa-notification 
		        title="Notification"
		        message="Lorem ipsum dolor sit amet consectetur adipiscing elit iaculis eu, primis egestas non quisque id ornare congue vivamus conubia tortor."
		        style="position: relative; top:0; left:0; right:0; bottom:0;"
		        class="m-w-400"
            auto-close-time="0"
		        theme="${CuppaTheme.getTheme()}"
	        ></cuppa-notification>
        </div>
			</section>
			
			<hr />

      <section>
        <h2 class="title-3 mb-10">Code Example</h2>
	      <cuppa-preview-code
					class="box-shadow-1 m-t-20"
					height="54rem"
					preview-height="28rem"
					mode=${AceModes.html}
					remove-tabs=${6}
          preview=${true}
          expandable=${false}
          preview-css="${Utils.getPreviewCSS()}"
	      >
		      <template>
						<button id="btnShowNotification">Show Notification</button>
						<div class="notifications-wrap hide-scroll"></div>
						<script type="module">
						  import('http://localhost:5500/docs/src/cuppa/components/cuppa.notification.min.js');
							
							const messages = [
								'The only time you fail is when you fall down and stay down.', 
								'Positive anything is better than negative nothing.', 
								'Keep your face to the sunshine and you cannot see a shadow.',
								'The good life is a process, not a state of being. It is a direction, not a destination.',
							];
							
						  function onShowNotification(e){
						    let notification = document.createElement('cuppa-notification');
						    	notification.title = 'Message';
						    	notification.message = messages[Math.floor(Math.random()*messages.length)];
						    document.querySelector('.notifications-wrap').append(notification);
						  };
						  document.getElementById('btnShowNotification').addEventListener('click', onShowNotification);
						</script>
						<style>
							.notifications-wrap{ 
								position: fixed; 
								right: 0; top:0;
								padding: 5px;
								display: flex; 
								flex-direction: column; 
								flex-wrap: nowrap; 
								overflow: auto;
								overflow-x: hidden;
								max-height: 100vh;
							}
							cuppa-notification{ 
								margin-bottom: 5px; 
								width: 300px;
								animation: ani-notification 0.2s; 
								background: #1890ff;
								color: #fff;;
							}
              .hide-scroll{ scrollbar-width: none; }
              .hide-scroll::-webkit-scrollbar{ display: none; width: 0 !important }
							@keyframes ani-notification {
								0% { opacity:0; transform: translateX(10px); } 
								100% { opacity: 1; transform: translateX(0); } 
							}
						</style>
          </template>
	      </cuppa-preview-code>
      </section>

		`
	}
}

customElements.define('cuppa-notification-doc', CuppaNotificationDoc);
