import axios from 'axios';
import { SEND_CONSULT_QUESTION_URL } from '../urls.jsx';
import { formMessage } from '../dispatchActions.jsx';
import store from '../userDataStore/index.jsx';

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
