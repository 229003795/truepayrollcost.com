import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../src/assets/shared-inputs.js',import.meta.url),'utf8');
const storage=new Map();
function page(path, search='', initial={}, blocked=false){
  const fields=path==='/'?['people','base','perPerson','addons','oneTime','hours','hourly']:path.includes('quickbooks')?['people','broker','hsa','fsa','dc','commuter']:['people','plan','scope','runs','gm','gy','gs','am','ap','ae','ay','as','matched'];
  const elements=Object.fromEntries(fields.map(name=>[name,{type:name==='matched'?'checkbox':'number',tagName:'INPUT',min:'0',max:'',step:['people','runs','broker','hsa','fsa','dc','commuter'].includes(name)?'1':'0.01',value:initial[name]??'',checked:false}]));
  for(const [name, options] of Object.entries({plan:['simple','plus','premium'],scope:['single','multi']}))if(elements[name])Object.assign(elements[name],{tagName:'SELECT',options:options.map(value=>({value})),value:initial[name]??options[0]});
  const events={},form={elements:{namedItem:n=>elements[n]},addEventListener:(name,fn)=>events[name]=fn},hints=[],location={pathname:path,search,href:'https://truepayrollcost.com'+path+search};
  const context={URL,URLSearchParams,location,window:{},localStorage:{getItem:k=>{if(blocked)throw Error('blocked');return storage.get(k)},setItem:(k,v)=>{if(blocked)throw Error('blocked');storage.set(k,v)}},history:{replaceState:(_a,_b,url)=>{location.href=String(url)}},document:{querySelector:s=>s==='#cost-form, #calc'?form:{after:n=>hints.push(n)},createElement:()=>({append(){}})}};
  vm.runInNewContext(source,context);
  return {elements,events,context,commit:context.window.PayrollInputs.commit,hints};
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