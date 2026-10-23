const money=value=>value===null?'Pending confirmation':value.toLocaleString('en-US',{style:'currency',currency:'USD'});
const el=(tag,text)=>{const element=document.createElement(tag);if(text!==undefined)element.textContent=text;return element;};
let current=null;
function buildDocument(){
 if(!current)return null;
 const {form,result:r,view,cashLabel}=current;
 const date=new Date().toLocaleDateString('en-CA');
 const inputs=[...form.querySelectorAll('input[type=number]')].map(input=>({name:form.querySelector('label[for="'+input.id+'"]').textContent,value:input.value===''?'Pending confirmation':input.value}));
 const basis=form.elements.namedItem('renewalMode').selectedOptions[0].textContent;
 const rows=view.waiting?[]:[['Monthly platform + people',money(r.monthly)],[cashLabel,money(view.cash)],['Internal cost — transition time',money(r.internal)],['First-year total',money(r.firstYear)]];
 const pending=inputs.filter(input=>input.value==='Pending confirmation').map(input=>input.name);
 const notes='Source: your entered quote and your own internal estimates. Blank fields are unconfirmed, not zero. Cash subtotal excludes unconfirmed charges. Internal cost is your own time, not a provider charge.';
 const text=['True Payroll Cost — Quote & confirmation checklist','Generated: '+date,...rows.map(([name,value])=>name+': '+value),...(view.waiting?['To see cash outlay, enter the monthly base fee, monthly per-person fee and headcount.','To see internal cost, enter transition hours and hourly cost.']:[]),'Entered quote & assumptions',...inputs.map(input=>input.name+': '+input.value),'Year-two price basis: '+basis,'Items to confirm before signing',...(pending.length?pending.map(name=>'[ ] '+name):['No blank inputs. Confirm these terms in writing before signing.']),notes,'truepayrollcost.com'].join('\n');
 const sheet=el('section');sheet.id='quote-takeaway';sheet.setAttribute('aria-label','Printable quote and confirmation checklist');
 sheet.append(el('h1','Quote & confirmation checklist'),el('p','True Payroll Cost · Generated: '+date));
 const summary=el('dl');for(const [name,value]of rows){const row=el('div');row.append(el('dt',name),el('dd',value));summary.append(row);}sheet.append(summary);
 if(view.waiting)sheet.append(el('p','To see cash outlay, enter the monthly base fee, monthly per-person fee and headcount.'),el('p','To see internal cost, enter transition hours and hourly cost.'));
 sheet.append(el('h2','Entered quote & assumptions'));
 const table=el('table');for(const input of inputs){const row=el('tr');row.append(el('th',input.name),el('td',input.value));table.append(row);}sheet.append(table,el('p','Year-two price basis: '+basis),el('h2','Items to confirm before signing'));
 const list=el('ul');for(const name of pending)list.append(el('li','☐ '+name));sheet.append(pending.length?list:el('p','No blank inputs. Confirm these terms in writing before signing.'),el('p',notes),el('p','truepayrollcost.com'));
 document.querySelector('#quote-takeaway')?.remove();document.body.append(sheet);document.body.classList.add('quote-print-ready');
 return {text,date};
}
export function mountTakeaway(data){
 current=data;const {form,out}=data;
 const actions=el('div');actions.className='takeaway-actions';const copy=el('button','Copy numbers & checklist'),print=el('button','Print / Save as PDF');copy.type=print.type='button';const status=el('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 copy.addEventListener('click',async()=>{const doc=buildDocument();try{await navigator.clipboard.writeText(doc.text);status.textContent='Numbers and checklist copied. Generated: '+doc.date;}catch{const text=el('textarea');text.value=doc.text;text.readOnly=true;text.setAttribute('aria-label','Numbers and checklist to copy');actions.append(text);text.select();status.textContent='Select and copy the text below.';}});
 print.addEventListener('click',()=>{buildDocument();window.print();});actions.append(copy,print,status);out.append(actions);buildDocument();
 if(!form.dataset.takeawayReady){form.dataset.takeawayReady='true';const disable=()=>{out.querySelectorAll('.takeaway-actions button').forEach(button=>button.disabled=true);};form.addEventListener('input',disable);form.addEventListener('change',disable);window.addEventListener('beforeprint',()=>{form.requestSubmit();buildDocument();});}
}
