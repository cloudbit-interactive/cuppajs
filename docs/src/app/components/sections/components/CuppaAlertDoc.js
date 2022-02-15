import {CuppaComponent, html} from "../../../../cuppa/cuppa.component.min.js";
import {CuppaAlert} from "../../../../cuppa/components/cuppa.alert.min.js";
import {Utils} from "../../../controlers/Utils.js";

export class CuppaAlertDoc extends CuppaComponent {
    alertResult = this.observable("alertResult");

    mounted(){
        Utils.loadPrism();
    }

    showAlert(){
        let alert = new CuppaAlert({
            title: "Message",
            message: html`This is a <strong>html</strong> text message`,
            backdropEnabled:true,
            cancelText: "Cancel",
            inputText: "",
            placeholder: "Type your message here",
            callback:(res)=>{
                this.alertResult = res;
            }
        });
        document.body.append(alert);
    }

    showAlertPersonalized(){
        let alert = new CuppaAlert({
            message: getText(),
            backdropEnabled:false,
            acceptText:"",
            title:"Terms & Conditions",
            topBar:true,
            className:["modal-1"],
        });
        document.body.append(alert);
    }

    render(){
        return html`
            <style>
                .modal-1{ padding: 20px; }
                .modal-1 .cuppa_alert_modal{ max-width: none; padding: 0rem; height: 100%; }
                .modal-1 .cuppa_alert_top_bar{ border-bottom: 1px solid rgb(221, 221, 221); color: #fff; background: var(--color-menu-bg);  }
                .modal-1 .cuppa_alert_message{ overflow: auto; height: calc(100% - 4.3rem); padding: 2rem; }
            </style>
            <div>
                <h1 class="title-2 mb-10">Cuppa Alert</h1>
                <div class="message" style="display: flex; align-items: center;">
                    <button class="button-1" @click="${this.showAlert}" >Show Alert</button>
                    <div class="separator-v"></div>
                    <div><strong>Result:</strong> ${JSON.stringify(this.alertResult)}</div>
                </div>
                <div class="message" style="display: flex; align-items: center; margin:1rem 0 0;">
                    <button class="button-1" @click="${this.showAlertPersonalized}" >Personalized Alert</button>
                </div>
                <hr class="separator-1" />
                <h2 class="title-3 mb-10">Code Example</h2>
                ${Utils.prismCode({removeTabsCount:5, code:`
                    <!-- Import component -->
                    <script src="https://cdn.jsdelivr.net/npm/cuppajs/libs/components/cuppa.alert.min.js" type="module"></script>
                    
                    <!-- Use with HTML Tag -->
                    <cuppa-alert 
                        title="Message" 
                        message="What is your name?" 
                        input-text="" 
                        cancel-text="Cancel" 
                        onclose="console.log(this.value, this.inputText)" >
                    </cuppa-alert>
                    
                    <!-- Use with JS -->
                    <script type="module">
                        let alert = new CuppaAlert({
                            title: 'Message',
                            message: 'My message',
                            callback:(res)=>{ console.log(res); }
                        });
                        document.body.append(alert);
                    </script>
                `})}
                
                <hr class="separator-1" />
                <h2 class="title-3 mb-10">Properties</h2>
                <div style="overflow: auto;">
                    <table class="table-1 min-width" >
                        <thead>
                            <tr>
                                <th style="width: 30rem">
                                    <div class="tag-1">Property</div> 
                                    <div class="tag-1 tag-1-white">attribute</div>
                                    <div class="tag-1 tag-1-yellow">event</div>
                                </th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="tag-1">title</div>
                                    <div class="tag-1 tag-1-white">title</div>
                                </td>
                                <td>string</td>
                                <td></td>
                                <td>Title of the alert.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">message</div>
                                    <div class="tag-1 tag-1-white">message</div>
                                </td>
                                <td>string</td>
                                <td></td>
                                <td>Message of the alert.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">acceptText</div>
                                    <div class="tag-1 tag-1-white">accept-text</div>
                                </td>
                                <td>string</td>
                                <td>accept</td>
                                <td>Text of the accept button.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">cancelText</div>
                                    <div class="tag-1 tag-1-white">cancel-text</div>
                                </td>
                                <td>string</td>
                                <td></td>
                                <td>Text of the cancel button, if it is empty the alert don't show the button.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">backdropEnabled</div>
                                    <div class="tag-1 tag-1-white">backdrop-enabled</div>
                                </td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>If true the alert will close when user click outside alert.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">inputText</div>
                                    <div class="tag-1 tag-1-white">input-text</div>
                                </td>
                                <td>string</td>
                                <td>null</td>
                                <td>If is '' or any text, the alert show an input-text.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">placeholder</div>
                                    <div class="tag-1 tag-1-white">placeholder</div>
                                </td>
                                <td>string</td>
                                <td></td>
                                <td>Placeholder of the input-text.</td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1">callback</div>
                                </td>
                                <td>function</td>
                                <td></td>
                                <td>
                                    Callback function when the user click on accept, cancel or close button.
                                    <br />
                                    return {value: boolean, inputText: string}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="tag-1 tag-1-yellow">onclose</div>
                                </td>
                                <td>Event</td>
                                <td></td>
                                <td>Fires when alert closed.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    }
}

customElements.define('cuppa-alert-doc', CuppaAlertDoc);


function getText(){
    return html`
        <h1 class="title-3">Idemne, quod iucunde?</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid, quod homines infima fortuna, nulla spe rerum
            gerendarum, opifices denique delectantur historia? <a href="http://loripsum.net/" target="_blank">Huius ego
                nunc auctoritatem sequens idem faciam.</a> A primo, ut opinor, animantium ortu petitur origo summi boni.
            Octavio fuit, cum illam severitatem in eo filio adhibuit, quem in adoptionem D. Ergo id est convenienter
            naturae vivere, a natura discedere. Duo Reges: constructio interrete. Atque etiam valítudinem, vires,
            vacuitatem doloris non propter utilitatem solum, sed etiam ipsas propter se expetemus. Cuius etiam illi
            hortuli propinqui non memoriam solum mihi afferunt, sed ipsum videntur in conspectu meo ponere. </p>

        <p>Simul atque natum animal est, gaudet voluptate et eam appetit ut bonum, aspernatur dolorem ut malum. Memini
            me adesse P. <b>Quia dolori non voluptas contraria est, sed doloris privatio.</b></p>

        <p>Quid tanto concursu honestissimorum studiorum, tanto virtutum comitatu, si ea nullam ad aliam rem nisi ad
            voluptatem conquiruntur? Idem fecisset Epicurus, si sententiam hanc, quae nunc Hieronymi est, coniunxisset
            cum Aristippi vetere sententia. Quem ad modum quis ambulet, sedeat, qui ductus oris, qui vultus in quoque
            sit? Sed ad haec, nisi molestum est, habeo quae velim. Tum mihi Piso: Quid ergo? Modo etiam paulum ad
            dexteram de via declinavi, ut ad Pericli sepulcrum accederem. Tenuit permagnam Sextilius hereditatem, unde,
            si secutus esset eorum sententiam, qui honesta et recta emolumentis omnibus et commodis anteponerent, nummum
            nullum attigisset. Quis est enim aut quotus quisque, cui, mora cum adpropinquet, non refugiat timido sanguen
            átque exalbescát metu? Non elogia monimentorum id significant, velut hoc ad portam: Hunc unum plurimae
            consentiunt gentes populi primarium fuisse virum. </p>

        <ul>
            <li>Quod non subducta utilitatis ratione effici solet, sed ipsum a se oritur et sua sponte nascitur.</li>
            <li>Quod si ita est, sequitur id ipsum, quod te velle video, omnes semper beatos esse sapientes.</li>
            <li>Suo genere perveniant ad extremum;</li>
            <li>Ea, quae dialectici nunc tradunt et docent, nonne ab illis instituta sunt aut inventa sunt?</li>
        </ul>


        <dl>
            <dt><dfn>Primum divisit ineleganter;</dfn></dt>
            <dd>Nam aliquando posse recte fieri dicunt nulla expectata nec quaesita voluptate.</dd>
            <dt><dfn>Sint ista Graecorum;</dfn></dt>
            <dd>Sin est etiam corpus, ista explanatio naturae nempe hoc effecerit, ut ea, quae ante explanationem
                tenebamus, relinquamus.
            </dd>
            <dt><dfn>Venit ad extremum;</dfn></dt>
            <dd>Ac tamen hic mallet non dolere.</dd>
            <dt><dfn>Confecta res esset.</dfn></dt>
            <dd>Eorum enim omnium multa praetermittentium, dum eligant aliquid, quod sequantur, quasi curta sententia;
            </dd>
            <dt><dfn>Sed fortuna fortis;</dfn></dt>
            <dd>Quid autem habent admirationis, cum prope accesseris?</dd>
        </dl>


        <p>Verum tamen cum de rebus grandioribus dicas, ipsae res verba rapiunt; Voluptatem cum summum bonum diceret,
            primum in eo ipso parum vidit, deinde hoc quoque alienum; Num igitur utiliorem tibi hunc Triarium putas esse
            posse, quam si tua sint Puteolis granaria? Illud quaero, quid ei, qui in voluptate summum bonum ponat,
            consentaneum sit dicere. Quae diligentissime contra Aristonem dicuntur a Chryippo. Idque testamento cavebit
            is, qui nobis quasi oraculum ediderit nihil post mortem ad nos pertinere? </p>

        <p>Nihil acciderat ei, quod nollet, nisi quod anulum, quo delectabatur, in mari abiecerat. <a
                href="http://loripsum.net/" target="_blank">Quae cum dixisset paulumque institisset, Quid est?</a>
            Deinde disputat, quod cuiusque generis animantium statui deceat extremum. Scisse enim te quis coarguere
            possit? Atque his de rebus et splendida est eorum et illustris oratio. Sapiens autem semper beatus est et
            est aliquando in dolore; </p>

        <h2>Non semper, inquam;</h2>

        <p>In voluptate corporis-addam, si vis, animi, dum ea ipsa, ut vultis, sit e corpore-situm est vivere beate.
            Deque his rebus satis multa in nostris de re publica libris sunt dicta a Laelio. Quae cum praeponunt, ut sit
            aliqua rerum selectio, naturam videntur sequi; Satisne vobis videor pro meo iure in vestris auribus
            commentatus? Quod enim dissolutum sit, id esse sine sensu, quod autem sine sensu sit, id nihil ad nos
            pertinere omnino. Sin est etiam corpus, ista explanatio naturae nempe hoc effecerit, ut ea, quae ante
            explanationem tenebamus, relinquamus. Sed erat aequius Triarium aliquid de dissensione nostra iudicare. <i>Quacumque
                enim ingredimur, in aliqua historia vestigium ponimus.</i> Si enim ita est, vide ne facinus facias, cum
            mori suadeas.
            <mark>Nulla erit controversia.</mark>
            Legimus tamen Diogenem, Antipatrum, Mnesarchum, Panaetium, multos alios in primisque familiarem nostrum
            Posidonium. Atqui haec patefactio quasi rerum opertarum, cum quid quidque sit aperitur, definitio est.
        </p>

        <ol>
            <li>Se dicere inter honestum et turpe nimium quantum, nescio quid inmensum, inter ceteras res nihil omnino
                interesse.
            </li>
            <li>Cum audissem Antiochum, Brute, ut solebam, cum M.</li>
            <li>Callipho ad virtutem nihil adiunxit nisi voluptatem, Diodorus vacuitatem doloris.</li>
            <li>Id mihi magnum videtur.</li>
        </ol>



    `
}
