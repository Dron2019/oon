import axios from 'axios';
import {
  GET_CONSULT_QUESTION_URL,
  GET_SINGLE_CONSULT_QUESTION_URL,
  SEND_CONSULT_QUESTION_URL,
  SEND_NEW_MESSAGE_IN_CONSULT_QUESTION_URL,
  CLOSE_CONSULT_QUESTION_URL,
} from '../urls.jsx';
import { formMessage, SEND_CONSULT_QUESTION } from '../dispatchActions.jsx';
import store from '../userDataStore/index.jsx';

export function saveConsultQuestions(data) {
  return {
    type: SEND_CONSULT_QUESTION,
    payload: data,
  };
}

export const questionTypes = {
  consultQuestion: 'consult_question',
  onlineConsultation: 'online_consultation',
  psychoQuestion: 'psycho_question',
  admin: 'admin_question',
};

export function sendConsultQuestion(data, form) {
  const sendData = new FormData();
  const ID = store.getState().loginStatusReducer.id;
  sendData.append('ajax_data', '1');
  sendData.append('id', ID);
  sendData.append('type', questionTypes.consultQuestion);
  Object.entries(data).forEach(field => sendData.append(field[0], field[1]));

  return (dispatch) => {
    axios.post(SEND_CONSULT_QUESTION_URL, sendData)
      .catch(err => store.dispatch(formMessage(err.data.mess)))
      .then((err) => {
        store.dispatch(formMessage(err.data.mess));
        form.resetForm();
      })
      .finally(() => setTimeout(() => store.dispatch(formMessage('')), 2000));
  };
}

export function getConsultQuestions() {
  const data = new FormData();
  const ID = store.getState().loginStatusReducer.id;
  data.append('ajax_data', '1');
  data.append('id', ID);
  data.append('type', questionTypes.consultQuestion);
  return (dispatch) => {
    axios.post(GET_CONSULT_QUESTION_URL, data)
      .then((el) => {
        switch (el.data.error) {
          case 0:
            store.dispatch(saveConsultQuestions(el.data.request));
            break;
          default:
            break;
        }
      })
      .catch(el => store.dispatch(formMessage(el.data.mess)))
      .finally(() => setTimeout(() => store.dispatch(formMessage('')), 2000));
  };
}

export function appendMessagesToQuestion(arrayWithMessages) {
  const newState = store.getState().consultQuestionsStore;
  console.log(newState, 'new-state');
  console.log(arrayWithMessages, 'array with messages');
  newState.forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    if (el.id === arrayWithMessages[0].requestID) el.messages = arrayWithMessages;
  });
  // const part = newState.find(item=> {
  //   // console.log('item ID', item.id);
  //   // console.log('array ID', arrayWithMessages[0].id);
  //   return item.id === arrayWithMessages[0].id;
  // });
  // part.messages = arrayWithMessages;
  // console.log(part, 'FINd PART');
  return {
    type: 'APPEND_MESSAGE',
    payload: [...newState],
  };
}
export function getSingleConsultQuestion(id) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('id', id);
  data.append('type', questionTypes.consultQuestion);
  return (dispatch) => {
    axios.post(GET_SINGLE_CONSULT_QUESTION_URL, data)
      .then((el) => {
        switch (el.data.error) {
          case 0:
            store.dispatch(appendMessagesToQuestion(el.data.request));
            break;
          default:
            break;
        }
      })
      .catch(el => console.log(el))
      .finally(el => console.log(el));
  };
}


export function sendSingleQuestion(messageData) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('type', questionTypes.consultQuestion);
  Object.entries(messageData).forEach(el => data.append(el[0], el[1]));
  return (dispatch) => {
    axios.post(SEND_NEW_MESSAGE_IN_CONSULT_QUESTION_URL, data)
      .then((el) => {
        switch (el.data.error) {
          case 0:
            store.dispatch(getSingleConsultQuestion(messageData.request_id));
            break;
          default:
            break;
        }
      })
      .catch(el => console.log(el))
      .finally(el => console.log(el));
  };
}

export function closeConsultQuestion(messageID) {
  const data = new FormData();
  data.append('ajax_data', '1');
  data.append('request_id', messageID);
  return (dispatch) => {
    axios.post(CLOSE_CONSULT_QUESTION_URL, data)
      .then((el) => {
        switch (el.data.error) {
          case 0:
            store.dispatch(formMessage(el.data.mess));
            store.dispatch(getConsultQuestions());
            store.dispatch(getSingleConsultQuestion(messageID));
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
