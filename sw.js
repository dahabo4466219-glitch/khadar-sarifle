/* KHADER Exchange — Service Worker (network-first, auto-update)
   Ujeeddo: mar walba nooca ugu dambeeya ka soo qaado internet-ka.
   Home Screen icon-ka MAR DAMBE looma baahna in la tirtiro.
   ------------------------------------------------------------------
   BUMP: haddaad rabto in cache-ka gebi ahaan la nadiifiyo, kordhi lambarka hoose. */
var CACHE = 'khader-v3';
var ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS).catch(function(){}); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k !== CACHE){ return caches.delete(k); } }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET'){ return; }
  var url = new URL(req.url);
  /* Kaliya isku-magaca origin ayaan network-first ku hayneynaa (GitHub Pages).
     API-yada kale (Supabase, Worker, CDN) si caadi ah ha u shaqeeyaan. */
  if(url.origin !== self.location.origin){ return; }

  /* NETWORK-FIRST: marka hore internet, haddii offline cache. */
  e.respondWith(
    fetch(req).then(function(res){
      try{
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy).catch(function(){}); });
      }catch(err){}
      return res;
    }).catch(function(){
      return caches.match(req).then(function(m){
        return m || caches.match('./index.html');
      });
    })
  );
});
