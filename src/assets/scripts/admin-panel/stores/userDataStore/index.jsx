
import { createStore } from 'redux';

function counterReducer(state = { isLogined: false }, action) {
  console.log(state);
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
    case 'LOGIN':
      return { isLogined: true};
      // return Object.assign({}, state, { isLogined: true});
    case 'LOGOUT':
      // return { isLogined: !state.isLogined };
      return { isLogined: false}
    default:
      return { isLogined: false };
  }
}
let store = createStore(counterReducer);
export default store;