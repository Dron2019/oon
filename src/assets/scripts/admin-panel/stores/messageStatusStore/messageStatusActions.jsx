/**
 *
 * @param {0 - удача, 1 - ошибка} digit
 */
// eslint-disable-next-line import/prefer-default-export
export function setMessageColor(digit) {
  const digitForReturn = digit ? 1 : digit;
  return {
    type: 'SET_MESSAGE_COLOR',
    payload: digitForReturn,
  };
}
