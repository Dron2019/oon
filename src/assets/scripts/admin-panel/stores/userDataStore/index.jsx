import { createStore, combineReducers, compose,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';


import newMessagesReducer from '../newMessageReducer/index.jsx';
import pendingStatusStore from '../pendingStatusStore/index.jsx';
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
    loginStatusReducer,
    pendingStatusStore
  })
const store = createStore(rootReducer ,compose(
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
));
export default store;
