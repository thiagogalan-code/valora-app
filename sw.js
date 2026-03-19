// Valora Service Worker — v2
// Muda o CACHE_NAME a cada deploy para forçar atualização
const CACHE_NAME = 'valora-v2';

self.addEventListener('install', function(e) {
  // Ativar imediatamente sem esperar
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  // Apagar todos os caches antigos
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      // Assumir controle de todas as abas imediatamente
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(e) {
  // Estratégia Network First — sempre tenta buscar versão nova
  // só usa cache se offline
  e.respondWith(
    fetch(e.request)
      .then(function(response) {
        // Salvar no cache só para assets estáticos
        if (e.request.method === 'GET' && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      })
      .catch(function() {
        // Offline: usar cache
        return caches.match(e.request);
      })
  );
});

// Notificar abas abertas para recarregar quando SW atualizar
self.addEventListener('message', function(e) {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
