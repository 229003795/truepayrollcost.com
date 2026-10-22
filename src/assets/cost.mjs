export function calculate({base,perPerson,people,addons,oneTime,hours,hourly}) {
 const values=[base,perPerson,people,addons,oneTime,hours,hourly];
 if(values.some(v=>!Number.isFinite(v)||v<0)||!Number.isInteger(people))throw new RangeError('Enter non-negative amounts and a whole-number headcount.');
 const monthly=base+perPerson*people+addons;
 return {monthly,annualRecurring:monthly*12,transition:oneTime+hours*hourly,firstYear:monthly*12+oneTime+hours*hourly};
}
