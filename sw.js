var CACHE = 'sarifla-v1';
var ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(ASSETS.map(function(u){
        return c.add(u).catch(function(){ return null; });
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k !== CACHE){ return caches.delete(k); }
        return null;
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET'){ return; }
  var url = e.request.url;
  if(url.indexOf('http') !== 0){ return; }
  if(url.indexOf('supabase') > -1 || url.indexOf('workers.dev') > -1){ return; }

  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit){ return hit; }
      return fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){
          try{ c.put(e.request, copy); }catch(err){}
        });
        return res;
      }).catch(function(){
        return caches.match('./index.html');
      });
    })
  );
});
