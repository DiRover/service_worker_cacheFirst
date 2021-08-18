import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { cinemaNews } from './cinemaNews';
import { url } from './constans';

precacheAndRoute(self.__WB_MANIFEST);//необязательная строка, нужна для кэширования файлов

const CACHE_NAME = 'v1';//имя кэша

const responseCache = new Response(JSON.stringify(cinemaNews));//для записи в кэш, т.к. это инфа из файла, а не сам файл, то из неё нужно создать запрос

self.addEventListener('install', (evt) => {//устанавливаем сервис воркер
  console.log('install')
  evt.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);//создаём кэш
    await cache.put(url, responseCache);//записываем в кэш заглушку для первого запуска, урл это ключ - запрос это значение
    await self.skipWaiting();//скидываем ожидание, если сервис воркер ждёт пока клиент отпишется от его старой версии (версии сервис воркера)
  })());
});
  
self.addEventListener('activate', (evt) => {//активируем сервис воркер
  console.log('activate')
  evt.waitUntil(self.clients.claim());//обновляем сервис воркер для всех клиентов
});

self.addEventListener('fetch', (evt) => {//отлавливаем событие фетч
  const requestUrl = new URL(evt.request.url);//получаем адрес, по которому отправился запрос
  
  if (!requestUrl.pathname.startsWith('/news')) return;//если это не нужный для кэширования путь, то выходим
  
  evt.respondWith((async () => {//подменяем запрос
    console.log('respondWith')
    const cache = await caches.open(CACHE_NAME);//открываем кэш
    const cachedResponse = await cache.match(evt.request);//находим подходящий ответ в кэше
    return cachedResponse;//возвращаем ответ из кэша на страницу
  })());
  
  evt.waitUntil((async () => {//ждём пока ответ всё же придёт от сервера
    console.log('waitUntil');
    const client = await clients.get(evt.clientId);//получаем клиента, кто отправил запрос
    try {
      const response = await fetch(evt.request.url);//получаем ответ
      let json = await response.json();//обрабатываем ответ
      client.postMessage(json);//отправляем ответ на страницу клиента
    } catch(e) {
      console.log('error')//если нет соединения
      client.postMessage('error');//отправляем клиенту сообщение об ошибке соединения
    }
  })());
});

