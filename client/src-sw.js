const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst,StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const assetsCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});
registerRoute(
  ({request}) =>{
    request.destination === 'script' ||
    request.destination === 'style'||
    request.destination === 'image',
    assetsCache
  }
)
const pageCache =new StaleWhileRevalidate({
  cacheName:'page-cache',
  plugins:[
    new CacheableResponsePlugin({
      statuses:[0,200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30*24*60*60,
    }),
  ]
})
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});


// TODO: Implement asset caching
registerRoute();
