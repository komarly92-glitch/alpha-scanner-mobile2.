const CACHE='alpha-scanner-v2';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.json']))));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(u.origin===location.origin && e.request.method==='GET'){
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
 }
});
