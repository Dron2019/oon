import axios from 'axios';
import { CV_GET, CV_SEND } from '../dispatchActions.jsx';
import { GET_CV_URL, SEND_SINGLE_CV_URL } from '../urls.jsx';
export function sendCV(data) {
  return (dispatch) => {
    axios.post(SEND_SINGLE_CV_URL)
      .then(el=>el.statusText())
      .then(el=> console.log(el));
  };
}
export function getCV(data) {
  return (dispatch) => {
    axios.get(GET_CV_URL)
      .then(el => console.log(el.data));
  };
}