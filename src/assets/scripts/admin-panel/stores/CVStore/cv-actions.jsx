import { CV_GET, CV_SEND } from '../dispatchActions.jsx';

export function sendCV(data) {
  // return (dispatch) =
  return {
    type: CV_SEND,
    payload: data,
  };
}
export function getCV(data) {
  return {
    type: CV_GET,
    payload: data,
  };
}