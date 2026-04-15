import {CuppaComponent, html, repeat, ref, render as renderHTML} from "./cuppa.component.js";
import { cuppa, log } from "../../../libs/cuppa.js";
import "./cuppaComponent/TestComponent.js";
import {CuppaSortable} from "./cuppa.sortable.js";

export default class App extends CuppaComponent {
	static observables = ['items'];
	items = [];
	addIndex = 1;
	
	constructor() {
		super();
		for(let i=0; i<10; i++){
			this.onAdd();
		}
	}
	
	mounted(){
		this.createSortable();
	}
	
	createSortable(){
		//CuppaSortable.sortable({element: this.refs.sortable1, handle:'.handle', valueKey:'id', values:this.items, dropCallback: this.updateCallback})
	}
	
	updateCallback(data){
		this.items = data?.values;
	}
	
	onAdd(){
		let height = 30;  // height = 20 + Math.random() * 100;
		this.items.push({id: this.addIndex, name: this.addIndex, height});
		this.items = this.items;
		this.addIndex++;
	}

    render() {
        return html`
            <button @click=${e=>{
                e.stopPropagation();
                const item = this.items[0];
                this.items.splice(0, 1);
                this.items.push(item);
                this.items = this.items;
            }}>switch</button>
	        <button @click=${this.onAdd}>+</button>
	        <div class="flex d-column g-3 ">
                ${repeat(this.items, item => item.id, item => {
					return html`
	                    <div
		                    class="cuppa-sortable-item"
                            ${ref(el => {
                                if(!el) return;
                                CuppaSortable.sortable({
                                    currentElement: el,
                                    value:item,
                                    valueKey:"id",
                                    values:this.items,
                                    dropCallback:(data)=>{
										log(data);
                                       this.items = data?.values;
                                    }
                                })
                            })}
	                    >
                            <div
                                class="item grid cols-2"
                                style="grid-template-columns: 40px 1fr; height: ${item.height}px; width: 300px"
                            >
                                <button class="handle">...</button>
                                <div class="p-x-20 flex j-start a-center">${item.name}</div>
                            </div>
	                    </div>
					`
                })}
	        </div>
            <style>
                app-comp {
                    & table {
                        width: 100%;
                        border: 1px solid #F00;
                        table-layout: fixed;

                        & tr {
                            & td {
                                background: #ddd;
                                width: 100%;
                            }

                            & th {
                                & > div {
                                    background: #ffd3d3;
                                    width: 100%;
                                }
                            }
                        }
                    }

                    & .item {
                        background: #ddd;
                        padding: 0;
                    }

                    & .box {
                        display: inline-flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100px;
                        height: 100px;
                        background: #ddd;
                    }
                }
            </style>
        `
    }
}

customElements.define('app-comp', App);
