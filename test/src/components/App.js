import {CuppaComponent, html, ref, render as renderHTML} from "./cuppa.component.js";
import { cuppa, log } from "../../../libs/cuppa.js";
import "./cuppaComponent/TestComponent.js";
import {CuppaSortable} from "./cuppa.sortable.js";

export default class App extends CuppaComponent {
	static observables = ['items'];
	items = cuppa.arrayToArrayObject(cuppa.arrayFromTo(1, 15), {value:'id', label:'name'});
	
	updateCallback(data){
		this.items = data?.values;
	}

    render() {
        return html`
	        <div class="flex d-column g-5" >
		         ${this.items.map((item) => {
				    return html`
                        <cuppa-sortable
                        	.value=${item}
	                        .values=${this.items}
                            value-key="id"
	                        return-value="true"
	                        .dropCallback=${(data) => {
                               this.updateCallback(data)
	                        }}
                        >
	                        <div class="cuppa-sortable-item" >${item.name}</div>
                        </cuppa-sortable>
				    `
                 })}
	        </div>
            <table >
                <thead>
                <tr>
                    ${this.items.map((item) => {
                        return html`
                            <th
                                class="sortable-th"
                                ${ref(el => {
                                    if (!el) return;
                                    CuppaSortable.sortable({
                                        currentElement: el,
                                        sortableClass: '.sortable-th',
                                        value: item,
                                        valueKey: "id",
                                        values: this.items,
                                        returnValue: true,
                                        dropCallback: this.updateCallback,
                                    })
                                })}
                            >
                                <div style="background: #ffa48b">${item.id}</div>
                            </th>
                        `;
                    })}
                </tr>
                </thead>
            </table>
            <table >
                <tbody>
                ${this.items.map((item) => {
                    return html`
                        <tr
                            class="sortable-tr"
                            ${ref(el => {
                                if (!el) return;
                                CuppaSortable.sortable({
                                    currentElement: el,
                                    sortableClass: '.sortable-tr',
                                    value: item,
                                    valueKey: "id",
                                    values: this.items,
                                    returnValue: true,
                                    dropCallback: this.updateCallback,
                                })
                            })}
                        >
                            <td>${item.id}</td>
                        </tr>
                    `
                })}
                </tbody>
            </table>
            <div class="flex d-column j-start g-5" >
                ${this.items.map((item) => {
                    return html`
                        <div
                            class="sortable-box2"
                            ${ref(el => {
                                if (!el) return;
                                CuppaSortable.sortable({
                                    currentElement: el,
                                    sortableClass: '.sortable-box2',
                                    value: item,
                                    valueKey: "id",
                                    values: this.items,
                                    returnValue: true,
                                    dropCallback: this.updateCallback,
                                })
                            })}
                        >
                            <div class="item" >
                                <div>box ${item.id}</div>
                            </div>
                        </div>
                    `
                })}
            </div>
            <div class="flex d-row j-start g-5" >
                ${this.items.map((item) => {
                    return html`
                        <div
                            class="sortable-box"
                            ${ref(el => {
                                if (!el) return;
                                CuppaSortable.sortable({
                                    currentElement: el,
                                    sortableClass: '.sortable-box',
                                    value: item,
                                    valueKey: "id",
                                    values: this.items,
                                    returnValue: true,
                                    dropCallback: this.updateCallback,
                                })
                            })}
                        >
                            <div class="box">
                                <div>box ${item.id}</div>
                            </div>
                        </div>
                    `
                })}
            </div>
            <style>
                app-comp {
	                .cuppa-sortable-item{
		                background: #FDF845;
	                }
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
                        padding: 5px;
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
