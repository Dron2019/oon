export function logout() {
  const obj = { type: 'LOGOUT' };
  return obj;
}
export function login(additionalValue = {}) {
  const obj = Object.assign({ type: 'LOGIN' }, additionalValue);
  return obj;
}
