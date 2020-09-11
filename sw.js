var cacheName = 'weather-app';
var filesToCache = [
    '/',
    '/index.html',
    '/css/main.css',
    '/js/app.js',
    '/js/main.js'
];

//Call Install event
self.addEventListener('install', e => {
    e.waitUntil(caches.open(cacheName)
        .then (cache => {
            return cache.addAll(filesToCache)
        })
        .then(() => self.skipWaiting())
    )
});

//Call Activate event
/*
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                cacheName.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})
*/

/* Serve cached content when offline */ 
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
});
