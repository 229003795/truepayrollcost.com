import {calculate,firstYearFields} from './cost.mjs?v=20261023-quote1';
import {presentQuote,emptyMessage} from './quote-output.mjs?v=20261023-output1';
const form=document.querySelector('#cost-form'),out=document.querySelector('#cost-result');
const labels={base:'Monthly base / platform fee',perPerson:'Monthly per-person fee',people:'Billable people',oneTime:'One-time setup / implementation fee',taxAnnual:'Tax filing / year-end fees per year',otherAnnual:'Other recurring annual fees / modules',renewal:'Contracted year-two price',hours:'Internal transition hours',hourly:'Internal hourly cost'};
const money=n=>n===null?'Pending confirmation':n.toLocaleString('en-US',{style:'currency',currency:'USD'});
const n=v=>v===null?'[pending]':String(v);
const node=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
function inputStates(){for(const key of Object.keys(labels)){const blank=form.elements.namedItem(key).value==='';const status=document.querySelector('#'+key+'-state');status.textContent=blank?'Pending confirmation':'Entered';status.dataset.pending=String(blank);}}
function row(dl,label,value){const div=node('div');if(label==='First-year total')div.className='annual-total';div.append(node('dt',label),node('dd',value));dl.append(div);}
function run(focus=false){if(!form.reportValidity())return;try{
 const input=Object.fromEntries([...firstYearFields,'renewal'].map(key=>{const raw=form.elements.namedItem(key).value;return [key,raw===''?null:Number(raw)];}));input.renewalMode=form.elements.namedItem('renewalMode').value;
 const r=calculate(input),formula=`(${n(r.base)} + ${n(r.perPerson)} × ${n(r.people)}) × 12 + ${n(r.oneTime)} + ${n(r.taxAnnual)} + ${n(r.otherAnnual)} + (${n(r.hours)} × ${n(r.hourly)}) = ${money(r.firstYear)}`;
 const recurrence=`(${n(r.base)} + ${n(r.perPerson)} × ${n(r.people)}) × 12 + ${n(r.taxAnnual)} + ${n(r.otherAnnual)}`;
 const yearTwoFormula=r.renewalMode==='known_total'?`Year two = quoted recurring annual total ${n(r.renewal)} = ${money(r.yearTwo)}`:r.renewalMode==='increase_percent'?`Year two = (${recurrence}) × (1 + ${n(r.renewal)} ÷ 100) = ${money(r.yearTwo)}`:`Year two = (${recurrence}) + ${n(r.renewal)} annual increase = ${money(r.yearTwo)}`;
 const view=presentQuote(r);
 out.replaceChildren(node('h3','Your annual cost'));
 if(view.waiting)out.append(node('p',emptyMessage));
 else {
 const dl=node('dl');row(dl,'Cash outlay — first year',money(view.cash));row(dl,'Internal cost — transition time',money(r.internal));row(dl,'First-year total',money(r.firstYear));out.append(dl);
 out.append(node('p','Cash outlay = ('+n(r.base)+' + '+n(r.perPerson)+' × '+n(r.people)+') × 12 + '+n(r.oneTime)+' + '+n(r.taxAnnual)+' + '+n(r.otherAnnual)+' = '+money(view.cash)),node('p','Internal cost = '+n(r.hours)+' × '+n(r.hourly)+' = '+money(r.internal)),node('p','First-year total = cash outlay + internal cost = '+money(r.firstYear)));
 out.append(node('p',yearTwoFormula),node('p','Two years = '+money(r.firstYear)+' + '+money(r.yearTwo)+' = '+money(r.twoYears)));
 out.append(node('p','Cash outlay is paid to the provider. Internal cost values your own transition time; it is not a provider charge.'));
 }
 out.append(node('h3','Items to confirm before signing'));
 if(view.pending.length){const list=node('ul');for(const key of view.pending)list.append(node('li',labels[key]+' — Pending confirmation'));out.append(list);}else out.append(node('p','No blank inputs. Confirm these terms in writing before signing.'));
 if(!view.waiting)out.append(node('p','Unconfirmed amounts remain pending. They are not treated as zero.'));
 const date=new Date().toLocaleDateString('en-CA');
 window.PayrollInputs.commit({title:'Your annual cost',waiting:view.waiting,emptyMessage,annualBreakdown:true,monthly:r.firstYear===null?null:r.firstYear/12,annual:r.firstYear,people:r.people,incomplete:r.pending.length>0,items:view.waiting?[]:[['Cash outlay — first year',view.cash??'Pending confirmation'],['Internal cost — transition time',r.internal??'Pending confirmation'],['First-year total',r.firstYear??'Pending confirmation']],formula:view.waiting?'':'First year: '+formula,scope:view.waiting?'':'Cash outlay is paid to the provider. Internal cost is your own transition time, not a provider charge.',reviewLabel:view.waiting?'Your quote':'Your quote · Calculated '+date});
 inputStates();if(focus)out.focus();
}catch(error){out.textContent=error.message;}}
form.addEventListener('input',inputStates);form.addEventListener('change',inputStates);form.addEventListener('submit',event=>{event.preventDefault();run(true);});
inputStates();run();
