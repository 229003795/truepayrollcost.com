/* One versioned dataset; shared concepts use one key, distinct fees stay distinct. */
(() => {
  'use strict';
  const form = document.querySelector('#cost-form, #calc');
  if (!form) return;
  const route = location.pathname;
  const mapping = route === '/' ? {
    people:'people', base:'quote_monthly_base', perPerson:'quote_monthly_per_person',
    oneTime:'quote_one_time', taxAnnual:'quote_annual_filing', otherAnnual:'quote_annual_extras', renewal:'quote_year2_value', renewalMode:'quote_year2_basis', hours:'transition_hours', hourly:'transition_hourly_cost'
  } : route === '/gusto-vs-quickbooks/' ? {
    people:'people', broker:'gusto_broker_people', hsa:'gusto_hsa_people',
    fsa:'gusto_fsa_people', dc:'gusto_dc_people', commuter:'gusto_commuter_people'
  } : route === '/adp-vs-gusto/' ? {
    people:'people', plan:'gusto_plan', scope:'payroll_scope', runs:'annual_runs',
    gm:'gusto_monthly_extras', gy:'gusto_annual_extras', gs:'gusto_one_time',
    am:'adp_monthly_fixed', ap:'adp_per_run', ae:'adp_person_per_run',
    ay:'adp_annual', as:'adp_one_time', matched:'adp_scope_confirmed'
  } : null;
  if (!mapping) return;
  const key = 'truepayrollcost.inputs.v1';
  const entries = Object.entries(mapping).map(([name, canonical]) => [form.elements.namedItem(name), canonical]);
  const read = () => { try { const value = JSON.parse(localStorage.getItem(key)); return value && value.version === 1 && value.inputs && typeof value.inputs === 'object' && !Array.isArray(value.inputs) ? value.inputs : {}; } catch { return {}; } };
  const write = values => { try { localStorage.setItem(key, JSON.stringify({version:1, inputs:{...read(), ...values}})); } catch { /* Sharing still works with storage disabled. */ } };
  const value = el => el.type === 'checkbox' ? (el.checked ? '1' : '0') : el.value;
  const snapshot = () => Object.fromEntries(entries.map(([el, canonical]) => [canonical, value(el)]));
  function valid(el, raw) {
    if (typeof raw !== 'string' || raw.length > 100) return false;
    if (el.type === 'checkbox') return raw === '0' || raw === '1';
    if (el.tagName === 'SELECT') return Array.from(el.options).some(option => option.value === raw);
    if (raw === '') return true;
    const n = Number(raw);
    return Number.isFinite(n) && n >= Number(el.min || 0) &&
      (!el.max || n <= Number(el.max)) && (el.step !== '1' || Number.isSafeInteger(n));
  }
  const params = new URLSearchParams(location.search), fromURL = params.get('calc') === '1';
  const stored = read();
  for (const [el, canonical] of entries) {
    // A shared URL is a complete page snapshot; missing keys retain page defaults,
    // never values from the recipient's unrelated local scenario.
    const raw = fromURL ? params.get(canonical) : stored[canonical];
    if (raw !== null && raw !== undefined && valid(el, raw)) {
      if (el.type === 'checkbox') el.checked = raw === '1'; else el.value = raw;
    }
  }
  let example = route === '/' ? ((fromURL ? params.get('quote_example') : stored.quote_example) || '') : '';
  if(route === '/' && !fromURL && Object.keys(stored).length === 0 && entries.filter(([field])=>field.type==='number').every(([field])=>field.value==='')) {
    form.elements.namedItem('base').value='49';form.elements.namedItem('perPerson').value='6';form.elements.namedItem('people').value='5';example='gusto-simple';
  }
  if(route === '/') {
    const legacy = fromURL ? params.get('quote_monthly_extras') : stored.quote_monthly_extras;
    const annual = fromURL ? params.get('quote_annual_extras') : stored.quote_annual_extras;
    if(legacy !== null && legacy !== undefined && (annual === undefined || annual === null)) {
      const warning=document.createElement('p');warning.className='hint';warning.textContent='This saved scenario used the old monthly-add-ons field ('+legacy+'). It has not been included automatically. Reconcile that amount in Other recurring annual fees and confirm the new annual-fee and year-two fields.';form.before(warning);
    }
  }
  const output = document.querySelector('#cost-result, #result');
  const hint = document.createElement('p');
  hint.hidden = true;
  hint.append('Copy this link and send it to your boss. It opens with the same inputs. ');
  const link = document.createElement('a');
  link.textContent = 'Share this result';
  hint.append(link);
  output.after(hint);
  function commit(summary) {
    const values = snapshot();
    if(route==='/')values.quote_example=example;
    write(values);
    const url = new URL(location.href);
    url.searchParams.set('calc', '1');
    for (const [canonical, raw] of Object.entries(values)) url.searchParams.set(canonical, raw);
    history.replaceState(null, '', url);
    link.href = url.href;
    hint.hidden = false;
    hint.className = "share-hint";
    if(summary){window.PayrollInputs.latest=summary;window.dispatchEvent?.(new CustomEvent("payroll:calculated",{detail:summary}));}
  }
  form.addEventListener('input', () => {
    hint.hidden = true;
    const values = {};
    if(route==='/'){if(example)example='edited';window.PayrollInputs.example=example;values.quote_example=example;}
    for (const [el, canonical] of entries) if (valid(el, value(el))) values[canonical] = value(el);
    write(values);
  });
  form.addEventListener('change', () => {
    hint.hidden = true;
    const values = {};
    if(route==='/'){if(example)example='edited';window.PayrollInputs.example=example;values.quote_example=example;}
    for (const [el, canonical] of entries) if (valid(el, value(el))) values[canonical] = value(el);
    write(values);
  });
  window.PayrollInputs = {commit, fromURL, example};
})();