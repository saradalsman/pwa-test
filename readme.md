# PWA test

## Links

- [MDN Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Stuff I wish I'd known sooner about service workers](https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9)
- [Introduction to Service Worker](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker)
- [100 second youtube introduction](https://youtu.be/sFsRylCQblw?list=PLLHiuVbsSGYrq8kP6lNV5BXOYfe3PBCCO)
- [Talk by Jake Archibald](https://youtu.be/cmGr0RszHc8?list=PLLHiuVbsSGYrq8kP6lNV5BXOYfe3PBCCO)

- [Service Worker Caching and HTTP Caching](https://dev.to/jonchen/service-worker-caching-and-http-caching-p82)
- [MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/)

## Gotchas

> Turns out that when you call `navigator.serviceWorker.register('service-worker.js)` the request for `service-worker.js` _isn't_ intercepted by any service worker's `fetch` event handler.

Since _that_ request is not handled by the service worker the service worker itself is always requested from the server. Which leads to at least one request to the server _every_ time, completely negating the offline capability 😭.

However _that_ special request _does_ respect the http caching headers. So that "completely negating the offline capability" is not actually true 😅. But rather, offline capability only works for as long as the service worker does not need to be re-fetched. Meaning at most until the cache time expires or the file is evicted by the browser.
