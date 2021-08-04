export default class getPage {
    constructor(container) {
        this.container = container;
        this.data = null;
    }

    async fetchData(url) {
        console.log('fetch')
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.data = data;
        this.render(data)
    }

    render(data) {
        const elem = document.createElement('div');
        elem.setAttribute('class', 'box');
        elem.innerHTML = `${data[0].description}`;
        this.container.append(elem)
    }

}