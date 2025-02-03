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
          "home.css",
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
  });
  
  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });