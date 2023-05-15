import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import "../../../../cuppa/components/cuppa-preview-code.min.js";

export class CuppaRouter extends CuppaComponent {

	render(){
		return html`
      <section >
        <h2 class="title-2" style="grid-area:title">Cuppa Router</h2>
        <div class="message message_blue m-t-20 b-radius-bottom-0" >Create simple router in pure vanilla javascript or integrate it with any framework.</div>
        <iframe class="b-radius-5 o-hidden b-radius-top-0" height="550" src="https://codesandbox.io/embed/distracted-matsumoto-0k2kf?fontsize=14&theme=dark" ></iframe>
      </section>
      
      <hr />

      <section >
        <h2 class="title-2" >Using On Method and Hash Configuration</h2>
        <iframe class="m-t-20 b-radius-5 o-hidden box-shadow-1" height="550" src="https://codesandbox.io/embed/cupparouter-resolver-7v1us?fontsize=14&theme=dark" ></iframe>
      </section>
      
      <hr />

      <h2 class="title-2" style="grid-area:title">Other Configurations</h2>
      <cuppa-preview-code
        class="box-shadow-1 m-t-20"
        height="48rem"
        remove-tabs=${5}
        preview="false"
        show-tools-bar="false"
      >
        <code>
	        <!--[
	        // Set exception for router.updateLinks() 
					<a class="no-router" href="products/product1" >Product1</a>
					
					// Define root
					<script>
						const router = new CuppaRouter({root:"subfolder/"});
					</script>
					
					// Predefined titleMap 
					<script type="module">
						const titlesMap = {
							"/":"MySite",
							"about":"About",
							"services":"Services",
							"contact":"Contact",
						}
						const router = new CuppaRouter({hash:"#/", titlesMap});
					</script>
	        ]-->
        </code>
      </cuppa-preview-code>
      
      <iframe class="d-none m-t-20 b-radius-5 o-hidden box-shadow-1" height="400" src="https://codepen.io/tufik2/embed/qBRaLbe?&theme-id=dark&default-tab=html" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      
		`
	}
}

customElements.define('cuppa-router', CuppaRouter);
