/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
import axios from 'axios';
import { GET_PROFILE_DATA_URL } from '../urls.jsx';
import dataStore from '../userDataStore/index.jsx';
import { setPending, resetPending } from '../userDataStore/actions.jsx';
import {
  GET_PROFILE_DATA,
  // SEND_PROFILE_DATA,
  SET_PROFILE_DATA,
} from '../dispatchActions.jsx';

export function setProfileData(data) {
  return {
    type: SET_PROFILE_DATA,
    payload: data,
  };
}

export function ajax_getProfileData() {
  const userId = dataStore.getState().loginStatusReducer.id;
  const sendData = new FormData();
  sendData.append('ajax_data', 1);
  sendData.append('id', userId);
  dataStore.dispatch(setPending());
  return () => {
    axios.post(GET_PROFILE_DATA_URL, sendData)
      .catch(() => {
        dataStore.dispatch(resetPending());
      })
      .then((response) => {
        const userData = response.data.user_data;
        dataStore.dispatch(setProfileData(userData));
        dataStore.dispatch(resetPending());
      });
  };
}


export function getProfileData(data) {
  return {
    type: GET_PROFILE_DATA,
    payload: data,
  };
}

export function ajax_setProfileData(data) {
  const userId = dataStore.getState().loginStatusReducer.id;
  const userData = {};
  const sendData = new FormData();
  sendData.append('ajax_data', 1);
  Object.entries(data).forEach((value) => {
    userData[value[0]] = value[1];
  });
  dataStore.dispatch(setPending());
  sendData.append('user_data', JSON.stringify(userData));
  sendData.append('id', userId);
  dataStore.dispatch(setPending());
  return () => {
    axios.post(GET_PROFILE_DATA_URL, sendData)
      .then(() => {
        dataStore.dispatch(resetPending());
      })
      .catch(() => {
        dataStore.dispatch(resetPending());
      });
  };
  // return {
  //     type: SEND_PROFILE_DATA,
  //     payload: data,
  // }
}
