import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator";//библиотека для рандомных аватаров


export default class getPage {
    constructor(container) {
        this.container = container;//основной контейнер для отрисовки
    }

    async fetchData(url) {//метод для отправки и обрабоки запросов
        const response = await fetch(url);
        const data = await response.json();
        this.render(data, 'blank'); //blank нужен для того, чтобы показать, что запрос с сервера ещё не пришёл и появилась только заглушка
    }

    render(data, blank) {//метод для отрисовки страницы
        if (data === 'error') {//если нет соединения
            this.renderError();//показываем заглушку с сообщением об отсутствии соединения
            return;// и  выходим
        };
        this.container.innerHTML = '';//чистим контейнер при каждом рендере
        const widget = document.createElement('div');
        widget.setAttribute('class', 'widget');
        
        data.forEach((i) => {//создаём всякие элементы
            const filmBox = document.createElement('div');
            filmBox.setAttribute('class', 'film-box');
            const avatar = getRandomAvatar();
            let elem = undefined;
            if (blank) {
               elem = `<div class = "blank-img"></div>`
            } else {
                elem = `
                <img src= data:image/svg+xml;base64,${btoa(avatar)} alt='avatar'/>
                `
            }

            filmBox.innerHTML = `
            <div class = 'film-name ${blank}'>${i.name}</div>
            <div class = 'film-body'>
                ${elem}
                <div class = 'film-text'>
                    <div class = 'text ${blank}'><span class = 'genre ${blank}'>Genre:</span> ${i.genre}</div>
                    <div class = 'text ${blank}'><span class = 'description ${blank}'>description:</span> ${i.description}</div>
                </div>
            </div>
            `
            widget.append(filmBox);//прикручиваем элементы к виджету
        })
        this.container.append(widget)//прикручиваем виджет к контейнеру
    }

    renderError() {//метод для отрисовки ошибки об отсутсвии соединения
        const popUp = document.createElement('div');
        popUp.setAttribute('class', 'pop-up');
        popUp.innerHTML = `
        <div class = 'pop-up-text'>
        <p>Data is not available</p>
        <p>check your network connection</p>
        <p>and refresh the page</p>
        </div>
        `;
        this.container.append(popUp);//прикоучиваем контейнер с сообщением об ошибке соединения к основному контейнеру
    }

}