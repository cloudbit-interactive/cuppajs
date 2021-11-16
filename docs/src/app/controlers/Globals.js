import { CuppaRouter } from "../../cuppa/cuppa.router.js";

export class Globals{
    static router = new CuppaRouter({root:(document.location.hostname.indexOf("127.0.0.1") != -1) ? "docs/" : "", hash:"#/"});
}