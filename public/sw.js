// tslint:disable:no-console

const CACHE_NAME = 'ReadHNLater-cache-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(async function (cacheResponse) {
        if (cacheResponse) {
          console.log(`Serving cached content for ${event.request.url}`);
          fetchAndSave(event);
          return cacheResponse;
        }

        return await fetchAndSave(event);
      })
  );
});

async function fetchAndSave(event) {
  const fetchRequest = event.request.clone();
  try {
    const res = await fetch(event.request);
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res;
    }
    const responseToCache = res.clone();

    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log(`${event.request.url} cached`);
        cache.put(event.request, responseToCache);
      });
    return res;
  } catch (e) {
    console.error(e);
  }
}