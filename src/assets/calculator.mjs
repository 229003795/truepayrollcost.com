import {presetFor,mountPresets,promotionFor} from './presets.mjs?v=20261023-qb1';
import {calculate,firstYearFields} from './cost.mjs?v=20261023-quote1';
import {presentQuote,emptyMessage,cashPrompt,internalPrompt} from './quote-output.mjs?v=20261023-entry1';
import {mountTakeaway} from './takeaway.mjs?v=20261023-presets1';
const form=document.querySelector('#cost-form'),out=document.querySelector('#cost-result');
const labels={base:'Monthly base / platform fee',perPerson:'Monthly per-person fee',people:'Billable people',oneTime:'One-time setup / implementation fee',taxAnnual:'Tax filing / year-end fees per year',otherAnnual:'Other recurring annual fees / modules',renewal:'Contracted year-two price',hours:'Internal transition hours',hourly:'Internal hourly cost'};
const money=n=>n===null?'Pending confirmation':n.toLocaleString('en-US',{style:'currency',currency:'USD'});
const n=v=>v===null?'[pending]':String(v);
const node=(tag,text)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;};
function inputStates(){for(const key of Object.keys(labels)){const blank=form.elements.namedItem(key).value==='';const status=document.querySelector('#'+key+'-state');status.textContent=blank?(key==='hourly'?'Enter your hourly cost to calculate the total. Transition hours are also required.':'Pending confirmation'):'Entered';status.dataset.pending=String(blank);}}
function row(dl,label,value,action=false){const div=node('div');if(label==='First-year total')div.className='annual-total';const amount=node('dd',value);if(value.startsWith('$'))amount.className='is-number';if(action){const link=node('a',value);link.href='#hourly';link.addEventListener('click',()=>form.elements.namedItem('hourly').focus());amount.replaceChildren(link);}div.append(node('dt',label),amount);dl.append(div);}
function run(focus=false){if(!form.reportValidity())return;try{
 const input=Object.fromEntries([...firstYearFields,'renewal'].map(key=>{const raw=form.elements.namedItem(key).value;return [key,raw===''?null:Number(raw)];}));input.renewalMode=form.elements.namedItem('renewalMode').value;
 const r=calculate(input);const selected=presetFor(window.PayrollInputs.example),promotion=promotionFor(selected,r);if(promotion){if(r.firstYear!==null)r.firstYear-=promotion.saving;if(r.twoYears!==null)r.twoYears-=promotion.saving;}const formula=`(${n(r.base)} + ${n(r.perPerson)} × ${n(r.people)}) × 12 + ${n(r.oneTime)} + ${n(r.taxAnnual)} + ${n(r.otherAnnual)} + (${n(r.hours)} × ${n(r.hourly)}) ${promotion?' − '+money(promotion.saving)+' promotional base discount':''} = ${money(r.firstYear)}`;
 const recurrence=`(${n(r.base)} + ${n(r.perPerson)} × ${n(r.people)}) × 12 + ${n(r.taxAnnual)} + ${n(r.otherAnnual)}`;
 const yearTwoFormula=r.renewalMode==='known_total'?`Year two = quoted recurring annual total ${n(r.renewal)} = ${money(r.yearTwo)}`:r.renewalMode==='increase_percent'?`Year two = (${recurrence}) × (1 + ${n(r.renewal)} ÷ 100) = ${money(r.yearTwo)}`:`Year two = (${recurrence}) + ${n(r.renewal)} annual increase = ${money(r.yearTwo)}`;
 const view=presentQuote(r);if(promotion&&view.cash!==null)view.cash-=promotion.saving;const cashEquation=promotion?money(promotion.early)+' × '+promotion.months+' + '+money(promotion.regular)+' × '+(12-promotion.months):money(r.monthly)+' × 12';
 const example=window.PayrollInputs.example;const preset=presetFor(example);const unedited=!!preset&&!example.startsWith('edited:');const quoteRequired=!!preset&&preset.base===null&&r.monthly===null;
 const exampleNotice=quoteRequired?'Quote required — '+preset.name:preset?(unedited?'Published-price preset — not your quote. ':'Edited preset — verify your quote. ')+preset.name:example?'Edited example — verify remaining assumptions against your quote.':'';
 out.replaceChildren(node('h3','Your annual cost'));
 if(example){out.append(node('p',exampleNotice));if(preset){const source=node('p',preset.note+' ');const link=node('a',preset.name+' official pricing page · checked '+preset.checked);link.href='#'+preset.sourceId;source.append(link);out.append(source);}}
 const cashLabel=unedited&&view.cash!==null?'Cash outlay — first year (Example subtotal)':view.cashComplete?'Cash outlay — first year':'Cash outlay — first year (confirmed subtotal)';
 const pendingTotal='Pending confirmation — enter '+r.pending.filter(key=>key!=='renewal').map(key=>labels[key]).join(', ')+'.';
 const dl=node('dl');row(dl,cashLabel,view.cash===null?cashPrompt:money(view.cash));row(dl,'Internal cost — transition time',r.internal===null?internalPrompt:money(r.internal),r.internal===null);row(dl,'First-year total',r.firstYear===null?pendingTotal:money(r.firstYear));
 if(view.waiting)out.append(node('p',cashPrompt),node('p',internalPrompt));else out.insertBefore(dl,out.children[1]||null);
 if(r.monthly!==null){out.append(node('p',(promotion?'Regular monthly platform + people = ':'Monthly platform + people = ')+n(r.base)+' + '+n(r.perPerson)+' × '+n(r.people)+' = '+money(r.monthly)));
 const knownFees=['oneTime','taxAnnual','otherAnnual'].filter(key=>r[key]!==null);
 out.append(node('p',cashLabel+' = '+cashEquation+knownFees.map(key=>' + '+money(r[key])).join('')+' = '+money(view.cash)));
 if(!view.cashComplete)out.append(node('p',(unedited?'This Example subtotal uses the selected preset inputs; you have not confirmed these amounts. ':'This is the annualized cash subtotal of entered charges, not the full annual bill. ')+'Unconfirmed setup, filing and other annual fees remain on the checklist and are excluded from this subtotal.'));
 }
 if(r.internal!==null)out.append(node('p','Internal cost = '+n(r.hours)+' × '+n(r.hourly)+' = '+money(r.internal)));
 if(r.firstYear!==null)out.append(node('p','First-year total = cash outlay + internal cost = '+money(r.firstYear)));
 if(r.renewal!==null)out.append(node('p',yearTwoFormula));
 if(r.twoYears!==null)out.append(node('p','Two years = '+money(r.firstYear)+' + '+money(r.yearTwo)+' = '+money(r.twoYears)));
 if(!view.waiting)out.append(node('p','Cash outlay is paid to the provider. Internal cost values your own transition time; it is not a provider charge.'));
 const checklistHeading=node('h3','Items to confirm before signing');checklistHeading.id='confirmation-checklist';out.append(checklistHeading);
 if(view.pending.length){const list=node('ul');for(const key of view.pending)list.append(node('li',form.querySelector('label[for="'+key+'"]').textContent+' — Pending confirmation'));out.append(list);}else out.append(node('p','No blank inputs. Confirm these terms in writing before signing.'));
 if(!view.waiting)out.append(node('p','Unconfirmed amounts remain pending. They are not treated as zero.'));
 const date=new Date().toLocaleDateString('en-CA');
 window.PayrollInputs.commit({example:!!example,exampleNotice,cash:view.cash,baseMonthly:r.monthly,title:'Your annual cost',waiting:view.waiting,emptyMessage,annualBreakdown:true,monthlySummary:promotion?'First '+promotion.months+' months: '+money(promotion.early)+'/month; then '+money(promotion.regular)+'/month':null,internalAction:r.internal===null,quoteRequired,presetSource:preset?{label:preset.name+' official pricing page · checked '+preset.checked,href:'#'+preset.sourceId}:null,monthly:r.firstYear===null?null:r.firstYear/12,annual:r.firstYear,people:r.people,incomplete:r.pending.length>0,items:view.waiting?[]:[[cashLabel,view.cash??cashPrompt],['Internal cost — transition time',r.internal??internalPrompt],['First-year total',r.firstYear??pendingTotal]],formula:view.waiting?'':example&&r.monthly!==null?'Cash subtotal: '+cashEquation+['oneTime','taxAnnual','otherAnnual'].filter(key=>r[key]!==null).map(key=>' + '+money(r[key])).join('')+' = '+money(view.cash):'First year: '+formula,scope:view.waiting?'':example?'Published-price preset or edited scenario, not a confirmed quote. Unconfirmed charges and internal time remain on the checklist.':(view.cashComplete?'':'Cash is a confirmed subtotal; unconfirmed fees remain on the checklist. ')+'Cash outlay is paid to the provider. Internal cost is your own transition time, not a provider charge.',reviewLabel:example?'Example · Rates checked 2026-10-23':view.waiting?'Your quote':'Your quote · Calculated '+date});
 mountTakeaway({form,out,result:r,view,cashLabel,preset});
 inputStates();if(focus)out.focus();
}catch(error){out.textContent=error.message;}}
form.addEventListener('input',inputStates);form.addEventListener('change',inputStates);form.addEventListener('submit',event=>{event.preventDefault();run(true);});
mountPresets({form,run});inputStates();run();
