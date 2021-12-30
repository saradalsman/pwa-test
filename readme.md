# PWA test

## Links

- [MDN Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Stuff I wish I'd known sooner about service workers](https://gist.github.com/Rich-Harris/fd6c3c73e6e707e312d7c5d7d0f3b2f9)
- [Offline Cookbook](https://web.dev/offline-cookbook/)
- [Introduction to Service Worker](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker)
- [100 second youtube introduction](https://youtu.be/sFsRylCQblw?list=PLLHiuVbsSGYrq8kP6lNV5BXOYfe3PBCCO)
- [Talk by Jake Archibald](https://youtu.be/cmGr0RszHc8?list=PLLHiuVbsSGYrq8kP6lNV5BXOYfe3PBCCO)
- [Service Worker Caching and HTTP Caching](https://dev.to/jonchen/service-worker-caching-and-http-caching-p82)
- [MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/)

## Running

### Prerequisite

```sh
# Dependencies
npm install
```

```sh
# Only required for testing the production build locally
npm install -g serve
```

### Start

```sh
# Dev environment
npm run dev
```

```sh
# Build prod
npm run build

# Test prod locally
serve -l 8000 docs
```

### Deploy

Since we are using gh-pages, every push is a deployment. However only the `/docs` folder is served. Therefor a production build is required before the push.

```sh
npm run build
git add docs
git commit -m "Deploy production build"
git push
```

## Live site

The live site is hosted on github pages.
https://pirfalt.github.io/pwa-test/

## Gotchas

> Turns out that when you call `navigator.serviceWorker.register('service-worker.js)` the request for `service-worker.js` _isn't_ intercepted by any service worker's `fetch` event handler.

Since _that_ request is not handled by the service worker the service worker itself is always requested from the server. Which leads to at least one request to the server _every_ time, completely negating the offline capability 😭.

However _that_ special request _does_ respect the http caching headers. So that "completely negating the offline capability" is not actually true 😅. But rather, offline capability only works for as long as the service worker does not need to be re-fetched. Meaning at most until the cache time expires or the file is evicted by the browser.

## TODO

- [x] Introduction and background.
- [x] Watch [100 second youtube introduction](https://youtu.be/sFsRylCQblw?list=PLLHiuVbsSGYrq8kP6lNV5BXOYfe3PBCCO).
- [x] Offline support.
  - [x] Basic cache strategies.
    - Cache only.
    - Cache first, refresh in background.
    - Server first, with refresh, fallback to cache.
- [x] Manifest.
  - https://developer.mozilla.org/en-US/docs/Web/Manifest
  - https://www.pwabuilder.com/imageGenerator
  - https://manifest-gen.netlify.app/
  - https://app-manifest.firebaseapp.com/
  - ```
    {
      "$schema": "https://json.schemastore.org/web-manifest-combined.json",
      "name": "PWA test lab",
      "short_name": "PWA test",
      "start_url": ".",
      "display": "standalone",
      "theme_color": "#ff0000",
      "background_color": "#000000",
      "description": "PWA Test Webpage",
      "icons": [
        {
          "src": "icons/ios/100.png",
          "sizes": "100x100"
        }
        ...
      ]
    }
    ```
- [ ] App idea choice.
- [ ] UX experimentation.
  - [ ] How do you "install" a PWA? Is it good enough?
  - Add to home screen on IOS 😢
  - TODO(android): @sara/@alex, tomorrow.
- [ ] Support "research".
- [ ] Forms, 100% client side.
- [ ] Storage alternatives?
- [ ] Camera support?
