import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cinemaNews } from './cinemaNews';
import { url } from './constans';

precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'v1';

const responseCache = new Response(JSON.stringify(cinemaNews));

self.addEventListener('install', (evt) => {
  console.log('install')
  evt.waitUntil((async () => {
    console.log('install waitUntil')
    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, responseCache);
    await self.skipWaiting();
  })());
});
  
self.addEventListener('activate', (evt) => {
  console.log('activate')
  evt.waitUntil(self.clients.claim());
});




self.addEventListener('fetch', (evt) => {
  console.log('sw fetch')
  const requestUrl = new URL(evt.request.url);
  
  if (!requestUrl.pathname.startsWith('/news')) return;
  
  evt.respondWith((async () => {
    console.log('respondWith')
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(evt.request);
    return cachedResponse;
  })());
  
  evt.waitUntil((async () => {
    console.log('waitUntil');
    const client = await clients.get(evt.clientId);
    try {
      const response = await fetch(evt.request.url);
      let json = await response.json();
      client.postMessage(json);
    } catch(e) {
      console.log('error')
      client.postMessage('error');
    }
  })());
});

