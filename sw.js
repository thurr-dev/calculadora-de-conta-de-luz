const CACHE_NAME = 'energia-v1';
const assets = [
  './',
  './index.html',
  'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});