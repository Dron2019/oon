import axios from 'axios';

import {LOGIN_URL, LOGOUT_URL} from '../urls.jsx';
import dataStore from '../userDataStore/index.jsx';
import {PENDING_ON, CLEAR_ERROR, PENDING_OFF, LOGIN_FAIL, LOGIN} from '../dispatchActions.jsx';

export function logoutAsync(addValue) {
  return (dispatch)=>{
    const fd = new FormData();
    fd.append('action' , 'log_me_out_please')
    axios.post(LOGOUT_URL, fd)
      .then(res=>{
        if (res.data.error === 0) dataStore.dispatch(logout());
      })
  }
  
}
export function logout(addValue) {
  const obj = { type: 'LOGOUT', payload: addValue };
  return obj;
}
export function login(additionalValue = {}) {
  const obj = Object.assign({ type: LOGIN,additionalValue });
  return obj;
}

export function setPending(){
  const obj = Object.assign({ type: PENDING_ON });
  return obj;
}

export function clearError(){
  const obj = Object.assign({ type: CLEAR_ERROR });
  return obj;
}
export function resetPending(){
  const obj = Object.assign({ type: PENDING_OFF });
  return obj;
}
export function loginFail(error){
  const obj = Object.assign({ type: LOGIN_FAIL, error });
  return obj;
}

export function loginAsync(values) {
  const sendData = Object.assign(values,{ajax_data: 1});
  let formDate = new FormData();
  for ( var key in sendData ) {
    formDate.append(key, sendData[key]);
}
  console.log('1111111');
  return (dispatch) => {
    axios.post(LOGIN_URL, formDate)

    .then(function (response) {
      dataStore.dispatch(resetPending());
      if (response.data.error === 0) dataStore.dispatch(login({name: values.login}));
      if (response.data.error === 1) {
        dataStore.dispatch(loginFail(response.data.mess));
        setTimeout(() => dataStore.dispatch(clearError()), 2500);
        
      }
      return response.data;
    })
    .catch(function (error) {
      dataStore.dispatch(dataStore.dispatch(loginFail('Помилка відправки')));
      dataStore.dispatch(resetPending());
      setTimeout(() => dataStore.dispatch(clearError()), 2500);
    });
  };
}
export function getLoginStatusOfUser() {
  const loginFromStorage = localStorage.getItem('login-status');
  return {
    isLogined: loginFromStorage === 'true' ? true : false,
    name: localStorage.getItem('user-login'),
  }
};

export function setLoginStatusOfUser(status, name) {
  localStorage.setItem('login-status', status);
  localStorage.setItem('user-login', name);
}