self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open('halloween-app-cache').then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(['/index.html', '/script.js']);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // If not found in cache, fetch from the network
        return fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', function(event) {
    const title = 'New Message';
    const options = {
      body: 'Hello, world!',
    };
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  