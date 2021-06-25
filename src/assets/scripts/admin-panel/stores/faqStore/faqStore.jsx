import { ADD_FAQ_QUESTIONS } from '../dispatchActions.jsx';

const initState = [];
export default function faqStore(state = initState, action) {
  switch (action.type) {
    case ADD_FAQ_QUESTIONS:
      return action.payload;
    case 'APPEND_MESSAGE':
      return action.payload;
    default:
      return state;
  }
}
