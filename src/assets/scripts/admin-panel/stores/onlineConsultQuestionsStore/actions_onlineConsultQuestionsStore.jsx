/* eslint-disable no-param-reassign */
import axios from 'axios';
import store from '../userDataStore/index.jsx';
import {
  SEND_ONLINE_CONSULT_QUESTION, formMessage, setPending, resetPending, clearError,
} from '../dispatchActions.jsx';
import {
  GET_ONLINE_CONSULT_QUESTIONS_URL,
  SEND_ONLINE_CONSULT_QUESTION_URL,
  GET_SINGLE_CONSULT_QUESTION_URL,
  SEND_NEW_MESSAGE_IN_CONSULT_QUESTION_URL,
  RECOVER_CONSULT_QUESTION_URL,
  CLOSE_CONSULT_QUESTION_URL,
} from '../urls.jsx';
import { questionTypes } from '../consultQuestionsStore/consult-questions-actions.jsx';

import { setMessageColor } from '../messageStatusStore/messageStatusActions.jsx';
import { countNewMessages } from '../newMessageReducer/actions-newMessageReducer.jsx';

export function saveOnlineConsultQuestions(data) {
  return {
    type: SEND_ONLINE_CONSULT_QUESTION,
    payload: data,
  };
}


export function sendOnlineConsultQuestion(data, resetCallback) {
  const ID = store.getState().loginStatusReducer.id;
  const sendData = new FormData();
  Object.entries(data).forEach(el => sendData.append(el[0], el[1]));
  sendData.append('ajax_data', '1');
  sendData.append('type', questionTypes.onlineConsultation);
  sendData.append('id', ID);
  return (dispatch) => {
    store.dispatch(setPending());
    axios.post(SEND_ONLINE_CONSULT_QUESTION_URL, sendData)
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

export function getOnlineConsultQuestions() {
  const ID = store.getState().loginStatusReducer.id;
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('type', questionTypes.onlineConsultation);
  data.append('id', ID);
  return (dispatch) => {
    axios.post(GET_ONLINE_CONSULT_QUESTIONS_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(saveOnlineConsultQuestions(el.data.request || []));
            store.dispatch(countNewMessages());
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

export function appendOnlineConsultMessagesToQuestion(arrayWithMessages) {
  const newState = store.getState().onlineConsultQuestionsStore;
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

export function getSingleOnlineConsultQuestion(id) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('id', id);
  data.append('type', questionTypes.onlineConsultation);
  return (dispatch) => {
    axios.post(GET_SINGLE_CONSULT_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(appendOnlineConsultMessagesToQuestion(el.data.request));
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


export function sendSingleOnlineConsultQuestion(messageData) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('type', questionTypes.onlineConsultation);
  Object.entries(messageData).forEach(el => data.append(el[0], el[1]));
  return (dispatch) => {
    axios.post(SEND_NEW_MESSAGE_IN_CONSULT_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(getSingleOnlineConsultQuestion(messageData.request_id));
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

export function closeOnlineConsultQuestion(messageID) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('request_id', messageID);
  return (dispatch) => {
    axios.post(CLOSE_CONSULT_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(formMessage(el.data.mess));
            store.dispatch(getOnlineConsultQuestions());
            store.dispatch(getSingleOnlineConsultQuestion(messageID));
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

export function recoverOnlineConsultConversation(messageID) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('id', messageID);
  return (dispatch) => {
    axios.post(RECOVER_CONSULT_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(formMessage(el.data.mess));
            store.dispatch(getOnlineConsultQuestions());
            store.dispatch(getSingleOnlineConsultQuestion(messageID));
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
