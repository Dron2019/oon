
import { GET_WORKER_REGISTER_FIELDS } from '../dispatchActions.jsx';

const registerInputs = [
  {
    title: 'Ім`я:', name: 'name', initialValue: '', requiredClass: 'required',
  },
  {
    title: 'Прізвище', name: 'surname', initialValue: '', requiredClass: 'required',
  },
  {
    title: 'E-mail:', name: 'email', initialValue: '', requiredClass: 'required',
  },
  {
    type: 'password', title: 'Пароль', name: 'password', initialValue: '', requiredClass: 'required',
  },
  {
    type: 'password', title: 'Підтвердження паролю', name: 'confirmPassword', initialValue: '', requiredClass: 'required',
  },
  {
    title: 'Телефон:', name: 'tel', initialValue: '', requiredClass: false, type: 'number',
  },
  {
    title: 'Вік: (вкажіть скільки вам років)', name: 'age', initialValue: '', requiredClass: false, type: 'number',
  },
  {
    title: 'Досвід роботи (програміст, санітар)', name: 'work-expirience', initialValue: '', requiredClass: false,
  },
  {
    title: 'Місце проживання (м. Київ, вул. Хрещатик 25)', name: 'adress', initialValue: '', requiredClass: false,
  },
  {
    title: 'Складні життєві обставини (наркоман, п’яниця)', name: 'live-problems', initialValue: '', requiredClass: false,
  },
  {
    title: 'Освіта',
    name: 'education',
    initialValues: '',
    requiredClass: false,
    as: 'select',
    values: [[0, 'Освіта'], ['1', 'Вища'], ['2', 'Середня'], ['3', 'Нема']],
  },
  {
    title: 'Сімейний стан',
    name: 'family-status',
    initialValues: '',
    requiredClass: false,
    as: 'select',
    values: [[0, 'Сімейний стан'], ['1', 'Одружена'], ['2', 'Не одружена']],
  },
  {
    title: 'Кількість дітей',
    name: 'childs',
    initialValues: '',
    requiredClass: false,
    as: 'select',
    values: [[0, 'Кількість дітей'], ['1', '1 дитина'], ['2', '2 дитини'], ['3', '3 дитини'], ['4', 'Немає']],
  },
];
export default function registerWorkerFormReducer(state = registerInputs, action) {
  switch (action.type) {
    case GET_WORKER_REGISTER_FIELDS:
      // eslint-disable-next-line no-undef
      setLoginStatusOfUser(true, action.additionalValue.name);
      return state;
    default:
      return state;
  }
}
