import test from 'node:test';
import assert from 'node:assert/strict';
import {presets,presetFor,presetValues} from '../src/assets/presets.mjs';
import {calculate} from '../src/assets/cost.mjs';
import {presentQuote} from '../src/assets/quote-output.mjs';
test('published presets calculate annual subtotals without inventing missing charges',()=>{
 const gusto=calculate(presetValues('gusto-simple',5));assert.equal(gusto.monthly,79);assert.equal(presentQuote(gusto).cash,948);assert.equal(gusto.oneTime,null);assert.equal(gusto.firstYear,null);
 const patriot=calculate(presetValues('patriot-full-service',5));assert.equal(patriot.monthly,62);assert.equal(presentQuote(patriot).cash,744);assert.equal(patriot.oneTime,0);assert.equal(patriot.firstYear,null);
});
test('quote-only or unverified product rates never become zero or a different bundle',()=>{
 for(const id of ['adp-run','quickbooks-core']){const result=calculate(presetValues(id,5));assert.equal(result.base,null);assert.equal(result.perPerson,null);assert.equal(result.oneTime,null);assert.equal(presentQuote(result).cash,null);}
});
test('changing presets preserves headcount but clears unrelated vendor fees',()=>{
 assert.equal(presetValues('gusto-simple',null).people,5);assert.equal(presetValues('patriot-full-service',12).people,12);assert.equal(presetValues('adp-run',12).taxAnnual,null);assert.equal(presetValues('adp-run',12).otherAnnual,null);assert.equal(presetValues('adp-run',12).renewal,null);
});
test('source identity survives editing and share markers',()=>{
 assert.equal(presetFor('preset:patriot-full-service'),presets['patriot-full-service']);assert.equal(presetFor('edited:preset:adp-run'),presets['adp-run']);assert.equal(presetFor('gusto-simple'),presets['gusto-simple']);assert.equal(presetFor('unknown'),null);
});
