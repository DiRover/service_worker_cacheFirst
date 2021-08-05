import getPage from './getPage';
import { url } from './constans';

const container = document.querySelector('.container');

const page = new getPage(container);

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service.worker.js');
    } catch (e) {
      console.log(e);
    }
    page.fetchData(url);
  });

  navigator.serviceWorker.addEventListener('message', evt => {
    page.render(evt.data, null);
  });

}
