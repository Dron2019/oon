/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-assign */
// eslint-disable-next-line import/prefer-default-export
export const GET = (function get() {
  const array = window.location.search.replace('?', '').split('&').map(el => el.split('='));
  const obj = {};
  array.forEach(el => obj[el[0]] = el[1]);
  return obj;
}());
