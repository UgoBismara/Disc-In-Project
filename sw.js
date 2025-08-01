const CACHE_NAME = "v1";

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/style/style.css",
                "/style/home.css",
                "/style/participants.css",
                "/style/players.css",
                "/style/login.css",
                "/style/my-profile.css",
                "/style/news.css",
                "/style/schedule.css",
                "/html/feedback.html",
                "/html/login.html",
                "/html/my-profile-player.html",
                "/html/my-profile-volunteer.html",
                "/html/my-profile-coach.html",
                "/html/report-issue.html",
                "/html/news.html",
                "/html/participants.html",
                "/html/players.html",
                "/html/schedule.html",
                "/image/DiscInLogo.png",
                "/favicon.ico"
            ]);
        })
    );
    self.skipWaiting(); // Permet d’activer immédiatement le nouveau SW
});

// 📌 Activation du Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim(); // Force le contrôle immédiat de la page par le SW
});

// 📌 Gestion du cache dynamique + fallback en ligne
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => caches.match("/index.html")) // Fallback si offline
    );
});