export default function newMessagesReducer(state=0, action) {
    switch (action.type){
        case 'NEW_MESSAGE':
        localStorage.setItem('newMessages', state+1)
        return state = state+1; 
    }
    return state;
}