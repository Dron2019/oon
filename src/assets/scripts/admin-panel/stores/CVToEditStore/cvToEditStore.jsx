import { SET_CV_ID_TO_EDIT } from '../dispatchActions.jsx';
const initialState = 0;


export default function newMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CV_ID_TO_EDIT:
      if (action.payload === null) {
        return 0;
      }
      return action.payload;
    default:
      return state;
  }
}
