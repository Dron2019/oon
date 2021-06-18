export default function newMessagesReducer(state = 0, action) {
  switch (action.type) {
    case 'NEW_MESSAGE':
      localStorage.setItem('newMessages', state + 1);
      // eslint-disable-next-line no-return-assign
      return state += 1;
    default:
      return state;
  }
}
