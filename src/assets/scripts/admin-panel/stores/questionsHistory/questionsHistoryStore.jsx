import { GET_MESSAGES } from '../dispatchActions.jsx';

export default function questionsHistoryReducer(state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}
