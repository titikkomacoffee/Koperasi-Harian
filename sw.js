const CACHE_NAME = 'koperasi-harian-v5'
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './maskable-512.png',
  './logo-full.png'
]

self.addEventListener('install', function (event) {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (namaCacheList) {
      return Promise.all(
        namaCacheList.map(function (namaCache) {
          if (namaCache !== CACHE_NAME) {
            return caches.delete(namaCache)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) return cachedResponse
      return fetch(event.request)
        .then(function (networkResponse) {
          return caches.open(CACHE_NAME).then(function (cache) {
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, networkResponse.clone())
            }
            return networkResponse
          })
        })
        .catch(function () {
          return caches.match('./index.html')
        })
    })
  )
})
