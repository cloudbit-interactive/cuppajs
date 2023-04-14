import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaPreviewCode, AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import {Utils} from "../../../controllers/Utils.js";

export class CuppaStorageBase extends CuppaComponent {

	render(){
		return html`
			<section >
        <h2 class="title-2" >Basic Usage</h2>
        <cuppa-preview-code
          class="box-shadow-1 m-t-20"
          height="48rem"
          remove-tabs=${6}
          preview-width="40%"
          preview-css="${Utils.getPreviewCSS()}"
        >
          <template>
						<div>
						  <strong>Name:</strong>
						  <input id="txtName"/>
						</div>
						<div style="margin-top:10px">
							<strong>Output:</strong> 
							<span id="output"></span>
						</div>
	          
						<script type="module">
							import {CuppaStorage} from "https://cdn.jsdelivr.net/npm/cuppajs/libs/cuppa.storage.min.js";
							
							// define a storage, 
							// store can be [null (in memory), LOCAL, SESSION, INDEXED_DB]
							const storage = {name:"myStorage", store:CuppaStorage.LOCAL, defaultValue:"No Data Settled"};
							
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
      	<h2 class="title-2" >Use Storage With Any Framework</h2>
        <cuppa-preview-code
          class="box-shadow-1 m-t-20"
          height="43rem"
          preview-width="40%"
          preview-height="20rem"
          remove-tabs=${6}
          preview-css="${Utils.getPreviewCSS()}"
        >
          <preview-html>
            <!--[
							<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
							<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
							<script crossorigin src='https://unpkg.com/babel-standalone@6.26.0/babel.js'></script>
							<script src="https://cdn.jsdelivr.net/npm/cuppajs@0.0.124/libs/cuppa.storage.js" type="module"></script>
						]-->
          </preview-html>
          <template>
						<script type="text/babel">
							const {useState, useEffect} = React;
							const storage = {name:"STORAGE_TODO", store:CuppaStorage.INDEXED_DB, defaultValue:[]};
							
							function TodoHeader(){
								const [value, setValue] = useState("");
								
								async function add(){
								  let list = await CuppaStorage.getData({...storage}) ;
								    list.push(value);
								  CuppaStorage.setData({...storage, data:[...list]}).then();
								  setValue("");
								}
								
								return(
								  <div>
							      <span>Add: </span>
							      <input value={value} onInput={e=>setValue(e.target.value)} />
							      <button onClick={add} >Add</button>
								  </div>
								)
							}
							
							function TodoList(){
								const [list, setList] = useState([]);
								
								function remove(index){
								  list.splice(index, 1);
								  CuppaStorage.setData({...storage, data:[...list]});
								}
								
								return(
									<div>
										<get-storage
										  name={storage.name}
										  store={storage.store}
										  ref={ item=>{ if(item) item.addEventListener("change", e=>setList(e.detail)) } }
										/>
										<hr />
										<div>Total Items: {list.length}</div>
										<ul style={{padding:'0 20px'}}>
										  {list.map((item, index)=>{
										    return <li key={index}>{item} <button onClick={(e)=>remove(index)}>remove</button></li>
										  })}
										</ul>
									</div>
								)
							}
							
							function App(){ 
								return(
									<div>
										<h1 style={{margin:'0 0 10px'}}>Todo</h1>
										<TodoHeader />
									  <TodoList />
									</div>
								); 
							}
							
							ReactDOM.render(<App />, document.body);
						</script>
          </template>
        </cuppa-preview-code>
				
				
      </section>
      
      <div class="grid_title_1_column d-none">
        <h2 class="title-2" style="grid-area:title;">Storage And React</h2>
        <iframe style="grid-are:content" height="450" style="width: 100%;" src="https://codepen.io/tufik2/embed/abpLjOQ?&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
      </div>
		`
	}
}

customElements.define('cuppa-storage-base', CuppaStorageBase);
