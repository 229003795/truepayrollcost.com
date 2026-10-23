import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../src/assets/shared-inputs.js',import.meta.url),'utf8');
const storage=new Map();
function page(path, search='', initial={}, blocked=false){
  const fields=path==='/'?['people','base','perPerson','oneTime','taxAnnual','otherAnnual','renewal','renewalMode','hours','hourly']:path.includes('quickbooks')?['people','broker','hsa','fsa','dc','commuter']:['people','plan','scope','runs','gm','gy','gs','am','ap','ae','ay','as','matched'];
  const elements=Object.fromEntries(fields.map(name=>[name,{type:name==='matched'?'checkbox':'number',tagName:'INPUT',min:'0',max:'',step:['people','runs','broker','hsa','fsa','dc','commuter'].includes(name)?'1':'0.01',value:initial[name]??'',checked:false}]));
  for(const [name, options] of Object.entries({plan:['simple','plus','premium'],scope:['single','multi'],renewalMode:['increase_amount','increase_percent','known_total']}))if(elements[name])Object.assign(elements[name],{tagName:'SELECT',type:'select-one',options:options.map(value=>({value})),value:initial[name]??options[0]});
  const notices=[],events={},form={before:n=>notices.push(n),elements:{namedItem:n=>elements[n]},addEventListener:(name,fn)=>events[name]=fn},hints=[],location={pathname:path,search,href:'https://truepayrollcost.com'+path+search};
  const context={URL,URLSearchParams,location,window:{},localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return storage.get(k)},setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},history:{replaceState:(_a,_b,url)=>{location.href=String(url)}},document:{querySelector:s=>s==='#cost-form, #calc'?form:{after:n=>hints.push(n)},createElement:()=>({append(){}})}};
  vm.runInNewContext(source,context);
  return {elements,events,context,notices,commit:context.window.PayrollInputs.commit,hints};
}
test('one dataset shares people without mixing unrelated fee units',()=>{
  storage.clear();const a=page('/gusto-vs-quickbooks/','',{people:'5',broker:'5',hsa:'5',fsa:'5',dc:'5',commuter:'5'});a.commit();
  const b=page('/adp-vs-gusto/','',{people:'12',am:'',ap:'',ae:'',ay:'',as:''});assert.equal(b.elements.people.value,'5');assert.equal(b.elements.am.value,'');b.elements.am.value='10';b.commit();
  const c=page('/');assert.equal(c.elements.people.value,'5');assert.equal(c.elements.base.value,'');
  assert.equal(JSON.parse([...storage.values()][0]).inputs.gusto_hsa_people,'5');
});
test('URL snapshot wins over recipient storage and preserves unknown and unchecked',()=>{
  storage.clear();
  const a=page('/adp-vs-gusto/','',{people:'5',runs:'26',gm:'0',gy:'0',gs:'0'});a.commit();const shared=new URL(a.context.location.href);assert.equal(shared.searchParams.get('am'),null);assert.equal(shared.searchParams.get('adp_monthly_fixed'),'');
  const recipient=page('/adp-vs-gusto/','',{people:'99',am:'500'});recipient.elements.people.value='99';recipient.elements.am.value='500';recipient.elements.matched.checked=true;recipient.commit();
  const restored=page('/adp-vs-gusto/',shared.search,{people:'1',am:'100'});assert.equal(restored.elements.people.value,'5');assert.equal(restored.elements.am.value,'');assert.equal(restored.elements.matched.checked,false);assert.equal(restored.elements.runs.value,'26');
});
test('invalid URL values are rejected; URL sharing survives unavailable local storage',()=>{
  const a=page('/','?calc=1&people=-2&quote_monthly_base=NaN',{people:'5',base:'49'});assert.equal(a.elements.people.value,'5');assert.equal(a.elements.base.value,'49');
  const b=page('/','',{people:'5',base:'49'},true);b.commit();assert.equal(new URL(b.context.location.href).searchParams.get('people'),'5');assert.equal(b.hints[0].hidden,false);
});
test('annual fees and renewal basis survive URL sharing without filling an unknown fee',()=>{
 storage.clear();const a=page('/','',{people:'5',base:'49',perPerson:'6',oneTime:'100',taxAnnual:'60',otherAnnual:'',renewal:'10',renewalMode:'increase_percent',hours:'2',hourly:'25'});a.commit();
 const restored=page('/',new URL(a.context.location.href).search);assert.equal(restored.elements.taxAnnual.value,'60');assert.equal(restored.elements.otherAnnual.value,'');assert.equal(restored.elements.renewal.value,'10');assert.equal(restored.elements.renewalMode.value,'increase_percent');
});

test('old monthly-add-on links ask for reconciliation rather than silently dropping a fee',()=>{
 storage.clear();const a=page('/','?calc=1&people=5&quote_monthly_extras=10');assert.equal(a.elements.otherAnnual.value,'');assert.equal(a.notices.length,1);assert.match(a.notices[0].textContent,/has not been included automatically/);
});

test('new visitors get a labelled public-price cash example, never invented internal costs',()=>{
 storage.clear();const a=page('/');assert.equal(a.elements.base.value,'49');assert.equal(a.elements.perPerson.value,'6');assert.equal(a.elements.people.value,'5');assert.equal(a.elements.hours.value,'');assert.equal(a.elements.hourly.value,'');assert.equal(a.elements.taxAnnual.value,'');assert.equal(a.context.window.PayrollInputs.example,'gusto-simple');a.commit();
 const url=new URL(a.context.location.href);assert.equal(url.searchParams.get('quote_example'),'gusto-simple');assert.equal(page('/',url.search).context.window.PayrollInputs.example,'gusto-simple');
 a.elements.base.value='55';a.events.input();a.commit();assert.equal(a.context.window.PayrollInputs.example,'edited:gusto-simple');assert.equal(page('/').elements.base.value,'55');
});
test('explicit blank shared URLs and existing saved inputs are never replaced by defaults',()=>{
 storage.clear();const blank=page('/','?calc=1');assert.equal(blank.elements.base.value,'');assert.equal(blank.context.window.PayrollInputs.example,'');blank.commit();const returning=page('/');assert.equal(returning.elements.base.value,'49');assert.equal(returning.context.window.PayrollInputs.example,'gusto-simple');
 storage.clear();const saved=page('/','',{base:'72',perPerson:'9',people:'8'});saved.commit();const restored=page('/');assert.equal(restored.elements.base.value,'72');assert.equal(restored.elements.people.value,'8');assert.equal(restored.context.window.PayrollInputs.example,'');
});

test('a selected preset and edited source survive URL restoration',()=>{
 storage.clear();const a=page('/');a.context.window.PayrollInputs.setExample('preset:patriot-full-service');a.elements.base.value='37';a.elements.perPerson.value='5';a.commit();const restored=page('/',new URL(a.context.location.href).search);assert.equal(restored.context.window.PayrollInputs.example,'preset:patriot-full-service');assert.equal(restored.elements.base.value,'37');restored.events.input();restored.commit();assert.equal(page('/',new URL(restored.context.location.href).search).context.window.PayrollInputs.example,'edited:preset:patriot-full-service');
});
