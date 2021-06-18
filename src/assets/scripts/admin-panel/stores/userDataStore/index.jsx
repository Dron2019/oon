/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import thunk from 'redux-thunk';
import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import {
  CLEAR_ERROR, LOGIN_FAIL, LOGIN, LOGOUT,
} from '../dispatchActions.jsx';


import newMessagesReducer from '../newMessageReducer/index.jsx';
import pendingStatusStore from '../pendingStatusStore/index.jsx';
import registerWorkerFormReducer from '../registerWorkerFormReducer/index.jsx';
import registerConsultFormReducer from '../registerConsultFormReducer/index.jsx';
import profileInfoReducers from '../profileInfoStore/profileInfoStore.jsx';
import cvReducer from '../CVStore/cv-reducer.jsx';
import cvToEditStore from '../CVToEditStore/cvToEditStore.jsx';
import consultQuestionsStore from '../consultQuestionsStore/consult-questions-store.jsx';

import { getLoginStatusOfUser, setLoginStatusOfUser } from './actions.jsx';

function loginStatusReducer(state = getLoginStatusOfUser(), action) {
  switch (action.type) {
    case LOGIN:
      setLoginStatusOfUser(true, action.additionalValue.name);
      return Object.assign(
        { ...state },
        { isLogined: true, name: action.additionalValue.name, id: action.additionalValue.id },
      );

    case LOGIN_FAIL:
      return Object.assign(state, { error: action.error });

    case CLEAR_ERROR:
      return Object.assign(state, { error: '' });

    case LOGOUT:
      return Object.assign(
        { ...state },
        { isLogined: false, id: '' },
        setLoginStatusOfUser(false, ''),
        { name: '' },
      );

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
    registerConsultFormReducer,
    profileInfoReducers,
    cvReducer,
    cvToEditStore,
    consultQuestionsStore,
  },
);


const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
));
export default store;
