
export default function newMessagesReducer(state = {}, action) {
  switch (action.type) {
    case 'COUNT_NEW_MESSAGE':
      localStorage.setItem('newMessages', JSON.stringify(action.payload));
      // eslint-disable-next-line no-return-assign
      return { ...action.payload };
    case 'COUNT_SINGLE_TYPE_MESSAGE':
      return { ...action.payload };
    default:
      return state;
  }
}
