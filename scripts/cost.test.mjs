import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,firstYearFields} from '../src/assets/cost.mjs';
const quote={base:49,perPerson:6,people:5,oneTime:100,taxAnnual:60,otherAnnual:120,hours:2,hourly:25,renewal:100,renewalMode:'increase_amount'};
test('synthetic quote: monthly, annual, setup and internal work remain separate',()=>{const r=calculate(quote);assert.equal(r.monthly,79);assert.equal(r.annualRecurring,1128);assert.equal(r.transition,150);assert.equal(r.firstYear,1278);assert.equal(r.yearTwo,1228);assert.equal(r.twoYears,2506);});
test('every numeric input affects the appropriate total',()=>{const expected={base:12,perPerson:60,people:72,oneTime:1,taxAnnual:1,otherAnnual:1,hours:25,hourly:2};for(const [field,change]of Object.entries(expected))assert.equal(calculate({...quote,[field]:quote[field]+1}).firstYear-1278,change,field);const renewal=calculate({...quote,renewal:101});assert.equal(renewal.firstYear,1278);assert.equal(renewal.yearTwo,1229);});
test('year-two percentage applies only to recurring fees; quoted total replaces that subtotal',()=>{const percent=calculate({...quote,renewalMode:'increase_percent',renewal:10});assert.equal(percent.yearTwo,1128*1.1);assert.equal(percent.firstYear,1278);assert.equal(calculate({...quote,renewalMode:'known_total',renewal:1300}).twoYears,2578);});
test('unknown fees withhold a full total and are listed; they are not confirmed zero',()=>{for(const field of firstYearFields){const r=calculate({...quote,[field]:null});assert.equal(r.firstYear,null,field);assert(r.pending.includes(field));}const missing=calculate({...quote,otherAnnual:null});assert.equal(missing.confirmedSubtotal,1158);assert.equal(missing.yearTwo,null);assert.equal(calculate({}).confirmedSubtotal,null);assert.equal(calculate({...quote,renewal:null}).firstYear,1278);assert.equal(calculate({...quote,renewal:null}).yearTwo,null);});
test('explicit zeros calculate, while invalid numbers and methods are rejected',()=>{const zero=Object.fromEntries([...firstYearFields,'renewal'].map(k=>[k,k==='people'?5:0]));assert.equal(calculate(zero).firstYear,0);assert.equal(calculate(zero).yearTwo,0);for(const field of [...firstYearFields,'renewal']){assert.throws(()=>calculate({...quote,[field]:-1}));assert.throws(()=>calculate({...quote,[field]:Infinity}));}assert.throws(()=>calculate({...quote,people:1.5}));assert.throws(()=>calculate({...quote,people:0}));assert.throws(()=>calculate({...quote,renewalMode:'guess'}));});


test('included filing is distinct from unknown and explicit zero, with no duplicate charge',()=>{
 const input={base:49,perPerson:6,people:5,oneTime:0,taxAnnual:null,otherAnnual:0,hours:0,hourly:0};
 const unknown=calculate(input);assert.equal(unknown.firstYear,null);assert.ok(unknown.pending.includes('taxAnnual'));assert.equal(unknown.taxAnnualIncluded,false);
 const included=calculate({...input,taxAnnualIncluded:true});assert.equal(included.firstYear,948);assert.equal(included.taxAnnualIncluded,true);assert.ok(!included.pending.includes('taxAnnual'));
 const zero=calculate({...input,taxAnnual:0});assert.equal(zero.firstYear,948);assert.equal(zero.taxAnnualIncluded,false);
 assert.throws(()=>calculate({...input,taxAnnual:60,taxAnnualIncluded:true}),/not both/);
 assert.throws(()=>calculate({...input,taxAnnual:0,taxAnnualIncluded:true}),/not both/);
});
