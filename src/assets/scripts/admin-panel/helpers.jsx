export const GET = (function() {
    let array = window.location.search.replace('?', '').split('&').map(el => el.split('='));
    let obj = {};
    array.forEach(el => obj[el[0]] = el[1]);
    return obj;
})();