import axios from 'axios';
import {useHistory } from "react-router-dom";

import {LOGIN_URL, LOGOUT_URL, CHECK_SESSION_URL} from '../urls.jsx';
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

export function resetPending(){
  const obj = Object.assign({ type: PENDING_OFF });
  return obj;
}
export function clearError(){
  const obj = Object.assign({ type: CLEAR_ERROR });
  return obj;
}
export function loginFail(error){
  const obj = Object.assign({ type: LOGIN_FAIL, error });
  return obj;
}

//Восстановление по токену - пользователь попадает из ссылки на мыло с ГЕТ ПАРАМЕТРОМ
export function restoreByToken(values){
  dataStore.dispatch(setPending());
  const sendData = Object.assign(values,{ajax_data: 1});
  const history = useHistory();
  let formDate = new FormData();
  for ( var key in sendData ) {
    formDate.append(key, sendData[key]);
  }
  dataStore.dispatch(setPending());

  return (dispatch)=>{
    axios.post(LOGIN_URL, formDate)
    .then(function (response) {
      if (response.data.error === 0) {
        dataStore.dispatch(loginFail('Вас переправить до особистого кабінету'));
        setTimeout(() => {
          dataStore.dispatch(login({name: values.login}))
          const queryParams = new URLSearchParams(history.location.search);
          history.replace({
              search: ''.toString(),
          });
          dataStore.dispatch(resetPending());
          dataStore.dispatch(clearError());
        }, 2000);
      };
      if (response.data.error === 1) {
        dataStore.dispatch(loginFail(response.data.mess));
        history.replace({
            search: ''.toString(),
        })
        setTimeout(() => dataStore.dispatch(clearError()), 2500);
        dataStore.dispatch(resetPending());
      } else if (response.data.error === 2){
        dataStore.dispatch(loginFail(response.data.mess));
        setTimeout(() => {
          dataStore.dispatch(login({name: values.login}))
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
      })
      return response.data;
    })
    .catch(function (error) {
      dataStore.dispatch(dataStore.dispatch(loginFail('Помилка відправки')));
        history.replace({
          search: ''.toString(),
      })
      dataStore.dispatch(resetPending());
      setTimeout(() => dataStore.dispatch(clearError()), 2500);
    });
    
  }
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
      dataStore.dispatch(resetPending());
      if (response.data.error === 0) {
        dataStore.dispatch(loginFail(response.data.mess));
        setTimeout(() => {
          dataStore.dispatch(login({name: response.data.userID, id:  response.data.userID}));
          dataStore.dispatch(clearError());
        }, 2000);
      }
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
    id: localStorage.getItem('id')
  }
};

export function setLoginStatusOfUser(status, name) {
  localStorage.setItem('login-status', status);
  localStorage.setItem('user-login', name);
  localStorage.setItem('id', name);
}


export function checkSession(){
  const isLogined = dataStore.getState().loginStatusReducer.isLogined;

  const sendData = new FormData();
  sendData.append('ajax_data', 1);
  sendData.append('id',dataStore.getState().loginStatusReducer.id);
  console.log();
  return dispatch =>{
    axios.post(CHECK_SESSION_URL, sendData)
      .then(response=>{
        switch (response.data.error) {
          case 0:
            
            break;
          case 1:
            dataStore.dispatch(logout());
            dataStore.dispatch(loginFail('Ваша сессия истекла, зайдите снова'));
            setTimeout(() => {
              dataStore.dispatch(clearError());
            }, 2000);
            break;
        
          default:
            break;
        }
      })
      .catch(error=>{
        dataStore.dispatch(loginFail('Сталася помилка, повторіть будь-ласка пізніше'));
          setTimeout(() => {
            dataStore.dispatch(clearError());
          }, 2000);
      })
  }
}