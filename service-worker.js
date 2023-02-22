var cacheName = 'lessons-v1';
var cacheFiles = [
    'index.html',
    'lessons.js',
    'lessons.webmanifest',
    'images/icon.png',
    'images/art.webp',
    'images/biology.jpeg',
    'images/chemistry.jpeg',
    'images/drama.jpeg',
    'images/english.jpeg',
    'images/geography.jpeg',
    'images/history.jpeg',
    'images/it.jpeg',
    'images/mathematics.jpeg',
    'images/physics.jpeg'
    
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');  e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })  
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         // check if the cache has the file        
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resource: '
//             + e.request.url);
//             // 'r' is the matching file if it exists in the cache
//             return r         
//         })    
//         );
//     });

self.addEventListener('fetch', function (e) {
    if (e.request.url.startsWith("chrome-extension://")){
        return;
    }
    e.respondWith(
        // check if the cache has the file        
        caches.match(e.request).then(function (r) {
            // download file if not in the cache
            return r || fetch(e.request).then(function(response){
                // add the new file to cache
                return caches.open(cacheName).then(function(cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })    
    );
});