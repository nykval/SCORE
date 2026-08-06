const CACHE_NAME = "score-play-mob-v20260806-goal-setup-static-list";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./styles.css",
  "./app.classic.js",
  "./icons/app-icon-180.png",
  "./icons/app-icon-192.png",
  "./icons/app-icon-512.png",
  "./icons/home.png",
  "./icons/venues.png",
  "./icons/games.png",
  "./icons/profile.png",
  "./icons/notifications.png",
  "./assets/fonts/Raleway-VariableFont_wght.ttf",
  "./assets/fonts/Raleway-Italic-VariableFont_wght.ttf"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok && new URL(event.request.url).origin === self.location.origin) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return cached;
        });
    })
  );
});
