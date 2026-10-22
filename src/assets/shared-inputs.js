/* One versioned dataset; shared concepts use one key, distinct fees stay distinct. */
(() => {
  'use strict';
  const form = document.querySelector('#cost-form, #calc');
  if (!form) return;
  const route = location.pathname;
  const mapping = route === '/' ? {
    people:'people', base:'quote_monthly_base', perPerson:'quote_monthly_per_person',
    addons:'quote_monthly_extras', oneTime:'quote_one_time', hours:'transition_hours', hourly:'transition_hourly_cost'
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
  const output = document.querySelector('#cost-result, #result');
  const hint = document.createElement('p');
  hint.hidden = true;
  hint.append('Copy this link and send it to your boss. It opens with the same inputs. ');
  const link = document.createElement('a');
  link.textContent = 'Share this result';
  hint.append(link);
  output.after(hint);
  function commit() {
    const values = snapshot();
    write(values);
    const url = new URL(location.href);
    url.searchParams.set('calc', '1');
    for (const [canonical, raw] of Object.entries(values)) url.searchParams.set(canonical, raw);
    history.replaceState(null, '', url);
    link.href = url.href;
    hint.hidden = false;
  }
  form.addEventListener('input', () => {
    hint.hidden = true;
    const values = {};
    for (const [el, canonical] of entries) if (valid(el, value(el))) values[canonical] = value(el);
    write(values);
  });
  form.addEventListener('change', () => {
    hint.hidden = true;
    const values = {};
    for (const [el, canonical] of entries) if (valid(el, value(el))) values[canonical] = value(el);
    write(values);
  });
  window.PayrollInputs = {commit, fromURL};
})();