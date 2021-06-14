import GET_WORKER_REGISTER_FIELDS from '../dispatchActions.jsx';

// eslint-disable-next-line import/prefer-default-export
export function getRegisterWorkerFields() {
  const obj = { type: GET_WORKER_REGISTER_FIELDS, payload: addValue };
  return obj;
}
