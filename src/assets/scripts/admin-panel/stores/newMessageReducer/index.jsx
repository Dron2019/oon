
export default function newMessagesReducer(state = 0, action) {
  switch (action.type) {
    case 'NEW_MESSAGE':
      localStorage.setItem('newMessages', JSON.stringify(action.payload));
      // eslint-disable-next-line no-return-assign
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
