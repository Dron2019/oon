import { createStore, combineReducers, compose,applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';


import newMessagesReducer from '../newMessageReducer/index.jsx';
import pendingStatusStore from '../pendingStatusStore/index.jsx';
import registerWorkerFormReducer from '../registerWorkerFormReducer/index.jsx';
import registerConsultFormReducer from '../registerConsultFormReducer/index.jsx';
import {getLoginStatusOfUser, setLoginStatusOfUser} from './actions.jsx';

function loginStatusReducer(state = getLoginStatusOfUser(), action) {
  switch (action.type) {
    case 'LOGIN':
      setLoginStatusOfUser(true, action.additionalValue.name);
      return Object.assign({ ...state }, { isLogined: true, name:action.additionalValue.name, id: action.additionalValue.id}, );

    case 'LOGIN_FAIL':
      return Object.assign(state, {error:action.error});

    case 'CLEAR_ERROR':
      return Object.assign(state, {error:''});

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
    pendingStatusStore,
    registerWorkerFormReducer,
    registerConsultFormReducer
});


const store = createStore(rootReducer ,compose(
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
));
export default store;
