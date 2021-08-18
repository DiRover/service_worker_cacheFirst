import getPage from './getPage';
import { url } from './constans';

const container = document.querySelector('.container');//получаем контейнер для отрисовки

const page = new getPage(container);//создаём инстанс класса для рендера содержимого

if (navigator.serviceWorker) {//проверяем поддержку браузером сервис воркера
  window.addEventListener('load', async () => {
    try {//пытаемся зарегистрировать сервис воркер при загрузке страницы
      await navigator.serviceWorker.register('./service.worker.js');//регистрируем сервис воркер
    } catch (e) {
      console.log(e);//ловим ошибку
    }
    page.fetchData(url);//отправляем запрос
  });

  navigator.serviceWorker.addEventListener('message', evt => {
    page.render(evt.data, null);//получаем и обрабатываем сообщение сервис воркера
  });

}
