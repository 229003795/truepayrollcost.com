import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from '../src/assets/cost.mjs';
import {presentQuote,inputOrder} from '../src/assets/quote-output.mjs';
test('cash and internal costs reconcile to the unchanged first-year formula',()=>{
 const r=calculate({base:49,perPerson:6,people:5,oneTime:100,taxAnnual:60,otherAnnual:120,renewal:100,hours:2,hourly:25});
 const view=presentQuote(r);assert.equal(view.cash,1228);assert.equal(r.internal,50);assert.equal(view.cash+r.internal,r.firstYear);assert.equal(r.firstYear,1278);
 assert.equal(presentQuote(calculate({...r,hours:null})).cash,1228);
 assert.equal(presentQuote(calculate({...r,taxAnnual:null})).cash,null);
});
test('pending fields follow the actual input order, including year-two before internal work',()=>{
 assert.deepEqual(presentQuote(calculate({})).pending,inputOrder);
 assert.deepEqual(presentQuote(calculate({base:0,perPerson:0,people:5})).pending,['oneTime','taxAnnual','otherAnnual','renewal','hours','hourly']);
});
test('empty and fewer-than-three states withhold numbers; explicit zeros count as entered',()=>{
 for(const input of [{},{base:49},{base:49,perPerson:6}])assert.equal(presentQuote(calculate(input)).waiting,true);
 assert.equal(presentQuote(calculate({base:0,perPerson:0,people:5})).waiting,false);
});
