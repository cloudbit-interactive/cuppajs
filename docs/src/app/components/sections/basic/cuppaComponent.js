import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {Utils} from "../../../controllers/Utils.js";
import {cuppa} from "../../../../cuppa/cuppa.min.js";
import {AceModes} from "../../../../cuppa/components/cuppa-preview-code.min.js";
import "../../../../cuppa/cuppa.storage.min.js"
import {Storages} from "../../../controllers/Storages.js";

export class CuppaComponentDoc extends CuppaComponent {
	static observables = ['theme']
	theme;

	render(){
		return html`
      <get-storage name=${Storages.theme.name} @change=${(e)=>{ this.forceRender() }}></get-storage>
      <section>
				<h2 class="title-2" >Counter Component</h2>
	      <div class="message message_blue m-t-20  b-radius-bottom-0">Create simple reactive component extending any class from CuppaComponent is simple.</div>
	      <cuppa-preview-code
					class="box-shadow-1 b-radius-top-0"
					height="46rem"
					preview-height="15rem"
					mode=${AceModes.jsx}
					remove-tabs=${7}
					preview-css="${Utils.getPreviewCSS()}"
				>
					<code>
						<!--[
							import {CuppaComponent, html} from "https://cdn.jsdelivr.net/npm/cuppajs@0.0.134/libs/cuppa.component.min.js";
					
							export default class CounterComponent extends CuppaComponent {
								static observables = ["count"];
								count = 0;
					
								render() {
									return html\`
										<button class="button" @click=\${() => this.count--}>-</button>
										<span class="number">\${this.count}</span>
										<button class="button" @click=\${() => this.count++}>+</button>
										
										<style>
											counter-comp .number {
												display: inline-block;
												text-align: center;
												min-width: 30px;
											}
										</style>
									\`;
								}
							}
							customElements.define("counter-comp", CounterComponent);
							// If you want give access to it globally, add a reference to the defaultView
							document.defaultView.CounterComponent = CounterComponent; 
							// Add new component instance
							document.body.append(new CounterComponent());
						]-->
					</code>
				</cuppa-preview-code>
      </section>
      <hr />
      
      <section>
	      <h2 class="title-2" style="grid-area:title;">Todo Implementation</h2>
	      <div class="message message_blue m-t-20 b-radius-bottom-0">
	        Lets implement something a little more complex using different components.
	        <ul class="m-b-0">
	          <li>Is possible add event listeners in render templating and dispatch those events from inside the component.</li>
	          <li>All events should follow the lit-html standard <strong>(@click, @change)</strong>.</li>
	        </ul>
	      </div>
	      <cuppa-preview-code
	        class="box-shadow-1 b-radius-top-0"
	        height="46rem"
	        preview-height="15rem"
	        mode=${AceModes.jsx}
	        remove-tabs=${7}
	        preview-css="${Utils.getPreviewCSS()}"
	      >
	        <code>
	          <!--[
							import {CuppaComponent, html, repeat} from "https://cdn.jsdelivr.net/npm/cuppajs@0.0.134/libs/cuppa.component.min.js";
					
							export class TodoComponent extends CuppaComponent {
								static observables = ["value", "list"];
							  value = "";
							  list = [];
							  autoId = 1;
							  
							  onAdd(e) {
							    e.preventDefault();
							    let value = this.value.trim();
							    if(!value) return;
							    
							    let item = {id:this.autoId, value};
							    this.list.push(item);
							    this.list = this.list;
							    
							    this.value = "";
							    this.autoId++;
							  }
						  
							  onDelete(e){
							    let index = this.list.findIndex(item=>item.id === e.detail.id);
							    this.list.splice(index, 1);
							    this.list = this.list;
							  }
						
							  render() {
							    return html\`
								    <form @submit=\${this.onAdd} >
											<span>Add: </span>
											<input .value=\${this.value} @input=\${ e => this.value = e.target.value } placeholder="Write something..."/>
											<button type="submit">Add</button>
										</form>
											<h3>Totals: \${this.list.length}</h3>
										<div>
											\${repeat(this.list, item=>item.id, item=>html\`
												<todo-item @delete=\${ this.onDelete } .item=\${item} ></todo-item>
											\`)}
										</div>
							    \`;
							  }
							}
							customElements.define("todo-comp", TodoComponent);
							document.body.append(new TodoComponent());
							
							export class TodoItem extends CuppaComponent {
							  item = {id:0, name:""}; 
							  
							  onDelete(e){
							    this.dispatchEvent(new CustomEvent("delete", {detail: this.item}));
							  }
							  
							  render() {
							    return html\`
							      <span>ID: \${this.item.id} | Value: \${this.item.value}</span>
							      <button @click=\${this.onDelete} >Delete</button>
							      <style>
							        todo-item{ display:block; }
							      </style>
							    \`;
							  }
							}
							customElements.define("todo-item", TodoItem);
						]-->
	        </code>
	      </cuppa-preview-code>
      </section>
      
      <hr />

      <section>
	      <h2 class="title-2" >Use Components on any place</h2>
	      <div class="message message_blue b-radius-bottom-0 m-t-20">
	        <p>An advantage to create components using standard libraries is it don't require reimplement again for each framework, it will work in any projects or frameworks</p>
	        <p>Next examples shows <strong>cuppa.switch</strong> imported in VanillaJs and ReactJs, the component is only <strong>6kb gzipped</strong>, so you will save thons of Mgbs and mantain you project fast and clean if you just want to load a single or couple of components.</p>
	      </div>
	      <div class="message message_yellow b-radius-0">
		      Vanilla JS
	        <cuppa-preview-code
	          class="box-shadow-1 m-t-10"
	          height="28rem"
	          remove-tabs=${8}
	          preview="false"
	          show-tools-bar="false"
	        >
	          <code>
	            <!--[
								<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.switch.min.js" type="module"></script>
								<cuppa-switch id="switch1" checked="true"></cuppa-switch>
								<div>Output: <span id="status">true</span></div>
								
								<script>
									document.getElementById("switch1").addEventListener("change", onChange);
									function onChange(e){
										document.getElementById("status").innerHTML = e.target.checked;
									}
								</script>
	            ]-->
	          </code>
	      </div>
        <div class="message message_purple b-radius-top-0">
          ReactJS
		      <cuppa-preview-code
		        class="box-shadow-1 m-t-10"
		        height="42rem"
		        preview-height="15rem"
		        remove-tabs=${7}
		        preview-css="${Utils.getPreviewCSS()}"
		      >
			      <preview-html>
				      <!--[
				        <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
								<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
								<script crossorigin src='https://unpkg.com/babel-standalone@6.26.0/babel.js'></script>
								<script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.switch.min.js" type="module"></script>
				      ]-->
			      </preview-html>
		        <code>
			        <!--[	
			          <script type="text/babel">
									function Switch(props){  
										return (
											<cuppa-switch 
												checked={props.checked} 
												ref={(el)=>{
													el.callback = (data)=>{
														if(props.callback) props.callback(data);
													}
												}} 
											/>
										);
									}
									ReactDOM.render(<Switch checked={true} callback={ (data)=>{ console.log(data) } } />, document.body);
								</script>
			        ]-->
		        </code>
		      </cuppa-preview-code>
        </div>
      </section>

      <hr />

      <section>
	      <h2 class="title-2 m-b-20" >Component Structure</h2>
	      <cuppa-preview-code
	        class="box-shadow-1"
	        height="50rem"
	        preview-height="15rem"
	        remove-tabs=${7}
	        mode=${AceModes.jsx}
	        preview-css="${Utils.getPreviewCSS()}"
	        preview="false"
	      >
		      <code>
			      <!--[
			        import {CuppaComponent, html} from "https://cdn.jsdelivr.net/npm/cuppajs@0.0.134/libs/cuppa.component.min.js";
			        
							export default class MyProfileCard extends CuppaComponent {
								static attributes = ["name", "age"]; 									// Define the component attributes
								shadow = null;																				// null (default), open, close
								refs = {};
								static observables = ["title", "name", "age"];				// define observable variables, this will automatically update your component when value change.
								title = "Profile Card";
								name = "";
								age = 0;
								
								constructor(){ super(); }
						
								// Optional - If you prefer not to use the built-in automatic attribute handling, you can implement a custom vanilla JavaScript solution to detect attribute changes.
								static get observedAttributes() { return ['name', 'age'] }
								attributeChangedCallback(attr, oldVal, newVal) { this[attr] = newVal }
								
								// Invoked when the custom element is mounted to the document's DOM.
								mounted() { }   
								
								// Invoked when the custom element is unmounted from the document's DOM.
								unmounted() { }

								// Invoked after first render execution is completed
								firstRendered(count){ }

								// Invoked after render execution is completed
								rendered(count){ }
								
								changeAttributeName(e){
									let name = \`Random Name \${Math.round(Math.random() * 99)}\`
									this.setAttribute('name', name);
								}
								
								render(){
									return html\`
										<div ref="rootRef"> 
											<h1 class="title">\${this.title}</h1>
											<p class="desc">Name: \${this.name}</p>
											<p class="desc">Age: \${this.age}</p>
											<div>
												<button class="button" @click=\${ ()=>this.title = (this.title == 'Profile Card') ? 'Staff ID' : 'Profile Card' }>Click To Change Title</button>
												<button class="button" @click=\${ ()=>this.age = Math.round(Math.random()*99) } >Click To Change Age</button> 
												<button class="button" @click=\${this.changeAttributeName} >Click To Change Attribute Name</button> 
											</div>
										</div>
										<style>
											my-profile-card{ display:inline-flex; background:#FFF; color:#444; padding:25px 30px; border-radius:5px; box-shadow:0 0 3px rgba(0,0,0,0.5); font-family:'arial'; }
											my-profile-card .title{ margin:0; }
											my-profile-card .desc{ margin:10px 0; }
											my-profile-card .button{ border:none; background:#219EBC; color:#FFF; padding:5px 10px; width:100%; margin:5px 0 0; }
											my-profile-card .button:nth-child(1){ margin:0; }
										</style>
									\`
								}
							}
	            
							// Standard way to defines a new custom element.
							customElements.define('my-profile-card', MyProfileCard);
	
							// Ok, now we can add a instance of our component and see the result
							let myProfileCard = new MyProfileCard();
								myProfileCard.setAttribute("name", "Tufik");
								myProfileCard.setAttribute("age", 36);
							document.body.append(myProfileCard)
			      ]-->
		      </code>
	      </cuppa-preview-code>
      </section>
		`;
	}
}

customElements.define('cuppa-component', CuppaComponentDoc);
