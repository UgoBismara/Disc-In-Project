self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("v1").then(cache => {
            return cache.addAll([
                "/",
                "index.html",
                "style.css",
                "home.css",
                "participants.css",
                "players.css",
                "feedback.html",
                "login.html",
                "my-profile.html",
                "news.html",
                "participants.html",
                "players.html",
                "schedule.html",
                "image/DiscInLogo.png"
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
                keys.filter(key => key !== "v1").map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim(); // Force le contrôle immédiat de la page par le SW
});

// 📌 Gestion du cache dynamique + fallback en ligne
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                return caches.open("v1").then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => caches.match("index.html")) // Fallback si offline
    );
});

// 📌 Permettre l’affichage du bouton d’installation de la PWA
self.addEventListener("beforeinstallprompt", event => {
    event.preventDefault(); // Empêche la bannière auto, pour la gérer manuellement
    window.deferredPrompt = event; // Stocke l'événement pour l'afficher plus tard
});