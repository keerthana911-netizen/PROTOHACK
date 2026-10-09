// Cache only public static assets. Authenticated pages and signed photos never enter a cache.
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
 const u = new URL(e.request.url);
 if (u.origin !== self.location.origin || !['/icon.svg','/icon-192.png','/icon-512.png','/manifest.webmanifest'].includes(u.pathname)) return;
 e.respondWith(caches.open('roadwatch-static-v1').then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { if(r.ok)c.put(e.request,r.clone()); return r; })));
});
