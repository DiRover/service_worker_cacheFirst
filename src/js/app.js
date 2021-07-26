//console.log('code is working');
import fetchData from './fetchData';


export const url = 'http://localhost:7070/news';


if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service.worker.js');
      console.log(navigator.serviceWorker.controller);
    } catch (e) {
      console.log(e);
    }
    fetchData(url);
  });
}

















/*import { fromEvent } from 'rxjs';
import Store from './Store';
import ListRender from './ListRender';
import handler from './handler';
import { hashAlgorithms } from './hashAlgorithms';
import workerOnload from './workerOnload';

const algorithm = document.querySelector('.current');
const hash = document.querySelector('.hash');

const fileElem = document.querySelector('[data-id="file"]');
const overlap = document.querySelector('[data-id="overlap"]');
const store = new Store(hashAlgorithms);
const listRender = new ListRender(store, hash, algorithm);
listRender.init();

//передаём клик с перекрывающего элемента на нижележащий инпут
overlap.addEventListener('click', () => {
    fileElem.dispatchEvent(new MouseEvent('click'));
});

fileElem.addEventListener('change', (e) => {
    const file = e.target.files[0];
    workerOnload({file, store})
});

overlap.addEventListener('dragover', (e) => {
    e.preventDefault();
});
  
overlap.addEventListener('drop', (e) => {
  e.preventDefault();
  console.log(e.dataTransfer.files[0]);
  const file = e.dataTransfer.files[0];
  workerOnload({file, store});
});

fromEvent(algorithm, 'click').subscribe((e) => { // обрабатваем все клики на странице технологией RxJS
    handler(e.target, store);// отработчик кликов
});
*/
