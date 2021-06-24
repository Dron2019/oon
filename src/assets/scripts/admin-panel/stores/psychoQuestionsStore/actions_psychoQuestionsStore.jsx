import axios from 'axios';

import { ADD_PSYCHO_QUESTIONS } from '../dispatchActions.jsx';
import { GET_PSYCHO_QUESTIONS_URL } from '../urls.jsx';
import store from '../userDataStore/index.jsx';
import {
  SEND_ONLINE_CONSULT_QUESTION, formMessage, setPending, resetPending, clearError,
} from '../dispatchActions.jsx';
import {
  GET_ONLINE_CONSULT_QUESTIONS_URL,
  SEND_ONLINE_CONSULT_QUESTION_URL,
  SEND_PSYCHO_QUESTIONS_QUESTION_URL,
} from '../urls.jsx';
import { questionTypes } from '../consultQuestionsStore/consult-questions-actions.jsx';

import { setMessageColor } from '../messageStatusStore/messageStatusActions.jsx';
import { countNewMessages } from '../newMessageReducer/actions-newMessageReducer.jsx';

export function savePsychoQuestions(data) {
  return {
    type: ADD_PSYCHO_QUESTIONS,
    payload: data,
  };
}

export function getPsychoQuestions() {
  const sendData = new FormData();
  const ID = store.getState().loginStatusReducer.id;
  sendData.append('ajax_data', '1');
  sendData.append('type', questionTypes.psychoQuestion);
  sendData.append('id', ID);
  return (dispatch) => {
    axios.post(GET_PSYCHO_QUESTIONS_URL, sendData)
      .then((res) => {
        store.dispatch(setMessageColor(res.data.error));
      })
      .catch((res) => {

      })
      .finally(() => {

      });
  };
}

export function sendPsychoQuestion(data, resetCallback) {
  const ID = store.getState().loginStatusReducer.id;
  const sendData = new FormData();
  Object.entries(data).forEach(el => sendData.append(el[0], el[1]));
  sendData.append('ajax_data', '1');
  sendData.append('type', questionTypes.psychoQuestion);
  sendData.append('id', ID);
  return (dispatch) => {
    store.dispatch(setPending());
    axios.post(SEND_PSYCHO_QUESTIONS_QUESTION_URL, sendData)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(formMessage(el.data.mess));
            resetCallback();
            break;
          case 1:
            store.dispatch(formMessage(el.data.mess));
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        store.dispatch(formMessage('Помилка відправки'));
      })
      .finally(() => {
        setTimeout(() => {
          store.dispatch(clearError());
          store.dispatch(resetPending());
        }, 2500);
      });
  };
}
