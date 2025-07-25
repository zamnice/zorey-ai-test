self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('zorey-cache').then(cache => {
      return cache.addAll(['/', '/index.html', '/styles.css', '/app.js']);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
