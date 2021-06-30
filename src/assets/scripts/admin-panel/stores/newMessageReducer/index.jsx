/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
/* eslint-disable no-return-assign */

export default function newMessagesReducer(state = {}, action) {
  switch (action.type) {
    case 'COUNT_NEW_MESSAGE':

      // eslint-disable-next-line no-case-declarations
      const summary = Object.values(action.payload).reduce((acc, el) => acc = acc + el, 0);
      localStorage.setItem('newMessages', JSON.stringify(summary));
      // eslint-disable-next-line no-return-assign
      return action.payload;
    case 'COUNT_SINGLE_TYPE_MESSAGE':
      return { ...action.payload };
    default:
      return state;
  }
}
