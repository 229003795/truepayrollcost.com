export const money=c=>'$'+(Number(c)/100).toFixed(2);
export function calculatePay(rows){
 let numerator=0n,minutes=0,used=0;const detail=[],issues=[];
 rows.forEach((r,i)=>{const h=String(r.hours??'').trim(),m=String(r.minutes??'').trim(),rate=String(r.rate??'').trim();
 if(!h&&!m&&!rate)return;used++;
 if(!h||!m||!rate){issues.push('Row '+(i+1)+': hours, minutes or rate pending');detail.push({row:i+1,status:'Pending confirmation'});return;}
 if(!/^\d+$/.test(h)||!/^\d+$/.test(m)||Number(h)>10000||Number(m)>59||!/^\d+(\.\d{1,2})?$/.test(rate)||Number(rate)>1000000){issues.push('Row '+(i+1)+': invalid entry (whole hours, minutes 0–59, rate up to two decimals)');return;}
 const [a,b='']=rate.split('.'),cents=BigInt(a)*100n+BigInt(b.padEnd(2,'0')),min=Number(h)*60+Number(m),n=BigInt(min)*cents;
 numerator+=n;minutes+=min;detail.push({row:i+1,minutes:min,rateCents:Number(cents),numerator:n.toString(),status:'Entered'});
 });
 return {detail,issues,used,minutes:issues.length?null:minutes,cents:!used||issues.length?null:Number((numerator+30n)/60n),numerator:numerator.toString()};
}
export function payCsv(rows,result,date){
 const out=[['Generated date',date],['Scope','Entered straight-time wage subtotal; overtime and other adjustments not determined'],
 ['Row','Hours input','Minutes input','Rate input USD/hour','Exact paid minutes','Rate cents/hour','Exact cents numerator (divide by60)','Status']];
 rows.forEach((r,i)=>{if(![r.hours,r.minutes,r.rate].some(x=>String(x??'').trim()))return;const d=result.detail.find(x=>x.row===i+1)||{};out.push([i+1,r.hours,r.minutes,r.rate,d.minutes??'Pending',d.rateCents??'Pending',d.numerator??'Pending',d.status||'Invalid']);});
 out.push(['Entered minute total',result.minutes??'Pending confirmation'],['Straight-time subtotal USD',result.cents===null?'Pending confirmation':(result.cents/100).toFixed(2)],['Rounding method','Exact sum of minute*rate-cent numerators /60; final half-cent rounds up'],['Items to confirm','Response / supporting record'],['Paid time and meal treatment',''],['Agreed rate and effective dates',''],['Workweek, overtime eligibility and regular rate',''],['Bonuses, premiums and other pay',''],['Taxes, deductions and net pay',''],['Payroll reviewer and date','']);
 return '\uFEFF'+out.map(row=>row.map(x=>'"'+String(x??'').replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
}
