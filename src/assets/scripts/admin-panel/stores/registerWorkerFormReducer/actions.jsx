import GET_WORKER_REGISTER_FIELDS from '../dispatchActions.jsx';

export function getRegisterWorkerFields() {
    const obj = { type: GET_WORKER_REGISTER_FIELDS, payload: addValue };
    return obj;
}