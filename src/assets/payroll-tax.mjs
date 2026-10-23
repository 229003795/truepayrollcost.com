export const taxYear=2026,checked='2026-10-23',wageCap=184500;
const cents=n=>Math.round((n+Number.EPSILON)*100)/100;
export function estimate(groups){
 const rows=groups.map(g=>{if([g.people,g.social,g.medicare].some(x=>x===null||x===''))return null;const people=Number(g.people),social=Number(g.social),medicare=Number(g.medicare);if(!Number.isSafeInteger(people)||people<1||![social,medicare].every(x=>Number.isFinite(x)&&x>=0))throw Error('Use a positive whole headcount and nonnegative taxable wages.');const ss=cents(Math.min(social,wageCap)*.062)*people,med=cents(medicare*.0145)*people;return {people,social,medicare,ss:cents(ss),med:cents(med),total:cents(ss+med)};});
 if(!rows.length||rows.some(x=>x===null))return null;
 return {rows,ss:cents(rows.reduce((n,r)=>n+r.ss,0)),med:cents(rows.reduce((n,r)=>n+r.med,0)),total:cents(rows.reduce((n,r)=>n+r.total,0))};
}
