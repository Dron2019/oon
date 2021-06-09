export const PENDING_ON = 'PENDING_ON';
export const PENDING_OFF = 'PENDING_OFF';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const CLEAR_ERROR = 'CLEAR_ERROR';

export const GET_WORKER_REGISTER_FIELDS = 'GET_WORKER_REGISTER_FIELDS';
export const GET_CONSULT_REGISTER_FIELDS = 'GET_CONSULT_REGISTER_FIELDS';


export const GET_PROFILE_DATA = 'GET_PROFILE_DATA';
export const SEND_PROFILE_DATA = 'SEND_PROFILE_DATA';
export const SET_PROFILE_DATA = 'SET_PROFILE_DATA';


export const GET_MESSAGES = 'GET_MESSAGES';

export const CV_GET = 'CV_GET';
export const CV_SEND = 'CV_SEND';



export function login(additionalValue = {}) {
  const obj = Object.assign({ type: 'LOGIN', additionalValue });
  return obj;
}

export function setPending() {
  const obj = Object.assign({ type: 'PENDING_ON' });
  return obj;
}
export function clearError() {
  const obj = Object.assign({ type: 'CLEAR_ERROR' });
  return obj;
}
export function resetPending() {
  const obj = Object.assign({ type: 'PENDING_OFF' });
  return obj;
}
export function loginFail(error) {
  const obj = Object.assign({ type: LOGIN_FAIL, error });
  return obj;
}