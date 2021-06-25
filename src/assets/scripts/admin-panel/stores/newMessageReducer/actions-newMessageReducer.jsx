/* eslint-disable import/prefer-default-export */
import store from '../userDataStore/index.jsx';

export function countNewMessages() {
  let count = 0;
  let onlineConsultCount = 0;
  let psychCount = 0;
  const question = store.getState().consultQuestionsStore;
  const onlineConsultNewQuestions = store.getState().onlineConsultQuestionsStore;
  const psychQuestions = store.getState().psychoQuestionsStore;

  onlineConsultNewQuestions.forEach((message) => {
    if (+message.is_read === 0) onlineConsultCount += 1;
  });
  question.forEach((message) => {
    if (+message.is_read === 0) count += 1;
  });
  psychQuestions.forEach((message) => {
    if (+message.is_read === 0) psychCount += 1;
  });
  console.log(question);
  return {
    type: 'NEW_MESSAGE',
    payload: {
      consult: count,
      onlineConsult: onlineConsultCount,
      psycho: psychCount,
    },
  };
}
