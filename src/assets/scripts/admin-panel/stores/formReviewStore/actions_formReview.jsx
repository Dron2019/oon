import axios from 'axios';
import store from '../userDataStore/index.jsx';
import { SEND_FORM_REVIEW_MESSAGE } from '../urls.jsx';
import { setPending, resetPending, formMessage } from '../dispatchActions.jsx';
import { setMessageColor } from '../messageStatusStore/messageStatusActions.jsx';

export default function sendFormReviewMessage(data, resetCb) {
  const forSend = new FormData();
  Object.entries(data).forEach((el) => {
    forSend.append(el[0], el[1]);
  });
  store.dispatch(setPending());
  return (dispatch) => {
    axios.post(SEND_FORM_REVIEW_MESSAGE, forSend)
      .then((res) => {
        store.dispatch(setMessageColor(res.data.error));
        switch (res.data.error) {
          case 0:
            store.dispatch(formMessage(res.data.mess));
            resetCb();
            break;
          default:
            store.dispatch(formMessage(res.data.mess));
            break;
        }
      })
      .catch((res) => {
        store.dispatch(setMessageColor(1));
        store.dispatch(formMessage('Помилка відправки'));
      })
      .finally(() => {
        setTimeout(() => {
          store.dispatch(resetPending());
          store.dispatch(formMessage(''));
        }, 2000);
      });
  };
}
