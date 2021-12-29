const CURRENT_CACHE = "v1";

debugger;
log("sw self", self);

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function log(...args) {
  console.log(new Date().toISOString(), CURRENT_CACHE, ...args);
}

async function install() {
  // Cache the app files
  const cache = await caches.open(CURRENT_CACHE);
  await cache.addAll([
    "/",
    "/favicon.ico",
    "/index.html",
    "/logo192.png",
    "/logo512.png",
    "/main.js",
    "/manifest.json",
    "/robots.txt",
    "/sw.js",
  ]);

  const cacheKeys = await caches.keys();
  log({ cacheKeys });
}

async function activate() {
  const allCacheKeys = await caches.keys();
  const oldCacheKeys = allCacheKeys.filter((k) => k != CURRENT_CACHE);
  log({ CURRENT_CACHE, allCacheKeys, oldCacheKeys });
  await Promise.all(oldCacheKeys.map((k) => caches.delete(k)));
  const cacheKeys = await caches.keys();
  log("cacheKeys", cacheKeys);
}

self.addEventListener("install", (event) => {
  debugger;
  log("install", event);
  event.waitUntil(
    install()
      .then(() => log("installed"))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", async (event) => {
  debugger;
  log("activate", event);
  event.waitUntil(
    activate()
      .then(() => self.clients.claim())
      .then(() => log("activated"))
  );
});

self.addEventListener("message", async (event) => {
  debugger;
  log("message", event);
  log("self.skipWaiting()", await self.skipWaiting());
  // log("client.claim()", await clients.claim());
});

self.addEventListener("fetch", (event) => {
  // debugger;
  const request = event.request; //new Request()
  log("fetch", request.method, new URL(request.url).pathname, event);
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        log("cache hit", request.url);
        return response;
      }
      log("cache miss");
      return fetch(request);
    })
  );
});

self.addEventListener("sync", async (event) => {
  log("sync", event);
});

self.addEventListener("push", async (event) => {
  log("push", event);
});
