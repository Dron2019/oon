/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  LOGIN_URL, LOGOUT_URL, CHECK_SESSION_URL, CHANGE_PASSWORD_URL,
} from '../urls.jsx';
// eslint-disable-next-line import/no-cycle
import dataStore from './index.jsx';
import {
  PENDING_ON, CLEAR_ERROR, PENDING_OFF, LOGIN_FAIL, LOGIN,
} from '../dispatchActions.jsx';

import { setMessageColor } from '../messageStatusStore/messageStatusActions.jsx';
import routes from '../../routes/routes.jsx';


export function logout(addValue) {
  const obj = { type: 'LOGOUT', payload: addValue };
  return obj;
}
export function login(additionalValue = {}) {
  const obj = Object.assign({ type: LOGIN, additionalValue });
  return obj;
}

export function logoutAsync(addValue) {
  return (dispatch) => {
    const fd = new FormData();
    fd.append('action', 'log_me_out_please');
    axios.post(LOGOUT_URL, fd)
      .then((res) => {
        if (res.data.error === 0) dataStore.dispatch(logout());
      });
  };
}


export function setPending() {
  const obj = Object.assign({ type: PENDING_ON });
  return obj;
}

export function resetPending() {
  const obj = Object.assign({ type: PENDING_OFF });
  return obj;
}
export function clearError() {
  const obj = Object.assign({ type: CLEAR_ERROR });
  return obj;
}
export function loginFail(error) {
  const obj = Object.assign({ type: LOGIN_FAIL, error });
  return obj;
}

// Восстановление по токену - пользователь попадает из ссылки на мыло с ГЕТ ПАРАМЕТРОМ
export function restoreByToken(values) {
  dataStore.dispatch(setPending());
  const sendData = Object.assign(values, { ajax_data: 1 });
  const history = useHistory();
  const formDate = new FormData();
  for (const key in sendData) {
    formDate.append(key, sendData[key]);
  }
  dataStore.dispatch(setPending());

  return (dispatch) => {
    axios.post(LOGIN_URL, formDate)
      .then((response) => {
        setMessageColor(response.data.error);
        if (response.data.error === 0) {
          dataStore.dispatch(loginFail('Вас переправить до особистого кабінету'));
          setTimeout(() => {
            dataStore.dispatch(login({ name: values.login }));
            const queryParams = new URLSearchParams(history.location.search);
            history.replace({
              search: ''.toString(),
            });
            dataStore.dispatch(resetPending());
            dataStore.dispatch(clearError());
          }, 2000);
        }
        if (response.data.error === 1) {
          dataStore.dispatch(loginFail(response.data.mess));
          history.replace({
            search: ''.toString(),
          });
          setTimeout(() => dataStore.dispatch(clearError()), 2500);
          dataStore.dispatch(resetPending());
        } else if (response.data.error === 2) {
          dataStore.dispatch(loginFail(response.data.mess));
          setTimeout(() => {
            dataStore.dispatch(login({ name: values.login }));
            const queryParams = new URLSearchParams(history.location.search);
            history.replace({
              search: ''.toString(),
            });
            dataStore.dispatch(resetPending());
            dataStore.dispatch(clearError());
          }, 3000);
        }
        history.replace({
          search: ''.toString(),
        });
        return response.data;
      })
      .catch((error) => {
        dataStore.dispatch(dataStore.dispatch(loginFail('Помилка відправки')));
        history.replace({
          search: ''.toString(),
        });
        dataStore.dispatch(resetPending());
        setTimeout(() => dataStore.dispatch(clearError()), 2500);
      });
  };
}

export function loginAsync(values, history) {
  const sendData = Object.assign(values, { ajax_data: 1 });
  const formDate = new FormData();
  for (const key in sendData) {
    formDate.append(key, sendData[key]);
  }
  return (dispatch) => {
    axios.post(LOGIN_URL, formDate)
      .then((response) => {
        // dataStore.dispatch(resetPending());
        dataStore.dispatch(setMessageColor(response.data.error));
        if (response.data.error === 0) {
          dataStore.dispatch(loginFail(response.data.mess));
          setTimeout(() => {
            dataStore.dispatch(login({
              name: response.data.userID,
              id: response.data.userID,
              role: response.data.role,
            }));
            dataStore.dispatch(clearError());
            history.push(routes.cabinet);
          }, 2000);
        }
        if (response.data.error === 1) {
          dataStore.dispatch(loginFail(response.data.mess));
          setTimeout(() => dataStore.dispatch(clearError()), 2500);
        }
        return response.data;
      })
      .catch((error) => {
        dataStore.dispatch(dataStore.dispatch(loginFail('Помилка відправки')));
        
        setTimeout(() => {
          dataStore.dispatch(resetPending());
          dataStore.dispatch(clearError());
        }, 2500);
      })
      .finally((error) => {
        
        setTimeout(() => {
          dataStore.dispatch(resetPending());
          dataStore.dispatch(clearError());
        }, 2500);
      });
  };
}
export function getLoginStatusOfUser() {
  const loginFromStorage = localStorage.getItem('login-status');
  return {
    isLogined: loginFromStorage === 'true',
    name: localStorage.getItem('user-login'),
    id: localStorage.getItem('id'),
    role: localStorage.getItem('role'),
  };
}

export function setLoginStatusOfUser(status, name, role) {
  localStorage.setItem('login-status', status);
  localStorage.setItem('user-login', name);
  localStorage.setItem('id', name);
  localStorage.setItem('role', role);
}


export function checkSession() {
  const { isLogined } = dataStore.getState().loginStatusReducer;

  const sendData = new FormData();
  sendData.append('ajax_data', 1);
  sendData.append('id', dataStore.getState().loginStatusReducer.id);
  return (dispatch) => {
    axios.post(CHECK_SESSION_URL, sendData)
      .then((response) => {
        dataStore.dispatch(setMessageColor(response.data.error));
        switch (response.data.error) {
          case 0:
            setTimeout(() => {
              dataStore.dispatch(logout());
            }, (response.data.sessionTime * 1000) - (new Date().getTime()));
            break;
          case 1:
            dataStore.dispatch(logout());
            dataStore.dispatch(loginFail('Ваша сессия закінчена, необхідна повторна авторизація'));
            setTimeout(() => {
              dataStore.dispatch(clearError());
            }, 2000);
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        dataStore.dispatch(loginFail('Сталася помилка, повторіть будь-ласка пізніше'));
        setTimeout(() => {
          dataStore.dispatch(clearError());
        }, 2000);
      });
  };
}

export function changePasswordRequest(data, resetForm) {
  const formDate = new FormData();
  formDate.append('ajax_data', '1');
  Object.entries(data).forEach(el => formDate.append(el[0], el[1]));
  return (dispatch) => {
    axios.post(CHANGE_PASSWORD_URL, formDate)
      .then((el) => {
        dataStore.dispatch(setMessageColor(el.data.error));
        switch (el.data.error) {
          case 0:
            dataStore.dispatch(loginFail(el.data.mess));
            resetForm();
            break;
          case 1:
            dataStore.dispatch(loginFail(el.data.mess));
            break;
          default:
            dataStore.dispatch(loginFail('Помилка відправки'));
            break;
        }
      })
      .catch(el => dataStore.dispatch(loginFail('Помилка відправки')))
      .finally(() => {
        setTimeout(() => {
          dataStore.dispatch(clearError());
        }, 2000);
      });
  };
}
