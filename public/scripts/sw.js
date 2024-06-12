const CACHE_NAME = "my-pwa-cache";

// recursos que serão armazenados no cache durante a instalação do Service Worker
const urlsToCache = [
    "/",
    "/index.html",
    "/styles/index.css",
    "/scripts/sw.js",
    "/scripts/app.js",
];

/*
 * Install: primeiro evento disparado quando o Service Worker é instalado
 * Cacheia recursos essenciais para funcionamento offline.
 */
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }),
    );
});

/*
 * Fetch: evento disparado sempre que uma requisição de rede é feita
 * Responde com recursos cacheados ou realiza requisições de rede, garantindo que o aplicativo
 * funcione mesmo offline.
 */
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }),
    );
});

/*
 * Activate: evento disparado quando o Service Worker é ativado
 * Remove caches antigos para evitar uso de recursos desuatualizados.
 */
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
});