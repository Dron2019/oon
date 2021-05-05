import { PENDING_ON, PENDING_OFF } from "../dispatchActions.jsx";
export default function pendingStatusStore(state=false, action) {
    switch (action.type){
        case PENDING_ON:
            return state = true;    
        case PENDING_OFF:
            return state = false;   
    }
    return state;
}