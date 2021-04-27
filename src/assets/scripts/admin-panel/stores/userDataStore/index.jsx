import { createStore, combineReducers, compose } from 'redux';
import newMessagesReducer from '../newMessageReducer/index.jsx';
import {getLoginStatusOfUser, setLoginStatusOfUser} from './actions.jsx';

function loginStatusReducer(state = getLoginStatusOfUser(), action) {
  switch (action.type) {
    case 'LOGIN':
      setLoginStatusOfUser(true, state.name);
      return Object.assign({ ...state }, { isLogined: true });
    case 'LOGOUT':
      return Object.assign(
        { ...state }, 
        { isLogined: false }, 
        setLoginStatusOfUser(false, ''),
        {name:'',});
    case 'ENTERNAME':
      return Object.assign({ ...state }, { name: action.value });
    case 'INIT':
      return Object.assign(getLoginStatusOfUser());
    default:
      return Object.assign({ ...state }, { isLogined: state.isLogined }, getLoginStatusOfUser());
  }
}

const rootReducer = combineReducers(
  {
    newMessagesReducer, 
    loginStatusReducer 
  })
const store = createStore(rootReducer ,compose(
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
));
export default store;
