/* eslint-disable import/prefer-default-export */
import store from '../userDataStore/index.jsx';

export function countNewMessages() {
  let count = 0;
  const question = store.getState().consultQuestionsStore;
  question.forEach((message) => {
    if (+message.is_read === 0) count += 1;
  });
  console.log(question);
  return {
    type: 'NEW_MESSAGE',
    payload: count,
  };
}
