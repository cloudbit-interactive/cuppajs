import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaPreviewCode, AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";

export class CuppaStorageBase extends CuppaComponent {

	render(){
		return html`
			<section>
        <h2 class="title-2" >Basic Usage</h2>
        <cuppa-preview-code
          class="box-shadow-1 m-t-20"
          height="48rem"
          remove-tabs=${6}
          show-tools-bar="false"
          preview-width="20rem"
        >
          <code>
						<p>Name: <input id="txtName"/></p>
						<hr />
						<p>Output: <span id="output"></span></p>
	          
						<script type="module">
							import {CuppaStorage} from "https://cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.storage.min.js";
							// define a storage
							const storage = {name:"myStorage", store:CuppaStorage.LOCAL, default:"No Data Settled"};
              document.getElementById("txtName").oninput = (e)=>{
								console.log(e.target.value, storage)
               	CuppaStorage.setData({name:storage.name, data:e.target.value, store:storage.store})
              }
						</script>
          </code>
        </cuppa-preview-code>
			</section>
			<hr />
      <div class="grid_title_1_column d-none">
        <h2 class="title-2" style="grid-area:title;">Basic Usage</h2>
        <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/poRWKPE?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true" ></iframe>
      </div>
      <hr class="separator-1"/>
      <div class="grid_title_1_column d-none">
        <h2 class="title-2" style="grid-area:title;">Storage And React</h2>
        <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/abpLjOQ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      </div>
		`
	}
}

customElements.define('cuppa-storage-base', CuppaStorageBase);
