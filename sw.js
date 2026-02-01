const CACHE_NAME = 'energia-v3';
const assets = [
  './',
  './index.html',
  'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Baixamos os arquivos normais
      cache.addAll(assets);
      // Baixamos a imagem do Imgur separadamente com modo 'no-cors'
      return cache.add(new Request('https://i.imgur.com/IiCxCzg.png', {mode: 'no-cors'}));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
