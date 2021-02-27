import {CuppaComponent} from "../../../../../libs/cuppa.component.js";
import("../../../../../libs/components/cuppa.switch.js");
import("../../../../../libs/components/cuppa.alert.js");
import("../../../../../libs/components/cuppa.tabs.js");

export default class UseComponents extends CuppaComponent {
    
    constructor(){
        super();
    }

    onSwitchChange(e){
        console.log("switch callback:", e.currentTarget.state)
    }

    onAlert(){
        document.body.append(new CuppaAlert({title:"Hi,", message:"Please, specify your name.", inputText:"", cancelText:"Cancel", callback:(value, input)=>console.log("alert callback: ", value, input)} ));
    }

    render(){
        return /*html*/`
            <div>
                <h2 class="title2">How use a component created in any framework</h2>
                <p>There are tons of way to load a components depending of each case. Bellow is showed the simples and fast way to import it.</p>
                
                <h3 class="title3">CuppaSwitch</h3>
                <cuppa-switch name="switch1" onchange="this.onSwitchChange" ></cuppa-switch>
                <!--
                <iframe style="height:600px;" src="https://stackblitz.com/edit/cuppa-component-import1?embed=1&file=index.html&hideExplorer=1&hideNavigation=1"></iframe>
                -->

                <h3 class="title3">Cuppa Alert</h3>
                <button onclick="this.onAlert">Show Alert</button>

                <h3 class="title3">Cuppa Tabs</h3>    
                <cuppa-tabs selected="first-tab">
                    <cuppa-tab value="first-tab" style="width:150px">
                        <img height="16" style="margin:0 10px 0 0" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTQ5OC4xOTUzMTIgMjIyLjY5NTMxMmMtLjAxMTcxOC0uMDExNzE4LS4wMjM0MzctLjAyMzQzNy0uMDM1MTU2LS4wMzUxNTZsLTIwOC44NTU0NjgtMjA4Ljg0NzY1NmMtOC45MDIzNDQtOC45MDYyNS0yMC43MzgyODItMTMuODEyNS0zMy4zMjgxMjYtMTMuODEyNS0xMi41ODk4NDMgMC0yNC40MjU3ODEgNC45MDIzNDQtMzMuMzMyMDMxIDEzLjgwODU5NGwtMjA4Ljc0NjA5MyAyMDguNzQyMTg3Yy0uMDcwMzEzLjA3MDMxMy0uMTQwNjI2LjE0NDUzMS0uMjEwOTM4LjIxNDg0NC0xOC4yODEyNSAxOC4zODY3MTktMTguMjUgNDguMjE4NzUuMDg5ODQ0IDY2LjU1ODU5NCA4LjM3ODkwNiA4LjM4MjgxMiAxOS40NDUzMTIgMTMuMjM4MjgxIDMxLjI3NzM0NCAxMy43NDYwOTMuNDgwNDY4LjA0Njg3Ni45NjQ4NDMuMDcwMzEzIDEuNDUzMTI0LjA3MDMxM2g4LjMyNDIxOXYxNTMuNjk5MjE5YzAgMzAuNDE0MDYyIDI0Ljc0NjA5NCA1NS4xNjAxNTYgNTUuMTY3OTY5IDU1LjE2MDE1Nmg4MS43MTA5MzhjOC4yODEyNSAwIDE1LTYuNzE0ODQ0IDE1LTE1di0xMjAuNWMwLTEzLjg3ODkwNiAxMS4yODkwNjItMjUuMTY3OTY5IDI1LjE2Nzk2OC0yNS4xNjc5NjloNDguMTk1MzEzYzEzLjg3ODkwNiAwIDI1LjE2Nzk2OSAxMS4yODkwNjMgMjUuMTY3OTY5IDI1LjE2Nzk2OXYxMjAuNWMwIDguMjg1MTU2IDYuNzE0ODQzIDE1IDE1IDE1aDgxLjcxMDkzN2MzMC40MjE4NzUgMCA1NS4xNjc5NjktMjQuNzQ2MDk0IDU1LjE2Nzk2OS01NS4xNjAxNTZ2LTE1My42OTkyMTloNy43MTg3NWMxMi41ODU5MzcgMCAyNC40MjE4NzUtNC45MDIzNDQgMzMuMzMyMDMxLTEzLjgwODU5NCAxOC4zNTkzNzUtMTguMzcxMDkzIDE4LjM2NzE4Ny00OC4yNTM5MDYuMDIzNDM3LTY2LjYzNjcxOXptMCAwIiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvc3ZnPg==" />
                        <span>First tab</span>
                    </cuppa-tab>
                    <cuppa-tab value="second-tab" style="width:150px">
                        <img height="16" style="margin:0 10px 0 0" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Im0yMy41MDguMDAzYy00LjY4NS0uMDg0LTEwLjAyOCAyLjM2NS0xMy40MSA2LjE2NC0zLjIzMi4wNjEtNi4zNzkgMS4zODYtOC42OTYgMy43MDMtLjEzNS4xMzMtLjE4My4zMzItLjEyNC41MTIuMDYuMTgxLjIxNi4zMTIuNDA0LjMzOWwzLjg1NC41NTItLjQ3Ni41MzNjLS4xNzcuMTk4LS4xNjguNDk5LjAyLjY4N2w2LjQyNyA2LjQyN2MuMDk3LjA5Ny4yMjUuMTQ2LjM1NC4xNDYuMTE5IDAgLjIzOC0uMDQyLjMzMy0uMTI3bC41MzMtLjQ3Ni41NTIgMy44NTRjLjAyNy4xODguMTc1LjMyNi4zNTQuMzg2LjA0Ni4wMTUuMDk0LjAyMi4xNDMuMDIyLjE0MiAwIC4yODctLjA2Mi4zODctLjE2MSAyLjI4NS0yLjI4NSAzLjYxLTUuNDMyIDMuNjcxLTguNjY0IDMuODAzLTMuMzg5IDYuMjcyLTguNzMgNi4xNjMtMTMuNDA5LS4wMDctLjI2Ni0uMjIyLS40ODEtLjQ4OS0uNDg4em0tNC42MDggOC42MzJjLS40ODcuNDg3LTEuMTI3LjczMS0xLjc2OC43MzFzLTEuMjgxLS4yNDQtMS43NjgtLjczMWMtLjk3NC0uOTc1LS45NzQtMi41NjEgMC0zLjUzNi45NzUtLjk3NSAyLjU2MS0uOTc1IDMuNTM2IDBzLjk3NSAyLjU2MiAwIDMuNTM2eiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIuNzI0IDE2LjkwNWMtMS4wNyAxLjA3LTIuNTM5IDUuOTA0LTIuNzAzIDYuNDUxLS4wNTMuMTc2LS4wMDQuMzY3LjEyNS40OTcuMDk2LjA5Ni4yMjMuMTQ3LjM1NC4xNDcuMDQ4IDAgLjA5Ni0uMDA3LjE0NC0uMDIxLjU0Ny0uMTY0IDUuMzgxLTEuNjMzIDYuNDUxLTIuNzAzIDEuMjA1LTEuMjA1IDEuMjA1LTMuMTY2IDAtNC4zNzEtMS4yMDYtMS4yMDUtMy4xNjYtMS4yMDQtNC4zNzEgMHoiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+" />
                        <span>Second tab</span>
                    </cuppa-tab>
                </cuppa-tabs>
            </div>`
    }
}

customElements.define('use-components', UseComponents);
