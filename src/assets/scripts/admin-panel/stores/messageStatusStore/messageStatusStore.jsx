
export default function messageStatusStore(state = 0, action) {
  switch (action.type) {
    case 'SET_MESSAGE_COLOR':
      return action.payload;
    default:
      return state;
  }
}
