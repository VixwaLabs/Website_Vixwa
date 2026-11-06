/* VIXWA LABS — Cache Purge & Service Worker Kill-Switch */
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      for (const client of clients) {
        if (client.navigate) {
          client.navigate(client.url);
        }
      }
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
