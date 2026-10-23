import {calculate,firstYearFields} from './cost.mjs?v=20261023-quote1';
import {presentQuote,emptyMessage,cashPrompt,internalPrompt} from './quote-output.mjs?v=20261023-output2';
import {mountTakeaway} from './takeaway.mjs?v=20261023-takeaway1';
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
 const cashLabel=view.cashComplete?'Cash outlay — first year':'Cash outlay — first year (confirmed subtotal)';
 const dl=node('dl');row(dl,cashLabel,view.cash===null?cashPrompt:money(view.cash));row(dl,'Internal cost — transition time',r.internal===null?internalPrompt:money(r.internal));row(dl,'First-year total',r.firstYear===null?'Pending confirmation':money(r.firstYear));
 if(view.waiting)out.append(node('p',cashPrompt),node('p',internalPrompt));else out.append(dl);
 if(r.monthly!==null){out.append(node('p','Monthly platform + people = '+n(r.base)+' + '+n(r.perPerson)+' × '+n(r.people)+' = '+money(r.monthly)));
 const knownFees=['oneTime','taxAnnual','otherAnnual'].filter(key=>r[key]!==null);
 out.append(node('p','Cash outlay — first year'+(view.cashComplete?'':' (confirmed subtotal)')+' = '+money(r.monthly)+' × 12'+knownFees.map(key=>' + '+money(r[key])).join('')+' = '+money(view.cash)));
 if(!view.cashComplete)out.append(node('p','This is the annualized cash subtotal of confirmed charges, not the full annual bill. Unconfirmed setup, filing and other annual fees remain on the checklist and are excluded from this subtotal.'));
 }
 if(r.internal!==null)out.append(node('p','Internal cost = '+n(r.hours)+' × '+n(r.hourly)+' = '+money(r.internal)));
 if(r.firstYear!==null)out.append(node('p','First-year total = cash outlay + internal cost = '+money(r.firstYear)));
 if(r.renewal!==null)out.append(node('p',yearTwoFormula));
 if(r.twoYears!==null)out.append(node('p','Two years = '+money(r.firstYear)+' + '+money(r.yearTwo)+' = '+money(r.twoYears)));
 if(!view.waiting)out.append(node('p','Cash outlay is paid to the provider. Internal cost values your own transition time; it is not a provider charge.'));
 out.append(node('h3','Items to confirm before signing'));
 if(view.pending.length){const list=node('ul');for(const key of view.pending)list.append(node('li',form.querySelector('label[for="'+key+'"]').textContent+' — Pending confirmation'));out.append(list);}else out.append(node('p','No blank inputs. Confirm these terms in writing before signing.'));
 if(!view.waiting)out.append(node('p','Unconfirmed amounts remain pending. They are not treated as zero.'));
 const date=new Date().toLocaleDateString('en-CA');
 window.PayrollInputs.commit({title:'Your annual cost',waiting:view.waiting,emptyMessage,annualBreakdown:true,monthly:r.firstYear===null?null:r.firstYear/12,annual:r.firstYear,people:r.people,incomplete:r.pending.length>0,items:view.waiting?[]:[[cashLabel,view.cash??cashPrompt],['Internal cost — transition time',r.internal??internalPrompt],['First-year total',r.firstYear??'Pending confirmation']],formula:view.waiting?'':'First year: '+formula,scope:view.waiting?'':(view.cashComplete?'':'Cash is a confirmed subtotal; unconfirmed fees remain on the checklist. ')+'Cash outlay is paid to the provider. Internal cost is your own transition time, not a provider charge.',reviewLabel:view.waiting?'Your quote':'Your quote · Calculated '+date});
 mountTakeaway({form,out,result:r,view,cashLabel});
 inputStates();if(focus)out.focus();
}catch(error){out.textContent=error.message;}}
form.addEventListener('input',inputStates);form.addEventListener('change',inputStates);form.addEventListener('submit',event=>{event.preventDefault();run(true);});
inputStates();run();
