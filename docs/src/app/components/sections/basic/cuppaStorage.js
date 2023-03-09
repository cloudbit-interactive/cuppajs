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
          preview-width="40rem"
        >
          <template>
						<div>Name: <input id="txtName"/></div>
						<div>Output: <span id="output"></span></div>
	          <script type="module">
							import {CuppaStorage, GetStorage} from "https://cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.storage.min.js";
							
							// define a storage, 
							// store can be [null (in memory), LOCAL, SESSION, INDEXED_DB]
							const storage = {name:"myStorage", store:CuppaStorage.LOCAL, default:"No Data Settled"};
							
							// write data in the storage
							document.getElementById("txtName").oninput = (e)=>{
								CuppaStorage.setData({...storage, data:e.target.value})
							}
							
							// subscribe a callback to get storage updates
							CuppaStorage.getData({...storage, callback:(data)=>{
								document.getElementById("output").innerHTML = data;
							}})
							
							// get async data from storage
							CuppaStorage.getData(storage).then(data=>{
								console.log("Async Data:", data);
							});
							
							// get the data sync when it is saved in memory, local, or session storage.
							let syncData = CuppaStorage.getDataSync(storage);
							console.log("Sync Data:", syncData);
							
							// use HTML tag to subscribe to a storage and receive updates, 
							// usefully to register/unregister callbacks automatically 
							// when component is mounted/unmounted 
							let htmlTag = document.createElement('get-storage');
								htmlTag.setAttribute('name', 'myStorage')
								htmlTag.setAttribute('store', 'LOCAL')
								htmlTag.addEventListener('update', (e)=>{
									console.log("<get-storage tag>", e.detail)
								}) ;
							document.body.append(htmlTag);
						</script>
         	</template>
        </cuppa-preview-code>
			</section>
			
			<hr />
			
			<section>
      	<h2 class="title-2" style="grid-area:title;">Use Storage With Any Framework</h2>
      </section>
      
      <div class="grid_title_1_column d-none">
        <h2 class="title-2" style="grid-area:title;">Storage And React</h2>
        <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/abpLjOQ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      </div>
		`
	}
}

customElements.define('cuppa-storage-base', CuppaStorageBase);
