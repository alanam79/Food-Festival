// global constants
const APP_PREFIX = "FoodFest-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

// cannot hardcode the absolute path, must use relative
const FILES_TO_CACHE = [
  "./index.html",
  "./events.html",
  "./tickets.html",
  "./schedule.html",
  "./assets/css/style.css",
  "./assets/css/bootstrap.css",
  "./assets/css/tickets.css",
  "./dist/app.bundle.js",
  "./dist/events.bundle.js",
  "./dist/tickets.bundle.js",
  "./dist/schedule.bundle.js",
];

// adding files to the precache, so that the application can use the cache.
// The context of self here refers to the service worker object.
self.addEventListener("install", function (e) {
  // tell the browser to wait until the work is complete before terminating the service worker
  // ensures that the service worker doesn't move on from the installing phase until it's finished executing all of its code
  e.waitUntil(
    // finds the specific cache by name,
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache : " + CACHE_NAME);
      //   add every file in the FILES_TO_CACHE array to the cache
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// add event listener to the activate event
self.addEventListener("activate", function (e) {
  e.waitUntil(
    // keys returns an array of all cache names which is called keylist here
    caches.keys().then(function (keyList) {
      // must filter out the caches from all cache names in <username>.github.io
      let cacheKeeplist = keyList.filter(function (key) {
        // captures then caches for just the onesn with tis app prefix
        return key.indexOf(APP_PREFIX);
      });
      // add the current cache to the keeplist - cache_name is a global variable
      cacheKeeplist.push(CACHE_NAME);

      // returns a Promise that resolves once all old versions of the cache have been deleted.
      return Promise.all(
        keyList.map(function (key, i) {
          // will only return a value of -1 if this item is not found in the keep list
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            // if the item is not found in the keep list, delete it from the cache
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// retrieve information from cache
// Here, we listen for the fetch event, log the URL of the requested resource, and then begin to define how we will respond to the request.
self.addEventListener("fetch", function (e) {
  console.log("fetch request : " + e.request.url);
  // respondwith intercepts the fetch request
  e.respondWith(
    caches.match(e.request).then(function (request) {
      // .match() to determine if the resource already exists in caches
      if (request) {
        console.log("responding with cache : " + e.request.url);
        return request;
        // if the resource is not in caches, we allow the resource to be retrieved from the online network as usual
      } else {
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }

      // You can omit if/else above for console.log & put just one line below like this too.
      //   return request || fetch(e.request)
    })
  );
});
