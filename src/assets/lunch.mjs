import {lunchMinutes,decimal,lunchCsv} from './lunch-core.mjs';
const form=document.querySelector('#lunch-form'),resultEl=document.querySelector('#lunch-result');
const read=()=>Object.fromEntries(new FormData(form).entries());
function render(){const v=read(),r=lunchMinutes(v);resultEl.replaceChildren();
 const line=(label,text)=>{const p=document.createElement('p');const b=document.createElement('strong');b.textContent=label+' ';p.append(b,document.createTextNode(text));resultEl.append(p);};
 if(r.error){line('Check the record:',r.error);return r;}
 line('Meal interval:',r.meal+' minutes. Before lunch '+r.before+' + after lunch '+r.after+' = '+r.excluded+' minutes.');
 line('If excluded:',decimal(r.excluded)+' hours ('+r.excluded+' ÷ 60).');
 line('If included:',decimal(r.elapsed)+' hours ('+r.elapsed+' ÷ 60).');
 line('Entered payroll result:',r.paid===null?'Pending confirmation — resolve duty relief, treatment, clock accuracy and applicable rules.':decimal(r.paid)+' hours — '+r.status+'.');
 const note=document.createElement('p');note.textContent='The two scenarios are arithmetic, not permission to deduct lunch. A state selection never establishes compliance. Other worked time and overtime require separate review.';resultEl.append(note);return r;}
form.addEventListener('submit',e=>{e.preventDefault();render();});
form.addEventListener('input',render);form.addEventListener('change',render);
document.querySelector('#lunch-csv').addEventListener('click',()=>{const v=read(),r=render();const blob=new Blob([lunchCsv(v,r,new Date().toISOString().slice(0,10))],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='lunch-timecard-and-confirmation.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
render();
