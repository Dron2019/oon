/* eslint-disable camelcase */
import { CV_GET, CV_SEND, CVs_SAVE } from '../dispatchActions.jsx';

const initialState = [
];

export default function cvReducer(state = initialState, action) {
  switch (action.type) {
    case CV_SEND:

      return state;
    case CVs_SAVE:
      return [...state, action.payload];
    case CV_GET:

      return state;
    default:
      return state;
  }
}
