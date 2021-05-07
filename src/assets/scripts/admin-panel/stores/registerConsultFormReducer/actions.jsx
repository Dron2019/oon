import GET_CONSULT_REGISTER_FIELDS from '../dispatchActions.jsx';

export function getRegisterConsultFields() {
    const obj = { type: GET_CONSULT_REGISTER_FIELDS, payload: addValue };
    return obj;
}