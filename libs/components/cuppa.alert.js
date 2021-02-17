import {CuppaComponent} from "../../../../libs/cuppa.component.js";
import {cuppa} from "../../../../libs/cuppa.js";

export default class CuppaAlert extends CuppaComponent {
    state = {title:"", message:"", htmlContent:"", acceptText:"Accept", cancelText:"", backdropEnabled:true, inputText:null, placeholder:"", callback:null}

    constructor(opts = {title:"", message:"", htmlContent:null, acceptText:"Accept", cancelText:"", backdropEnabled:true, inputText:null, placeholder:"", callback:null}){
        super();
        this.state = {...this.state, ...opts};
    }

    static get observedAttributes() { return ['title', 'message', 'accept-text', 'cancel-text', 'backdrop-enabled', 'input-text', 'placeholder'] }
    attributeChangedCallback(attr, oldVal, newVal) {
        this.setState({[cuppa.camelize(attr)]:newVal});
     }

    connected(){
        if(this.state.htmlContent){
            this.querySelector(".cuppa_alert_html_content").append(this.state.htmlContent);
        }
    }

    onClick(value){
        if(this.state.callback) this.state.callback(value, this.state.inputText, this);
        this.close();
    }

    onChangeInput(e){
        this.setState({inputText:e.currentTarget.value})
    }

    close(){
        this.parentNode.removeChild(this);
    }

    render(){
        return /*html*/`
            <style>
                html, body{ overflow:hidden; }
                cuppa-alert{ animation-name: cuppa_alert_animation; animation-duration: 0.2s; position:fixed; left:0; right:0; top:0; bottom:0; display:flex; justify-content:center; align-items:center; padding:20px; }
                .cuppa_alert_blockade{ background:rgba(0,0,0,0.5); position:absolute; left:0; right:0; top:0; bottom:0; }
                .cuppa_alert_modal{ position:relative; background: #FFF; width:100%; max-width:500px; padding:30px 40px; overflow: hidden; border-radius: 5px; box-shadow: 0px 3px 10px rgba(0,0,0,0.3); }
                .cuppa_alert_title{ font-size: 22px; font-weight: 700; margin:0 0 10px; }
                .cuppa_alert_input{ width:100%; height:32px; width: 100%; margin:10px 0 0; background: #FFF; color: #333; border-radius: 3px; border: 1px solid #CCC; box-shadow:inset 0 1px 1px rgba(0,0,0,.075); padding:0 10px;  font-weight: 500;  }
                .cuppa_alert_buttons{ margin:10px 0 0; display:flex; justify-content:flex-end; }
                .cuppa_alert_button{ transition: 0.3s background-color; border: none; cursor:pointer; background: #2F80EC; color:#FFF; height: 42px; padding:0 15px; margin:0 3px; border-radius: 3px; }
                .cuppa_alert_button:hover{ background: #1a62c1; }
                .cuppa_alert_button_cancel{ background:#CCC; color:#333;  }
                .cuppa_alert_button_cancel:hover{ background:#A0A0A0; }
                @keyframes cuppa_alert_animation { 0% { opacity: 0; } 100% { opacity: 1; } }

            </style>
            <div ${!this.state.backdropEnabled ? '' : `onclick="this.onClick(false)"`} class="cuppa_alert_blockade"></div>
            <div class="cuppa_alert_modal">
                ${this.state.title ? /*html*/`<div class="cuppa_alert_title">${this.state.title}</div>` : ''}
                <div class="cuppa_alert_message">${this.state.message}</div>
                ${this.state.htmlContent ? /*html*/`<div class="cuppa_alert_html_content"></div>` : '' }
                ${this.state.inputText == undefined ? '' : /*html*/`<input class="cuppa_alert_input" value="${this.state.inputText}" oninput="this.onChangeInput" placeholder="${this.state.placeholder}" />`}
                ${ this.state.canceText || this.state.acceptText ? /*html*/`
                    <div class="cuppa_alert_buttons">
                        ${ !this.state.cancelText ? '' : /*html*/`<button onclick="this.onClick(false)" class="cuppa_alert_button cuppa_alert_button_cancel">${this.state.cancelText}</button>`}
                        ${ !this.state.acceptText ? '' : /*html*/`<button onclick="this.onClick(true)" class="cuppa_alert_button cuppa_alert_button_accept">${this.state.acceptText}</button>`}
                    </div>
                ` : '' }
            </div>
            `
    }
}

customElements.define('cuppa-alert', CuppaAlert);
document.defaultView.CuppaAlert = CuppaAlert;
