self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('cache-halloween-app').then((cache) => {
        return cache.addAll([
          '/index.html',
          '/app.js',
          '/styles.css',
          // Add more URLs for assets you want to cache
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: '/icon.png',
      // Add more options for notification customization
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  