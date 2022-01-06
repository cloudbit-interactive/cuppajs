import { CuppaRouter } from "../../cuppa/cuppa.router.min.js";

export class Globals{
    static router = new CuppaRouter({
        root:(document.location.hostname.indexOf('127.0.0.1') != -1) ? 'docs/'
            : (document.location.hostname.indexOf('localhost') != -1) ? 'banks/bank_js/cuppajs/docs/'
            : (document.location.hostname.indexOf('192.') != -1) ? 'banks/bank_js/cuppajs/docs/'
            : '',
        hash:'#/'
    });
}