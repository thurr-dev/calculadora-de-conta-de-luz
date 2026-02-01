const CACHE_NAME = 'energia-v2';
const assets = [
  './',
  './index.html',
  'https://i.imgur.com/IiCxCzg.png', 
  'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
];

// Instalação: Salva arquivos essenciais no cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

// Ativação: Limpa caches antigos se houver
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Tenta buscar no cache, se não tiver, vai na rede
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});


