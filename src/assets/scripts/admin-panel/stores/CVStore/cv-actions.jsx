/* eslint-disable camelcase */
import axios from 'axios';
import {
  clearError, CV_GET, CV_SEND, CVs_SAVE,
} from '../dispatchActions.jsx';
import { GET_CV_URL, SEND_SINGLE_CV_URL } from '../urls.jsx';
import { loginFail } from '../userDataStore/actions.jsx';
import store from '../userDataStore/index.jsx';

export function getCV(data) {
  return (dispatch) => {
    axios.get(GET_CV_URL)
      .then(el => console.log(el.data));
  };
}
export function saveCVsToStore(data) {
  return {
    type: CVs_SAVE,
    payload: data,
  };
}

export function sendCV(data) {
  const ID = store.getState().loginStatusReducer.id;
  const fd = new FormData();
  fd.append('ajax_data', 1);
  fd.append('data', JSON.stringify(data.jsonData).replace(/'/g, '&rsquo;'));
  fd.append('img[]', data.image);
  fd.append('id', ID);
  return (dispatch) => {
    axios.post(SEND_SINGLE_CV_URL, fd, {
      headers: { enctype: 'multipart/form-data' },
    })
      .then((el) => {
        store.dispatch(loginFail('Резюме відправлено'));
      })
      .then(el => console.log(el))
      .catch((el) => {
        store.dispatch(loginFail('Помилка відправки'));
        setTimeout(() => store.dispatch(clearError()), 2000);
        store.dispatch(saveCVsToStore(data.jsonData));
      });
  };
}
