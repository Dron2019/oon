/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import axios from 'axios';

import { questionTypes } from '../consultQuestionsStore/consult-questions-actions.jsx';
import {
  GET_FAQ_QUESTIONS_URL,
  GET_SINGLE_FAQ_QUESTION_URL,
  CLOSE_FAQ_QUESTION_URL,
  SEND_NEW_MESSAGE_FAQ_QUESTION_URL,
} from '../urls.jsx';
import store from '../userDataStore/index.jsx';
import {
  formMessage,
  ADD_FAQ_QUESTIONS,
  setPending,
  resetPending,
} from '../dispatchActions.jsx';
import { setMessageColor } from '../messageStatusStore/messageStatusActions.jsx';

export function saveFaqQuestions(data) {
  return {
    type: ADD_FAQ_QUESTIONS,
    payload: data,
  };
}

export function getFaqUserQuestions() {
  const data = new FormData();
  const ID = store.getState().loginStatusReducer.id;
  data.append('ajax_data', '1');
  data.append('id', ID);
  data.append('type', questionTypes.admin);
  return (dispatch) => {
    axios.post(GET_FAQ_QUESTIONS_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(saveFaqQuestions(el.data.request || []));
            break;
          default:
            break;
        }
      })
      .catch(el => store.dispatch(formMessage(el.data.mess)))
      .finally(() => setTimeout(() => store.dispatch(formMessage('')), 2000));
  };
}

export function appendMessagesToFaqQuestion(arrayWithMessages) {
  const newState = store.getState().faqStore;
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

export function getSingleFaqQuestion(id) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('id', id);
  data.append('type', questionTypes.admin);
  return (dispatch) => {
    axios.post(GET_SINGLE_FAQ_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error || 1));
        switch (el.data.error) {
          case 0:
            // eslint-disable-next-line no-case-declarations
            const changedData = [...el.data.request];
            changedData.forEach(part => part.questType = el.data.data.type);
            store.dispatch(appendMessagesToFaqQuestion(changedData));
            break;
          default:
            break;
        }
      })
      .catch(el => console.log(el))
      .finally(el => console.log(el));
  };
}

export function sendFaqQuestion(messageData, resetCallback) {
  const data = new FormData();
  const ID = store.getState().loginStatusReducer.id;
  data.append('ajax_data', '1');
  data.append('type', questionTypes.admin);
  data.append('id', ID);
  store.dispatch(setPending());
  Object.entries(messageData).forEach(el => data.append(el[0], el[1]));
  return (dispatch) => {
    axios.post(SEND_NEW_MESSAGE_FAQ_QUESTION_URL, data)
      .then((el) => {
        store.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            store.dispatch(getFaqUserQuestions());
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
      .catch(el => console.log(el))
      .finally((el) => {
        setTimeout(() => {
          store.dispatch(formMessage(''));
          store.dispatch(resetPending());
        }, 2000);
      });
  };
}
