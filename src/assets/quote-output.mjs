export const emptyMessage='Enter at least three numbers to see your costs.';
export const inputOrder=['base','perPerson','people','oneTime','taxAnnual','otherAnnual','renewal','hours','hourly'];
export function presentQuote(result){
 const waiting=inputOrder.filter(key=>result[key]!==null).length<3;
 const cash=result.annualRecurring!==null&&result.oneTime!==null?result.annualRecurring+result.oneTime:null;
 return {waiting,cash,pending:inputOrder.filter(key=>result[key]===null)};
}
