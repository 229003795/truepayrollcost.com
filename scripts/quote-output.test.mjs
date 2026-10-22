import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate} from '../src/assets/cost.mjs';
import {presentQuote,inputOrder} from '../src/assets/quote-output.mjs';
test('cash and internal costs reconcile to the unchanged first-year formula',()=>{
 const r=calculate({base:49,perPerson:6,people:5,oneTime:100,taxAnnual:60,otherAnnual:120,renewal:100,hours:2,hourly:25});
 const view=presentQuote(r);assert.equal(view.cash,1228);assert.equal(r.internal,50);assert.equal(view.cash+r.internal,r.firstYear);assert.equal(r.firstYear,1278);
 assert.equal(presentQuote(calculate({...r,hours:null})).cash,1228);
 assert.equal(presentQuote(calculate({...r,taxAnnual:null})).cash,1168);assert.equal(presentQuote(calculate({...r,taxAnnual:null})).cashComplete,false);
});
test('pending fields follow the actual input order, including year-two before internal work',()=>{
 assert.deepEqual(presentQuote(calculate({})).pending,inputOrder);
 assert.deepEqual(presentQuote(calculate({base:0,perPerson:0,people:5})).pending,['oneTime','taxAnnual','otherAnnual','renewal','hours','hourly']);
});
test('cash and internal blocks calculate independently, without an arbitrary input-count gate',()=>{
 const base=calculate({base:49,perPerson:6,people:5});const view=presentQuote(base);
 assert.equal(base.monthly,79);assert.equal(view.cash,948);assert.equal(view.cashComplete,false);assert.equal(base.internal,null);assert.equal(base.firstYear,null);
 const internal=calculate({hours:2,hourly:25});assert.equal(internal.internal,50);assert.equal(presentQuote(internal).cash,null);assert.equal(presentQuote(internal).waiting,false);
 assert.equal(presentQuote(calculate({})).waiting,true);
 assert.equal(presentQuote(calculate({base:0,perPerson:0,people:5})).cash,0);
 assert.equal(presentQuote(calculate({base:49,oneTime:100,hours:2})).cash,null);
});
