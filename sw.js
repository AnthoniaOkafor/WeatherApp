var cacheName = 'weather-app';
var filesToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/main.js'
];
self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(cacheName)
    .then (cache => {
        return cache.addAll(filesToCache)
        })
    )}
);
/* Serve cached content when offline */
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request)
    .then (response => {
        return response || fetch(e.request);
    })
    )
});