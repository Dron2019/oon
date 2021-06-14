const initialState = 0;


export default function newMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET-CV-ID-TO-EDIT':
      if (action.payload === null) {
        return 0;
      }
      return action.payload;
    default:
      return null;
  }
}
