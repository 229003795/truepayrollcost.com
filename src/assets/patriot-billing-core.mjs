export const fields=['paidMonths','timeMonths','timeUsers','stateMonths'];
export function patriotTotal(input){
 const v=Object.fromEntries(fields.map(k=>[k,input[k]??null]));
 for(const [k,n]of Object.entries(v))if(n!==null&&(!Number.isSafeInteger(n)||n<0||(k==='timeMonths'&&n>12)))throw new RangeError('Use non-negative whole quantities; time-product months must be between 0 and 12. Leave unknown quantities blank.');
 if(v.timeMonths===0&&v.timeUsers!==null&&v.timeUsers>0)throw new RangeError('Time-card users require subscribed time-product months. Reconcile these records.');
 const pending=fields.filter(k=>v[k]===null);
 const parts={payrollBase:37*12,workers:v.paidMonths===null?null:5*v.paidMonths,timeBase:v.timeMonths===null?null:6*v.timeMonths,timeUsers:v.timeUsers===null?null:2*v.timeUsers,states:v.stateMonths===null?null:12*v.stateMonths};
 const total=pending.length?null:Object.values(parts).reduce((a,b)=>a+b,0);
 if(total!==null&&!Number.isSafeInteger(total))throw new RangeError('Quantities are too large.');
 return {...v,parts,total,pending};
}
export function patriotCsv(input,date){
 const r=patriotTotal(input),rows=[['section','item','quantity','rate_usd','subtotal_usd','confirmation'],['generated','UTC date',date,'','',''],['scope','Full Service;12 regular-price payroll months;no discounts','','','','Illustration or entered assumptions;not your quote'],['charge','Payroll base',12,37,r.parts.payrollBase,''],['charge','Paid-worker months',r.paidMonths??'Pending',5,r.parts.workers??'Pending','Distinct workers paid in each month'],['charge','Time subscription months',r.timeMonths??'Pending',6,r.parts.timeBase??'Pending',''],['charge','Time-card-user months',r.timeUsers??'Pending',2,r.parts.timeUsers??'Pending','Distinct billable users per period'],['charge','Additional filing-state months',r.stateMonths??'Pending',12,r.parts.states??'Pending','Confirm start and end dates;exclude first state'],['total','Regular-price software subtotal','','',r.total??'Pending','Excludes unconfirmed costs'],['source','Pricing','','','','https://www.patriotsoftware.com/pricing/'],['source','Time usage','','','','https://www.patriotsoftware.com/payroll/add-ons/time-attendance/'],['source','State fees','','','','https://www.patriotsoftware.com/payroll/multi-state-payroll/'],['source','Rates checked','2026-11-01','','','']];
 for(const q of ['Paid-worker month records','Time subscription and time-card-user records','Additional-state billing dates','Discount eligibility and invoice dates','Other charges tax and transition work'])rows.push(['confirm',q,'','','','']);
 return '\uFEFF'+rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\r\n');
}
