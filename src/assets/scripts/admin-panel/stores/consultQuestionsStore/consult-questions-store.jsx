import { SEND_CONSULT_QUESTION } from '../dispatchActions.jsx';

const initState = [];

export default function consultQuestionsReducer(state = initState, action) {
  switch (action.type) {
    case SEND_CONSULT_QUESTION:
      return action.payload;
    case 'APPEND_MESSAGE':
      return action.payload;
    default:
      return state;
  }
}
