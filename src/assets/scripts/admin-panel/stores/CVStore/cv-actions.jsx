/* eslint-disable camelcase */
import axios from 'axios';
import {
  clearError, CV_GET, CV_SEND, CVs_SAVE, SET_CV_ID_TO_EDIT
} from '../dispatchActions.jsx';
import { GET_CV_URL, SEND_SINGLE_CV_URL } from '../urls.jsx';
import { loginFail } from '../userDataStore/actions.jsx';
import store from '../userDataStore/index.jsx';

export function getCV(data) {
  const dataToSend = new FormData();
  dataToSend.append('ajax_data', 1);
  dataToSend.append('id', store.getState().loginStatusReducer.id);
  return (dispatch) => {
    axios.post(GET_CV_URL, dataToSend)
      .then(el => {
        console.log(el.data.data);
        store.dispatch(saveCVsToStore(el.data.data));
      })
      .catch(el => console.log(el));
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

export function sendEditedCV(data) {
  const ID = store.getState().loginStatusReducer.id;
  const cvID = store.getState().cvToEditStore;
  const fd = new FormData();
  fd.append('ajax_data', 1);
  fd.append('data', JSON.stringify(data.jsonData).replace(/'/g, '&rsquo;'));
  fd.append('img[]', data.image);
  fd.append('id', ID);
  fd.append('cvs_id', cvID);
  return (dispatch) => {
    axios.post(SEND_SINGLE_CV_URL, fd, {
      headers: { enctype: 'multipart/form-data' },
    })
      .then((el) => {
        switch (el.data.error) {
          case 0:
            store.dispatch(loginFail('Резюме відправлено'));
            setTimeout(() => {
              store.dispatch(getCV());
              store.dispatch(clearError());
              store.dispatch(setCvIdToEdit(null));
            }, 3000);
            break;
          default:
            store.dispatch(clearError());
            break;
        }
      })
      .then(el => console.log(el))
      .catch((el) => {
        store.dispatch(loginFail('Помилка відправки'));
        setTimeout(() => store.dispatch(clearError()), 2000);
        store.dispatch(saveCVsToStore(data.jsonData));
      });
  };
}

export function setCvIdToEdit(id) {
  return {
    type: SET_CV_ID_TO_EDIT,
    payload: id,
  };
}
