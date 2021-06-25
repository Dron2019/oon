/* eslint-disable no-param-reassign */
import axios from 'axios';

import store from '../userDataStore/index.jsx';
import {
  SEND_ONLINE_CONSULT_QUESTION,
  formMessage,
  setPending,
  resetPending,
  clearError,
  ADD_PSYCHO_QUESTIONS,
} from '../dispatchActions.jsx';
import {
  GET_ONLINE_CONSULT_QUESTIONS_URL,
  SEND_ONLINE_CONSULT_QUESTION_URL,
  SEND_PSYCHO_QUESTIONS_QUESTION_URL,
  GET_PSYCHO_QUESTIONS_URL,
  GET_SINGLE_PSYCH_QUESTION_URL,
  CLOSE_PSYCH_QUESTION_URL,
  RECOVER_PSYCH_QUESTION_URL,
  SEND_NEW_MESSAGE_PSYCH_QUESTION_URL,
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
        switch (res.data.error) {
          case 0:
            store.dispatch(savePsychoQuestions(res.data.request));
            break;
          default:
            break;
        }
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

export function appendPsychMessagesToQuestion(arrayWithMessages) {
  const newState = store.getState().psychoQuestionsStore;
  newState.forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    if (el.id === arrayWithMessages[0].requestID) el.messages = arrayWithMessages;
    if (el.id === arrayWithMessages[0].requestID) el.status = arrayWithMessages[0].status;
    if (el.id === arrayWithMessages[0].requestID) el.is_read = true;
  });

  return {
    type: 'APPEND_MESSAGE',
    payload: [...newState],
  };
}

export function getSinglePsychConsultQuestion(id) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('id', id);
  data.append('type', questionTypes.psychoQuestion);
  return (dispatch) => {
    axios.post(GET_SINGLE_PSYCH_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(appendPsychMessagesToQuestion(el.data.request));
            break;
          default:
            break;
        }
      })
      .catch(el => console.log(el))
      .finally(el => console.log(el));
  };
}

export function closePsychQuestion(messageID) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('request_id', messageID);
  return (dispatch) => {
    axios.post(CLOSE_PSYCH_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(formMessage(el.data.mess));
            store.dispatch(getPsychoQuestions());
            store.dispatch(getSinglePsychConsultQuestion(messageID));
            break;
          default:
            break;
        }
      })
      .catch(el => console.log(el))
      .finally((el) => {
        setTimeout(() => {
          store.dispatch(formMessage(''));
        }, 2000);
      });
  };
}
export function sendSinglePsychQuestion(messageData) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('type', questionTypes.psychoQuestion);
  Object.entries(messageData).forEach(el => data.append(el[0], el[1]));
  return (dispatch) => {
    axios.post(SEND_NEW_MESSAGE_PSYCH_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(getSinglePsychConsultQuestion(messageData.request_id));
            store.dispatch(countNewMessages());
            break;
          default:
            break;
        }
      })
      .catch(el => console.log(el))
      .finally(el => console.log(el));
  };
}

export function recoverPsychConversation(messageID) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('id', messageID);
  return (dispatch) => {
    axios.post(RECOVER_PSYCH_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(formMessage(el.data.mess));
            store.dispatch(getPsychoQuestions());
            store.dispatch(getSinglePsychConsultQuestion(messageID));
            break;
          default:
            break;
        }
      })
      .catch(el => console.log(el))
      .finally((el) => {
        setTimeout(() => {
          store.dispatch(formMessage(''));
        }, 2000);
      });
  };
}
