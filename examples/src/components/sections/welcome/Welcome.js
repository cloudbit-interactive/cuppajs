import {CuppaComponent} from "../../../../../libs/cuppa.component.js";

export default class Welcome extends CuppaComponent {
    constructor(){
        super();
    }

    render(){
        return /*html*/`
            <div class="message">
                <h2 class="title2">Welcome</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <i>Tu vero, inquam, ducas licet, si sequetur;</i> <a href="http://loripsum.net/" target="_blank">Sed fortuna fortis;</a> Sed plane dicit quod intellegit. Illa videamus, quae a te de amicitia dicta sunt. Terram, mihi crede, ea lanx et maria deprimet. </p>

                <p>Quid in isto egregio tuo officio et tanta fide-sic enim existimo-ad corpus refers? Duo Reges: constructio interrete. Quod autem in homine praestantissimum atque optimum est, id deseruit. Ostendit pedes et pectus. <i>Falli igitur possumus.</i> Beatus sibi videtur esse moriens. Hoc mihi cum tuo fratre convenit. </p>
                
                <p>Sed quod proximum fuit non vidit. Conferam tecum, quam cuique verso rem subicias; Itaque et manendi in vita et migrandi ratio omnis iis rebus, quas supra dixi, metienda. Cenasti in vita numquam bene, cum omnia in ista Consumis squilla atque acupensere cum decimano. Quae contraria sunt his, malane? </p>
            
            </div>`
    }
}

customElements.define('welcome-comp', Welcome);
