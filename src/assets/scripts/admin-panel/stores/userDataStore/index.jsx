
import { createStore } from 'redux';

function counterReducer(state = { isLogined: false }, action) {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({ ...state }, { isLogined: true });
    case 'LOGOUT':
      return Object.assign({ ...state }, { isLogined: false });
    case 'ENTERNAME':
      return Object.assign({ ...state }, { isSome: action.value });
    default:
      return Object.assign({ ...state }, { isLogined: false });
  }
}
const store = createStore(counterReducer);
export default store;
