

const GET_PROFILE_DATA = 'GET_PROFILE_DATA';
const SEND_PROFILE_DATA = 'SEND_PROFILE_DATA';
const SET_PROFILE_DATA = 'SET_PROFILE_DATA';




export default function profileInfoReducers(state = [], action) {
    switch (action.type) {
        case GET_PROFILE_DATA:
            return state;
            break;
        case SEND_PROFILE_DATA:
            return state;
            break;
        case SET_PROFILE_DATA:
            return state;
            break;
    
        default:
            break;
    }
    return state;
}