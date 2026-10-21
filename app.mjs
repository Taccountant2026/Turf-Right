import {products,collections,shop} from './catalogue.mjs';
import {normaliseBasket,basketTotals,searchProducts,makePlan,projectBrief,seasonForMonth,escapeHtml as e} from './garden-core.mjs';
import {productGrid,basketLine,summary} from './render.mjs';
import {campaigns} from './statistics-core.mjs';
const $=(q,scope=document)=>scope.querySelector(q),$$=(q,scope=document)=>[...scope.querySelectorAll(q)];
const root=new URL('.',import.meta.url).href;
const activeCampaign=new URLSearchParams(location.search).get('utm_campaign');
function carryCampaign(scope=document){if(!campaigns.includes(activeCampaign))return;scope.querySelectorAll('a[href]').forEach(a=>{const url=new URL(a.getAttribute('href'),location.href);if(url.origin!==location.origin||!url.pathname.startsWith(new URL(root).pathname)||/\/(?:checkout|404)\.html$/.test(url.pathname))return;url.searchParams.set('utm_campaign',activeCampaign);a.href=url.href;});}
let storageFailed=false,toastTimer;
function read(key,fallback){try{const raw=localStorage.getItem(key);return raw===null?fallback:JSON.parse(raw);}catch{storageFailed=true;return fallback;}}
function store(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{storageFailed=true;return false;}}
function removeStorage(key){try{localStorage.removeItem(key);return true;}catch{return false;}}
function toast(message){const t=$('[data-toast]');t.textContent=message;t.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{t.hidden=true;},6500);}
let basket=normaliseBasket(read('gardenCart',[]));
function renderBasket(){
 const totals=basketTotals(basket),lines=basket.map(line=>basketLine(products.find(p=>p.slug===line.id),line,root)).join('')||`<div class="empty-state"><h3>A little space for ideas.</h3><p>Your saved basket is empty.</p><a href="${root}shop.html">Explore the planned garden shop →</a></div>`;
 $$('[data-basket-count]').forEach(el=>{el.textContent=totals.count;el.setAttribute('aria-label',`${totals.count} saved item${totals.count===1?'':'s'}`);});
 $$('[data-basket-lines],[data-review-lines]').forEach(el=>{el.innerHTML=lines;});
 $$('[data-basket-summary],[data-review-summary]').forEach(el=>{el.innerHTML=summary(totals);});
 const clear=$('[data-clear-basket]');if(clear)clear.disabled=!totals.count;
 carryCampaign();
}
function saveBasket(message){basket=normaliseBasket(basket);const saved=store('gardenCart',basket);renderBasket();if(message)toast(message+(saved?'':' Browser storage is unavailable; this list lasts on the current page only.'));}
function statistic(event){window.dispatchEvent(new CustomEvent('business-metric',{detail:{event}}));}
function addItems(ids){let changed=false;for(const id of ids){const p=products.find(p=>p.slug===id);if(!p)continue;const line=basket.find(l=>l.id===id);if(line){if(line.qty<shop.maxQuantity){line.qty++;changed=true;}}else{basket.push({id,qty:1});changed=true;}}if(changed)statistic('save_item');saveBasket(changed?'Saved to your basket. No stock is reserved.':'This item is already at the 20-item planning limit.');}
renderBasket();
const dialog=$('#basket-dialog');
$$('[data-open-basket]').forEach(button=>button.addEventListener('click',()=>dialog.showModal()));
$('[data-close-basket]')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});
$('[data-menu]')?.addEventListener('click',event=>{const open=$('#main-nav').classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(open));});
document.addEventListener('click',event=>{
 const button=event.target.closest('button');if(!button)return;
 if(button.dataset.add)addItems([button.dataset.add]);
 if(button.dataset.addCollection){const c=collections.find(c=>c.slug===button.dataset.addCollection);if(c)addItems(c.ids.map(id=>products.find(p=>p.id===id).slug));}
 if(button.dataset.qty){const line=basket.find(l=>l.id===button.dataset.qty);if(!line)return;line.qty+=Number(button.dataset.change);basket=basket.filter(l=>l.qty>0);saveBasket();const focus=$$('[data-qty]').find(b=>b.dataset.qty===button.dataset.qty&&b.dataset.change===button.dataset.change&&!b.disabled);if(focus)focus.focus();else $('[data-close-basket]')?.focus();}
 if(button.dataset.remove){basket=basket.filter(l=>l.id!==button.dataset.remove);saveBasket('Removed from your saved basket.');if(dialog.open)$('[data-close-basket]').focus();}
 if(button.hasAttribute('data-clear-basket')){basket=[];saveBasket('Saved basket cleared.');}
});
window.addEventListener('storage',event=>{if(event.key==='gardenCart'){basket=normaliseBasket(read('gardenCart',[]));renderBasket();}});

const filters=$('[data-shop-filters]');
if(filters){
 const params=new URLSearchParams(location.search);for(const key of['query','category','sort']){const field=filters.elements.namedItem(key),value=params.get(key);if(value!==null&&(field.tagName!=='SELECT'||[...field.options].some(o=>o.value===value)))field.value=value.slice(0,100);}
 const update=()=>{const data=new FormData(filters),query=String(data.get('query')||'').slice(0,100),category=String(data.get('category')||'all'),sort=String(data.get('sort')||'featured'),list=searchProducts({query,category,sort});$('[data-product-grid]').innerHTML=list.length?productGrid(list,root):'<div class="empty-state"><h3>No little essentials found.</h3><p>Try a shorter search or choose another category.</p><button class="button outline" type="button" data-reset-filters>Show all planned products</button></div>';$('[data-results-count]').textContent=`${list.length} planned product${list.length===1?'':'s'} · all coming soon`;const url=new URL(location.href);for(const[key,value]of Object.entries({query,category,sort})){if(value&&value!=='all'&&value!=='featured')url.searchParams.set(key,value);else url.searchParams.delete(key);}history.replaceState(null,'',url);carryCampaign();};
 filters.addEventListener('input',update);filters.addEventListener('change',update);filters.addEventListener('submit',ev=>{ev.preventDefault();update();});
 document.addEventListener('click',event=>{if(event.target.closest('[data-reset-filters]')){filters.reset();update();$('#product-search').focus();}});update();
}
async function copyText(value){if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable. Select the text and copy it manually.');await navigator.clipboard.writeText(value);}
function downloadText(value,name){const url=URL.createObjectURL(new Blob([value],{type:'text/plain;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const planner=$('[data-planner]');let plan=null,checked=new Set(),planSaved=false;
function planText(){return `${plan.title.toUpperCase()}\n\nSpace: ${plan.space}\nGoal: ${plan.goal}\nTime: ${plan.time==='half-day'?'A relaxed half-day':plan.time+' minutes'}\n\n${plan.tasks.map((t,i)=>`${checked.has(i)?'[x]':'[ ]'} ${t}`).join('\n')}\n\nGeneral ideas for UK gardens. Check local conditions and plant-specific guidance.\nWold & Willow Outdoor Living\n${shop.baseUrl}garden-planner.html\n`;}
function savePlan(){return store('garden-plan-v1',{season:plan.season,space:plan.space,goal:plan.goal,time:plan.time,checked:[...checked]});}
function renderPlan(focus=false){
 const target=$('[data-plan-result]');target.innerHTML=`<span class="eyebrow">A little progress, at your pace</span><h2 id="plan-title" tabindex="-1">${e(plan.title)}</h2><p class="small-note">${plan.tasks.length} small steps · ${plan.time==='half-day'?'a relaxed half-day':plan.time+' minutes'} · tick as you go</p><ul class="checklist">${plan.tasks.map((task,i)=>`<li><label><input type="checkbox" data-task="${i}" ${checked.has(i)?'checked':''}><span>${e(task)}</span></label></li>`).join('')}</ul><p class="small-note" data-plan-progress>${checked.size} of ${plan.tasks.length} steps ticked.</p><div class="button-row"><button class="button small" type="button" data-save-plan>Save on this device</button><button class="button small outline" type="button" data-copy-plan>Copy plan</button><button class="button small outline" type="button" data-download-plan>Download</button><button class="button small outline" type="button" data-print-plan>Print</button></div><button class="remove-button" type="button" data-clear-plan>Clear saved plan</button><p class="feedback" data-plan-feedback role="status">${planSaved?'Your saved plan is loaded from this device.':'Nothing is saved until you choose Save on this device.'}</p><p class="small-note">No name, email or payment is needed. Use what you have; the checklist is a starting point rather than a guarantee of results.</p>`;
 const list=plan.productIds.map(id=>products.find(p=>p.id===id));$('[data-plan-products-section]').hidden=!list.length;$('[data-plan-products]').innerHTML=productGrid(list,root);carryCampaign();if(focus)$('#plan-title').focus();
}
if(planner){
 const saved=read('garden-plan-v1',null);if(saved&&typeof saved==='object'&&!Array.isArray(saved)){plan=makePlan(saved);checked=new Set(Array.isArray(saved.checked)?saved.checked.filter(i=>Number.isInteger(i)&&i>=0&&i<plan.tasks.length):[]);planSaved=true;for(const k of['season','space','goal','time'])planner.elements.namedItem(k).value=plan[k];renderPlan();}else planner.elements.namedItem('season').value=seasonForMonth(new Date().getMonth());
 planner.addEventListener('submit',event=>{event.preventDefault();plan=makePlan(Object.fromEntries(new FormData(planner)));checked=new Set();planSaved=false;renderPlan(true);statistic('complete_tool');});
 $('[data-plan-result]').addEventListener('change',event=>{if(!event.target.matches('[data-task]'))return;const i=Number(event.target.dataset.task);if(event.target.checked)checked.add(i);else checked.delete(i);$('[data-plan-progress]').textContent=`${checked.size} of ${plan.tasks.length} steps ticked.`;if(planSaved&&!savePlan())$('[data-plan-feedback]').textContent='Browser storage is unavailable. Copy or download your updated plan.';});
 $('[data-plan-result]').addEventListener('click',async event=>{const b=event.target.closest('button');if(!b||!plan)return;const feedback=$('[data-plan-feedback]');if(b.hasAttribute('data-save-plan')){planSaved=savePlan();feedback.textContent=planSaved?'Plan saved on this device. Ticks on this plan will be remembered.':'Browser storage is unavailable. Copy or download your plan instead.';}if(b.hasAttribute('data-copy-plan')){try{await copyText(planText());feedback.textContent='Plan copied.';}catch(err){feedback.textContent=err.message;}}if(b.hasAttribute('data-download-plan')){downloadText(planText(),'My-Garden-Plan.txt');feedback.textContent='Plan download prepared.';}if(b.hasAttribute('data-print-plan'))window.print();if(b.hasAttribute('data-clear-plan')){const removed=removeStorage('garden-plan-v1');planSaved=false;checked=new Set();renderPlan();$('[data-plan-feedback]').textContent=removed?'Saved plan cleared from this device.':'Could not clear browser storage. Please use your browser settings.';}});
}
const briefForm=$('[data-brief]');let brief='';
if(briefForm){
 const invalidate=()=>{brief='';$('[data-brief-output]').value='';$$('[data-copy-brief],[data-download-brief],[data-send-brief] [data-send]').forEach(b=>b.disabled=true);const form=$('[data-send-brief]');delete form.dataset.sent;$('[data-send]',form).textContent='Send my brief privately';$('[data-brief-feedback]').textContent='Details changed. Prepare your brief again before copying or sending.';};
 briefForm.addEventListener('input',invalidate);
 briefForm.addEventListener('submit',event=>{event.preventDefault();try{brief=projectBrief(Object.fromEntries(new FormData(briefForm)));$('[data-brief-output]').value=brief;$$('[data-copy-brief],[data-download-brief],[data-send-brief] [data-send]').forEach(b=>b.disabled=false);$('[data-brief-feedback]').textContent='Brief prepared. Nothing has been sent.';$('#brief-title').focus();statistic('complete_tool');}catch(err){$('[data-brief-feedback]').textContent=err.message;}});
 $('[data-copy-brief]').addEventListener('click',async()=>{try{await copyText(brief);$('[data-copy-feedback]').textContent='Brief copied. Nothing has been sent.';}catch(err){$('[data-copy-feedback]').textContent=err.message;}});
 $('[data-download-brief]').addEventListener('click',()=>{downloadText(brief,'My-Garden-Project-Brief.txt');$('[data-copy-feedback]').textContent='Brief download prepared. Nothing has been sent.';});
}
const prompts=['What is one thing your garden does well, just as it is?','If you had twenty quiet minutes outside, which little job would you choose?','Which plant would you love to get to know a little better?','What could you reuse before buying something new for the garden?','Where could you leave a small, sheltered corner for wildlife?','What has changed in your growing space since this time last month?'];let promptIndex=0;
$('[data-next-prompt]')?.addEventListener('click',()=>{promptIndex=(promptIndex+1)%prompts.length;const p=$('[data-garden-prompt]');p.setAttribute('aria-live','polite');p.textContent=prompts[promptIndex];});

const campaign=()=>{const s=new URLSearchParams(location.search).get('utm_campaign')||'';return /^[a-zA-Z0-9][a-zA-Z0-9 _.-]{0,59}$/.test(s)?s:'';};
const attempts=new WeakMap();
async function sendLead(form,fields){
 const feedback=$('[data-send-feedback]',form),button=$('[data-send]',form),data=new FormData(form);feedback.classList.remove('error');
 const payload={brand:'garden',...fields,name:String(data.get('name')||'').trim(),email:String(data.get('email')||'').trim(),privacyAccepted:data.get('privacyAccepted')==='on',website:String(data.get('website')||''),campaign:campaign()};
 const fingerprint=JSON.stringify(payload),last=attempts.get(form),requestKey=last?.fingerprint===fingerprint?last.key:crypto.randomUUID();attempts.set(form,{fingerprint,key:requestKey});
 button.disabled=true;feedback.textContent='Sending your private enquiry…';
 try{
  const response=await fetch('https://retroreplay.uk/api/leads',{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,requestKey}),signal:AbortSignal.timeout(15000)});
  let out;try{out=await response.json();}catch{throw new Error('The enquiry service could not confirm receipt. Please try again.');}
  if(!response.ok)throw new Error(out.error||'Your enquiry could not be saved. Please try again.');
  if(typeof out.reference!=='string'||!/^[a-f0-9-]{36}$/.test(out.reference))throw new Error('A receipt reference was not returned. Please retry the same enquiry.');
  feedback.textContent=`Your private enquiry has been saved. Reference: ${out.reference}. Leighton can review and reply using the email you gave. No work, order or visit is booked. No automatic email acknowledgement is sent.`;
  button.textContent='Enquiry saved';form.dataset.sent='true';statistic('enquiry_receipt');
 }catch(err){feedback.classList.add('error');feedback.textContent=(err.name==='TimeoutError'||err.name==='AbortError'?'The service took too long to confirm receipt. Please retry the same enquiry.':err.message||'Connection unavailable. Please try again.')+' Your text is still here. If this is a project brief, you can also copy or download it.';button.disabled=false;}
}
function unlockOnEdit(form){form.addEventListener('input',()=>{if(form.dataset.sent==='true'){delete form.dataset.sent;const b=$('[data-send]',form);b.disabled=form.matches('[data-send-brief]')&&!brief;b.textContent=form.matches('[data-send-brief]')?'Send my brief privately':'Send my enquiry';$('[data-send-feedback]',form).textContent='Details changed. Sending again will create a new enquiry.';}});}
const contact=$('[data-contact]');
if(contact){const params=new URLSearchParams(location.search),topic=params.get('topic'),field=contact.elements.namedItem('route');if([...field.options].some(o=>o.value===topic))field.value=topic;const product=products.find(p=>p.slug===params.get('product'));if(product){field.value='products';contact.elements.namedItem('title').value=`Question: ${product.name}`.slice(0,120);contact.elements.namedItem('body').value=`I would like to ask about ${product.name} from the planned range.\n\nMy question is: `;}contact.addEventListener('submit',event=>{event.preventDefault();if(contact.dataset.sent==='true')return;const d=new FormData(contact);void sendLead(contact,{route:String(d.get('route')),title:String(d.get('title')||'').trim(),body:String(d.get('body')||'').trim()});});unlockOnEdit(contact);}
const sendBrief=$('[data-send-brief]');if(sendBrief){sendBrief.addEventListener('submit',event=>{event.preventDefault();if(sendBrief.dataset.sent==='true')return;if(!brief){$('[data-send-feedback]',sendBrief).textContent='Prepare your project brief first.';return;}void sendLead(sendBrief,{route:'project',title:'Garden project: '+String(briefForm.elements.namedItem('project').value).slice(0,95),body:brief});});unlockOnEdit(sendBrief);}
if(storageFailed)toast('Browser storage is unavailable or a saved list could not be read. Current-page tools still work; copy or download anything you want to keep.');
