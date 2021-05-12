import axios from 'axios';
import {GET_PROFILE_DATA_URL} from '../urls.jsx';
import dataStore from '../userDataStore/index.jsx';
import {setPending, resetPending} from '../userDataStore/actions.jsx';
import {GET_PROFILE_DATA,
    SEND_PROFILE_DATA,
    SET_PROFILE_DATA } from '../dispatchActions.jsx';

export function ajax_getProfileData() {
    const userId = dataStore.getState().loginStatusReducer.id;
    const sendData = new FormData();
    sendData.append('ajax_data', 1); 
    sendData.append('id', userId); 
    dataStore.dispatch(setPending());
    return (dispatch) => {
        axios.post(GET_PROFILE_DATA_URL,sendData)
            .catch(err=>{
                dataStore.dispatch(resetPending());
            })
            .then(response=>{
                console.log(response);
                dataStore.dispatch(resetPending());
            })
        
    }
}

export function getProfileData(data) {
    return {
        type: GET_PROFILE_DATA,
        payload: data,
    }
}

export function ajax_setProfileData(data) {
    // return {
    //     type: SEND_PROFILE_DATA,
    //     payload: data,
    // }
}
export function setProfileData(data) {
    return {
        type: SET_PROFILE_DATA,
        payload: data,
    }
}