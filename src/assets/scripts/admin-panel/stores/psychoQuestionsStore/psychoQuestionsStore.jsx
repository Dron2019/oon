import { ADD_PSYCHO_QUESTIONS } from '../dispatchActions.jsx';

const initState = [];
export default function psychoQuestionsStore(state = initState, action) {
  switch (action.type) {
    case ADD_PSYCHO_QUESTIONS:
      return action.payload;
    case 'APPEND_PSYCHO_MESSAGE':
      return action.payload;
    default:
      return state;
  }
}
