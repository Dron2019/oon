import { CV_GET, CV_SEND } from '../dispatchActions.jsx';

const initialState = [
];

export default function cvReducer(state = initialState, action) {
  switch (action.type) {
    case CV_SEND:

      return state;
    case CV_GET:

      return state;
    default:
      return state;
  }
}
