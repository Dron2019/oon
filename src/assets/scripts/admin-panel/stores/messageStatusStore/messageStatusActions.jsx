/**
 *
 * @param {0 - удача, 1 - ошибка} digit
 */
// eslint-disable-next-line import/prefer-default-export
export function setMessageColor(digit) {
  return {
    type: 'SET_MESSAGE_COLOR',
    payload: digit,
  };
}
