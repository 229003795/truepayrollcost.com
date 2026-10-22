export const firstYearFields=['base','perPerson','people','oneTime','taxAnnual','otherAnnual','hours','hourly'];
export const renewalModes=['increase_amount','increase_percent','known_total'];
export function calculate(input){
 const v=Object.fromEntries([...firstYearFields,'renewal'].map(k=>[k,input[k]??null]));
 for(const [key,value]of Object.entries(v))if(value!==null&&(!Number.isFinite(value)||value<0||(key==='people'&&(!Number.isSafeInteger(value)||value<1))))throw new RangeError('Enter non-negative amounts and a positive whole-number headcount. Leave unknown amounts blank.');
 const renewalMode=input.renewalMode??'increase_amount';if(!renewalModes.includes(renewalMode))throw new RangeError('Choose a valid year-two price basis.');
 const pendingFirstYear=firstYearFields.filter(k=>v[k]===null);
 const personMonthly=v.perPerson!==null&&v.people!==null?v.perPerson*v.people:null;
 const internal=v.hours!==null&&v.hourly!==null?v.hours*v.hourly:null;
 const monthly=v.base!==null&&personMonthly!==null?v.base+personMonthly:null;
 const annualRecurring=monthly!==null&&v.taxAnnual!==null&&v.otherAnnual!==null?monthly*12+v.taxAnnual+v.otherAnnual:null;
 const transition=v.oneTime!==null&&internal!==null?v.oneTime+internal:null;
 const firstYear=pendingFirstYear.length===0?annualRecurring+transition:null;
 const terms=[v.base===null?null:v.base*12,personMonthly===null?null:personMonthly*12,v.oneTime,v.taxAnnual,v.otherAnnual,internal].filter(x=>x!==null);
 const confirmedSubtotal=terms.length?terms.reduce((sum,value)=>sum+value,0):null;
 let yearTwo=null;if(v.renewal!==null){if(renewalMode==='known_total')yearTwo=v.renewal;else if(annualRecurring!==null)yearTwo=renewalMode==='increase_percent'?annualRecurring*(1+v.renewal/100):annualRecurring+v.renewal;}
 const twoYears=firstYear!==null&&yearTwo!==null?firstYear+yearTwo:null;
 for(const n of [monthly,annualRecurring,transition,firstYear,confirmedSubtotal,yearTwo,twoYears])if(n!==null&&!Number.isFinite(n))throw new RangeError('The amounts are too large to calculate.');
 return {...v,renewalMode,personMonthly,internal,monthly,annualRecurring,transition,firstYear,confirmedSubtotal,yearTwo,twoYears,pendingFirstYear,pending:[...pendingFirstYear,...(v.renewal===null?['renewal']:[])]};
}
