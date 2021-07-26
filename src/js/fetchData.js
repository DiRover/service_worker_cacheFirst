export default async function fetchData(url) {
    console.log('fetch')
    const response = await fetch(url);
    const info = await response.json();
    console.log(info);
}