
import { createStore } from 'redux';


function getLoginStatusOfUser() {
  const loginFromStorage = localStorage.getItem('login-status');
  return {
    isLogined: loginFromStorage === 'true' ? true : false,
    name: localStorage.getItem('user-login'),
  }
};

function setLoginStatusOfUser(status, name) {
  localStorage.setItem('login-status', status);
  localStorage.setItem('user-login', name);
}
function loginStatusReducer(state = getLoginStatusOfUser(), action) {
  switch (action.type) {
    case 'LOGIN':
      setLoginStatusOfUser(true, state.isSome);
      return Object.assign({ ...state }, { isLogined: true });
    case 'LOGOUT':
      return Object.assign(
        { ...state }, 
        { isLogined: false }, 
        setLoginStatusOfUser(false, state.isSome));
    case 'ENTERNAME':
      return Object.assign({ ...state }, { isSome: action.value });
    case 'INIT':
      return Object.assign(getLoginStatusOfUser());
    default:
      return Object.assign({ ...state }, { isLogined: state.isLogined }, getLoginStatusOfUser());
  }
}
const store = createStore(loginStatusReducer);
export default store;
