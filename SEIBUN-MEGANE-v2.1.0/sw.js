const CACHE='seibun-megane-v210';
const ASSETS=[
  './','./index.html','./styles.css','./manifest.json','./404.html','./robots.txt',
  './data/app_data.js','./data/skin_research.js','./data/scan_lexicon.js','./data/analysis_rules.js',
  './data/ingredient_guides.js','./data/ingredient_master.js','./data/verified_ingredients_v110.js','./data/config.js',
  './js/core.js','./js/legal.js','./js/contact.js','./js/ingredients.js','./js/skin.js','./js/ocr.js','./js/views.js','./js/app.js'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));return res}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>{const network=fetch(req).then(res=>{if(res.ok)caches.open(CACHE).then(cache=>cache.put(req,res.clone()));return res}).catch(()=>cached);return cached||network}));
});
