import {products, shop} from './catalogue.mjs';
export const money = pence => new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(pence/100);
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function normaliseBasket(raw) {
  if (!Array.isArray(raw)) return [];
  const merged=new Map();
  for (const item of raw.slice(0,200)) {
    if (!item || typeof item!=='object') continue;
    const product=products.find(p=>p.slug===item.id || p.id===item.id);
    const qty=Number(item.qty);
    if (!product || !Number.isSafeInteger(qty) || qty<1) continue;
    merged.set(product.slug,Math.min(shop.maxQuantity,(merged.get(product.slug)||0)+qty));
  }
  return [...merged].map(([id,qty])=>({id,qty}));
}
export function basketTotals(raw) {
  const basket=normaliseBasket(raw);
  const subtotal=basket.reduce((sum,line)=>sum+products.find(p=>p.slug===line.id).price*line.qty,0);
  const delivery=subtotal===0 || subtotal>=shop.freeDeliveryPence?0:shop.deliveryPence;
  return {basket,count:basket.reduce((sum,line)=>sum+line.qty,0),subtotal,delivery,total:subtotal+delivery,checkoutEnabled:shop.checkoutEnabled&&shop.stockConfirmed&&basket.length>0};
}
export function searchProducts({query='',category='all',sort='featured'}={}) {
  const words=String(query).toLowerCase().trim().split(/\s+/).filter(Boolean);
  let list=products.filter(p=>(category==='all'||p.category===category||p.jobs.includes(category))&&words.every(w=>(p.name+' '+p.category+' '+p.description).toLowerCase().includes(w)));
  if(sort==='price-asc')list=[...list].sort((a,b)=>a.price-b.price||a.id-b.id);
  if(sort==='price-desc')list=[...list].sort((a,b)=>b.price-a.price||a.id-b.id);
  if(sort==='name')list=[...list].sort((a,b)=>a.name.localeCompare(b.name));
  return list;
}
export const seasonForMonth = month => ['winter','winter','spring','spring','spring','summer','summer','summer','autumn','autumn','autumn','winter'][Number.isInteger(month)?Math.min(11,Math.max(0,month)):9];
const seasonalTasks={
  autumn:['Clear fallen leaves from a well-used path or lawn.','Check that outdoor pots can drain freely.','Leave suitable seed heads and stems as winter habitat.'],
  winter:['Check pots for blocked drainage after wet weather.','Avoid walking on a frosty or waterlogged lawn.','Review what you would like to grow when conditions improve.'],
  spring:['Check the plant or seed instructions before choosing a sowing date.','Label new sowings and note their planting dates.','Check container moisture as growth begins.'],
  summer:['Check pots regularly for dry compost.','Inspect plant ties and loosen them where needed.','Look for a small area that can provide shelter for wildlife.'],
};
export function makePlan(input={}) {
  const season=Object.hasOwn(seasonalTasks,input.season)?input.season:'autumn';
  const space=['pots','small','family','allotment'].includes(input.space)?input.space:'small';
  const goal=['tidy','grow','support','wildlife'].includes(input.goal)?input.goal:'tidy';
  const time=['20','60','half-day'].includes(input.time)?input.time:'20';
  const goalTasks={tidy:'Choose one small patch to tidy and leave useful habitat elsewhere.',grow:'Check the sunlight and choose plants suited to that spot.',support:'Inspect one plant support, checking stability and room around the stem.',wildlife:'Notice an existing sheltered corner before deciding what to change.'};
  const spaceTasks={pots:'Check container size, drainage and access to water.',small:'Choose one corner so the job stays manageable.',family:'Keep a clear route through the space and store tools safely.',allotment:'Choose one bed and check its planting plan before starting.'};
  const tasks=[seasonalTasks[season][0],goalTasks[goal],spaceTasks[space]];
  if(time!=='20')tasks.push(seasonalTasks[season][1]);
  if(time==='half-day')tasks.push(seasonalTasks[season][2]);
  const ids=goal==='wildlife'?[]:goal==='grow'?[9,8,16]:goal==='support'?[14,6,15]:[1,2,4];
  return {season,space,goal,time,tasks,productIds:ids,title:`Your ${season} garden plan`};
}
export function projectBrief(fields={}) {
  const clean=(value,max=1000)=>String(value||'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').trim().slice(0,max);
  const goal=clean(fields.goal);
  if(goal.length<10)throw new Error('Tell us a little more about your garden goal (at least 10 characters).');
  return ['THE OUTDOOR LIVING CO. — MY PROJECT BRIEF','A starting point for discussion; no visit or work is booked.','',
    `Project: ${clean(fields.project,80)||'To discuss'}`,`Goal: ${goal}`,`Approximate area: ${clean(fields.size,120)||'To discuss'}`,
    `Town or postcode district: ${clean(fields.area,80)||'To discuss'}`,`Timing: ${clean(fields.timing,80)||'Flexible / to discuss'}`,
    `Indicative budget: ${clean(fields.budget,80)||'To discuss'}`,`Access and things to keep: ${clean(fields.access,700)||'To discuss'}`,
    '', 'Scope, service coverage, availability and a written quote must be agreed before any visit or work.'].join('\n');
}
