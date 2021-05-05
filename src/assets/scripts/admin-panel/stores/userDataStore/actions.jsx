import axios from 'axios';

import {LOGIN_URL} from '../urls.jsx';

import dataStore from '../userDataStore/index.jsx';
export function logout(addValue) {
  const obj = { type: 'LOGOUT', payload: addValue };
  return obj;
}
export function login(additionalValue = {}) {
  const obj = Object.assign({ type: 'LOGIN',additionalValue });
  return obj;
}

export function setPending(){
  const obj = Object.assign({ type: 'PENDING_ON' });
  return obj;
}

export function resetPending(){
  const obj = Object.assign({ type: 'PENDING_OFF' });
  return obj;
}

export function loginAsync(values) {
  const sendData = Object.assign(values,{ajax_data: 1});
  let formDate = new FormData();
  for ( var key in sendData ) {
    formDate.append(key, sendData[key]);
}
  return (dispatch) => {
    axios.post(LOGIN_URL, formDate)
    .then(function (response) {
      console.log(response);
      dataStore.dispatch(resetPending());
    })
    .catch(function (error) {
      console.log(error);
      dataStore.dispatch(resetPending());
    });
    // fetch(LOGIN_URL , {
    //   method: 'POST',
    //   body: JSON.stringify(values)
    // })
    // .then(el=>{
    //   console.log(el);
    //   dataStore.dispatch(resetPending());
    // })
    // .then(el=>{
    //   // dispatch(login());
    // })
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