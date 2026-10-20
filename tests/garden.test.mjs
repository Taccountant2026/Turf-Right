import test from 'node:test';
import assert from 'node:assert/strict';
import {products,collections,shop,guides} from '../catalogue.mjs';
import {normaliseBasket,basketTotals,searchProducts,makePlan,projectBrief,seasonForMonth,escapeHtml} from '../garden-core.mjs';
test('legacy saved baskets migrate without trusting supplied prices, unknown products or invalid quantities',()=>{
 assert.deepEqual(normaliseBasket([{id:1,qty:2,price:1},{id:'garden-waste-bag',qty:3},{id:'not-real',qty:4},{id:2,qty:-1},{id:3,qty:1.5},{id:4,qty:999999}]),[{id:'garden-waste-bag',qty:5},{id:'patio-weed-brush',qty:20}]);
 for(const value of[null,{},'basket',42])assert.deepEqual(normaliseBasket(value),[]);
 assert.deepEqual(normaliseBasket([null,{id:1,qty:'2'},{id:1,qty:Infinity},{id:1,qty:NaN}]),[{id:'garden-waste-bag',qty:2}]);
});
test('basket arithmetic uses integer catalogue pence, applies the proposed threshold and never opens checkout',()=>{
 assert.deepEqual(basketTotals([]),{basket:[],count:0,subtotal:0,delivery:0,total:0,checkoutEnabled:false});
 const below=basketTotals([{id:1,qty:5,price:1}]);assert.equal(below.subtotal,4995);assert.equal(below.delivery,399);assert.equal(below.total,5394);
 const above=basketTotals([{id:1,qty:6}]);assert.equal(above.subtotal,5994);assert.equal(above.delivery,0);assert.equal(above.checkoutEnabled,false);
 for(const p of products){assert(Number.isSafeInteger(p.price)&&p.price>0);assert.equal(p.availability,'coming-soon');assert.equal(basketTotals([{id:p.id,qty:1}]).checkoutEnabled,false);}
 assert.equal(shop.stockConfirmed,false);assert.equal(shop.checkoutEnabled,false);
});
test('all 18 retained products have stable unique IDs, real relationships and exact collection totals',()=>{
 assert.equal(products.length,18);assert.equal(new Set(products.map(p=>p.id)).size,18);assert.equal(new Set(products.map(p=>p.slug)).size,18);
 for(const p of products)for(const id of p.related)assert(products.find(other=>other.id===id));
 for(const c of collections){const list=c.ids.map(id=>products.find(p=>p.id===id));assert(list.every(Boolean));assert(guides.some(g=>g.slug===c.guide));const total=list.reduce((n,p)=>n+p.price,0);assert.equal(total,{'autumn-reset':2797,'potting-bench':2397,'plant-support':2297}[c.slug]);}
});
test('search and job filters find the actual range, sort prices and return an honest empty result',()=>{
 assert(searchProducts({query:'latex gloves'}).some(p=>p.id===2));assert.equal(searchProducts({query:'unlisted exotic tree'}).length,0);
 for(const category of['tidy','grow','support'])assert(searchProducts({category}).every(p=>p.jobs.includes(category)));
 const list=searchProducts({sort:'price-asc'});assert(list.every((p,i)=>!i||list[i-1].price<=p.price));
 assert.equal(searchProducts({category:'Plant support'}).length,7);
});
test('all 192 planner choices return bounded checklists and appropriate optional products, without inventing a wildlife shopping list',()=>{
 for(const season of['autumn','winter','spring','summer'])for(const space of['pots','small','family','allotment'])for(const goal of['tidy','grow','support','wildlife'])for(const time of['20','60','half-day']){
  const plan=makePlan({season,space,goal,time});assert.equal(plan.season,season);assert.equal(plan.space,space);assert.equal(plan.goal,goal);assert.equal(plan.tasks.length,time==='20'?3:time==='60'?4:5);assert.equal(new Set(plan.tasks).size,plan.tasks.length);
  assert(plan.productIds.every(id=>products.some(p=>p.id===id)));if(goal==='wildlife')assert.deepEqual(plan.productIds,[]);
 }
 const fallback=makePlan({season:'__proto__',space:'bad',goal:'<script>',time:999});assert.equal(fallback.season,'autumn');assert.equal(fallback.space,'small');
 assert.equal(seasonForMonth(0),'winter');assert.equal(seasonForMonth(3),'spring');assert.equal(seasonForMonth(6),'summer');assert.equal(seasonForMonth(9),'autumn');assert.equal(seasonForMonth(NaN),'autumn');
});
test('project briefs require a useful goal and fit the real private intake limit even with maximum input',()=>{
 assert.throws(()=>projectBrief({goal:'short'}));const brief=projectBrief({goal:'g'.repeat(9999),project:'p'.repeat(1000),size:'s'.repeat(1000),area:'a'.repeat(1000),timing:'t'.repeat(1000),budget:'b'.repeat(1000),access:'x'.repeat(9999)});
 assert(brief.length<3000);assert(brief.includes('no visit or work is booked'));assert(brief.includes('written quote'));assert(!projectBrief({goal:'A clean\u0000 garden border'}).includes('\u0000'));
 assert.equal(escapeHtml('<img onerror="bad">&\''),'&lt;img onerror=&quot;bad&quot;&gt;&amp;&#39;');
});
