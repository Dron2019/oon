/* eslint-disable import/prefer-default-export */
import store from '../userDataStore/index.jsx';

export function countNewMessages() {
  let count = 0;
  let onlineConsultCount = 0;
  let psychCount = 0;
  const state = store.getState();
  const question = state.consultQuestionsStore;
  const onlineConsultNewQuestions = state.onlineConsultQuestionsStore;
  const psychQuestions = state.psychoQuestionsStore;

  onlineConsultNewQuestions.forEach((message) => {
    if (+message.is_read === 0) onlineConsultCount += 1;
  });
  question.forEach((message) => {
    if (+message.is_read === 0) count += 1;
  });
  psychQuestions.forEach((message) => {
    if (+message.is_read === 0) psychCount += 1;
  });
  const returnValue = {
    consult: 0,
    onlineConsult: 0,
    psycho: 0,
  };
  return {
    type: 'COUNT_NEW_MESSAGE',
    payload: returnValue,
  };
}

const types = {
  consultQuestion: 'consultQuestionsStore',
  onlineConsultation: 'onlineConsultQuestionsStore',
  psychoQuestion: 'psychoQuestionsStore',
  admin: 'admin_question',
};
const typesForNewMessagesStore = {
  consultQuestion: 'consult',
  onlineConsultation: 'onlineConsult',
  psychoQuestion: 'psycho',
};

export function countSingleTypeNewMessages(type) {
  let count = 0;
  const state = store.getState()[type];
  state.forEach((message) => {
    if (+message.is_read === 0) count += 1;
  });
  return {
    type: 'COUNT_SINGLE_TYPE_MESSAGE',
    payload: {
      [typesForNewMessagesStore[type]]: count,
    },
  };
}
