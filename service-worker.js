const CURRENT_CACHE = "two-v1";

debug("sw self", self);

function log(...args) {
  console.log(new Date().toISOString(), CURRENT_CACHE, ...args);
}
function debug(...args) {
  console.debug(new Date().toISOString(), CURRENT_CACHE, ...args);
}
function info(...args) {
  console.info(new Date().toISOString(), CURRENT_CACHE, ...args);
}
function warn(...args) {
  console.warn(new Date().toISOString(), CURRENT_CACHE, ...args);
}

self.addEventListener("install", (event) => {
  // debugger;
  debug("install", event);
  event.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll([
        "./", // /index.html
        "./style.css",
        "./favicon.ico",
        "./checkbox.svg",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  // debugger;
  debug("activate", event);
  event.waitUntil(
    caches.keys().then((keyList) => {
      const toDelete = keyList.filter((k) => k != CURRENT_CACHE);
      const deletePromises = toDelete.map((key) => caches.delete(key));
      return Promise.all(deletePromises);
    })
  );
});

self.addEventListener("message", (event) => {
  debugger;
  debug("message", event);
  // log("self.skipWaiting()", await self.skipWaiting());
});

self.addEventListener("fetch", (event) => {
  // debugger;
  const request = event.request; //new Request()
  debug("fetch", request.method, new URL(request.url).pathname, event);
  event.respondWith(serverFirstAndRefresh(request));
});

self.addEventListener("sync", async (event) => {
  debug("sync", event);
});

self.addEventListener("push", async (event) => {
  debug("push", event);
});

async function cacheOnly(request) {
  const currCache = await caches.open(CURRENT_CACHE);
  const cacheResponse = currCache.match(request);
  debug("cache", cacheResponse);
  return cacheResponse;
}

async function cacheFirstAndRefresh(request) {
  const currCache = await caches.open(CURRENT_CACHE);

  const cacheResponse = currCache.match(request);
  const onlineResponse = fetchAndRefresh(request, currCache);

  const response = (await cacheResponse) ?? (await onlineResponse);

  debug("cache", cacheResponse);
  debug("online", onlineResponse);
  debug("actual", response);
  return response;
}

async function serverFirstAndRefresh(request) {
  const currCache = await caches.open(CURRENT_CACHE);

  const cacheResponse = currCache.match(request);
  const onlineResponse = fetchAndRefresh(request, currCache);

  const response = (await onlineResponse) ?? (await cacheResponse);

  debug("cache", cacheResponse);
  debug("online", onlineResponse);
  debug("actual", response);
  return response;
}

async function fetchAndRefresh(request, cache) {
  try {
    const onlineResponse = await fetch(request);
    const resClone = onlineResponse.clone();
    cache.put(request, resClone);
    return onlineResponse;
  } catch (err) {
    debug("fetch error", err);
    return undefined;
  }
}
