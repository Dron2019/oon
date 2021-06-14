const initialState = 0;


export default function newMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET-CV-ID-TO-EDIT':
      return action.payload;
    default:
      return null;
  }
}
