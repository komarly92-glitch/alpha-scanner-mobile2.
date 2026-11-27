const CACHE='alpha-scanner-v2-3';
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(['./','./index.html','./manifest.json']);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('alpha-scanner-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin===location.origin&&e.request.method==='GET'){e.respondWith((async()=>{const cached=await caches.match(e.request);try{const fresh=await fetch(e.request);if(fresh.ok){const c=await caches.open(CACHE);c.put(e.request,fresh.clone())}return fresh}catch(err){return cached||Response.error()}})())}});
