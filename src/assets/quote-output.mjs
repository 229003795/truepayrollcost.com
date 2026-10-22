export const cashPrompt='To see cash outlay, enter the monthly base fee, monthly per-person fee and headcount.';
export const internalPrompt='To see internal cost, enter transition hours and hourly cost.';
export const emptyMessage=cashPrompt+' '+internalPrompt;
export const inputOrder=['base','perPerson','people','oneTime','taxAnnual','otherAnnual','renewal','hours','hourly'];
export function presentQuote(result){
 const waiting=inputOrder.every(key=>result[key]===null);
 const cashComplete=['base','perPerson','people','oneTime','taxAnnual','otherAnnual'].every(key=>result[key]!==null);
 const cash=result.monthly===null?null:result.monthly*12+[result.oneTime,result.taxAnnual,result.otherAnnual].filter(value=>value!==null).reduce((sum,value)=>sum+value,0);
 return {waiting,cash,cashComplete,pending:inputOrder.filter(key=>result[key]===null)};
}
