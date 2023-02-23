import {App} from "./components/App.js";

document.body.append(new App());

if('serviceWorker' in navigator){
	window.addEventListener('load', ()=>{ navigator.serviceWorker.register('./serviceWorker.js') })
}
