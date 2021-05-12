import axios from 'axios';
import {GET_PROFILE_DATA_URL} from '../urls.jsx';
import dataStore from '../userDataStore/index.jsx';
import {setPending, resetPending} from '../userDataStore/actions.jsx';

function ajax_getProfileData() {
    const userId = dataStore.getState().loginStatusReducer.id;
    const sendData = new FormData();
    sendData.append('ajax_data', 1); 
    sendData.append('id', userId); 
    dataStore.dispatch(setPending());
    return (dispatch) => {
        axios.post(GET_PROFILE_DATA_URL,sendData)
            .catch(err=>{
                console.log(el);
                dataStore.dispatch(resetPending());
            })
            .then(response=>{
                console.log(response);
                dataStore.dispatch(resetPending());
            })
        
    }
}
function getProfileData(data) {
    return {
        type: GET_PROFILE_DATA,
        payload: data,
    }
}