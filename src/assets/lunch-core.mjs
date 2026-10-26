export function lunchMinutes(values) {
  const keys=['start','out','back','end'];
  if(keys.some(k=>!values[k])) return {error:'Pending: enter all four clock times and their dates.'};
  const minute=s=>{if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s))return NaN; return Date.parse(s+'Z')/60000;};
  const [start,out,back,end]=keys.map(k=>minute(values[k]));
  if(![start,out,back,end].every(Number.isFinite))return {error:'Enter valid dates and clock times.'};
  if(!(start<=out&&out<back&&back<=end&&end>start))return {error:'Clock times must run start → lunch out → lunch in → end. Use the actual next date for overnight work.'};
  if(end-start>1440)return {error:'Split records longer than one day into separate shifts.'};
  const elapsed=end-start,meal=back-out,before=out-start,after=end-back,excluded=before+after;
  const knownPaid=values.treatment==='paid'||values.duties==='work';
  const reviewed=values.treatment==='unpaid'&&values.duties==='relieved'&&values.review==='yes'&&values.state&&values.clock==='yes';
  const paid=knownPaid&&values.clock==='yes'?elapsed:reviewed?excluded:null;
  const status=paid===null?'Pending confirmation':knownPaid?'Meal included as paid time':'User-confirmed unpaid treatment';
  return {elapsed,meal,before,after,excluded,paid,status};
}
export const decimal=minutes=>(minutes/60).toFixed(2);
export function lunchCsv(values,result,date) {
  const rows=[['Generated date',date],['Scope','Clock-minute calculation and meal-period confirmation aid; not a legal determination'],
    ...Object.entries(values).map(([key,value])=>[key,value||'Pending confirmation']),
    ['Elapsed minutes',result.elapsed??'Pending confirmation'],['Meal minutes',result.meal??'Pending confirmation'],
    ['Before lunch minutes',result.before??'Pending confirmation'],['After lunch minutes',result.after??'Pending confirmation'],
    ['If meal excluded: minutes',result.excluded??'Pending confirmation'],
    ['If meal included: minutes',result.elapsed??'Pending confirmation'],
    ['Status',result.error||result.status],['Entered paid minutes',result.paid??'Pending confirmation'],
    ['Entered decimal hours',result.paid==null?'Pending confirmation':decimal(result.paid)],
    ['Item to confirm','Response / evidence'],
    ['Actual clock records and dates',''],['Any clock change or missing worked segment',''],
    ['Duty relief and any work during lunch',''],['Applicable state, industry and employee rules',''],
    ['Meal timing, length and any valid exception or waiver',''],['Contract, policy and paid-break commitments',''],
    ['Payroll approver and supporting record','']];
  return '\uFEFF'+rows.map(row=>row.map(value=>'"'+String(value).replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
}
